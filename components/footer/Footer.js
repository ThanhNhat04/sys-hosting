import React from "react";
import Link from "next/link";
import styles from "./footer.module.css";

export default function Footer() {
  return (
    <footer id="contact" className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerGrid}>
          <div className={styles.footerCol}>
            <div className={styles.logo} style={{ marginBottom: "20px" }}>
              TETRAS HOSTING
            </div>
            <p>
              Cung cấp dịch vụ Cloud Hosting, VPS, Server chất lượng cao tại
              Việt Nam.
            </p>
            <div className={styles.socialLinks} style={{ marginTop: "20px" }}>
              <a href="#">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a href="#">
                <i className="fa-brands fa-twitter"></i>
              </a>
              <a href="#">
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
            </div>
          </div>
          <div className={styles.footerCol}>
            <h4>Sản Phẩm</h4>
            <ul>
              <li>
                <Link href="#"> Hosting</Link>
              </li>
              <li>
                <Link href="#">Cloud VPS</Link>
              </li>
              <li>
                <Link href="#">Deploy project</Link>
              </li>
            </ul>
          </div>
          <div className={styles.footerCol}>
            <h4>Hỗ Trợ</h4>
            <ul>
              <li>
                <Link href="#">Gửi Ticket</Link>
              </li>
              <li>
                <Link href="#">Hướng dẫn sử dụng</Link>
              </li>
            </ul>
          </div>
          <div className={styles.footerCol}>
            <h4>Liên Hệ</h4>
            <ul>
              <li>
                <i className="fa-solid fa-location-dot"></i> Tầng 12, Tòa nhà
                Tech, Hà Nội
              </li>
              <li>
                <i className="fa-solid fa-phone"></i> 1900 1234 5678
              </li>
              <li>
                <i className="fa-solid fa-envelope"></i> support@tahosting.com
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.copyright}>
          &copy; 2025 Tetras Company. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
