'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import router để chuyển trang
import styles from './ticket.module.css'; 

// --- MOCK DATA ---
const generateTicketData = () => {
  const data = [];
  const departments = ["Kỹ thuật", "Kinh doanh", "Hỗ trợ chung"];
  const priorities = ["Cao", "Trung bình", "Thấp"];
  
  for (let i = 1; i <= 15; i++) {
    const isClosed = i % 4 === 0; // Giả lập trạng thái đóng
    data.push({
      id: 202300 + i,
      subject: i % 2 === 0 ? `Lỗi kết nối Database server #${i}` : `Hỗ trợ xuất hóa đơn VAT tháng ${i}`,
      department: departments[i % 3],
      priority: priorities[i % 3], 
      status: isClosed ? "Đã Đóng" : (i % 3 === 0 ? "Đang Trả Lời" : "Chờ Xử Lý"),
      lastUpdate: "14/01/2026 09:30",
      createdDate: "10/01/2026",
    });
  }
  return data;
};

const ticketData = generateTicketData();

export default function TicketPage() {
  const router = useRouter(); // Khởi tạo router
  const [filterType, setFilterType] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // --- LOGIC LỌC & PHÂN TRANG ---
  const filteredData = ticketData.filter((item) => {
    if (filterType === 'open') return item.status !== 'Đã Đóng';
    if (filterType === 'closed') return item.status === 'Đã Đóng';
    return true; 
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleFilterChange = (type) => {
    setFilterType(type);
    setCurrentPage(1);
  };

  // --- XỬ LÝ CHUYỂN TRANG ---
  const handleViewTicket = (id) => {
    router.push(`/ticket/list/${id}`);
  };

  const handleCreateTicket = () => {
    router.push('/ticket/list/create'); 
  };

  return (
    <main className={styles.container}>
      {/* Header Area */}
      <div className={styles.headerRow}>
        <h1 className={styles.title}>Danh sách yêu cầu hỗ trợ</h1>
        <button className={styles.createBtn} onClick={handleCreateTicket}>
          + Mở yêu cầu mới
        </button>
      </div>

      {/* Filter Tabs */}
      <div className={styles.actionsContainer}>
        <div className={styles.filterGroup}>
          <button 
            className={`${styles.filterBtn} ${filterType === 'all' ? styles.active : ''}`}
            onClick={() => handleFilterChange('all')}
          >
            Tất cả
          </button>
          <button 
            className={`${styles.filterBtn} ${filterType === 'open' ? styles.active : ''}`}
            onClick={() => handleFilterChange('open')}
          >
            Đang xử lý
          </button>
          <button 
            className={`${styles.filterBtn} ${filterType === 'closed' ? styles.active : ''}`}
            onClick={() => handleFilterChange('closed')}
          >
            Đã đóng
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.textCenter} width="8%">ID</th>
              <th width="35%">Tiêu đề</th>
              <th width="15%">Phòng ban</th>
              <th className={styles.textCenter} width="12%">Độ ưu tiên</th>
              <th className={styles.textCenter} width="15%">Trạng thái</th>
              <th className={styles.textRight} width="15%">Cập nhật cuối</th>
            </tr>
          </thead>

          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((row) => (
                <tr 
                    key={row.id} 
                    className={styles.clickableRow}
                    onClick={() => handleViewTicket(row.id)} // Click vào dòng để xem
                >
                  <td className={styles.textCenter}>
                    <span className={styles.idBadge}>#{row.id}</span>
                  </td>
                  <td>
                    <div className={styles.subjectText}>{row.subject}</div>
                  </td>
                  <td className={styles.deptText}>{row.department}</td>
                  
                  <td className={styles.textCenter}>
                    {/* Badge ưu tiên */}
                    <span className={`${styles.priorityBadge} ${styles[getPriorityClass(row.priority)]}`}>
                      {row.priority}
                    </span>
                  </td>

                  <td className={styles.textCenter}>
                     {/* Badge trạng thái */}
                    <span className={`${styles.statusBadge} ${row.status === "Đã Đóng" ? styles.stClosed : styles.stOpen}`}>
                        {row.status}
                    </span>
                  </td>
                  
                  <td className={styles.textRight}>
                    <span className={styles.dateText}>{row.lastUpdate}</span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className={styles.emptyState}>
                   Không tìm thấy yêu cầu hỗ trợ nào phù hợp.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className={styles.paginationContainer}>
          <button 
            className={styles.pageArrow}
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &lt;
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
            &gt;
          </button>
        </div>
      )}
    </main>
  );
}

// Helper: Chọn class màu cho priority
const getPriorityClass = (priority) => {
    if(priority === 'Cao') return 'pHigh';
    if(priority === 'Trung bình') return 'pMedium';
    return 'pLow';
}