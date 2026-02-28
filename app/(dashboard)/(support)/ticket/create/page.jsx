'use client'

import React, { useState } from 'react';
import styles from './create.module.css';

export default function CreateTicket() {
  const [formData, setFormData] = useState({
    department: 'technical',
    subject: '',
    message: '',
    relatedService: 'none',
    cc: '',
    isSensitive: false,
    files: null
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    alert('Yêu cầu hỗ trợ đã được gửi thành công!');
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Mở yêu cầu hỗ trợ</h1>
      <p className={styles.subtitle}>
        Vui lòng cung cấp thông tin bạn cần hỗ trợ phía dưới. Càng nhiều thông tin cung cấp sẽ giúp chúng tôi hỗ trợ bạn nhanh chóng và tốt hơn.
      </p>

      <form className={styles.formContainer} onSubmit={handleSubmit}>
        
        {/* Phòng ban */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Phòng ban</label>
          <select 
            name="department" 
            className={styles.select}
            value={formData.department}
            onChange={handleChange}
          >
            <option value="technical">Technical - Kỹ thuật</option>
            <option value="billing">Billing - Thanh toán</option>
            <option value="sales">Sales - Kinh doanh</option>
          </select>
          <p className={styles.helperText}>Technical support department. support@123host.vn</p>
        </div>

        {/* Tiêu đề */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Tiêu đề</label>
          <input 
            type="text" 
            name="subject" 
            className={styles.input} 
            placeholder="Tiêu đề"
            value={formData.subject}
            onChange={handleChange}
          />
        </div>

        {/* Nội dung */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Nội dung</label>
          <textarea 
            name="message" 
            className={styles.textarea} 
            rows="8"
            value={formData.message}
            onChange={handleChange}
          ></textarea>
        </div>

        {/* Dịch vụ liên quan */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Dịch vụ liên quan:</label>
          <select 
            name="relatedService" 
            className={styles.select}
            value={formData.relatedService}
            onChange={handleChange}
          >
            <option value="none">Không có</option>
            <option value="sv1">VPS Pro - 192.168.1.1</option>
            <option value="sv2">Hosting Linux - domain.com</option>
          </select>
        </div>

        {/* CC Email */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Thêm người nhận (CC)</label>
          <input 
            type="text" 
            name="cc" 
            className={styles.input} 
            placeholder="Nhập danh sách email, cách nhau bằng dấu phẩy"
            value={formData.cc}
            onChange={handleChange}
          />
        </div>

        {/* File đính kèm */}
        <div className={styles.formGroup}>
          <div className={styles.fileInputWrapper}>
            <span className={styles.paperclipIcon}>📎</span>
            <input 
                type="file" 
                className={styles.fileInputHidden} 
                id="fileUpload"
                multiple
            />
            <label htmlFor="fileUpload" className={styles.fileLabelText}>
              (Cho phép các định dạng file: .jpg, .gif, .zip, .png, .pdf, .jpeg, .xls, .xlsx, .doc, .docx, .log, .xml, .txt, .rar, .sql, .ppk, .pptx, .ppt, .csr, .key, .crt)
            </label>
          </div>
        </div>

        {/* Checkbox nhạy cảm */}
        <div className={`${styles.formGroup} ${styles.checkboxGroup}`}>
          <input 
            type="checkbox" 
            name="isSensitive" 
            id="isSensitive"
            checked={formData.isSensitive}
            onChange={handleChange}
          />
          <label htmlFor="isSensitive" className={styles.checkboxLabel}>
            Tin nhắn này chứa dữ liệu nhạy cảm, hãy mã hóa nội dung của nó
          </label>
        </div>

        {/* Nút gửi */}
        <div className={styles.submitContainer}>
          <button type="submit" className={styles.submitBtn}>
            <span className={styles.checkIcon}>✓</span> Gửi đi
          </button>
        </div>

      </form>
    </div>
  );
}