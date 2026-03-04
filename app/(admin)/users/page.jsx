'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUserPlus, faUserEdit, faBan, faUnlockAlt, faUserShield, faCircleNotch, faExclamationCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { fastpanelService } from '@/services'; 

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Gọi API lấy danh sách người dùng thực tế
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fastpanelService.getUsers();
      setUsers(response.data || []);
    } catch (err) {
      setError('Không thể kết nối đến Fastpanel API');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{ background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
      {/* Header & Search */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div style={{ position: 'relative' }}>
          <FontAwesomeIcon icon={faSearch} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
          <input 
            type="text" 
            placeholder="Tìm kiếm người dùng..." 
            style={{ padding: '10px 15px 10px 40px', border: '1px solid var(--border-color)', borderRadius: '8px', width: '350px', outline: 'none' }} 
          />
        </div>
        <button style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '10px 20px', borderRadius: '8px', fontWeight: '600', border: 'none' }}>
          <FontAwesomeIcon icon={faUserPlus} style={{marginRight: '8px'}} /> Tạo người dùng mới
        </button>
      </div>

      {/* Thông báo lỗi nếu có */}
      {error && (
        <div style={{ padding: '12px', background: '#fee2e2', color: '#dc2626', borderRadius: '8px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FontAwesomeIcon icon={faExclamationCircle} /> {error}
        </div>
      )}

      {/* Bảng dữ liệu */}
      <div style={{ position: 'relative', minHeight: '200px' }}>
        {loading && (
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 10 }}>
            <FontAwesomeIcon icon={faCircleNotch} spin size="2x" style={{ color: 'var(--primary)' }} />
          </div>
        )}

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '2px solid var(--bg-body)', color: 'var(--text-secondary)', fontSize: '13px' }}>
              <th style={{ padding: '12px' }}>Người dùng</th>
              <th>Hạn mức</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <UserRow key={user.id} user={user} refresh={fetchUsers} />
              ))
            ) : (
              !loading && (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-light)' }}>Không tìm thấy người dùng nào.</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function UserRow({ user, refresh }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const isEnabled = user.status === 'Active';

  const toggleStatus = async () => {
    setIsProcessing(true);
    try {
      if (isEnabled) {
        await fastpanelService.disableUser(user.id);
      } else {
        await fastpanelService.enableUser(user.id);
      }
      // Sau khi API thành công, gọi lại danh sách để đồng bộ UI
      await refresh();
    } catch (err) {
      // Vì không dùng toast, bạn có thể thông báo lỗi qua state cha hoặc alert đơn giản
      alert("Thao tác thất bại: " + (err.message || "Lỗi hệ thống"));
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <tr style={{ borderBottom: '1px solid var(--border-color)', opacity: isProcessing ? 0.5 : 1 }}>
      <td style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <FontAwesomeIcon icon={faUserShield} style={{ color: 'var(--text-light)' }} />
        <span style={{ fontWeight: '600' }}>{user.username}</span>
      </td>
      <td style={{ padding: '16px' }}>{user.quota || 'N/A'}</td>
      <td style={{ padding: '16px' }}>
        <span style={{ 
          padding: '4px 12px', borderRadius: '20px', fontSize: '12px',
          background: isEnabled ? '#dcfce7' : '#fee2e2',
          color: isEnabled ? '#166534' : '#991b1b'
        }}>
          {user.status}
        </span>
      </td>
      <td style={{ padding: '16px' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Link href={`/admin/users/${user.username}`}>
            <button style={actionBtnStyle} title="Chỉnh sửa chi tiết">
              <FontAwesomeIcon icon={faUserEdit} />
            </button>
          </Link>
          <button 
            onClick={toggleStatus}
            disabled={isProcessing}
            style={{ ...actionBtnStyle, color: isEnabled ? '#ef4444' : '#10b981' }}
            title={isEnabled ? "Vô hiệu hóa" : "Kích hoạt"}
          >
            {isProcessing ? (
              <FontAwesomeIcon icon={faCircleNotch} spin />
            ) : (
              <FontAwesomeIcon icon={isEnabled ? faBan : faUnlockAlt} />
            )}
          </button>
        </div>
      </td>
    </tr>
  );
}

const actionBtnStyle = { 
  width: '32px', 
  height: '32px', 
  borderRadius: '6px', 
  border: '1px solid var(--border-color)', 
  background: 'white', 
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
};