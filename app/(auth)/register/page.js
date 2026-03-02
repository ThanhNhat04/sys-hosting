"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faUser, 
  faBuilding, 
  faEnvelope, 
  faPhone, 
  faLock, 
  faEye, 
  faEyeSlash, 
  faRotate, 
  faArrowRight,
  faUserPlus,
  faIdCard
} from "@fortawesome/free-solid-svg-icons";

export default function RegisterPage() {
  const [accountType, setAccountType] = useState('personal');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        
        <div className={styles.header}>
          <div className={styles.logoCircle}>
            <FontAwesomeIcon icon={faUserPlus} />
          </div>
          <h1 className={styles.title}>Tạo tài khoản</h1>
          <p className={styles.subtitle}>Bắt đầu quản lý dịch vụ chuyên nghiệp ngay hôm nay</p>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className={styles.formCard}>
          
          <span className={styles.sectionLabel}>Bạn đăng ký với tư cách:</span>
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
                <FontAwesomeIcon icon={faUser} className={styles.radioIcon} />
                <span className={styles.radioText}>Cá nhân</span>
                <div className={styles.checkIcon}>
                  <i className="fa-solid fa-circle-check"></i>
                </div>
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
                <FontAwesomeIcon icon={faBuilding} className={styles.radioIcon} />
                <span className={styles.radioText}>Tổ chức</span>
                <div className={styles.checkIcon}>
                  <i className="fa-solid fa-circle-check"></i>
                </div>
              </div>
            </label>
          </div>

          <div className={styles.mainGrid}>
            {accountType === "org" && (
              <>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Mã số thuế</label>
                  <div className={styles.inputContainer}>
                    <FontAwesomeIcon icon={faIdCard} className={styles.inputIcon} />
                    <input type="text" className={styles.input} placeholder="Nhập mã số thuế" />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Tên công ty</label>
                  <div className={styles.inputContainer}>
                    <FontAwesomeIcon icon={faBuilding} className={styles.inputIcon} />
                    <input type="text" className={styles.input} placeholder="Nhập tên tổ chức" />
                  </div>
                </div>
              </>
            )}

            <div className={styles.formGroup}>
              <label className={styles.label}>Họ và tên đệm</label>
              <div className={styles.inputContainer}>
                <FontAwesomeIcon icon={faUser} className={styles.inputIcon} />
                <input type="text" className={styles.input} placeholder="Vd: Nguyễn Văn" />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Tên</label>
              <div className={styles.inputContainer}>
                <input type="text" className={styles.input} style={{ paddingLeft: '16px' }} placeholder="Vd: An" />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Email</label>
              <div className={styles.inputContainer}>
                <FontAwesomeIcon icon={faEnvelope} className={styles.inputIcon} />
                <input type="email" className={styles.input} placeholder="name@example.com" />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Số điện thoại</label>
              <div className={styles.inputContainer}>
                <FontAwesomeIcon icon={faPhone} className={styles.inputIcon} />
                <input type="tel" className={styles.input} placeholder="09xx xxx xxx" />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Mật khẩu</label>
              <div className={styles.passwordWrapper}>
                <div className={styles.inputContainer}>
                  <FontAwesomeIcon icon={faLock} className={styles.inputIcon} />
                  <input type={showPassword ? "text" : "password"} className={styles.input} placeholder="••••••••" />
                  <button type="button" className={styles.toggleBtn} onClick={() => setShowPassword(!showPassword)}>
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  </button>
                </div>
                <button type="button" className={styles.refreshBtn} title="Tạo mật khẩu ngẫu nhiên">
                  <FontAwesomeIcon icon={faRotate} />
                </button>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Xác nhận mật khẩu</label>
              <div className={styles.inputContainer}>
                <FontAwesomeIcon icon={faLock} className={styles.inputIcon} />
                <input type={showPassword ? "text" : "password"} className={styles.input} placeholder="••••••••" />
              </div>
            </div>
          </div> 

          <button type="submit" className={styles.submitBtn}>
            Đăng ký tài khoản
            <FontAwesomeIcon icon={faArrowRight} className={styles.btnIcon} />
          </button>

          <p className={styles.footerText}>
            Bằng việc đăng ký, bạn đã đồng ý với <Link href="#" className={styles.link}>Điều khoản</Link> & <Link href="#" className={styles.link}>Chính sách bảo mật</Link> của chúng tôi.
          </p>
          
          <div className={styles.bottomLink}>
            Đã có tài khoản? <Link href="/login" className={styles.linkBold}>Đăng nhập ngay</Link>
          </div>
        </form>
      </div>
    </div>
  );
}