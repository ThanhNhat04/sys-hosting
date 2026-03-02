"use client";

import { useState } from "react";
import styles from "./login.module.css";
import Link from "next/link";
import Image from "next/image";
import Cookies from "js-cookie";
import { authService } from "@/services";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faEnvelope, faLock, faEye, faEyeSlash, 
  faCircleNotch, faArrowRight, faCircleExclamation 
} from "@fortawesome/free-solid-svg-icons";

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
      const token = response.accessToken || response.token;
      if (token) {
        localStorage.setItem("accessToken", token);
        Cookies.set("accessToken", token, { expires: 7 });
        window.location.replace("/"); 
      }
    } catch (err) {
      setError(typeof err === 'object' ? (err.detail || "Thông tin không chính xác") : err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.loginCard}>
        <div className={styles.header}>
          <div className={styles.logoCircle}>
            <Image src="/assets/logo-symbol.png" alt="Logo" width={40} height={40} />
          </div>
          <h1 className={styles.title}>Đăng nhập</h1>
          <p className={styles.subtitle}>Chào mừng bạn quay trở lại</p>
        </div>

        {error && (
          <div className={styles.errorAlert}>
            <FontAwesomeIcon icon={faCircleExclamation} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Email</label>
            <div className={styles.inputContainer}>
              <FontAwesomeIcon icon={faEnvelope} className={styles.inputIcon} />
              <input 
                type="email" className={styles.input} placeholder="name@company.com"
                value={email} onChange={(e) => setEmail(e.target.value)} required 
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Mật khẩu</label>
            <div className={styles.inputContainer}>
              <FontAwesomeIcon icon={faLock} className={styles.inputIcon} />
              <input 
                type={showPassword ? "text" : "password"} className={styles.input} placeholder="••••••••"
                value={password} onChange={(e) => setPassword(e.target.value)} required 
              />
              <button type="button" className={styles.toggleBtn} onClick={() => setShowPassword(!showPassword)}>
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
            </div>
          </div>

          <div className={styles.rememberRow}>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" className={styles.hiddenCheckbox} />
              Ghi nhớ đăng nhập
            </label>
            <Link href="/forgot-password" className={styles.forgotLink}>Quên mật khẩu?</Link>
          </div>

          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? <FontAwesomeIcon icon={faCircleNotch} spin /> : (
              <>Tiếp tục <FontAwesomeIcon icon={faArrowRight} className={styles.btnIcon} /></>
            )}
          </button>
        </form>

        <div className={styles.footer}>
          <span>Chưa có tài khoản?</span>
          <Link href="/register" className={styles.signupLink}>Đăng ký ngay</Link>
        </div>
      </div>
    </div>
  );
}