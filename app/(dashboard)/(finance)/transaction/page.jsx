'use client'

import React, { useState, useEffect } from 'react';
import styles from './transaction.module.css';

// --- MOCK DATA GENERATOR (Tạo dữ liệu giả để test phân trang) ---
// Dữ liệu gốc của bạn
const initialData = [
  { id: 1, serviceName: "arowell.online", transactionType: "Mua Whois Protection", status: "Đã xử lý", date: "2025-11-14 18:03:00", amountDisplay: "- 0", balance: 0 },
  { id: 2, serviceName: "arowell.online", transactionType: "Mua domain", status: "Đã xử lý", date: "2025-11-14 18:03:00", amountDisplay: "- 30.240", balance: 0 },
  { id: 3, serviceName: "thanhnhat.id.vn", transactionType: "", status: "Chưa xử lý", date: "2023-10-29 15:31:00", amountDisplay: "- 0", balance: 0 },
  { id: 4, serviceName: "tenten order", transactionType: "Nạp tiền", status: "Đã xử lý", date: "2023-10-29 15:31:00", amountDisplay: "+ 0", balance: 0, isDeposit: true },
];

// Hàm nhân bản dữ liệu để danh sách dài hơn 10 (Chỉ dùng để test, thực tế bạn dùng API)
const generateMoreData = () => {
  let data = [...initialData];
  for (let i = 5; i <= 25; i++) {
    data.push({
      id: i,
      serviceName: `service-test-${i}.com`,
      transactionType: i % 2 === 0 ? "Gia hạn dịch vụ" : "Đăng ký mới",
      status: i % 3 === 0 ? "Chưa xử lý" : "Đã xử lý",
      date: "2025-01-01 10:00:00",
      amountDisplay: "- 100.000",
      balance: 0,
    });
  }
  return data;
};

const transactionData = generateMoreData(); 
// ------------------------------------------------------------------

export default function TransactionHistoryPage() {
  const [filterType, setFilterType] = useState('all');
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const itemsPerPage = 10; // Giới hạn 10 giao dịch/trang

  // 1. Lọc dữ liệu trước
  const filteredData = transactionData.filter((item) => {
    if (filterType === 'paid') return item.status === 'Đã xử lý';
    if (filterType === 'unpaid') return item.status === 'Chưa xử lý';
    return true; 
  });

  // 2. Tính toán phân trang dựa trên dữ liệu đã lọc
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // 3. Hàm chuyển trang
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // 4. Reset về trang 1 khi thay đổi bộ lọc
  const handleFilterChange = (type) => {
    setFilterType(type);
    setCurrentPage(1);
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Hóa đơn giao dịch</h1>

      {/* Filter Buttons */}
      <div className={styles.actionsContainer}>
        <div className={styles.filterGroup}>
          <button 
            className={`${styles.filterBtn} ${filterType === 'all' ? styles.active : ''}`}
            onClick={() => handleFilterChange('all')}
          >
            Tất cả
          </button>
          <button 
            className={`${styles.filterBtn} ${filterType === 'paid' ? styles.active : ''}`}
            onClick={() => handleFilterChange('paid')}
          >
            Đã thanh toán
          </button>
          <button 
            className={`${styles.filterBtn} ${filterType === 'unpaid' ? styles.active : ''}`}
            onClick={() => handleFilterChange('unpaid')}
          >
            Chưa thanh toán
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.textCenter}>STT</th>
              <th>Tên dịch vụ</th>
              <th>Loại giao dịch</th>
              <th>Trạng thái</th>
              <th>Ngày giao dịch</th>
              <th className={styles.textRight}>Số tiền giao dịch</th>
              <th className={styles.textRight}>Số tiền còn lại</th>
            </tr>
          </thead>

          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((row, index) => (
                <tr key={row.id}>
                  {/* Tính STT: (Trang hiện tại - 1) * 10 + index + 1 */}
                  <td className={styles.textCenter}>
                    {indexOfFirstItem + index + 1}
                  </td>
                  <td>{row.serviceName}</td>
                  <td>{row.transactionType}</td>
                  <td>
                    <span className={row.status === "Chưa xử lý" ? styles.statusPending : styles.statusSuccess}>
                        {row.status}
                    </span>
                  </td>
                  <td>{row.date}</td>
                  <td className={`${styles.textRight} ${row.isDeposit ? styles.depositAmount : ''}`}>
                    {row.amountDisplay}
                  </td>
                  <td className={styles.textRight}>{row.balance}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className={styles.textCenter} style={{padding: '40px', color: 'var(--text-light)'}}>
                   Không có dữ liệu
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls - Chỉ hiện khi có nhiều hơn 1 trang */}
      {totalPages > 1 && (
        <div className={styles.paginationContainer}>
          <button 
            className={styles.pageArrow}
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &lt; Trước
          </button>
          
          <div className={styles.pageNumbers}>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => paginate(i + 1)}
                className={`${styles.pageBtn} ${currentPage === i + 1 ? styles.activePage : ''}`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button 
            className={styles.pageArrow}
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Sau &gt;
          </button>
        </div>
      )}
    </main>
  );
}