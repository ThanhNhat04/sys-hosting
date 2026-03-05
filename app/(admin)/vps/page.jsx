import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHdd, faKey, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

async function getServerDetail(id) {
  const res = await fetch(`https://backend-tetras.talab.io.vn/api/v1/servers/${id}`, { cache: 'no-store' });
  return res.json();
}

export default async function AdminServerDetail() {
  // Demo lấy server ID 1
  const server = await getServerDetail(1);

  return (
    <div style={{ padding: '30px' }}>
      <div style={{ background: 'var(--white)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
          <div>
            <h1 style={{ fontSize: '1.5rem', marginBottom: '5px' }}>
              <FontAwesomeIcon icon={faHdd} style={{ marginRight: '10px', color: 'var(--text-light)' }} />
              Server: {server.name}
            </h1>
            <p style={{ color: 'var(--text-secondary)' }}>Quản trị tài nguyên hệ thống vật lý</p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="btn-primary" style={{ background: 'var(--text-main)' }}>
               <FontAwesomeIcon icon={faEdit} /> Chỉnh sửa
            </button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          <div style={{ padding: '15px', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
            <label style={{ fontSize: '12px', color: 'var(--text-light)', display: 'block' }}>ĐỊA CHỈ IP</label>
            <strong style={{ fontSize: '1.1rem' }}>{server.ip_address}</strong>
          </div>
          
          <div style={{ padding: '15px', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
            <label style={{ fontSize: '12px', color: 'var(--text-light)', display: 'block' }}>API CONFIG</label>
            <div style={{ fontSize: '13px', background: '#f1f5f9', padding: '10px', marginTop: '5px', borderRadius: '4px' }}>
              <pre>{JSON.stringify(server.api_config, null, 2)}</pre>
            </div>
          </div>

          <div style={{ padding: '15px', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
            <label style={{ fontSize: '12px', color: 'var(--text-light)', display: 'block' }}>NGÀY KHỞI TẠO</label>
            <strong>{new Date(server.created_at).toLocaleString('vi-VN')}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}