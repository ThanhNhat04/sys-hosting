"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./login.module.css";
import Link from "next/link";
import Cookies from "js-cookie"; // Nên dùng thêm cái này

import { authService } from "@/services";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await authService.login(email, password);

      // Kiểm tra mọi trường hợp tên biến token (accessToken hoặc token)
      const token = response.accessToken || response.token;

      if (token) {
        // 1. Lưu vào LocalStorage cho axiosClient lấy dùng
        localStorage.setItem("accessToken", token);
        
        // 2. Lưu vào Cookie để Middleware của Next.js có thể đọc được (quan trọng)
        Cookies.set("accessToken", token, { expires: 7 }); // Hết hạn sau 7 ngày

        // 3. Dùng replace để chuyển trang sạch sẽ, không bị lỗi mã RSC
        window.location.replace("/"); 
      }
    } catch (err) {
      // Lấy thông báo lỗi từ API (err.detail) hoặc dùng tin nhắn mặc định
      const errorMsg = typeof err === 'object' ? (err.detail || "Sai tài khoản hoặc mật khẩu!") : err;
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Đăng nhập</h1>

        {error && <p style={{ color: "#ff4d4f", fontSize: "14px", marginBottom: "10px", textAlign: "center" }}>{error}</p>}

        <form onSubmit={handleLogin}>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>Email</label>
            <div className={styles.inputWrapper}>
              <input
                type="email"
                id="email"
                className={styles.input}
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className={styles.formGroup} style={{ position: "relative" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <label htmlFor="password" className={styles.label}>Mật khẩu</label>
              <button
                type="button"
                className={styles.showBtn}
                onClick={() => setShowPassword(!showPassword)}
                style={{ background: 'none', border: 'none', color: '#0070f3', cursor: 'pointer', fontSize: '12px' }}
              >
                {showPassword ? "Ẩn" : "Hiện"}
              </button>
            </div>

            <div className={styles.inputWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className={styles.checkboxGroup}>
            <input type="checkbox" id="keepLogged" className={styles.checkbox} />
            <label htmlFor="keepLogged" className={styles.checkboxLabel}>Ghi nhớ tài khoản</label>
          </div>

          <div className="btn-login">
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={loading}
              style={{ opacity: loading ? 0.7 : 1 }}
            >
              {loading ? "Đang xử lý..." : "Đăng nhập"}
            </button>
          </div>

          <div className={styles.footerLinks}>
            <Link href="#">Quên mật khẩu</Link>
          </div>
          <p className={styles.subtitle}>
            Chưa có tài khoản{" "}
            <Link href="#" className={styles.link}>Tạo tài khoản</Link>
          </p>
        </form>
      </div>
    </div>
  );
}