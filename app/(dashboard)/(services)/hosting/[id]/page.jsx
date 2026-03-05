import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync, faTools, faCreditCard } from '@fortawesome/free-solid-svg-icons';

export default function HostingDetail({ params }) {
  return (
    <div style={{ padding: '2rem', maxWidth: '1000px' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem' }}>Quản lý: thanhdattax.com</h1>
        <p style={{ color: 'var(--text-secondary)' }}>ID dịch vụ: #{params.id}</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        <div className="card">
          <h3 style={{ marginBottom: '1.5rem' }}>Thông số kỹ thuật</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', color: 'var(--text-light)', fontSize: '12px' }}>ĐỊA CHỈ IP</label>
              <p style={{ fontWeight: 600 }}>103.1.2.3</p>
            </div>
            <div>
              <label style={{ display: 'block', color: 'var(--text-light)', fontSize: '12px' }}>DUNG LƯỢNG</label>
              <p style={{ fontWeight: 600 }}>20GB / 50GB SSD</p>
            </div>
          </div>
          <hr style={{ margin: '1.5rem 0', border: '0', borderTop: '1px solid var(--border-color)' }} />
          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="btn-primary">
              <FontAwesomeIcon icon={faSync} /> Gia hạn ngay
            </button>
            <a href={`/hosting/${params.id}/settings`} style={{ border: '1px solid var(--border-color)', padding: '0.6rem 1rem', borderRadius: '6px' }}>
              <FontAwesomeIcon icon={faTools} /> Cấu hình
            </a>
          </div>
        </div>

        <div className="card" style={{ background: '#f0f7ff', borderColor: '#cfe2ff' }}>
          <h3 style={{ marginBottom: '1rem' }}>Trạng thái</h3>
          <p style={{ fontSize: '1.25rem', color: '#004aca', fontWeight: 'bold' }}>Đang hoạt động</p>
          <p style={{ fontSize: '0.875rem', marginTop: '10px' }}>Ngày hết hạn kế tiếp: <b>20/12/2026</b></p>
        </div>
      </div>
    </div>
  );
}