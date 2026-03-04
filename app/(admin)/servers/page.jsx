'use client';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSyncAlt, 
  faServer, 
  faMicrochip, 
  faMemory, 
  faHardDrive, 
  faCircle,
  faNetworkWired,
  faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';
import { fastpanelService } from '@/services'; // Sử dụng index.js đã cấu hình

export default function AdminServers() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  // const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleTimeString());
  const [servers, setServers] = useState([]);
  const [error, setError] = useState(null);

  // Hàm lấy dữ liệu thực từ Server Service (Fastpanel)
  const fetchServers = async () => {
    setError(null);
    try {
      const response = await fastpanelService.getServers();
      console.log("Dữ liệu máy chủ nhận được:", response.data); // Debug log

      setServers(response.data || []);
    } catch (err) {
      setError("Không thể kết nối tới hệ thống quản lý máy chủ.");
      // console.error(err);
    }
  };

  // Tự động load khi vào trang
  useEffect(() => {
    fetchServers();
  }, []);

  const handleReload = async () => {
    setIsRefreshing(true);
    try {
      // Gọi API reload hệ thống ngầm trước khi lấy dữ liệu mới
      await fastpanelService.reloadServers();
      await fetchServers();
    } catch (err) {
      setError("Quá trình làm mới hệ thống gặp lỗi.");
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div style={{ color: 'var(--text-main)' }}>
      {/* Header Section */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '30px',
        padding: '20px',
        background: 'var(--white)',
        borderRadius: '12px',
        border: '1px solid var(--border-color)'
      }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '5px' }}>Quản lý hạ tầng Server</h2>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
            {/* Cập nhật lần cuối: <span style={{ fontWeight: '600' }}>{lastUpdated}</span> */}
          </p>
        </div>
        
        <button 
          onClick={handleReload}
          disabled={isRefreshing}
          style={{ 
            backgroundColor: isRefreshing ? '#94a3b8' : 'var(--primary)', 
            color: 'white', 
            padding: '12px 24px', 
            borderRadius: '8px', 
            border: 'none',
            cursor: isRefreshing ? 'not-allowed' : 'pointer',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            transition: 'all 0.3s'
          }}
        >
          <FontAwesomeIcon icon={faSyncAlt} spin={isRefreshing} />
          {isRefreshing ? 'Đang đồng bộ...' : 'Làm mới hệ thống'}
        </button>
      </div>

      {/* Thông báo lỗi nội bộ (Thay cho toast) */}
      {error && (
        <div style={{ 
          padding: '15px', background: '#fef2f2', color: '#dc2626', 
          borderRadius: '8px', marginBottom: '25px', border: '1px solid #fee2e2',
          display: 'flex', alignItems: 'center', gap: '10px'
        }}>
          <FontAwesomeIcon icon={faExclamationTriangle} />
          {error}
        </div>
      )}

      {/* Servers Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
        {servers.length > 0 ? servers.map((server) => (
          <div key={server.id} style={{ 
            background: 'var(--white)', 
            padding: '24px', 
            borderRadius: '12px', 
            border: '1px solid var(--border-color)',
            boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
          }}>
            {/* Server Title & Status */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ 
                  width: '40px', height: '40px', background: '#eff6ff', 
                  borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' 
                }}>
                  <FontAwesomeIcon icon={faServer} style={{ color: 'var(--primary)' }} />
                </div>
                <div>
                  <div style={{ fontWeight: '700', fontSize: '1.1rem' }}>{server.name}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-light)' }}>IP: {server.ip}</div>
                </div>
              </div>
              <span style={{ 
                fontSize: '12px', 
                fontWeight: '600',
                padding: '4px 12px', 
                borderRadius: '20px',
                background: server.status === 'online' ? '#dcfce7' : '#fee2e2',
                color: server.status === 'online' ? '#166534' : '#991b1b',
                height: 'fit-content',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <FontAwesomeIcon icon={faCircle} style={{ fontSize: '8px' }} />
                {server.status?.toUpperCase() || 'UNKNOWN'}
              </span>
            </div>

            {/* Resource Gauges */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <ResourceItem icon={faMicrochip} label="CPU" value={server.cpu || 0} color="#2563eb" />
              <ResourceItem icon={faMemory} label="RAM" value={server.ram || 0} color="#f59e0b" />
              <ResourceItem icon={faHardDrive} label="Disk" value={server.disk || 0} color="#6b7280" />
            </div>

            <hr style={{ margin: '20px 0', border: '0.5px solid var(--border-color)' }} />
            
            <button style={{ 
              width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)',
              background: 'transparent', fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)',
              cursor: 'pointer'
            }}>
              <FontAwesomeIcon icon={faNetworkWired} style={{ marginRight: '8px' }} />
              Xem chi tiết Network
            </button>
          </div>
        )) : (
          !isRefreshing && <p style={{ color: 'var(--text-secondary)' }}>Không có máy chủ nào được tìm thấy.</p>
        )}
      </div>
    </div>
  );
}

// Component phụ hiển thị thanh tiến trình tài nguyên
function ResourceItem({ icon, label, value, color }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
          <FontAwesomeIcon icon={icon} style={{ width: '14px' }} /> {label}
        </span>
        <span style={{ fontWeight: '700' }}>{value}%</span>
      </div>
      <div style={{ height: '6px', background: '#f1f5f9', borderRadius: '10px', overflow: 'hidden' }}>
        <div style={{ 
          width: `${value}%`, 
          height: '100%', 
          background: color, 
          borderRadius: '10px',
          transition: 'width 1s ease-in-out' 
        }}></div>
      </div>
    </div>
  );
}