'use client';

import React, { useState } from 'react';
import styles from './Referral.module.css';

const ReferralPage = () => {
  const [copied, setCopied] = useState(false);
  const referralLink = "https://shopcuaban.vn/?ref=NGUYENVANA";

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset trạng thái sau 2s
    });
  };

  return (
    <div className={styles.container}>
      
      {/* --- Header Section --- */}
      <h2 className={styles.headerTitle}>Nhận Voucher giảm giá lên đến 500K khi mời bạn bè</h2>

      <div className={styles.infoBox}>
        Mời bạn bè của bạn mua sắm tại cửa hàng của chúng tôi. Với mỗi đơn hàng thành công từ người được giới thiệu, 
        chúng tôi sẽ tặng bạn <strong>Voucher 50.000đ</strong> cho lần mua sắm tiếp theo.
      </div>

      <div className={styles.referralBox}>
        <span className={styles.referralLabel}>Link giới thiệu</span>
        <div className={styles.inputGroup}>
          <input 
            type="text" 
            className={styles.referralInput} 
            value={referralLink} 
            readOnly 
          />
          <button 
            className={styles.copyBtn} 
            onClick={handleCopy} 
            title="Sao chép"
          >
            {/* Icon Copy (SVG) */}
            {copied ? (
              <span style={{ color: 'green', fontSize: '0.8rem', fontWeight: 'bold' }}>Đã copy</span>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
            )}
          </button>
        </div>
      </div>

      <div className={styles.statsBox}>
        Bạn đã nhận được tổng cộng
        <span className={styles.statsNumber}>0 đ</span>
        Giá trị quy đổi Voucher
      </div>

      {/* --- Table Section --- */}
      <div className={styles.tableSection}>
        <h3 className={styles.subTitle}>Danh sách giới thiệu của bạn</h3>
        <table className={styles.referralTable}>
          <thead>
            <tr>
              <th>Người được giới thiệu</th>
              <th>Ngày tham gia</th>
              <th>Trạng thái</th>
              <th>Phần thưởng</th>
            </tr>
          </thead>
          <tbody>
            {/* Ví dụ dòng dữ liệu trống */}
          </tbody>
        </table>
        <div className={styles.emptyState}>
          Chưa có giới thiệu nào. Hãy tiếp tục giới thiệu nhé!
        </div>
      </div>

      {/* --- Cards Grid Section --- */}
      <h3 className={styles.subTitle}>Các cách giới thiệu hiệu quả</h3>
      <div className={styles.cardsGrid}>
        <CardItem 
          title="Chia sẻ lên Facebook Cá nhân" 
          desc="Đăng bài review sản phẩm bạn đã mua kèm link giới thiệu. Đây là cách đơn giản nhất để bạn bè tin tưởng." 
        />
        <CardItem 
          title="Gửi tin nhắn Messenger" 
          desc="Gửi tặng mã giảm giá cho bạn bè thân thiết qua tin nhắn riêng. Tỷ lệ thành công rất cao." 
        />
        <CardItem 
          title="Chia sẻ vào Hội nhóm săn Deal" 
          desc="Nếu bạn biết các nhóm săn mã giảm giá, hãy chia sẻ link của bạn. Nhiều người lạ sẽ quan tâm." 
        />
        <CardItem 
          title="Review trên Blog/Tiktok" 
          desc="Quay video unbox hoặc viết blog hướng dẫn cách nhận mã giảm giá và chèn link giới thiệu." 
        />
      </div>

      {/* --- FAQ Section --- */}
      <h3 className={styles.subTitle}>Câu hỏi thường gặp</h3>
      <div className={styles.faqSection}>
        <FaqItem 
          question="Thế nào được gọi là một giới thiệu thành công?"
          answer="Giới thiệu thành công là khi người bạn giới thiệu nhấn vào link của bạn, đăng ký tài khoản và hoàn thành đơn hàng đầu tiên."
        />
        <FaqItem 
          question="Bao lâu tôi nhận được Voucher?"
          answer="Hệ thống sẽ gửi mã Voucher vào ví của bạn trong vòng 24h sau khi đơn hàng của người được giới thiệu hoàn tất."
        />
        <FaqItem 
          question="Voucher có hạn sử dụng bao lâu?"
          answer="Voucher thưởng giới thiệu thường có hạn sử dụng 30 ngày kể từ ngày cấp."
        />
         <FaqItem 
          question="Tôi có thể giới thiệu tối đa bao nhiêu người?"
          answer="Không giới hạn số lượng. Càng mời nhiều, bạn càng nhận được nhiều ưu đãi."
        />
      </div>

    </div>
  );
};

// Component con để code gọn hơn
const CardItem = ({ title, desc }) => (
  <div className={styles.card}>
    <h4>{title}</h4>
    <p>{desc}</p>
    <a href="#" className={styles.btnView}>Xem thêm</a>
  </div>
);

const FaqItem = ({ question, answer }) => (
  <details>
    <summary>{question}</summary>
    <div className={styles.faqContent}>
      {answer}
    </div>
  </details>
);

export default ReferralPage;