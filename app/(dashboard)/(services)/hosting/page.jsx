import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faMicrochip, faArrowRight } from '@fortawesome/free-solid-svg-icons';

async function getUserServices() {
  const res = await fetch('https://backend-tetras.talab.io.vn/api/v1/user-services', { cache: 'no-store' });
  return res.json();
}

export default async function HostingListPage() {
  const services = await getUserServices();

  return (
    <div style={{ padding: '30px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1>Hosting Đang Chạy</h1>
        <span style={{ color: 'var(--text-secondary)' }}>Tổng số: {services.length}</span>
      </div>

      <div className="table-container">
        <table>
          <thead style={{ background: '#f8fafc' }}>
            <tr>
              <th>Dịch vụ</th>
              <th>Địa chỉ IP</th>
              <th>Trạng thái</th>
              <th>Ngày hết hạn</th>
              <th style={{ textAlign: 'right' }}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {services.map((svc) => (
              <tr key={svc.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ background: '#eff6ff', padding: '10px', borderRadius: '8px', color: 'var(--primary)' }}>
                      <FontAwesomeIcon icon={faGlobe} />
                    </div>
                    <div>
                      <div style={{ fontWeight: '600' }}>{svc.domain}</div>
                      <small style={{ color: 'var(--text-light)' }}>Service ID: #{svc.id}</small>
                    </div>
                  </div>
                </td>
                <td style={{ fontFamily: 'monospace', fontWeight: '500' }}>
                  {svc.server_id ? `Server Node #${svc.server_id}` : 'Đang khởi tạo...'}
                </td>
                <td>
                  <span style={{ 
                    padding: '4px 12px', 
                    borderRadius: '20px', 
                    fontSize: '12px', 
                    fontWeight: '600',
                    background: svc.status === 'active' ? '#dcfce7' : '#fef9c3',
                    color: svc.status === 'active' ? '#166534' : '#854d0e'
                  }}>
                    {svc.status.toUpperCase()}
                  </span>
                </td>
                <td>{new Date(svc.expiry_date).toLocaleDateString('vi-VN')}</td>
                <td style={{ textAlign: 'right' }}>
                  <a href={`/dashboard/hosting/${svc.id}`} style={{ color: 'var(--primary)', fontWeight: '600', textDecoration: 'none' }}>
                    Quản lý <FontAwesomeIcon icon={faArrowRight} size="xs" />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}