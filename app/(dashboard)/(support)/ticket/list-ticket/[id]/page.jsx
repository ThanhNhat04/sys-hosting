"use client";

import React, { useState, useEffect, use } from "react";
import styles from "./detail.module.css";
import { ticketService } from "@/services"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBold, faItalic, faLink, faCode, faUser, faFlag, faCalendarAlt, 
  faClock, faExclamationCircle, faCheck, faReply, faTimes, faLock, faLockOpen
} from "@fortawesome/free-solid-svg-icons";

export default function TicketDetailPage({ params }) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  const [ticket, setTicket] = useState(null);
  const [replies, setReplies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [replyText, setReplyText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- 1. LẤY DỮ LIỆU TỪ API ---
  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        const [ticketRes, repliesRes] = await Promise.all([
          ticketService.getTicket(id),
          ticketService.listReplies(id),
        ]);

        setTicket(ticketRes.data || ticketRes);
        setReplies(repliesRes.data || repliesRes);
      } catch (error) {
        console.error("Lỗi khi tải chi tiết ticket:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // --- 2. GỬI PHẢN HỒI MỚI ---
  const handleSendReply = async () => {
    if (!replyText.trim()) return;

    setIsSubmitting(true);
    try {
      // Lưu ý: Nếu ticketService của bạn gọi axiosClient.post(..., { content: data }), 
      // hãy sửa bên ticketService thành { message: data } nếu backend yêu cầu trường "message".
      await ticketService.createReply(id, replyText);

      const [updatedReplies, updatedTicket] = await Promise.all([
        ticketService.listReplies(id),
        ticketService.getTicket(id)
      ]);
      
      setReplies(updatedReplies.data || updatedReplies);
      setTicket(updatedTicket.data || updatedTicket);
      setReplyText(""); 

    } catch (error) {
      console.error("Lỗi khi gửi phản hồi:", error);
      alert("Không thể gửi phản hồi. Vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- 3. CẬP NHẬT TRẠNG THÁI TICKET (PUT API) ---
  const handleToggleStatus = async () => {
    const isClosing = ticket.status === "open";
    const confirmMessage = isClosing 
      ? "Bạn có chắc chắn muốn đóng phiếu hỗ trợ này?" 
      : "Bạn có muốn mở lại phiếu hỗ trợ này?";
      
    if (!window.confirm(confirmMessage)) return;

    try {
      const payload = {
        status: isClosing ? "closed" : "open",
        priority: ticket.priority // Giữ nguyên mức độ ưu tiên
      };
      
      await ticketService.updateTicket(id, payload);
      
      // Cập nhật lại state ticket ngay lập tức để UI render lại
      setTicket({ ...ticket, status: payload.status });
      
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái:", error);
      alert("Cập nhật trạng thái thất bại.");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "---";
    return new Date(dateString).toLocaleString("vi-VN");
  };

  if (loading)
    return <div className={styles.container}>Đang tải dữ liệu...</div>;
  if (!ticket)
    return <div className={styles.container}>Không tìm thấy yêu cầu hỗ trợ.</div>;

  return (
    <main className={styles.container}>
      {/* --- HEADER --- */}
      <div className={styles.header}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <h1 className={styles.pageTitle}>
            Ticket #{ticket.id} - {ticket.subject}
          </h1>
          
          {/* Nút Đóng / Mở Ticket dựa trên PUT API */}
          <button 
            onClick={handleToggleStatus}
            style={{ 
              padding: '8px 16px', borderRadius: '4px', border: 'none', cursor: 'pointer',
              backgroundColor: ticket.status === 'open' ? '#ff4d4f' : '#52c41a', color: '#fff', fontWeight: 'bold'
            }}
          >
            <FontAwesomeIcon icon={ticket.status === 'open' ? faLock : faLockOpen} style={{marginRight: '6px'}} />
            {ticket.status === 'open' ? "Đóng Ticket" : "Mở lại Ticket"}
          </button>
        </div>
        <div className={styles.breadcrumb}>
          Trang chủ / Phiếu Hỗ Trợ / Xem Phiếu Hỗ Trợ
        </div>
      </div>

      {/* --- ALERT BOX --- */}
      {ticket.status === "closed" && (
        <div className={styles.alertBox}>
          <FontAwesomeIcon icon={faFlag} style={{ marginRight: "8px" }} />
          Phiếu hỗ trợ này đã đóng. Bạn có thể gửi phản hồi để hệ thống tự động mở lại, hoặc nhấn nút "Mở lại Ticket" ở trên.
        </div>
      )}

      <div className={styles.layoutGrid}>
        {/* --- LEFT COLUMN --- */}
        <div className={styles.leftColumn}>
          {/* 1. Reply Section */}
          <div className={styles.replyCard}>
            <div className={styles.replyTabs}>
              <button className={`${styles.tabBtn} ${styles.activeTab}`}>
                <FontAwesomeIcon icon={faReply} style={{ marginRight: "6px" }} /> Trả Lời
              </button>
            </div>

            <div className={styles.replyBody}>
              <div className={styles.userInfo}>
                <FontAwesomeIcon icon={faUser} style={{ marginRight: "8px", color: "#888" }} />
                <strong>Người dùng ID: {ticket.user_id}</strong>
              </div>

              <div className={styles.editorToolbar}>
                <span title="Bold"><FontAwesomeIcon icon={faBold} /></span>
                <span title="Italic"><FontAwesomeIcon icon={faItalic} /></span>
                <span title="Link"><FontAwesomeIcon icon={faLink} /></span>
                <span title="Code"><FontAwesomeIcon icon={faCode} /></span>
              </div>

              <textarea
                className={styles.replyInput}
                rows="6"
                placeholder="Nhập nội dung phản hồi tại đây..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                disabled={isSubmitting}
              ></textarea>

              <div className={styles.actionButtons}>
                <button
                  className={styles.btnSubmit}
                  onClick={handleSendReply}
                  disabled={isSubmitting || !replyText.trim()}
                >
                  <FontAwesomeIcon icon={faReply} style={{ marginRight: "5px" }} />
                  {isSubmitting ? "Đang gửi..." : "Gửi Phản Hồi"}
                </button>
                <button className={styles.btnCancel} onClick={() => setReplyText("")}>
                  <FontAwesomeIcon icon={faTimes} style={{ marginRight: "5px" }} /> Hủy
                </button>
              </div>
            </div>
          </div>

          {/* 2. Message History */}
          <div className={styles.messageListHeader}>Lịch sử trao đổi</div>

          <div className={styles.messageList}>
            {/* Tin nhắn gốc */}
            <div className={`${styles.messageItem} ${styles.ownerMsg}`}>
              <div className={styles.msgHeader}>
                <div className={styles.msgAuthorInfo}>
                  <div className={styles.avatarIcon}><FontAwesomeIcon icon={faUser} /></div>
                  <div className={styles.authorMeta}>
                    <span className={styles.authorName}>Yêu cầu ban đầu</span>
                    <span className={styles.msgDate}>{formatDate(ticket.created_at)}</span>
                  </div>
                </div>
              </div>
              <div className={styles.msgContent}>{ticket.description}</div>
            </div>

            {/* CÁC PHẢN HỒI (Cập nhật field is_staff và message) */}
            {replies.map((msg) => (
              <div
                key={msg.id}
                className={`${styles.messageItem} ${msg.is_staff ? styles.staffMsg : styles.ownerMsg}`}
              >
                <div className={styles.msgHeader}>
                  <div className={styles.msgAuthorInfo}>
                    <div className={styles.avatarIcon}><FontAwesomeIcon icon={faUser} /></div>
                    <div className={styles.authorMeta}>
                      <span className={styles.authorName}>
                        {msg.is_staff ? "Hỗ trợ viên" : "Khách hàng"}
                      </span>
                      <span className={styles.msgDate}>
                        {formatDate(msg.created_at)}
                      </span>
                    </div>
                  </div>
                  <span
                    className={msg.is_staff ? styles.roleBadgeStaff : styles.roleBadgeOwner}
                  >
                    {msg.is_staff ? "Người Điều Hành" : "Khách Hàng"}
                  </span>
                </div>
                {/* Lấy nội dung từ msg.message thay vì msg.content */}
                <div className={styles.msgContent}>{msg.message}</div> 
              </div>
            ))}
          </div>
        </div>

        {/* --- RIGHT COLUMN --- */}
        <div className={styles.rightColumn}>
          <div className={styles.infoCard}>
            <h3 className={styles.infoTitle}>Thông tin chi tiết</h3>

            <div className={styles.infoRow}>
              <div className={styles.iconCol}><FontAwesomeIcon icon={faFlag} /></div>
              <div className={styles.dataCol}>
                <span className={styles.label}>Trạng Thái:</span>
                <div className={styles.statusValue}>
                  <FontAwesomeIcon
                    icon={faCheck}
                    style={{
                      fontSize: "10px", marginRight: "5px",
                      color: ticket.status === "open" ? "green" : "gray",
                    }}
                  />
                  {ticket.status === "open" ? "Đang mở" : "Đã đóng"}
                </div>
              </div>
            </div>

            <div className={styles.infoRow}>
              <div className={styles.iconCol}><FontAwesomeIcon icon={faExclamationCircle} /></div>
              <div className={styles.dataCol}>
                <span className={styles.label}>Ưu Tiên:</span>
                <div className={styles.valueText} style={{ textTransform: "capitalize" }}>
                  {ticket.priority}
                </div>
              </div>
            </div>

            <div className={styles.infoRow}>
              <div className={styles.iconCol}><FontAwesomeIcon icon={faCalendarAlt} /></div>
              <div className={styles.dataCol}>
                <span className={styles.label}>Ngày tạo:</span>
                <div className={styles.valueText}>{formatDate(ticket.created_at)}</div>
              </div>
            </div>

            <div className={styles.infoRow}>
              <div className={styles.iconCol}><FontAwesomeIcon icon={faClock} /></div>
              <div className={styles.dataCol}>
                <span className={styles.label}>Cập nhật cuối:</span>
                <div className={styles.valueText}>{formatDate(ticket.updated_at)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}