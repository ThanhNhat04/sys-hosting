// proxy.js
import { NextResponse } from 'next/server'

// 1. Định nghĩa các Route không cần đăng nhập (Public)
const publicRoutes = ['/login', '/register', '/forgot-password'];

// LƯU Ý: Tên hàm bắt buộc phải là "proxy" (theo tài liệu v16)
export function proxy(request) {
  // Lấy đường dẫn hiện tại
  const { pathname } = request.nextUrl;

  // 2. Kiểm tra cookie xác thực
  const hasToken = request.cookies.get('accessToken'); 

  // 3. Logic chuyển hướng (Redirect)
  
  // Trường hợp 1: Đã đăng nhập nhưng cố vào trang Login -> Đẩy về Dashboard
  if (hasToken && publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/profileUser', request.url));
  }

  // Trường hợp 2: Chưa đăng nhập mà cố vào trang nội bộ -> Đẩy về Login
  if (!hasToken && !publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Cho phép đi tiếp nếu hợp lệ
  return NextResponse.next();
}

// 4. Cấu hình Matcher (Vẫn giữ nguyên như cũ)
export const config = {
  matcher: [
    /*
     * Áp dụng proxy cho tất cả request TRỪ:
     * - api (API routes)
     * - _next/static (file tĩnh)
     * - _next/image (ảnh tối ưu)
     * - favicon.ico, file ảnh png...
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)',
  ],
}