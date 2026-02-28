"use client";

import React from "react";
import styles from "./Invoice.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image"; // 1. Import Image của Next.js

const invoiceData = {
  header: {
    id: "#00021",
    status: "Chưa thanh toán",
    createdDate: "04/01/2026",
    dueDate: "10/05/2025",
  },
  buyer: {
    companyName: "CÔNG TY TNHH GIÁO DỤC AI ROBOTIC",
    name: "Nguyễn Minh Sơn",
    address1: "1256/7 Phạm Văn Thuận, KP1, Phường Tam Hiệp,",
    address2: "Tỉnh Đồng Nai, Việt Nam,",
    address3: "Tam Hiệp, Đồng Nai, 700000",
    country: "Viet Nam",
    taxId: "3603893101",
    type: "Công ty",
  },
  // MẢNG DỊCH VỤ (Thêm bớt dòng ở đây)
  items: [
    {
      id: 1,
      description: "Website Static Dev (1 Tháng)",
      subDescription: "AccelerateWP Premium: Off ", // Để trống nếu không có
      price: "100,000 ₫",
    },
  ],
  totals: {
    subTotal: "100,000 ₫",
    vat: "110,000 ₫",
    credit: "0 ₫",
    grandTotal: "110,000 ₫",
  },
  payment: {
    qrImageSrc: "/assets/qr2qr.png",
    qrInstruction: "Quét mã để thanh toán",
  },
};

const InvoicePage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {/* --- Cột bên trái: Chi tiết hóa đơn --- */}
        <div className={styles.mainContent}>
          {/* Header */}
          <div className={styles.header}>
            <div className={styles.titleSection}>
              <h1>
                Hóa đơn {invoiceData.header.id}
                <span className={styles.badge}>
                  {invoiceData.header.status}
                </span>
              </h1>
            </div>
            <div className={styles.dates}>
              <div>
                Ngày tạo hóa đơn <span>{invoiceData.header.createdDate}</span>
              </div>
              <div>
                {/* Ngày đến hạn <span>{invoiceData.header.dueDate}</span */}
              </div>
            </div>
          </div>

          {/* Địa chỉ (Có thể cấu hình thêm object cho Người bán nếu cần) */}
          <div className={styles.addressGrid}>
            {/* Người bán (Giữ cố định hoặc tạo object tương tự) */}
            <div>
              <span className={styles.sectionTitle}>Thanh toán cho:</span>
              <div className={styles.infoLine}>--</div>
              <div className={styles.infoLine}>
                Công ty cổ phần Tetras company thuộc CÔNG TY TNHH GIÁO DỤC AI
                ROBOTIC{" "}
              </div>
              <div className={styles.infoLine}>
                Số 10 Huỳnh Văn Nghệ, phường Trấn Biên, tỉnh Đồng Nai
              </div>
              <br />
              <div className={styles.infoLine}>
                - Hotline kỹ thuật: 0946 734 111
              </div>
              {/* <div className={styles.infoLine}>- Hotline thanh toán/kế toán: 028 888 14768</div> */}
              <div className={styles.infoLine}>
                - Email: son.nm@share4happy.com
              </div>
              <br />
              <div className={styles.infoLine}>
                Khiếu nại/Góp ý: 0946 734 111
              </div>
              <div className={styles.infoLine}>Mã Số Thuế: 3603893101</div>
            </div>

            {/* Người mua (Dữ liệu động) */}
            <div>
              <span className={styles.sectionTitle}>Hóa đơn gửi đến:</span>
              {/* <span className={styles.companyName}>{invoiceData.buyer.companyName}</span> */}
              <div className={styles.infoLine}>{invoiceData.buyer.name}</div>
              <div className={styles.infoLine}>
                {invoiceData.buyer.address1}
              </div>
              <div className={styles.infoLine}>
                {invoiceData.buyer.address2}
              </div>
              <div className={styles.infoLine}>
                {invoiceData.buyer.address3}
              </div>
              {/* <div className={styles.infoLine}>{invoiceData.buyer.country}</div>
              <div className={styles.infoLine}>Mã Số Thuế: {invoiceData.buyer.taxId}</div>
              <br/>
              <div className={styles.infoLine}>Loại chủ thể: {invoiceData.buyer.type}</div> */}
            </div>
          </div>

          {/* Bảng dịch vụ (Render động từ mảng items) */}
          <div>
            <span className={styles.sectionTitle}>Các mục trong hóa đơn</span>
            <table className={styles.itemsTable}>
              <thead>
                <tr>
                  <th>Mô tả</th>
                  <th className={styles.amountCol}>Số tiền</th>
                </tr>
              </thead>
              <tbody>
                {invoiceData.items.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <span className={styles.itemDesc}>
                        {item.description}
                      </span>
                      {item.subDescription && (
                        <span className={styles.itemSub}>
                          {item.subDescription}
                        </span>
                      )}
                    </td>
                    <td className={styles.amountCol}>{item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Tổng tiền */}
          <div className={styles.totals}>
            <div className={styles.totalRow}>
              <span className={styles.totalLabel}>Tổng phụ</span>
              <span className={styles.totalValue}>
                {invoiceData.totals.subTotal}
              </span>
            </div>
            <div className={styles.totalRow}>
              <span className={styles.totalLabel}>10.00% VAT</span>
              <span className={styles.totalValue}>
                {invoiceData.totals.vat}
              </span>
            </div>
            <div className={styles.totalRow}>
              <span className={styles.totalLabel}>Tín dụng</span>
              <span className={styles.totalValue}>
                {invoiceData.totals.credit}
              </span>
            </div>
            <div className={`${styles.totalRow} ${styles.final}`}>
              <span className={styles.totalLabel}>Tổng cộng</span>
              <span className={styles.totalValue}>
                {invoiceData.totals.grandTotal}
              </span>
            </div>
          </div>

          <div className={styles.note}>* Chỉ định một mục bị đánh thuế.</div>
        </div>

        {/* --- Cột bên phải: QR Code & Thao tác --- */}
        <div className={styles.sidebar}>
          <div className={styles.paymentCard}>
            <div className={styles.paymentLabel}>Tổng số phải trả</div>
            <div className={styles.totalAmountLarge}>
              {invoiceData.totals.grandTotal}
            </div>

            {/* Khu vực hiển thị QR Code */}
            <div className={styles.qrContainer}>
              <div className={styles.qrInstruction}>
                {invoiceData.payment.qrInstruction}
              </div>
              {/* LƯU Ý: Thay src bằng đường dẫn ảnh thật hoặc base64 của bạn.
                   Nếu dùng Next.js Image component thì thay thẻ img bên dưới.
                */}
              <Image
                src={invoiceData.payment.qrImageSrc}
                alt="Mã QR Thanh Toán"
                width={200} // Kích thước gốc hoặc mong muốn để tránh layout shift
                height={200} // Kích thước gốc
                className={styles.qrImage}
                priority // Tải ưu tiên vì đây là phần quan trọng
              />
            </div>
          </div>

          <div className={styles.actionsSection}>
            <h3>Thao tác</h3>
            <div className={styles.actionLink}>
              <FontAwesomeIcon
                icon={faDownload}
                className={styles.actionIcon}
              />
              Tải xuống
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicePage;
