"use client";
import { useState, useEffect, use } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faKey,
  faUserSlash,
  faUserCheck,
  faArrowLeft,
  faCircleNotch,
  faCheckCircle,
  faExclamationCircle,
  faDatabase,
  faServer,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function UserDetail({ params }) {

  const resolvedParams = use(params);
  const userIdOrName = resolvedParams.id;
  console.log("ID người dùng đã giải quyết:", resolvedParams);

  const [servers, setServers] = useState([]);
  const [selectedServer, setSelectedServer] = useState("");
  const [newPass, setNewPass] = useState("");
  const [quota, setQuota] = useState(50);
  const [status, setStatus] = useState({
    loading: false,
    type: "",
    message: "",
  });

  const BASE_URL = "https://fastpanel-api.tetrasco.com";

  // 1. Tự động lấy danh sách máy chủ khi truy cập trang
  useEffect(() => {
    const fetchServers = async () => {
      try {
        const res = await fetch(`${BASE_URL}/servers/`);
        const data = await res.json();
        setServers(data || []);
        if (data?.length > 0) setSelectedServer(data[0]);
      } catch (err) {
        console.error("Lỗi lấy danh sách máy chủ");
      }
    };
    fetchServers();
  }, []);

  // 2. Hàm xử lý API trực tiếp
  const handleUpdate = async (actionType) => {
    if (!selectedServer) {
      setStatus({
        type: "error",
        message: "Vui lòng chọn máy chủ để tiếp tục.",
        loading: false,
      });
      return;
    }

    setStatus({ loading: true, type: "", message: "" });

    try {
      let endpoint = "";
      let queryParams = "";

      switch (actionType) {
        case "pass":
          // API yêu cầu username trong path
          endpoint = `/users/${userIdOrName}/chpasswd`;
          break;
        case "disable":
          endpoint = `/users/${userIdOrName}/disable?server_name=${selectedServer}`;
          break;
        case "enable":
          endpoint = `/users/${userIdOrName}/enable?server_name=${selectedServer}`;
          break;
        case "quota":
          // API Quota yêu cầu server_name và new_quota làm query params
          endpoint = `/users/${userIdOrName}/quota`;
          queryParams = `?server_name=${selectedServer}&new_quota=${quota}`;
          break;
      }

      const res = await fetch(`${BASE_URL}${endpoint}${queryParams}`, {
        method: "POST",
        headers: { accept: "application/json" },
      });

      if (res.ok) {
        setStatus({
          type: "success",
          message: "Thao tác trên Fastpanel thành công!",
          loading: false,
        });
        if (actionType === "pass") setNewPass("");
      } else {
        const errData = await res.json();
        throw new Error(errData.detail?.[0]?.msg || "Lỗi phản hồi từ API");
      }
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message || "Có lỗi kết nối xảy ra.",
        loading: false,
      });
    }
  };

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "20px" }}>
      <Link
        href="/users"
        style={{
          color: "#64748b",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "25px",
          textDecoration: "none",
        }}
      >
        <FontAwesomeIcon icon={faArrowLeft} /> Quay lại danh sách quản trị
      </Link>

      {/* Bộ chọn máy chủ trực tiếp */}
      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "12px",
          border: "1px solid #e2e8f0",
          marginBottom: "24px",
        }}
      >
        <h4
          style={{ margin: "0 0 10px 0", fontSize: "14px", color: "#64748b" }}
        >
          <FontAwesomeIcon icon={faServer} /> MÁY CHỦ ĐANG THỰC THI:
        </h4>
        <select
          value={selectedServer}
          onChange={(e) => setSelectedServer(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #cbd5e1",
            outline: "none",
            fontSize: "16px",
            fontWeight: "600",
          }}
        >
          {servers.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {status.message && (
        <div
          style={{
            padding: "16px",
            borderRadius: "8px",
            marginBottom: "24px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            background: status.type === "success" ? "#ecfdf5" : "#fef2f2",
            color: status.type === "success" ? "#059669" : "#dc2626",
            border: `1px solid ${status.type === "success" ? "#10b981" : "#ef4444"}`,
          }}
        >
          <FontAwesomeIcon
            icon={
              status.type === "success" ? faCheckCircle : faExclamationCircle
            }
          />
          {status.message}
        </div>
      )}

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* Đổi mật khẩu */}
          <div
            style={{
              background: "white",
              padding: "24px",
              borderRadius: "12px",
              border: "1px solid #e2e8f0",
            }}
          >
            <h3
              style={{
                fontSize: "1.1rem",
                marginBottom: "16px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <FontAwesomeIcon icon={faKey} style={{ color: "#2563eb" }} /> Đổi
              mật khẩu hệ thống
            </h3>
            <p
              style={{
                fontSize: "14px",
                color: "#64748b",
                marginBottom: "15px",
              }}
            >
              Đang thao tác user: <strong>{userIdOrName}</strong>
            </p>
            <input
              type="password"
              placeholder="Nhập mật khẩu mới..."
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                marginBottom: "16px",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
              }}
            />
            <button
              onClick={() => handleUpdate("pass")}
              disabled={status.loading || !newPass}
              style={{
                width: "100%",
                background: "#2563eb",
                color: "white",
                padding: "12px",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                fontWeight: "600",
                opacity: status.loading || !newPass ? 0.7 : 1,
              }}
            >
              {status.loading ? (
                <FontAwesomeIcon icon={faCircleNotch} spin />
              ) : (
                "Xác nhận đổi mật khẩu"
              )}
            </button>
          </div>

          {/* Cấu hình Quota */}
          <div
            style={{
              background: "white",
              padding: "24px",
              borderRadius: "12px",
              border: "1px solid #e2e8f0",
            }}
          >
            <h3
              style={{
                fontSize: "1.1rem",
                marginBottom: "16px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <FontAwesomeIcon icon={faDatabase} style={{ color: "#ea580c" }} />{" "}
              Cấu hình Quota
            </h3>
            <div style={{ display: "flex", gap: "10px", marginBottom: "16px" }}>
              <input
                type="number"
                value={quota}
                onChange={(e) => setQuota(e.target.value)}
                style={{
                  flex: 1,
                  padding: "12px",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                }}
              />
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontWeight: "600",
                }}
              >
                GB
              </span>
            </div>
            <button
              onClick={() => handleUpdate("quota")}
              disabled={status.loading}
              style={{
                width: "100%",
                background: "#ea580c",
                color: "white",
                padding: "12px",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              {status.loading ? (
                <FontAwesomeIcon icon={faCircleNotch} spin />
              ) : (
                "Cập nhật hạn mức"
              )}
            </button>
          </div>
        </div>

        {/* Kiểm soát truy cập */}
        <div
          style={{
            background: "white",
            padding: "24px",
            borderRadius: "12px",
            border: "1px solid #e2e8f0",
            height: "fit-content",
          }}
        >
          <h3
            style={{
              fontSize: "1.1rem",
              marginBottom: "16px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <FontAwesomeIcon icon={faUserSlash} style={{ color: "#dc2626" }} />{" "}
            Kiểm soát truy cập
          </h3>
          <div style={{ display: "grid", gap: "12px" }}>
            <button
              onClick={() => handleUpdate("disable")}
              disabled={status.loading}
              style={{
                background: "#fef2f2",
                color: "#dc2626",
                border: "1px solid #fee2e2",
                padding: "12px",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              <FontAwesomeIcon icon={faUserSlash} /> Vô hiệu hóa người dùng
            </button>
            <button
              onClick={() => handleUpdate("enable")}
              disabled={status.loading}
              style={{
                background: "#f0fdf4",
                color: "#16a34a",
                border: "1px solid #dcfce7",
                padding: "12px",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              <FontAwesomeIcon icon={faUserCheck} /> Kích hoạt lại tài khoản
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
