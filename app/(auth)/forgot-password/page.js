"use client";

import Link from 'next/link';
import styles from './page.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faEnvelope, 
  faKey, 
  faArrowLeft, 
  faPaperPlane 
} from "@fortawesome/free-solid-svg-icons";

export default function ForgotPasswordPage() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý logic gửi email tại đây
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        
        <div className={styles.cardBody}>
          <div className={styles.iconCircle}>
            <FontAwesomeIcon icon={faKey} />
          </div>
          
          <h1 className={styles.title}>Quên mật khẩu?</h1>
          
          <p className={styles.description}>
            Đừng lo lắng! Nhập email liên kết với tài khoản của bạn, chúng tôi sẽ gửi mã xác nhận để đặt lại mật khẩu.
          </p>

          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                Địa chỉ Email
              </label>
              <div className={styles.inputWrapper}>
                <FontAwesomeIcon icon={faEnvelope} className={styles.inputIcon} />
                <input 
                  type="email" 
                  id="email" 
                  className={styles.input} 
                  placeholder="name@company.com" 
                  required
                />
              </div>
            </div>

            <button type="submit" className={styles.button}>
              Gửi yêu cầu khôi phục
              <FontAwesomeIcon icon={faPaperPlane} className={styles.btnIcon} />
            </button>
          </form>

          <div className={styles.backToLogin}>
            <Link href="/login" className={styles.backLink}>
              <FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: '8px' }} />
              Quay lại đăng nhập
            </Link>
          </div>
        </div>

        <div className={styles.footer}>
          <span>Bạn chưa có tài khoản?</span>
          <Link href="/register" className={styles.link}>
            Đăng ký ngay
          </Link>
        </div>

      </div>
    </div>
  );
}