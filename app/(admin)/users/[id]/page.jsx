"use client";
import { useState, useEffect, use } from "react";
import { useSearchParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faKey, faUserSlash, faUserCheck, faArrowLeft,
  faCircleNotch, faCheckCircle, faExclamationCircle,
  faDatabase, faUserCircle, faSync
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function UserDetail({ params }) {
  const resolvedParams = use(params);
  const userId = resolvedParams.id;
  
  const [userInfo, setUserInfo] = useState(null);
  const [newPass, setNewPass] = useState("");
  const [quotaInput, setQuotaInput] = useState(0);
  const [isSyncing, setIsSyncing] = useState(false);
  const [status, setStatus] = useState({ loading: false, type: "", message: "" });

  const BASE_URL = "https://fastpanel-api.tetrasco.com";

  // 1. Khởi tạo dữ liệu từ Session Storage
  useEffect(() => {
    const saved = sessionStorage.getItem(`user_${userId}`);
    if (saved) {
      const data = JSON.parse(saved);
      setUserInfo(data);
      setQuotaInput(data.limit);
      
      // Tự động đồng bộ dữ liệu thực tế từ máy chủ ngay khi vào trang
      syncFreshData(data.server);
    }
  }, [userId]);

  // 2. Hàm đồng bộ dữ liệu thực tế từ API để tránh dữ liệu cũ trong Session
  const syncFreshData = async (serverName) => {
    setIsSyncing(true);
    try {
      const res = await fetch(`${BASE_URL}/users?server_name=${serverName}`);
      const users = await res.json();
      const freshUser = users.find(u => u.id == userId);
      
      if (freshUser) {
        const updated = {
          ...userInfo,
          username: freshUser.username,
          limit: freshUser.quota.limit,
          used: freshUser.quota.used,
          server: serverName
        };
        setUserInfo(updated);
        setQuotaInput(freshUser.quota.limit);
        sessionStorage.setItem(`user_${userId}`, JSON.stringify(updated));
      }
    } catch (err) {
      console.error("Lỗi đồng bộ dữ liệu:", err);
    } finally {
      setIsSyncing(false);
    }
  };

  // 3. Hàm xử lý cập nhật (Password, Quota, Enable/Disable)
  const handleUpdate = async (actionType) => {
    if (!userInfo) return;
    setStatus({ loading: true, type: "", message: "" });

    try {
      let endpoint = "";
      let queryParams = "";

      switch (actionType) {
        case "pass":
          endpoint = `/users/${userInfo.username}/chpasswd`;
          break;
        case "disable":
          endpoint = `/users/${userId}/disable`;
          queryParams = `?server_name=${userInfo.server}`;
          break;
        case "enable":
          endpoint = `/users/${userId}/enable`;
          queryParams = `?server_name=${userInfo.server}`;
          break;
        case "quota":
          endpoint = `/users/${userId}/quota`;
          queryParams = `?server_name=${userInfo.server}&new_quota=${quotaInput}`;
          break;
      }

      const res = await fetch(`${BASE_URL}${endpoint}${queryParams}`, {
        method: "POST",
        headers: { accept: "application/json" },
      });

      if (res.ok) {
        setStatus({ type: "success", message: "Thao tác thành công!", loading: false });
        
        // Sau khi update, gọi lại hàm đồng bộ để cập nhật UI và Session
        syncFreshData(userInfo.server);
        if (actionType === "pass") setNewPass("");
      } else {
        const errData = await res.json();
        throw new Error(errData.detail?.[0]?.msg || "Lỗi phản hồi từ API");
      }
    } catch (error) {
      setStatus({ type: "error", message: error.message, loading: false });
    }
  };

  if (!userInfo) return (
    <div style={{ display: "flex", justifyContent: "center", paddingTop: "100px" }}>
      <FontAwesomeIcon icon={faCircleNotch} spin size="2x" color="#2563eb" />
    </div>
  );

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "20px" }}>
      <Link href="/users" style={{ color: "#64748b", display: "flex", alignItems: "center", gap: "8px", marginBottom: "25px", textDecoration: "none" }}>
        <FontAwesomeIcon icon={faArrowLeft} /> Quay lại danh sách quản trị
      </Link>

      {/* Header Thông tin chi tiết */}
      <div style={{ background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)", padding: "24px", borderRadius: "12px", color: "white", marginBottom: "24px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h2 style={{ margin: 0, fontSize: "24px", display: "flex", alignItems: "center", gap: "10px" }}>
              <FontAwesomeIcon icon={faUserCircle} /> {userInfo.username}
              {isSyncing && <FontAwesomeIcon icon={faSync} spin style={{ fontSize: "14px", opacity: 0.7 }} />}
            </h2>
            <p style={{ margin: "5px 0 0 0", opacity: 0.8 }}>ID: #{userId} | Server: <strong>{userInfo.server}</strong></p>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "14px", opacity: 0.9 }}>Dung lượng (Used/Limit)</div>
            <div style={{ fontSize: "22px", fontWeight: "bold" }}>{userInfo.used} / {userInfo.limit} MB</div>
          </div>
        </div>
      </div>

      {status.message && (
        <div style={{ padding: "16px", borderRadius: "8px", marginBottom: "24px", display: "flex", alignItems: "center", gap: "10px", background: status.type === "success" ? "#ecfdf5" : "#fef2f2", color: status.type === "success" ? "#059669" : "#dc2626", border: `1px solid ${status.type === "success" ? "#10b981" : "#ef4444"}` }}>
          <FontAwesomeIcon icon={status.type === "success" ? faCheckCircle : faExclamationCircle} />
          {status.message}
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* Card Đổi mật khẩu */}
          <div style={{ background: "white", padding: "24px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
            <h3 style={{ fontSize: "1.1rem", marginBottom: "16px" }}><FontAwesomeIcon icon={faKey} color="#2563eb" /> Đổi mật khẩu</h3>
            <input type="password" placeholder="Mật khẩu mới..." value={newPass} onChange={(e) => setNewPass(e.target.value)} style={{ width: "100%", padding: "12px", marginBottom: "16px", border: "1px solid #e2e8f0", borderRadius: "8px", outline: "none" }} />
            <button onClick={() => handleUpdate("pass")} disabled={status.loading || !newPass} style={{ width: "100%", background: "#2563eb", color: "white", padding: "12px", borderRadius: "8px", border: "none", cursor: "pointer", fontWeight: "600" }}>
              {status.loading ? <FontAwesomeIcon icon={faCircleNotch} spin /> : "Xác nhận đổi mật khẩu"}
            </button>
          </div>

          {/* Card Quota */}
          <div style={{ background: "white", padding: "24px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
            <h3 style={{ fontSize: "1.1rem", marginBottom: "16px" }}><FontAwesomeIcon icon={faDatabase} color="#ea580c" /> Cấu hình Quota</h3>
            <div style={{ display: "flex", gap: "10px", marginBottom: "16px" }}>
              <input type="number" value={quotaInput} onChange={(e) => setQuotaInput(e.target.value)} style={{ flex: 1, padding: "12px", border: "1px solid #e2e8f0", borderRadius: "8px", outline: "none" }} />
              <span style={{ display: "flex", alignItems: "center", fontWeight: "bold" }}>MB</span>
            </div>
            <button onClick={() => handleUpdate("quota")} disabled={status.loading} style={{ width: "100%", background: "#ea580c", color: "white", padding: "12px", borderRadius: "8px", border: "none", cursor: "pointer", fontWeight: "600" }}>
              {status.loading ? <FontAwesomeIcon icon={faCircleNotch} spin /> : "Cập nhật hạn mức"}
            </button>
          </div>
        </div>

        {/* Card Quyền truy cập */}
        <div style={{ background: "white", padding: "24px", borderRadius: "12px", border: "1px solid #e2e8f0", height: "fit-content" }}>
          <h3 style={{ fontSize: "1.1rem", marginBottom: "16px" }}><FontAwesomeIcon icon={faUserSlash} color="#dc2626" /> Quyền truy cập</h3>
          <div style={{ display: "grid", gap: "12px" }}>
            <button onClick={() => handleUpdate("disable")} disabled={status.loading} style={{ background: "#fef2f2", color: "#dc2626", border: "1px solid #fee2e2", padding: "12px", borderRadius: "8px", cursor: "pointer", fontWeight: "600" }}>
              Vô hiệu hóa tài khoản
            </button>
            <button onClick={() => handleUpdate("enable")} disabled={status.loading} style={{ background: "#f0fdf4", color: "#16a34a", border: "1px solid #dcfce7", padding: "12px", borderRadius: "8px", cursor: "pointer", fontWeight: "600" }}>
              Kích hoạt lại tài khoản
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}