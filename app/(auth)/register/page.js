"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

export default function RegisterPage() {
  const [accountType, setAccountType] = useState('personal');

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>Đăng ký</h1>
          <p className={styles.subtitle}>Đăng ký tài khoản quản lý dịch vụ</p>
        </div>

        <form onSubmit={(e) => e.preventDefault()}>
          
          {/* 1. Chọn loại tài khoản */}
          <span className={styles.sectionLabel}>Loại tài khoản</span>
          <div className={styles.accountTypeGroup}>
            <label className={styles.radioLabel}>
              <input 
                type="radio" 
                name="accountType" 
                value="personal"
                checked={accountType === 'personal'}
                onChange={() => setAccountType('personal')}
                className={styles.radioInput}
              />
              <div className={styles.radioCard}>
                <div className={styles.radioCircle}></div>
                <span className={styles.radioText}>Cá nhân</span>
              </div>
            </label>

            <label className={styles.radioLabel}>
              <input 
                type="radio" 
                name="accountType" 
                value="org"
                checked={accountType === 'org'}
                onChange={() => setAccountType('org')}
                className={styles.radioInput}
              />
              <div className={styles.radioCard}>
                <div className={styles.radioCircle}></div>
                <span className={styles.radioText}>Tổ chức</span>
              </div>
            </label>
          </div>

          {/* 2. Grid Form Chính */}
          <div className={styles.mainGrid}>
            
            {/* Logic hiển thị thêm trường nếu là Tổ chức */}
            {accountType === "org" && (
              <>
                {/* Grid Item 1: MST */}
                <div className={styles.formGroup}>
                  <label className={styles.label}>Mã số thuế</label>
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="Nhập mã số thuế"
                  />
                </div>

                {/* Grid Item 2: Tên công ty */}
                <div className={styles.formGroup}>
                  <label className={styles.label}>Tên công ty</label>
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="Nhập tên tổ chức"
                  />
                </div>
              </>
            )}

            {/* Các trường mặc định */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Họ và tên đệm</label>
              <input type="text" className={styles.input} placeholder="Nhập họ và tên đệm" />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Tên</label>
              <input type="text" className={styles.input} placeholder="Nhập tên" />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Email</label>
              <input type="email" className={styles.input} placeholder="Nhập địa chỉ email" />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Số điện thoại</label>
              <input type="tel" className={styles.input} placeholder="Nhập số điện thoại di động" />
            </div>

            {/* Mật khẩu & Nút Refresh */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Mật khẩu</label>
              <div className={styles.passwordWrapper}>
                <div className={styles.inputContainer}>
                  <input type="password" className={styles.input} defaultValue="••••••••••••••" />
                  <span className={styles.eyeIcon}>
                    {/* SVG Icon Mắt */}
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                  </span>
                </div>
                <button type="button" className={styles.refreshBtn}>
                   {/* SVG Icon Refresh */}
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 4v6h-6"></path><path d="M1 20v-6h6"></path><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
                </button>
              </div>
            </div>

            {/* Xác nhận mật khẩu */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Xác nhận lại mật khẩu</label>
              <div className={styles.inputContainer}>
                <input type="password" className={styles.input} defaultValue="••••••••••••••" />
                <span className={styles.eyeIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                </span>
              </div>
            </div>

          </div> 
          {/* Kết thúc Main Grid */}

          <button type="submit" className={styles.submitBtn}>
            Đăng ký 
            {/* SVG Mũi tên */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </button>

          <p className={styles.footerText}>
            Bằng việc đăng ký là bạn đã đọc và chấp nhận <Link href="/terms" className={styles.link}>Điều khoản sử dụng dịch vụ</Link>, <Link href="/privacy" className={styles.link}>Chính sách dữ liệu cá nhân</Link>
          </p>
        </form>
      </div>
    </div>
  );
}