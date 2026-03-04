'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChartLine, 
  faServer, 
  faUsers, 
  faGear, 
  faSignOutAlt,
  faChevronRight,
  faCircleNotch
} from '@fortawesome/free-solid-svg-icons';
import { authService } from '@/services'; // Import authService từ index.js
import { useState } from 'react';

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Cập nhật href khớp với cấu trúc thư mục (admin)/...
  const menuItems = [
    { href: '/admin', label: 'Dashboard', icon: faChartLine },
    { href: '/admin/servers', label: 'Quản lý Servers', icon: faServer },
    { href: '/admin/users', label: 'Quản lý Users', icon: faUsers },
    { href: '/admin/settings', label: 'Cài đặt', icon: faGear },
  ];

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      // Logic đăng xuất thực tế (Xóa token, gọi API nếu cần)
      localStorage.removeItem('accessToken');
      router.push('/login');
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-body)' }}>
      {/* Sidebar */}
      <aside style={{ 
        width: 'var(--sidebar-width)', 
        background: 'var(--white)', 
        borderRight: '1px solid var(--border-color)', 
        position: 'fixed', 
        height: '100vh',
        zIndex: 50 
      }}>
        <div style={{ 
          padding: '24px', 
          fontWeight: '800', 
          color: 'var(--primary)', 
          fontSize: '1.4rem',
          letterSpacing: '-0.5px' 
        }}>
          THANHDAT TAX
        </div>
        
        <nav style={{ padding: '16px' }}>
          {menuItems.map((item) => {
            // Kiểm tra active chính xác hơn cho các route lồng nhau
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            
            return (
              <Link key={item.href} href={item.href}>
                <div style={{
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '12px', 
                  padding: '12px 16px', 
                  borderRadius: '8px', 
                  marginBottom: '4px',
                  transition: 'all 0.2s ease',
                  backgroundColor: isActive ? '#eff6ff' : 'transparent',
                  color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
                  fontWeight: isActive ? '600' : '400'
                }}>
                  <FontAwesomeIcon icon={item.icon} style={{ width: '18px' }} />
                  <span style={{ flex: 1 }}>{item.label}</span>
                  {isActive && <FontAwesomeIcon icon={faChevronRight} size="xs" />}
                </div>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Section */}
      <div style={{ marginLeft: 'var(--sidebar-width)', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <header style={{ 
          height: 'var(--header-height)', 
          background: 'var(--white)', 
          display: 'flex', 
          alignItems: 'center', 
          padding: '0 32px', 
          justifyContent: 'space-between', 
          borderBottom: '1px solid var(--border-color)',
          position: 'sticky',
          top: 0,
          zIndex: 40
        }}>
          <h1 style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--text-main)' }}>
            Hệ thống Quản trị
          </h1>
          
          <button 
            onClick={handleLogout}
            disabled={isLoggingOut}
            style={{ 
              color: '#ef4444', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px',
              cursor: 'pointer',
              background: 'none',
              border: 'none',
              fontSize: '0.95rem',
              fontWeight: '500',
              opacity: isLoggingOut ? 0.6 : 1
            }}
          >
            <FontAwesomeIcon icon={isLoggingOut ? faCircleNotch : faSignOutAlt} spin={isLoggingOut} /> 
            {isLoggingOut ? 'Đang thoát...' : 'Thoát'}
          </button>
        </header>

        <main style={{ padding: '32px', flex: 1 }}>
          {children}
        </main>
      </div>
    </div>
  );
}