"use client";
import { useState } from "react";
import { fastpanelService } from "@/services"; // Sử dụng đúng service cho hạ tầng
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
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { use } from "react"; // Sử dụng để unwrapping params trong App Router mới

export default function UserDetail({ params }) {
  const { id } = use(params); // id ở đây có thể là username tùy theo cách bạn định nghĩa URL
  const [newPass, setNewPass] = useState("");
  const [quota, setQuota] = useState(50);
  const [status, setStatus] = useState({
    loading: false,
    type: "",
    message: "",
  });

  const handleUpdate = async (actionType) => {
    setStatus({ loading: true, type: "", message: "" });

    try {
      if (actionType === "pass") {
        // Gọi API Fastpanel: POST /users/{username}/chpasswd
        await fastpanelService.changePassword(id, newPass);
        setStatus({
          type: "success",
          message: "Đã cập nhật mật khẩu hệ thống thành công!",
          loading: false,
        });
        setNewPass("");
      } else if (actionType === "disable") {
        // Gọi API Fastpanel: POST /users/{id}/disable
        await fastpanelService.disableUser(id);
        setStatus({
          type: "success",
          message: "Tài khoản đã được vô hiệu hóa tạm thời.",
          loading: false,
        });
      } else if (actionType === "enable") {
        // Gọi API Fastpanel: POST /users/{id}/enable
        await fastpanelService.enableUser(id);
        setStatus({
          type: "success",
          message: "Tài khoản đã được kích hoạt trở lại.",
          loading: false,
        });
      } else if (actionType === "quota") {
        // Gọi API Fastpanel: POST /users/{id}/quota
        await fastpanelService.updateQuota(id, quota);
        setStatus({
          type: "success",
          message: "Đã cập nhật hạn mức lưu trữ mới.",
          loading: false,
        });
      }
    } catch (error) {
      // Error message lấy từ Interceptor của axiosClient (err.response?.data || err.message)
      setStatus({
        type: "error",
        message: error || "Có lỗi xảy ra khi xử lý yêu cầu.",
        loading: false,
      });
    }
  };

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
      <Link
        href="/admin/users"
        style={{
          color: "var(--text-secondary)",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "25px",
          textDecoration: "none",
        }}
      >
        <FontAwesomeIcon icon={faArrowLeft} /> Quay lại danh sách quản trị
      </Link>

      {/* Thông báo trạng thái nội bộ - Thay thế cho Toast */}
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
            fontWeight: "500",
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
        {/* Cột trái: Đổi mật khẩu & Quota */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* Card Đổi mật khẩu */}
          <div
            style={{
              background: "white",
              padding: "24px",
              borderRadius: "12px",
              border: "1px solid var(--border-color)",
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
              <FontAwesomeIcon
                icon={faKey}
                style={{ color: "var(--primary)" }}
              />
              Đổi mật khẩu hệ thống
            </h3>
            <p
              style={{
                fontSize: "14px",
                color: "var(--text-secondary)",
                marginBottom: "15px",
              }}
            >
              Người dùng: <strong>{id}</strong>
            </p>
            <input
              type="password"
              placeholder="Mật khẩu mới cho Fastpanel..."
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                marginBottom: "16px",
                border: "1px solid var(--border-color)",
                borderRadius: "8px",
                outline: "none",
              }}
            />
            <button
              onClick={() => handleUpdate("pass")}
              disabled={status.loading || !newPass}
              style={{
                width: "100%",
                background: "var(--primary)",
                color: "white",
                padding: "12px",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                fontWeight: "600",
                transition: "0.2s",
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

          {/* Card Quota */}
          <div
            style={{
              background: "white",
              padding: "24px",
              borderRadius: "12px",
              border: "1px solid var(--border-color)",
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
              <FontAwesomeIcon
                icon={faDatabase}
                style={{ color: "var(--secondary)" }}
              />
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
                  border: "1px solid var(--border-color)",
                  borderRadius: "8px",
                  outline: "none",
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
                background: "var(--secondary)",
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

        {/* Cột phải: Trạng thái quyền truy cập */}
        <div
          style={{
            background: "white",
            padding: "24px",
            borderRadius: "12px",
            border: "1px solid var(--border-color)",
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
            <FontAwesomeIcon icon={faUserSlash} style={{ color: "#dc2626" }} />
            Kiểm soát truy cập
          </h3>
          <p
            style={{
              fontSize: "14px",
              color: "var(--text-secondary)",
              marginBottom: "20px",
              lineHeight: "1.5",
            }}
          >
            Thao tác này sẽ ảnh hưởng trực tiếp đến khả năng đăng nhập và sử
            dụng tài nguyên của người dùng trên cụm máy chủ Fastpanel.
          </p>

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
                transition: "0.2s",
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
                transition: "0.2s",
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
