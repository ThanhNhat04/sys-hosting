"use client";
import { useState, useEffect } from "react";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faServer, faUsers, faSync, faExternalLinkAlt,
  faDatabase, faCheckCircle, faTimesCircle, faSearch,
} from "@fortawesome/free-solid-svg-icons";

// Fetcher tối ưu cho SWR
const fetcher = (url) => fetch(url).then((res) => {
  if (!res.ok) throw new Error("Lỗi kết nối API");
  return res.json();
});

export default function UsersListPage() {
  const router = useRouter();
  const [selectedServer, setSelectedServer] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const BASE_URL = "https://fastpanel-api.tetrasco.com";

  // 1. Lấy danh sách máy chủ - SWR sẽ cache dữ liệu này
  const { data: servers, error: serverError } = useSWR(`${BASE_URL}/servers/`, fetcher);

  // 2. Tự động chọn Server đầu tiên (index 0) ngay khi có dữ liệu
  useEffect(() => {
    if (servers && servers.length > 0 && !selectedServer) {
      setSelectedServer(servers[0]); // Lấy phần tử đầu tiên thay vì ghi cứng tên
    }
  }, [servers, selectedServer]);

  // 3. Lấy danh sách người dùng dựa trên server đã chọn
  // SWR tự động refetch khi: đổi tab quay lại, đổi selectedServer, hoặc bấm mutate
  const { 
    data: users, 
    error: userError, 
    isLoading, 
    mutate 
  } = useSWR(
    selectedServer ? `${BASE_URL}/users?server_name=${selectedServer}` : null,
    fetcher,
    {
      revalidateOnFocus: true, // "Tab vô" là tự lấy lại dữ liệu mới nhất
      refreshInterval: 60000,   // Tự động làm mới mỗi 1 phút (Polling)
      dedupingInterval: 2000    // Tránh gửi yêu cầu trùng lặp trong 2 giây
    }
  );

  const filteredUsers = (Array.isArray(users) ? users : []).filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.id.toString().includes(searchTerm)
  );

  return (
    <div style={{ padding: "30px", backgroundColor: "#f8fafc", minHeight: "100vh" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
          <h1 style={{ fontSize: "24px", fontWeight: "700", display: "flex", alignItems: "center", gap: "12px", color: "#1e293b" }}>
            <FontAwesomeIcon icon={faUsers} color="#2563eb" /> Quản trị Fastpanel
          </h1>
          <button
            onClick={() => mutate()} // Làm mới thủ công
            style={{ padding: "10px 20px", borderRadius: "8px", border: "1px solid #e2e8f0", backgroundColor: "white", cursor: "pointer", fontWeight: "600" }}
          >
            <FontAwesomeIcon icon={faSync} spin={isLoading} /> {isLoading ? "Đang tải..." : "Làm mới"}
          </button>
        </div>

        {/* Công cụ chọn Server & Tìm kiếm */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "20px", marginBottom: "25px" }}>
          <div style={{ background: "white", padding: "15px", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
            <label style={{ display: "block", marginBottom: "8px", fontSize: "13px", fontWeight: "600", color: "#64748b" }}>MÁY CHỦ</label>
            <select
              value={selectedServer}
              onChange={(e) => setSelectedServer(e.target.value)}
              style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1", outline: "none" }}
            >
              {!servers && <option>Đang tải máy chủ...</option>}
              {servers?.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div style={{ background: "white", padding: "15px", borderRadius: "10px", border: "1px solid #e2e8f0", display: "flex", alignItems: "flex-end" }}>
            <div style={{ position: "relative", width: "100%" }}>
              <FontAwesomeIcon icon={faSearch} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
              <input
                type="text"
                placeholder="Tìm kiếm username hoặc ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: "100%", padding: "10px 10px 10px 40px", borderRadius: "6px", border: "1px solid #cbd5e1", outline: "none" }}
              />
            </div>
          </div>
        </div>

        {/* Bảng danh sách người dùng */}
        <div style={{ backgroundColor: "white", borderRadius: "12px", border: "1px solid #e2e8f0", overflow: "hidden", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead style={{ backgroundColor: "#f1f5f9" }}>
              <tr>
                <th style={{ padding: "15px" }}>ID</th>
                <th>Username</th>
                <th>Dung lượng (Used/Limit)</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && !users && <tr><td colSpan="5" style={{ textAlign: "center", padding: "40px" }}>Đang đồng bộ dữ liệu...</td></tr>}
              {filteredUsers.map((user) => (
                <tr key={user.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <td style={{ padding: "15px", color: "#64748b" }}>#{user.id}</td>
                  <td style={{ fontWeight: "600" }}>{user.username}</td>
                  <td>
                     <FontAwesomeIcon icon={faDatabase} size="xs" color="#94a3b8" /> {user.quota.used} / {user.quota.limit} MB
                  </td>
                  <td>
                    {user.enabled ? 
                      <span style={{ color: "#16a34a", background: "#dcfce7", padding: "4px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: "600" }}>Active</span> : 
                      <span style={{ color: "#dc2626", background: "#fef2f2", padding: "4px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: "600" }}>Disabled</span>
                    }
                  </td>
                  <td style={{ padding: "15px" }}>
                    <button
                      onClick={() => {
                        // Lưu thông tin vào sessionStorage trước khi đi
                        const userData = {
                          username: user.username,
                          server: selectedServer,
                          limit: user.quota.limit,
                          used: user.quota.used,
                        };
                        sessionStorage.setItem(`user_${user.id}`, JSON.stringify(userData));
                        router.push(`/users/${user.id}`);
                      }}
                      style={{ padding: "6px 12px", borderRadius: "6px", border: "1px solid #2563eb", backgroundColor: "white", color: "#2563eb", cursor: "pointer", fontWeight: "600" }}
                    >
                      Quản lý <FontAwesomeIcon icon={faExternalLinkAlt} size="xs" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}