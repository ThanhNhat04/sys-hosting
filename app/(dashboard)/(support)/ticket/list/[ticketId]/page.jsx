'use client'

import React, { useState } from 'react';
import styles from './detail.module.css';

// 1. IMPORT FONTAWESOME
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEye, faBold, faItalic, faHeading, faLink, faListUl, faCode, faQuoteLeft, 
  faQuestionCircle, faExpand, faPaperclip, faUser, faStar, 
  faFlag, faBuilding, faCalendarAlt, faClock, faExclamationCircle, faCheck, faReply, faTimes
} from '@fortawesome/free-solid-svg-icons';

// --- MOCK DATA ---
const ticketDetailData = {
  id: '021223',
  subject: 'Hỗ trợ xuất hóa đơn đỏ cho dịch vụ VPS',
  status: 'Đã Đóng',
  requester: 'Nguyễn Minh Sơn',
  requesterEmail: 'sonm88@gmail.com',
  department: 'Phòng Kinh doanh / Thanh toán',
  createdDate: '04/12/2025 (14:03)',
  lastUpdate: '1 tháng trước',
  priority: 'Trung Bình',
  isClosed: true,
  
  messages: [
    {
      id: 1,
      author: 'Hằng Nguyễn',
      role: 'staff',
      avatar: 'H',
      date: '08/12/2025 (14:51)',
      content: 'Dạ 2 hóa đơn trên anh đã thanh toán tháng 11 nên không xuất lại được anh nhé. Hiện tại bên em đã cập nhật tài khoản công ty cho mình và sẽ xuất hóa đơn cho các hóa đơn phát sinh sau này ạ.\n\nCảm ơn quý khách\nTrân trọng',
      rating: 0 
    },
    {
      id: 2,
      author: 'Nguyễn Minh Sơn',
      role: 'owner',
      avatar: 'N',
      date: '08/12/2025 (14:43)',
      content: 'Dạ bên mình gửi thông tin doanh nghiệp là CÔNG TY TNHH GIÁO DỤC AI ROBOTIC\nMã số thuế 3603893101\nĐịa chỉ Thuế 1256/7 Phạm Văn Thuận, KP1, Phường Tam Hiệp, Tỉnh Đồng Nai, Việt Nam\n\nMình muốn xuất hóa đơn cho 2 mã đơn hàng là #378146 #378137'
    },
    {
      id: 3,
      author: 'Hằng Nguyễn',
      role: 'staff',
      avatar: 'H',
      date: '05/12/2025 (10:05)',
      content: 'Dạ được ạ, anh có thể cập nhật thêm thông tin công ty để các hóa đơn sau bên em sẽ chủ động xuất hóa đơn cho mình ạ.\n\nCảm ơn quý khách\nTrân trọng'
    },
    {
      id: 4,
      author: 'Nguyễn Minh Sơn',
      role: 'owner',
      avatar: 'N',
      date: '05/12/2025 (10:00)',
      content: 'Giờ mình bổ xung thông tin xuất hóa đơn danh nghiệp được không ạ'
    }
  ]
};

