"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faServer,
  faUsers,
  faSync,
  faExternalLinkAlt,
  faDatabase,
  faCheckCircle,
  faTimesCircle,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

export default function UsersListPage() {
  const router = useRouter();
  const [servers, setServers] = useState([]);
  const [selectedServer, setSelectedServer] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const BASE_URL = "https://fastpanel-api.tetrasco.com";

  // 1. Lấy danh sách máy chủ khi load trang
  useEffect(() => {
    const fetchServers = async () => {
      try {
        const res = await fetch(`${BASE_URL}/servers/`);
        const data = await res.json();
        setServers(data || []);
        if (data?.length > 0) setSelectedServer(data[0]); // Mặc định chọn server đầu tiên
      } catch (err) {
        console.error("Lỗi lấy danh sách máy chủ:", err);
      }
    };
    fetchServers();
  }, []);

  // 2. Lấy danh sách người dùng khi server thay đổi
  const fetchUsers = async () => {
    if (!selectedServer) return;
    setLoading(true);
    try {
      const res = await fetch(
        `${BASE_URL}/users?server_name=${selectedServer}`,
      ); // Gọi API trực tiếp với query param
      const data = await res.json();
      console.log("Dữ liệu người dùng nhận được:", data);
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Lỗi lấy danh sách người dùng:", err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [selectedServer]);

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.id.toString().includes(searchTerm),
  );

  return (
    <div
      style={{
        padding: "30px",
        backgroundColor: "#f8fafc",
        minHeight: "100vh",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "30px",
          }}
        >
          <h1
            style={{
              fontSize: "24px",
              fontWeight: "700",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              color: "#1e293b",
            }}
          >
            <FontAwesomeIcon icon={faUsers} color="#2563eb" />
            Quản lý Người dùng Fastpanel
          </h1>
          <button
            onClick={fetchUsers}
            style={{
              padding: "10px 20px",
              borderRadius: "8px",
              border: "1px solid #e2e8f0",
              backgroundColor: "white",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontWeight: "600",
            }}
          >
            <FontAwesomeIcon icon={faSync} spin={loading} /> Làm mới
          </button>
        </div>

        {/* Thanh công cụ: Chọn Server & Tìm kiếm */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 2fr",
            gap: "20px",
            marginBottom: "25px",
          }}
        >
          <div
            style={{
              background: "white",
              padding: "15px",
              borderRadius: "10px",
              border: "1px solid #e2e8f0",
            }}
          >
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontSize: "13px",
                fontWeight: "600",
                color: "#64748b",
              }}
            >
              MÁY CHỦ
            </label>
            <select
              value={selectedServer}
              onChange={(e) => setSelectedServer(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #cbd5e1",
                outline: "none",
              }}
            >
              {servers.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div
            style={{
              background: "white",
              padding: "15px",
              borderRadius: "10px",
              border: "1px solid #e2e8f0",
              display: "flex",
              alignItems: "flex-end",
            }}
          >
            <div style={{ position: "relative", width: "100%" }}>
              <FontAwesomeIcon
                icon={faSearch}
                style={{
                  position: "absolute",
                  left: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#94a3b8",
                }}
              />
              <input
                type="text"
                placeholder="Tìm kiếm theo username hoặc ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 10px 10px 40px",
                  borderRadius: "6px",
                  border: "1px solid #cbd5e1",
                  outline: "none",
                }}
              />
            </div>
          </div>
        </div>

        {/* Bảng danh sách */}
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "12px",
            border: "1px solid #e2e8f0",
            overflow: "hidden",
            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              textAlign: "left",
            }}
          >
            <thead style={{ backgroundColor: "#f1f5f9" }}>
              <tr>
                <th
                  style={{
                    padding: "15px",
                    color: "#475569",
                    fontWeight: "600",
                  }}
                >
                  ID
                </th>
                <th
                  style={{
                    padding: "15px",
                    color: "#475569",
                    fontWeight: "600",
                  }}
                >
                  Username
                </th>
                <th
                  style={{
                    padding: "15px",
                    color: "#475569",
                    fontWeight: "600",
                  }}
                >
                  Dung lượng (Used/Limit)
                </th>
                <th
                  style={{
                    padding: "15px",
                    color: "#475569",
                    fontWeight: "600",
                  }}
                >
                  Trạng thái
                </th>
                <th
                  style={{
                    padding: "15px",
                    color: "#475569",
                    fontWeight: "600",
                  }}
                >
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan="5"
                    style={{
                      padding: "40px",
                      textAlign: "center",
                      color: "#64748b",
                    }}
                  >
                    Đang tải dữ liệu...
                  </td>
                </tr>
              ) : filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    style={{
                      borderBottom: "1px solid #f1f5f9",
                      transition: "0.2s",
                    }}
                    className="hover-row"
                  >
                    <td style={{ padding: "15px", color: "#64748b" }}>
                      #{user.id}
                    </td>
                    <td
                      style={{
                        padding: "15px",
                        fontWeight: "600",
                        color: "#1e293b",
                      }}
                    >
                      {user.username}
                    </td>
                    <td style={{ padding: "15px" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          fontSize: "14px",
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faDatabase}
                          size="xs"
                          color="#94a3b8"
                        />
                        <span>
                          {user.quota.used} / {user.quota.limit} GB
                        </span>
                      </div>
                    </td>
                    <td style={{ padding: "15px" }}>
                      {user.enabled ? (
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "5px",
                            color: "#16a34a",
                            backgroundColor: "#dcfce7",
                            padding: "4px 10px",
                            borderRadius: "20px",
                            fontSize: "12px",
                            fontWeight: "600",
                          }}
                        >
                          <FontAwesomeIcon icon={faCheckCircle} size="xs" />{" "}
                          Active
                        </span>
                      ) : (
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "5px",
                            color: "#dc2626",
                            backgroundColor: "#fef2f2",
                            padding: "4px 10px",
                            borderRadius: "20px",
                            fontSize: "12px",
                            fontWeight: "600",
                          }}
                        >
                          <FontAwesomeIcon icon={faTimesCircle} size="xs" />{" "}
                          Disabled
                        </span>
                      )}
                    </td>
                    <td style={{ padding: "15px" }}>
                      <button
                        onClick={() => router.push(`/users/${user.id}`)} // Chuyển hướng sang trang chi tiết [id]
                        style={{
                          padding: "6px 12px",
                          borderRadius: "6px",
                          border: "1px solid #2563eb",
                          backgroundColor: "white",
                          color: "#2563eb",
                          cursor: "pointer",
                          fontSize: "13px",
                          fontWeight: "600",
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        Quản lý{" "}
                        <FontAwesomeIcon icon={faExternalLinkAlt} size="xs" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    style={{
                      padding: "40px",
                      textAlign: "center",
                      color: "#94a3b8",
                    }}
                  >
                    Không tìm thấy người dùng nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
