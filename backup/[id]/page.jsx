"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faExternalLinkAlt, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

// Giả lập dữ liệu chi tiết (Thực tế bạn sẽ dùng ID để fetch API)
const SERVICE_DETAIL = {
  id: "1",
  name: "Hosting - arowell.online",
  package: "AMD - H1",
  domain: "arowell.online",
  regDate: "02/01/2026",
  expDate: "09/01/2026",
  daysLeft: 1,
  status: "trial", // trial, active, expired
  managerUrl: "https://onehost-amdcloudhn042501.000nethost.com:2023",
  ip: "202.92.4.66",
  ftpPort: 21,
};

export default function ServiceDetailPage({ params }) {
  // Unwrapping params (Next.js 15+ yêu cầu await params, nhưng ở bản cũ có thể dùng trực tiếp)
  // const { id } = params; 

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert("Đã sao chép IP: " + text);
  };

  return (
    <div className={styles.container}>
      {/* Breadcrumb / Back Button */}
      <div className={styles.topNav}>
        <Link href="/clientarea" className={styles.backLink}>
          <FontAwesomeIcon icon={faArrowLeft} /> Quay lại danh sách
        </Link>
        <h1 className={styles.pageTitle}>{SERVICE_DETAIL.name}</h1>
      </div>

      <div className={styles.layoutGrid}>
        {/* --- CỘT TRÁI: THÔNG TIN GÓI HOSTING --- */}
        <div className={styles.leftColumn}>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Thông tin gói hosting</h2>
            
            <div className={styles.infoRow}>
              <div className={styles.label}>Gói hosting</div>
              <div className={styles.value}>{SERVICE_DETAIL.package}</div>
              <div className={styles.actions}>
                <button className={styles.btnPrimary}>Nâng cấp gói</button>
              </div>
            </div>

            <div className={styles.infoRow}>
              <div className={styles.label}>Miền chính</div>
              <div className={styles.valueLink}>{SERVICE_DETAIL.domain}</div>
              <div className={styles.actions}>
                <button className={styles.btnSecondary}>Đổi tên miền chính</button>
              </div>
            </div>

            <div className={styles.infoRow}>
              <div className={styles.label}>Ngày đăng ký</div>
              <div className={styles.value}>{SERVICE_DETAIL.regDate}</div>
            </div>

            <div className={styles.infoRow}>
              <div className={styles.label}>Ngày hết hạn</div>
              <div className={styles.value}>
                {SERVICE_DETAIL.expDate} <span className={styles.warningText}>Còn lại {SERVICE_DETAIL.daysLeft} Ngày</span>
              </div>
              <div className={styles.actions}>
                <button className={styles.btnPrimary}>Gia hạn</button>
                <button className={styles.btnSecondary}>Ghi chú gia hạn dịch vụ</button>
              </div>
            </div>

            <div className={styles.infoRow}>
              <div className={styles.label}>Trạng thái</div>
              <div className={styles.value}>
                <span className={styles.badgeTrial}>Dùng thử</span>
              </div>
              <div className={styles.actions}>
                <button className={styles.btnDark}>Khởi động lại Hosting</button>
                <button className={styles.btnPrimary}>Mở tạm dịch vụ</button>
              </div>
            </div>

            <div className={styles.infoRow}>
              <div className={styles.label}>Đường dẫn quản lý</div>
              <div className={styles.value}>
                <a href={SERVICE_DETAIL.managerUrl} target="_blank" rel="noopener noreferrer" className={styles.link}>
                  {SERVICE_DETAIL.managerUrl}
                </a>
              </div>
            </div>

            <div className={styles.infoRow}>
              <div className={styles.label}>Địa chỉ IP</div>
              <div className={styles.value}>{SERVICE_DETAIL.ip}</div>
              <div className={styles.actions}>
                <button className={styles.btnIcon} onClick={() => handleCopy(SERVICE_DETAIL.ip)}>
                  <FontAwesomeIcon icon={faCopy} />
                </button>
              </div>
            </div>

            <div className={styles.infoRow} style={{borderBottom: 'none'}}>
              <div className={styles.label}>FTP Port</div>
              <div className={styles.value}>{SERVICE_DETAIL.ftpPort}</div>
            </div>

          </div>
        </div>

        {/* --- CỘT PHẢI: THAO TÁC NHANH & FIREWALL --- */}
        <div className={styles.rightColumn}>
          
          {/* Card Thao tác nhanh */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Thao tác nhanh</h2>
            <div className={styles.quickActions}>
              <button className={`${styles.actionBtn} ${styles.btnGradient}`}>OneShield</button>
              <button className={styles.actionBtn}>Đăng nhập</button>
              <button className={styles.actionBtn}>Đổi mật khẩu</button>
              <button className={styles.actionBtn}>Addon tên miền</button>
              <button className={styles.actionBtn}>Đổi tài khoản quản trị</button>
              <button className={styles.actionBtn}>Phân quyền</button>
              <button className={styles.actionBtn}>Tạo ticket</button>
            </div>
          </div>

          {/* Card Firewall */}
          <div className={styles.card} style={{marginTop: '20px'}}>
            <h2 className={styles.cardTitle}>Thông tin Firewall</h2>
            <p className={styles.subText}>Kiểm tra IP có bị chặn truy cập vào hosting này không</p>
            <input type="text" className={styles.input} placeholder="Nhập IP..." defaultValue="14.167.195.223" />
            <button className={styles.btnFullBlue}>Kiểm tra</button>
          </div>

        </div>
      </div>
    </div>
  );
}