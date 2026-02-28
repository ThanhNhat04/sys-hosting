// app/forgot-password/page.jsx
import Link from 'next/link';
import styles from './page.module.css';

// Thiết lập tiêu đề cho trang (Metadata API của Next.js)
export const metadata = {
  title: 'Đặt lại mật khẩu',
  description: 'Trang khôi phục mật khẩu',
};

export default function ForgotPasswordPage() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        
        {/* Phần thân form */}
        <div className={styles.cardBody}>
          <h1 className={styles.title}>
            Đặt lại Mật khẩu bị <br /> mất
          </h1>
          
          <p className={styles.description}>
            Quên mật khẩu? Nhập địa chỉ email của bạn bên dưới để bắt đầu quá trình đặt lại.
          </p>

          <form>
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                Địa chỉ Email
              </label>
              <input 
                type="email" 
                id="email" 
                className={styles.input} 
                placeholder="Nhập email" 
                required
              />
            </div>

            <button type="submit" className={styles.button}>
              Gửi
            </button>
          </form>
        </div>

        {/* Phần chân trang (Footer) */}
        <div className={styles.footer}>
          Chưa phải là thành viên? 
          <Link href="/register" className={styles.link}>
            Tạo Tài khoản Mới
          </Link>
        </div>

      </div>
    </div>
  );
}