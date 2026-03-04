This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.



WEB-HOSTING-PLATFORM/
├── app/
│   ├── (auth)/                   # Phân vùng Đăng nhập/Đăng ký
│   │   ├── login/page.jsx
│   │   └── layout.jsx            # Layout trắng (không sidebar)
│   ├── (admin)/                  # Phân vùng QUẢN TRỊ (Dành cho bạn)
│   │   ├── layout.jsx            # Layout có Sidebar Admin + Check Role Admin
│   │   ├── users/                # Quản lý người dùng (Từ User Service)
│   │   │   ├── page.jsx          # Danh sách người dùng
│   │   │   └── [id]/page.jsx     # Chi tiết, đổi pass, chỉnh quota
│   │   └── servers/              # Quản lý hạ tầng (Từ Server Service)
│   │       └── page.jsx          # Liệt kê & Reload servers
│   ├── (dashboard)/              # Phân vùng KHÁCH HÀNG
│   │   ├── layout.jsx            # Layout có Sidebar User
│   │   ├── (account)/            # Thông tin cá nhân
│   │   ├── (services)/hosting/   # Quản lý gói host đã mua
│   │   └── (support)/            # Ticket hỗ trợ
│   ├── globals.css               # Chứa các biến :root CSS bạn đã gửi
│   └── layout.jsx                # Root Layout (Font, Provider chung)
├── components/                   # UI Components chia theo mục đích
│   ├── common/                   # Button, Input, Modal, Table dùng chung
│   ├── admin/                    # Các bảng dữ liệu, biểu đồ cho Admin
│   └── dashboard/                # Các Widget cho người dùng
├── lib/                          # Cấu hình lõi (Core Config)
│   ├── axios.js                  # Khởi tạo các Instance cho từng Microservice
│   └── utils.js                  # Hàm format tiền, ngày tháng...
├── services/                     # Tầng gọi API (Quan trọng nhất)
│   ├── user.service.js           # Logic: /users, /chpasswd, /disable...
│   ├── server.service.js         # Logic: /servers, /servers/reload...
│   └── billing.service.js        # Logic: /invoices, /payment...
├── hooks/                        # Custom hooks (vídụ: useAuth, useFetch)
├── public/                       # Logo, Icons, Images
├── .env.local                    # Lưu USER_SERVICE_URL, SERVER_SERVICE_URL...
└── next.config.mjs