"use client";

import React, { useState } from "react";
import styles from "./profileUser.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faShieldAlt,
  faBell,
  faCamera,
  faCheckCircle,
  faEnvelope,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";

// --- MOCK DATA ---
const USER_PROFILE = {
  id: "117183",
  username: "hoangthanhnhat",
  fullName: "HOÀNG THANH NHẬT",
  email: "hoangthanhnhat0411@gmail.com",
  phone: "0912345678",
  address: "Biên Hòa, Đồng Nai, Việt Nam",
  joinDate: "20/12/2023",
  kycStatus: true, // Đã xác thực
  avatar:
    "https://ui-avatars.com/api/?name=Thanh+Nhat&background=random&size=200",
};

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("general"); // general, security, notification

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Thiết lập tài khoản</h1>

      <div className={styles.profileGrid}>
        {/* --- CỘT TRÁI: AVATAR & MENU --- */}
        <div className={styles.leftColumn}>
          {/* Card Avatar */}
          <div className={styles.profileCard}>
            <div className={styles.avatarWrapper}>
              <img
                src={USER_PROFILE.avatar}
                alt="Avatar"
                className={styles.avatarImg}
              />
              <button className={styles.cameraBtn}>
                <FontAwesomeIcon icon={faCamera} />
              </button>
            </div>

            <h2 className={styles.userName}>{USER_PROFILE.fullName}</h2>
            <p className={styles.userRole}>Khách hàng VIP</p>

            {USER_PROFILE.kycStatus && (
              <div className={styles.kycBadge}>
                <FontAwesomeIcon icon={faCheckCircle} /> Đã xác thực danh tính
              </div>
            )}

            <div className={styles.statsRow}>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>ID Khách hàng</span>
                <span className={styles.statValue}>#{USER_PROFILE.id}</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Ngày tham gia</span>
                <span className={styles.statValue}>
                  {USER_PROFILE.joinDate}
                </span>
              </div>
            </div>
          </div>

          {/* Menu Navigation */}
          <div className={styles.menuCard}>
            <button
              className={`${styles.menuBtn} ${
                activeTab === "general" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("general")}
            >
              <FontAwesomeIcon icon={faUser} className={styles.menuIcon} />
              Thông tin chung
            </button>

            <button
              className={`${styles.menuBtn} ${
                activeTab === "security" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("security")}
            >
              <FontAwesomeIcon icon={faShieldAlt} className={styles.menuIcon} />
              Bảo mật & Đăng nhập
            </button>

            <button
              className={`${styles.menuBtn} ${
                activeTab === "vat-infomation" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("vat-infomation")}
            >
              <FontAwesomeIcon icon={faBell} className={styles.menuIcon} />
              Thông xuất hóa đơn VAT
            </button>

            <button
              className={`${styles.menuBtn} ${
                activeTab === "notification" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("notification")}
            >
              <FontAwesomeIcon icon={faBell} className={styles.menuIcon} />
              Cấu hình thông báo
            </button>
          </div>
        </div>

        {/* --- CỘT PHẢI: FORM CHI TIẾT --- */}
        <div className={styles.rightColumn}>
          {activeTab === "general" && (
            <div className={styles.detailCard}>
              <div className={styles.cardHeader}>
                <h3>Thông tin cá nhân</h3>
                <p>Quản lý thông tin hồ sơ của bạn để bảo mật tài khoản</p>
              </div>

              <form className={styles.formGrid}>
                {/* Họ tên */}
                <div className={styles.formGroup}>
                  <label>Họ và tên</label>
                  <input
                    type="text"
                    defaultValue={USER_PROFILE.fullName}
                    className={styles.input}
                  />
                </div>

                {/* Email (Readonly) */}
                <div className={styles.formGroup}>
                  <label>
                    Địa chỉ Email{" "}
                    <span className={styles.verifiedTag}>Đã xác thực</span>
                  </label>
                  <div className={styles.inputIconWrapper}>
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className={styles.inputIcon}
                    />
                    <input
                      type="email"
                      defaultValue={USER_PROFILE.email}
                      className={styles.input}
                      disabled
                    />
                  </div>
                </div>

                {/* Số điện thoại */}
                <div className={styles.formGroup}>
                  <label>Số điện thoại</label>
                  <div className={styles.inputIconWrapper}>
                    <FontAwesomeIcon
                      icon={faPhone}
                      className={styles.inputIcon}
                    />
                    <input
                      type="text"
                      defaultValue={USER_PROFILE.phone}
                      className={styles.input}
                    />
                  </div>
                </div>

                {/* Địa chỉ */}
                <div
                  className={styles.formGroup}
                  style={{ gridColumn: "1 / -1" }}
                >
                  <label>Địa chỉ liên hệ</label>
                  <input
                    type="text"
                    defaultValue={USER_PROFILE.address}
                    className={styles.input}
                  />
                </div>

                {/* Giới tính & Ngày sinh */}
                <div className={styles.formGroup}>
                  <label>Giới tính</label>
                  <select className={styles.select}>
                    <option value="male">Nam</option>
                    <option value="female">Nữ</option>
                    <option value="other">Khác</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label>Ngày sinh</label>
                  <input type="date" className={styles.input} />
                </div>

                {/* Button Save */}
                <div className={styles.formActions}>
                  <button type="button" className={styles.btnSave}>
                    Lưu thay đổi
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === "security" && (
            <div className={styles.detailCard}>
              <div className={styles.cardHeader}>
                <h3>Đổi mật khẩu</h3>
                <p>Nên sử dụng mật khẩu mạnh để bảo vệ tài khoản</p>
              </div>

              <form className={styles.formStack}>
                <div className={styles.formGroup}>
                  <label>Mật khẩu hiện tại</label>
                  <input
                    type="password"
                    className={styles.input}
                    placeholder="********"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Mật khẩu mới</label>
                  <input
                    type="password"
                    className={styles.input}
                    placeholder="Nhập mật khẩu mới"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Xác nhận mật khẩu mới</label>
                  <input
                    type="password"
                    className={styles.input}
                    placeholder="Nhập lại mật khẩu mới"
                  />
                </div>
                <div className={styles.formActions}>
                  <button type="button" className={styles.btnSave}>
                    Lưu lại
                  </button>
                </div>
              </form>

              <hr className={styles.divider} />

              <div className={styles.cardHeader}>
                <h3>Xác thực 2 bước (2FA)</h3>
                <p>Tăng cường bảo mật bằng mã OTP</p>
              </div>
              <div className={styles.twoFactorBox}>
                <div className={styles.switchWrapper}>
                  <label className={styles.switch}>
                    <input type="checkbox" />
                    <span className={styles.slider}></span>
                  </label>
                  <span>Kích hoạt xác thực qua Google Authenticator</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
