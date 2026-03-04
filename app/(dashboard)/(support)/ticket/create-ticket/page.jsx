"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./create.module.css";
import { ticketService } from "@/services";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTag,
  faLayerGroup,
  faPenNib,
  faPaperPlane,
  faCircleNotch,
  faCircleCheck, // Icon cho thông báo thành công
} from "@fortawesome/free-solid-svg-icons";

export default function CreateTicket() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false); // Trạng thái hiển thị Alert
  const [formData, setFormData] = useState({
    subject: "",
    message: "",
    priority: "medium",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        subject: formData.subject,
        description: formData.message,
        priority: formData.priority,
      };
      const response = await ticketService.createTicket(payload);
      if (response.status === 201 || response.status === 200) {

        setShowSuccess(true);

        setTimeout(() => {
          router.push("/ticket/list-ticket");
        }, 3000);
      }
    } catch (err) {
      console.error("Lỗi khi tạo ticket:", err);
      alert("Có lỗi xảy ra, vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      {/* Success Alert Overlay */}
      {showSuccess && (
        <div className={styles.overlay}>
          <div className={styles.alertCard}>
            <div className={styles.alertIcon}>
              <FontAwesomeIcon icon={faCircleCheck} />
            </div>
            <h2 className={styles.alertTitle}>Thành công!</h2>
            <p className={styles.alertMessage}>
              Yêu cầu hỗ trợ của bạn đã được gửi đi. Đang chuyển hướng...
            </p>
          </div>
        </div>
      )}

      <form className={styles.formCard} onSubmit={handleSubmit}>
        <div className={styles.header}>
          <h1 className={styles.title}>Mở yêu cầu hỗ trợ</h1>
          <p className={styles.subtitle}>
            Vui lòng mô tả chi tiết vấn đề để chúng tôi có thể hỗ trợ bạn tốt
            nhất.
          </p>
        </div>

        {/* Tiêu đề */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Tiêu đề</label>
          <div className={styles.inputWrapper}>
            <FontAwesomeIcon icon={faTag} className={styles.inputIcon} />
            <input
              type="text"
              name="subject"
              className={styles.input}
              placeholder="Nhập tiêu đề yêu cầu"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Độ ưu tiên */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Độ ưu tiên</label>
          <div className={styles.inputWrapper}>
            <FontAwesomeIcon icon={faLayerGroup} className={styles.inputIcon} />
            <select
              name="priority"
              className={styles.select}
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="low">Thấp</option>
              <option value="medium">Trung bình</option>
              <option value="high">Cao</option>
            </select>
          </div>
        </div>

        {/* Nội dung */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Nội dung</label>
          <div className={styles.inputWrapper}>
            <FontAwesomeIcon
              icon={faPenNib}
              className={`${styles.inputIcon} ${styles.textareaIcon}`}
            />
            <textarea
              name="message"
              className={styles.textarea}
              rows="8"
              placeholder="Nội dung chi tiết cần hỗ trợ..."
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
        </div>

        <div className={styles.submitContainer}>
          <button
            type="submit"
            className={styles.submitBtn}
            disabled={loading || showSuccess}
          >
            {loading ? (
              <FontAwesomeIcon icon={faCircleNotch} spin />
            ) : (
              <>
                <FontAwesomeIcon icon={faPaperPlane} /> Gửi yêu cầu
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
