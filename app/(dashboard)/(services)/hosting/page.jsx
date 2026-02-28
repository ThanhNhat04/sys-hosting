"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './hosting.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faArrowLeft, 
  faServer, 
  faGlobe, 
  faDatabase, 
  faFolderOpen, 
  faKey, 
  faHdd, 
  faBolt,
  faCopy,
  faEye,
  faEyeSlash
} from '@fortawesome/free-solid-svg-icons';

// --- DỮ LIỆU GIẢ LẬP (Mô phỏng 1 gói Hosting) ---
const HOSTING_DETAIL = {
  id: "1",
  name: 'Free-Host-200-DA',
  domain: 'thanhnhat.id.vn',
  status: 'active', // active, pending, suspended
  ip: '103.200.23.15',
  serverType: 'DirectAdmin',
  username: 'nhatdev',
  password: 'Password123!', // Mật khẩu mẫu
  nameservers: ['ns1.thanhnhat.id.vn', 'ns2.thanhnhat.id.vn'],
  usage: {
    disk: { used: 150, total: 200, unit: 'MB', percent: 75 },
    bandwidth: { used: 2.5, total: 10, unit: 'GB', percent: 25 },
  },
  registrationDate: '15/01/2024',
  nextDueDate: '15/02/2024',
  price: '0 ₫'
};

export default function HostingDetailPage({ params }) {
  // Trạng thái ẩn/hiện mật khẩu
  const [showPass, setShowPass] = useState(false);

  // Hàm copy vào clipboard
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert('Đã copy: ' + text);
  };

  return (
    <div className={styles.container}>
      
      {/* 1. THANH ĐIỀU HƯỚNG & TIÊU ĐỀ */}
      <div className={styles.topNav}>
        <Link href="/" className={styles.backLink}>
          <FontAwesomeIcon icon={faArrowLeft} /> Quay lại danh sách
        </Link>
      </div>

      <div className={styles.headerSection}>
        <div className={styles.headerInfo}>
          <h1 className={styles.serviceName}>{HOSTING_DETAIL.name}</h1>
          <a 
            href={`https://${HOSTING_DETAIL.domain}`} 
            target="_blank" 
            rel="noreferrer" 
            className={styles.domainLink}
          >
            {HOSTING_DETAIL.domain} <FontAwesomeIcon icon={faGlobe} size="xs"/>
          </a>
        </div>
        <div className={styles.headerStatus}>
            <span className={`${styles.statusBadge} ${styles.active}`}>
              Đang hoạt động
            </span>
        </div>
      </div>

      {/* 2. THỐNG KÊ TÀI NGUYÊN (Disk / Bandwidth) */}
      <div className={styles.usageGrid}>
        
        {/* Card Dung lượng */}
        <div className={styles.usageCard}>
          <div className={styles.usageIcon}><FontAwesomeIcon icon={faHdd} /></div>
          <div className={styles.usageInfo}>
            <div className={styles.usageLabel}>Dung lượng Disk</div>
            <div className={styles.progressBarBg}>
              <div 
                className={styles.progressBarFill} 
                style={{ 
                  width: `${HOSTING_DETAIL.usage.disk.percent}%`,
                  backgroundColor: HOSTING_DETAIL.usage.disk.percent > 90 ? '#ef4444' : '#3b82f6'
                }}
              ></div>
            </div>
            <div className={styles.usageStats}>
              {HOSTING_DETAIL.usage.disk.used} / {HOSTING_DETAIL.usage.disk.total} {HOSTING_DETAIL.usage.disk.unit}
            </div>
          </div>
        </div>

        {/* Card Băng thông */}
        <div className={styles.usageCard}>
          <div className={styles.usageIcon}><FontAwesomeIcon icon={faBolt} /></div>
          <div className={styles.usageInfo}>
            <div className={styles.usageLabel}>Băng thông</div>
            <div className={styles.progressBarBg}>
              <div 
                className={styles.progressBarFill} 
                style={{ width: `${HOSTING_DETAIL.usage.bandwidth.percent}%` }}
              ></div>
            </div>
            <div className={styles.usageStats}>
              {HOSTING_DETAIL.usage.bandwidth.used} / {HOSTING_DETAIL.usage.bandwidth.total} {HOSTING_DETAIL.usage.bandwidth.unit}
            </div>
          </div>
        </div>
      </div>

      {/* 3. KHUNG THÔNG TIN CHI TIẾT & HÀNH ĐỘNG */}
      <div className={styles.mainLayout}>
        
        {/* CỘT TRÁI: THÔNG TIN KỸ THUẬT */}
        <div className={styles.columnLeft}>
          
          {/* Card Thông tin Server */}
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Thông tin máy chủ</h3>
            
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Địa chỉ IP:</span>
              <div className={styles.infoValueGroup}>
                <span>{HOSTING_DETAIL.ip}</span>
                <button onClick={() => handleCopy(HOSTING_DETAIL.ip)} className={styles.copyBtn}>
                   <FontAwesomeIcon icon={faCopy} />
                </button>
              </div>
            </div>

            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Nameservers:</span>
              <div className={styles.nsList}>
                 {HOSTING_DETAIL.nameservers.map((ns, index) => (
                   <div key={index}>{ns}</div>
                 ))}
              </div>
            </div>

            <div className={styles.divider}></div>

            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Username:</span>
              <span className={styles.infoValue}>{HOSTING_DETAIL.username}</span>
            </div>

            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Password:</span>
              <div className={styles.infoValueGroup}>
                <span className={styles.passwordText}>
                  {showPass ? HOSTING_DETAIL.password : '••••••••'}
                </span>
                <button onClick={() => setShowPass(!showPass)} className={styles.eyeBtn}>
                  <FontAwesomeIcon icon={showPass ? faEyeSlash : faEye} />
                </button>
              </div>
            </div>
          </div>

          {/* Card Thanh toán */}
          <div className={styles.card}>
             <h3 className={styles.cardTitle}>Chu kỳ thanh toán</h3>
             <div className={styles.infoRow}>
               <span className={styles.infoLabel}>Ngày đăng ký:</span>
               <span>{HOSTING_DETAIL.registrationDate}</span>
             </div>
             <div className={styles.infoRow}>
               <span className={styles.infoLabel}>Hết hạn ngày:</span>
               <span className={styles.dueDate}>{HOSTING_DETAIL.nextDueDate}</span>
             </div>
             <div className={styles.infoRow}>
               <span className={styles.infoLabel}>Giá gia hạn:</span>
               <span className={styles.priceTag}>{HOSTING_DETAIL.price}</span>
             </div>
          </div>
        </div>

        {/* CỘT PHẢI: PHÍM TẮT (QUICK ACTIONS) */}
        <div className={styles.columnRight}>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Truy cập nhanh</h3>
            <div className={styles.actionGrid}>
              
              {/* Nút Login to DirectAdmin/cPanel */}
              <button className={`${styles.actionBtn} ${styles.btnPrimary}`}>
                <FontAwesomeIcon icon={faServer} className={styles.btnIcon}/>
                <span>Vào {HOSTING_DETAIL.serverType}</span>
              </button>

              <button className={styles.actionBtn}>
                <FontAwesomeIcon icon={faFolderOpen} className={styles.btnIcon}/>
                <span>Quản lý File</span>
              </button>

              <button className={styles.actionBtn}>
                <FontAwesomeIcon icon={faDatabase} className={styles.btnIcon}/>
                <span>phpMyAdmin</span>
              </button>

              <button className={styles.actionBtn}>
                <FontAwesomeIcon icon={faKey} className={styles.btnIcon}/>
                <span>Đổi mật khẩu</span>
              </button>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}