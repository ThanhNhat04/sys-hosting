'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ticketService } from '@/services'; // Điều chỉnh đường dẫn import cho đúng
import styles from './ticket.module.css';

export default function TicketPage() {
  const router = useRouter();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // --- GỌI API QUA SERVICE ---
  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true);
      try {
        // Sử dụng service thay vì fetch thủ công
        const response = await ticketService.listTickets();
        // axiosClient thường trả về dữ liệu nằm trong trường .data
        setTickets(response.data || response); 
      } catch (error) {
        console.error("Lỗi khi lấy danh sách ticket:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  // --- LOGIC LỌC DỮ LIỆU ---
  const filteredData = tickets.filter((item) => {
    if (filterType === 'open') return item.status === 'open';
    if (filterType === 'closed') return item.status === 'closed';
    return true; 
  });

  // --- PHÂN TRANG ---
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleFilterChange = (type) => {
    setFilterType(type);
    setCurrentPage(1);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "---";
    return new Date(dateString).toLocaleString('vi-VN', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  if (loading) return <div className={styles.loadingContainer}>Đang tải dữ liệu...</div>;

  return (
    <main className={styles.container}>
      <div className={styles.headerRow}>
        <h1 className={styles.title}>Danh sách yêu cầu hỗ trợ</h1>
        <button className={styles.createBtn} onClick={() => router.push('/ticket/listTicket/create')}>
          + Mở yêu cầu mới
        </button>
      </div>

      <div className={styles.actionsContainer}>
        <div className={styles.filterGroup}>
          <button 
            className={`${styles.filterBtn} ${filterType === 'all' ? styles.active : ''}`}
            onClick={() => handleFilterChange('all')}
          >
            Tất cả ({tickets.length})
          </button>
          <button 
            className={`${styles.filterBtn} ${filterType === 'open' ? styles.active : ''}`}
            onClick={() => handleFilterChange('open')}
          >
            Đang mở
          </button>
          <button 
            className={`${styles.filterBtn} ${filterType === 'closed' ? styles.active : ''}`}
            onClick={() => handleFilterChange('closed')}
          >
            Đã đóng
          </button>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.textCenter} width="10%">ID</th>
              <th width="40%">Tiêu đề</th>
              <th className={styles.textCenter} width="15%">Ưu tiên</th>
              <th className={styles.textCenter} width="15%">Trạng thái</th>
              <th className={styles.textRight} width="20%">Ngày tạo</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((row) => (
                <tr 
                  key={row.id} 
                  className={styles.clickableRow}
                  onClick={() => router.push(`/ticket/list-ticket/${row.id}`)}
                >
                  <td className={styles.textCenter}>
                    <span className={styles.idBadge}>#{row.id}</span>
                  </td>
                  <td>
                    <div className={styles.subjectText}>{row.subject}</div>
                  </td>
                  <td className={styles.textCenter}>
                    <span className={`${styles.priorityBadge} ${styles[getPriorityClass(row.priority)]}`}>
                      {row.priority === 'high' ? 'Cao' : row.priority === 'medium' ? 'Trung bình' : 'Thấp'}
                    </span>
                  </td>
                  <td className={styles.textCenter}>
                    <span className={`${styles.statusBadge} ${row.status === "closed" ? styles.statusClosed : styles.statusOpen}`}>
                      {row.status === "open" ? "Đang mở" : "Đã đóng"}
                    </span>
                  </td>
                  <td className={styles.textRight}>
                    <span className={styles.dateText}>{formatDate(row.created_at)}</span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className={styles.emptyState}>Không có dữ liệu hiển thị</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className={styles.paginationContainer}>
          <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className={styles.pageArrow}>&lt;</button>
          <div className={styles.pageNumbers}>
            {[...Array(totalPages)].map((_, i) => (
              <button 
                key={i + 1} 
                onClick={() => paginate(i + 1)}
                className={`${styles.pageBtn} ${currentPage === i + 1 ? styles.activePage : ''}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} className={styles.pageArrow}>&gt;</button>
        </div>
      )}
    </main>
  );
}

const getPriorityClass = (priority) => {
  if (priority === 'high') return 'pHigh';
  if (priority === 'medium') return 'pMedium';
  return 'pLow';
};