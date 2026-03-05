import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

async function getPlans() {
  const res = await fetch('https://backend-tetras.talab.io.vn/api/v1/plans', { cache: 'no-store' });
  return res.json();
}

export default async function PlansPage() {
  const plans = await getPlans();

  return (
    <div style={{ padding: '40px 20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '10px' }}>Gói Dịch Vụ Hosting</h1>
      <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '40px' }}>Giải pháp lưu trữ tối ưu cho website của bạn</p>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '24px', 
        maxWidth: '1200px', 
        margin: '0 auto' 
      }}>
        {plans.map((plan) => (
          <div key={plan.id} className="card" style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
            <h2 style={{ color: 'var(--primary)', marginBottom: '15px' }}>{plan.name}</h2>
            <div style={{ marginBottom: '20px' }}>
              {/* Format price từ chuỗi số dài của API */}
              <span style={{ fontSize: '2rem', fontWeight: '800' }}>
                {parseFloat(plan.price_month).toLocaleString()} VND
              </span>
              <span style={{ color: 'var(--text-light)' }}>/tháng</span>
            </div>
            
            <div style={{ flex: 1, textAlign: 'left', marginBottom: '25px' }}>
              {Object.entries(plan.specs).map(([key, value]) => (
                <div key={key} style={{ padding: '8px 0', borderBottom: '1px solid var(--border-color)', fontSize: '14px' }}>
                  <FontAwesomeIcon icon={faCheckCircle} style={{ color: '#10b981', marginRight: '10px' }} />
                  <span style={{ textTransform: 'capitalize' }}>{key}:</span> <strong>{String(value)}</strong>
                </div>
              ))}
            </div>

            <a href={`/dashboard/marketplace/checkout/${plan.id}`} className="btn-primary" style={{ textDecoration: 'none' }}>
              <FontAwesomeIcon icon={faShoppingCart} style={{ marginRight: '8px' }} />
              Đăng ký ngay
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}