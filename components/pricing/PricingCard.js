"use client";
import React, { useState } from "react";
import styles from "./PricingCard.module.css";
import Link from "next/link";

const PricingCard = ({ plan }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Mặc định hiển thị 8 dòng đầu tiên
  const DEFAULT_VISIBLE_COUNT = 8;

  // Hàm xử lý hiển thị text: In đậm phần sau dấu ":"
  const renderFeatureItem = (text, index) => {
    const parts = text.split(":");
    const label = parts[0];
    const value = parts.slice(1).join(":"); // Lấy phần còn lại nếu có nhiều dấu :

    return (
      <li key={index} className={styles.featureItem}>
        {/* Icon tick xanh */}
        <i className="fa-regular fa-circle-check"></i>
        <span>
          {label}
          {value ? ":" : ""} <strong>{value}</strong>
        </span>
      </li>
    );
  };

  return (
    <div
      className={`${styles.cardContainer} ${
        plan.isPopular ? styles.popularCard : ""
      }`}
    >
      {/* Badge "Khuyên dùng" cho gói Popular */}
      {plan.isPopular && <div className={styles.popularBadge}>Khuyên dùng</div>}

      {/* Badge giảm giá */}
      <div className={styles.discountBadge}>{plan.discount || "-30%"}</div>

      {/* Header: Icon & Tên gói */}
      <div className={styles.header}>
        <div className={styles.iconBox}>
          {/* Bạn có thể thay icon khác tùy gói nếu muốn */}
          <i className="fa-solid fa-server"></i>
        </div>
        <h1 className={styles.planName}>{plan.name}</h1>
      </div>

      {/* Giá tiền */}
      <div className={styles.priceSection}>
        <span className={styles.oldPrice}>{plan.oldPrice}</span>
        <div className={styles.currentPrice}>
          {plan.price} <span className={styles.period}>/tháng</span>
        </div>
      </div>

      {/* Dropdown giả lập chọn chu kỳ */}
      {/* <div className={styles.selectorBox}>
        <span>Thanh toán 1 năm</span>
        <i className="fa-solid fa-chevron-down"></i>
      </div> */}

      {/* Danh sách tính năng */}
      <ul className={styles.featureList}>
        {/* Render phần mặc định */}
        {plan.features
          .slice(0, DEFAULT_VISIBLE_COUNT)
          .map((item, idx) => renderFeatureItem(item, idx))}

        {/* Render phần ẩn (Accordion) */}
        <div
          className={`${styles.collapsibleContent} ${
            isExpanded ? styles.expanded : ""
          }`}
        >
          {plan.features
            .slice(DEFAULT_VISIBLE_COUNT)
            .map((item, idx) =>
              renderFeatureItem(item, idx + DEFAULT_VISIBLE_COUNT)
            )}
        </div>
      </ul>

      {/* Nút Toggle Xem thêm / Ẩn bớt */}
      <div
        className={styles.toggleBtn}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? (
          <>
            Thu gọn <i className="fa-solid fa-arrow-up"></i>
          </>
        ) : (
          <>
            Chi tiết thông số {" "}
            <i className="fa-solid fa-arrow-down"></i>
          </>
        )}
      </div>

      {/* Nút Mua Hàng */}
      <a href={plan?.url} rel="noopener noreferrer">
        <button className={styles.buyBtn}>
          <i className="fa-solid fa-cart-shopping"></i> Đăng Ký Ngay
        </button>
      </a>
    </div>
  );
};

export default PricingCard;
