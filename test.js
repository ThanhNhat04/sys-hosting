async function login(email, password) {
  const url = 'https://backend.tetrasco.com/api/v1/auth/login';

  const payload = {
    email: email, // Đã đổi từ username sang email
    password: password
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok) {
      // Xử lý lỗi nếu email/pass sai hoặc server có vấn đề
      console.error('Lỗi đăng nhập:', data.detail || 'Không xác định');
      return;
    }

    // Đăng nhập thành công
    console.log('Token của bạn:', data);
    return data;

  } catch (error) {
    console.error('Lỗi kết nối mạng:', error);
  }
}

// Cách gọi hàm:
login('hoangthanhnhat0411@gmail.com', '0387011726');