export default function TicketDetailPage({ params }) {
  const ticket = ticketDetailData; 
  const [replyText, setReplyText] = useState('');

  return (
    <main className={styles.container}>
      {/* --- HEADER --- */}
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>
          Ticket #{ticket.id} - {ticket.subject}
        </h1>
        <div className={styles.breadcrumb}>
           Trang chủ Cổng thông tin / Khu vực khách hàng / Phiếu Hỗ Trợ / Xem Phiếu Hỗ Trợ
        </div>
      </div>

      {/* --- ALERT BOX --- */}
      {ticket.isClosed && (
        <div className={styles.alertBox}>
          <FontAwesomeIcon icon={faFlag} style={{marginRight: '8px'}} />
          Phiếu hỗ trợ này đã đóng. Bạn có thể trả lời phiếu hỗ trợ này để mở lại.
        </div>
      )}

      <div className={styles.layoutGrid}>
        
        {/* --- LEFT COLUMN --- */}
        <div className={styles.leftColumn}>
          
          {/* 1. Reply Section */}
          <div className={styles.replyCard}>
            <div className={styles.replyTabs}>
              <button className={`${styles.tabBtn} ${styles.activeTab}`}>
                <FontAwesomeIcon icon={faReply} style={{marginRight: '6px'}} /> Trả Lời
              </button>
            </div>

            <div className={styles.replyBody}>
              <div className={styles.userInfo}>
                <FontAwesomeIcon icon={faUser} style={{marginRight: '8px', color: '#888'}} />
                <strong>{ticket.requester}</strong>
                <span className={styles.userEmail}> &lt;{ticket.requesterEmail}&gt;</span>
              </div>

              {/* EDITOR TOOLBAR ICONS */}
              <div className={styles.editorToolbar}>
                 <span title="Preview"><FontAwesomeIcon icon={faEye} /> Preview</span> 
                 <span className={styles.divider}>|</span>
                 <span title="Bold"><FontAwesomeIcon icon={faBold} /></span> 
                 <span title="Italic"><FontAwesomeIcon icon={faItalic} /></span> 
                 <span title="Heading"><FontAwesomeIcon icon={faHeading} /></span> 
                 <span title="Link"><FontAwesomeIcon icon={faLink} /></span> 
                 <span title="List"><FontAwesomeIcon icon={faListUl} /></span> 
                 <span title="Code"><FontAwesomeIcon icon={faCode} /></span> 
                 <span title="Quote"><FontAwesomeIcon icon={faQuoteLeft} /></span>
                 <span className={styles.spacer}></span>
                 <span title="Help"><FontAwesomeIcon icon={faQuestionCircle} /></span>
                 <span title="Fullscreen" className={styles.fullScreenIcon}><FontAwesomeIcon icon={faExpand} /></span>
              </div>

              <textarea
                className={styles.replyInput}
                rows="6"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
              ></textarea>
              
              <div className={styles.footerStatus}>
                lines: 0  words: 0  đã lưu
              </div>

              <div className={styles.attachmentArea}>
                <FontAwesomeIcon icon={faPaperclip} style={{marginRight: '8px'}} /> 
                Thêm Tệp Đính Kèm...
              </div>

              <div className={styles.actionButtons}>
                <button className={styles.btnSubmit}>
                    <FontAwesomeIcon icon={faReply} style={{marginRight: '5px'}} /> Gửi Tin Nhắn
                </button>
                <button className={styles.btnCancel}>
                    <FontAwesomeIcon icon={faTimes} style={{marginRight: '5px'}} /> Hủy
                </button>
              </div>
            </div>
          </div>

          {/* 2. Message History */}
          <div className={styles.messageListHeader}>Tin Nhắn Yêu Cầu</div>
          
          <div className={styles.messageList}>
            {ticket.messages.map((msg) => (
              <div key={msg.id} className={`${styles.messageItem} ${msg.role === 'staff' ? styles.staffMsg : styles.ownerMsg}`}>
                
                <div className={styles.msgHeader}>
                  <div className={styles.msgAuthorInfo}>
                    <div className={styles.avatarIcon}>
                        <FontAwesomeIcon icon={faUser} />
                    </div>
                    <div className={styles.authorMeta}>
                        <span className={styles.authorName}>{msg.author}</span>
                        <span className={styles.msgDate}>{msg.date}</span>
                    </div>
                  </div>
                  
                  {msg.role === 'staff' ? (
                      <span className={styles.roleBadgeStaff}>Người Điều Hành</span>
                  ) : (
                      <span className={styles.roleBadgeOwner}>Chủ Sở Hữu</span>
                  )}
                </div>

                {/* Rating stars */}
                {msg.role === 'staff' && (
                    <div className={styles.ratingStars}>
                        {[1,2,3,4,5].map((s) => (
                            <FontAwesomeIcon key={s} icon={faStar} style={{marginRight:'2px', fontSize: '12px'}} />
                        ))}
                    </div>
                )}

                <div className={styles.msgContent}>
                    {msg.content.split('\n').map((line, idx) => (
                        <p key={idx} style={{ minHeight: line ? 'auto' : '10px', margin: 0 }}>
                            {line}
                        </p>
                    ))}
                </div>

              </div>
            ))}
          </div>

        </div>

        {/* --- RIGHT COLUMN: INFO SIDEBAR --- */}
        <div className={styles.rightColumn}>
          <div className={styles.infoCard}>
            <h3 className={styles.infoTitle}>Thông tin Phiếu hỗ trợ</h3>
            
            {/* Trạng thái */}
            <div className={styles.infoRow}>
                <div className={styles.iconCol}><FontAwesomeIcon icon={faFlag} /></div>
                <div className={styles.dataCol}>
                    <span className={styles.label}>Trạng Thái:</span>
                    <div className={styles.statusValue}>
                        <FontAwesomeIcon icon={faCheck} style={{fontSize: '10px', marginRight: '5px', color: 'green'}} /> 
                        {ticket.status}
                    </div>
                </div>
            </div>
            
            {/* Người yêu cầu */}
            <div className={styles.infoRow}>
                <div className={styles.iconCol}><FontAwesomeIcon icon={faUser} /></div>
                <div className={styles.dataCol}>
                    <span className={styles.label}>Người yêu cầu</span>
                    <div className={styles.valueBold}>{ticket.requester} <span className={styles.miniBadge}>Chủ Sở Hữu</span></div>
                </div>
            </div>

            {/* Bộ phận */}
            <div className={styles.infoRow}>
                <div className={styles.iconCol}><FontAwesomeIcon icon={faBuilding} /></div>
                <div className={styles.dataCol}>
                    <span className={styles.label}>Bộ Phận</span>
                    <div className={styles.valueText}>{ticket.department}</div>
                </div>
            </div>

            {/* Ngày gửi */}
            <div className={styles.infoRow}>
                <div className={styles.iconCol}><FontAwesomeIcon icon={faCalendarAlt} /></div>
                <div className={styles.dataCol}>
                    <span className={styles.label}>Đã Gửi</span>
                    <div className={styles.valueText}>{ticket.createdDate}</div>
                </div>
            </div>

            {/* Cập nhật lần cuối */}
             <div className={styles.infoRow}>
                <div className={styles.iconCol}><FontAwesomeIcon icon={faClock} /></div>
                <div className={styles.dataCol}>
                    <span className={styles.label}>Cập Nhật Lần Cuối</span>
                    <div className={styles.valueText}>{ticket.lastUpdate}</div>
                </div>
            </div>

            {/* Độ ưu tiên */}
             <div className={styles.infoRow}>
                <div className={styles.iconCol}><FontAwesomeIcon icon={faExclamationCircle} /></div>
                <div className={styles.dataCol}>
                    <span className={styles.label}>Ưu Tiên</span>
                    <div className={styles.valueText}>{ticket.priority}</div>
                </div>
            </div>

          </div>
        </div>

      </div>
    </main>
  );
}