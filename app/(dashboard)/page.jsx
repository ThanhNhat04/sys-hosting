"use client";

import React, { useState } from 'react';
import Link from 'next/link'; // [QUAN TRỌNG] Import Link để chuyển trang
import styles from './page.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

// --- 1. DỮ LIỆU GIẢ LẬP ---
const USER_INFO = {
  id: "117183",
  name: "Hoàng Thanh Nhật"
};

const SUPPORT_INFO = {
  name: "Nguyễn Khánh Vy",
  role: "Chuyên Viên CSKH",
  avatar: "https://ui-avatars.com/api/?name=Khanh+Vy&background=random&size=128"
};

const TABS = [
  { id: 'service', label: 'Dịch vụ đã đăng ký', count: 2 },
  { id: 'hosting', label: 'Hosting/VPS', count: 1 },
];

const SERVICES_DATA = [
  {
    id: 1,
    category: 'service', 
    name: 'Free-Host-200-DA',
    domain: 'thanhnhat.id.vn',
    status: 'active',
    price: 0,
    cycle: 'Miễn phí',
    expiry: '-',
  },
  {
    id: 2,
    category: 'service',
    name: 'Free-Host-Test-01',
    domain: 'test.thanhnhat.id.vn',
    status: 'pending',
    price: 0,
    cycle: 'Miễn phí',
    expiry: '2025-12-31',
  },
  {
    id: 3,
    category: 'hosting', 
    name: 'VPS-Basic-Ram2GB',
    domain: '192.168.1.10',
    status: 'active',
    price: 150000,
    cycle: 'Hàng tháng',
    expiry: '2024-05-20',
  }
];

const getStatusBadge = (status) => {
  switch (status) {
    case 'active':
      return { label: 'Hoạt động', className: styles.statusActive };
    case 'pending':
      return { label: 'Đang tạo', className: styles.statusPending };
    case 'expired':
      return { label: 'Hết hạn', className: styles.statusExpired };
    default:
      return { label: 'Không xác định', className: '' };
  }
};

// --- 2. COMPONENT CHÍNH ---
export default function ClientAreaPage() {
  const [activeTab, setActiveTab] = useState('service');

  // Lọc dữ liệu
  const filteredServices = SERVICES_DATA.filter(service => service.category === activeTab);

  return (
    <div className={styles.container}>
      
      {/* HEADER: Tiêu đề + Card Support */}
      <div className={styles.headerSection}>
        <div className={styles.headerLeft}>
          <h1 className={styles.pageTitle}>Khu vực khách hàng</h1>
          <p className={styles.subTitle}>Quản lý tất cả dịch vụ của bạn tại đây</p>
          <div className={styles.userIdTag}>
            ID Khách hàng: <strong>{USER_INFO.id}</strong>
          </div>
        </div>

        {/* Card Support bên phải */}
        <div className={styles.supportCard}>
          <div className={styles.supportHeader}>
            <span className={styles.dotOnline}>•</span> Người phụ trách
          </div>
          <div className={styles.supportContent}>
            <img 
              src={SUPPORT_INFO.avatar} 
              alt="Support Avatar" 
              className={styles.avatar} 
            />
            <div className={styles.supportInfo}>
              <div className={styles.supportName}>{SUPPORT_INFO.name}</div>
              <div className={styles.supportRole}>{SUPPORT_INFO.role}</div>
              <button className={styles.contactBtn}>Liên hệ hỗ trợ</button>
            </div>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className={styles.tabsContainer}>
        {TABS.map((tab) => (
          <button 
            key={tab.id}
            className={`${styles.tabItem} ${activeTab === tab.id ? styles.tabActive : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
            {tab.count > 0 && <span className={styles.badge}>{tab.count}</span>}
          </button>
        ))}
      </div>

      {/* TABLE LIST */}
      <div className={styles.tableCard}>
        
        {/* Table Header */}
        <div className={`${styles.gridRow} ${styles.tableHeader}`}>
          <div className={styles.colService}>Dịch vụ / Tên miền</div>
          <div className={styles.colStatus}>Trạng thái</div>
          <div className={`${styles.colInfo} ${styles.colHideMobile}`}>Giá</div>
          <div className={`${styles.colInfo} ${styles.colHideMobile}`}>Chu kỳ</div>
          <div className={`${styles.colInfo} ${styles.colHideMobile}`}>Hết hạn</div>
          <div className={styles.colAction}></div> 
        </div>

        {/* Table Body */}
        {filteredServices.length > 0 ? (
          filteredServices.map((service) => {
            const statusInfo = getStatusBadge(service.status);
            
            return (
              <div key={service.id} className={`${styles.gridRow} ${styles.tableBodyRow}`}>
                
                {/* 1. Tên Dịch vụ (Có Link sang chi tiết) */}
                <div className={styles.colService}>
                  <Link href={`/clientarea/${service.id}`} className={styles.serviceLink}>
                    {service.name}
                  </Link>
                  <div className={styles.domainName}>{service.domain}</div>
                </div>

                {/* 2. Trạng thái */}
                <div className={styles.colStatus}>
                  <span className={`${styles.statusBadge} ${statusInfo.className}`}>
                    {statusInfo.label}
                  </span>
                </div>

                {/* 3. Giá (Ẩn trên mobile) */}
                <div className={`${styles.colInfo} ${styles.colHideMobile}`}>
                  {service.price === 0 ? '0 ₫' : new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(service.price)}
                </div>

                {/* 4. Chu kỳ (Ẩn trên mobile) */}
                <div className={`${styles.colInfo} ${styles.colHideMobile}`}>
                  {service.cycle}
                </div>

                {/* 5. Hết hạn (Ẩn trên mobile) */}
                <div className={`${styles.colInfo} ${styles.colHideMobile}`}>
                  {service.expiry}
                </div>

                {/* 6. Mũi tên (Có Link sang chi tiết) */}
                <div className={styles.colAction}>
                  <Link href={`/clientarea/${service.id}`} className={styles.iconBtn}>
                    <FontAwesomeIcon icon={faChevronRight} />
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
          <div className={styles.emptyState}>
            Chưa có dịch vụ nào trong mục này.
          </div>
        )}
      </div>
    </div>
  );
}