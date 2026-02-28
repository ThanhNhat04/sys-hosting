// =========================================================================
// 6. DANH MỤC SẢN PHẨM & DỊCH VỤ CỦA HỆ THỐNG (PRODUCT CATALOG)
// =========================================================================

// A. Các gói Cloud Hosting (Shared Hosting)
export const hostingPlans = [
  {
    id: "PLAN_H01",
    name: "Starter Cloud",
    slug: "starter-cloud",
    type: "hosting",
    price: 49000, // VND/tháng
    currency: "VND",
    billingCycle: ["12_months", "24_months"], // Các chu kỳ cho phép thanh toán
    features: [
      "1 Website",
      "10 GB NVMe Storage",
      "Không giới hạn băng thông",
      "Miễn phí SSL Let's Encrypt",
      "1 GB RAM",
      "Daily Backup (7 ngày)"
    ],
    isPopular: false,
    description: "Phù hợp cho cá nhân, blog nhỏ hoặc trang landing page."
  },
  {
    id: "PLAN_H02",
    name: "Business Pro",
    slug: "business-pro",
    type: "hosting",
    price: 159000,
    currency: "VND",
    billingCycle: ["6_months", "12_months", "24_months"],
    features: [
      "5 Websites",
      "50 GB NVMe Storage",
      "Không giới hạn băng thông",
      "Miễn phí SSL & Email theo tên miền",
      "4 GB RAM",
      "LiteSpeed Web Server",
      "Daily Backup (30 ngày)"
    ],
    isPopular: true, // Gói được khuyên dùng
    description: "Giải pháp tốt nhất cho doanh nghiệp vừa và nhỏ, website bán hàng."
  },
  {
    id: "PLAN_H03",
    name: "Enterprise Turbo",
    slug: "enterprise-turbo",
    type: "hosting",
    price: 350000,
    currency: "VND",
    billingCycle: ["1_month", "12_months"],
    features: [
      "Không giới hạn Website",
      "150 GB NVMe Storage",
      "IP Riêng (Dedicated IP)",
      "8 GB RAM",
      "Ưu tiên hỗ trợ 24/7",
      "Imunify360 Security Pro"
    ],
    isPopular: false,
    description: "Hiệu năng cao nhất dành cho các website traffic lớn."
  }
];

// B. Các gói Cloud VPS/Server
export const vpsPlans = [
  {
    id: "PLAN_VPS_A",
    name: "Cloud VPS A",
    cpu: "2 vCore",
    ram: "2 GB",
    disk: "40 GB SSD",
    bandwidth: "Unlimited",
    price: 250000,
    currency: "VND",
  },
  {
    id: "PLAN_VPS_B",
    name: "Cloud VPS B",
    cpu: "4 vCore",
    ram: "8 GB",
    disk: "100 GB NVMe",
    bandwidth: "Unlimited",
    price: 650000,
    currency: "VND",
    isBestSeller: true
  },
  {
    id: "PLAN_VPS_C",
    name: "Cloud VPS High Mem",
    cpu: "8 vCore",
    ram: "32 GB",
    disk: "250 GB NVMe",
    bandwidth: "Unlimited",
    price: 1500000,
    currency: "VND",
  }
];

// C. Bảng giá Tên miền (TLD Pricing)
export const domainPricing = [
  {
    tld: ".com",
    registerPrice: 280000,
    renewPrice: 300000,
    transferPrice: 280000,
    isPromoted: true // Đang khuyến mãi
  },
  {
    tld: ".vn",
    registerPrice: 650000,
    renewPrice: 450000,
    transferPrice: 0,
    type: "local" // Tên miền quốc gia
  },
  {
    tld: ".net",
    registerPrice: 320000,
    renewPrice: 350000,
    transferPrice: 320000,
    isPromoted: false
  },
  {
    tld: ".com.vn",
    registerPrice: 550000,
    renewPrice: 350000,
    transferPrice: 0,
    type: "local"
  }
];

// D. Danh sách Hệ điều hành (OS Images) - Dùng khi tạo VPS
export const osImages = [
  { id: "os_ubuntu_22", name: "Ubuntu 22.04 LTS", type: "linux", logo: "/assets/os/ubuntu.png" },
  { id: "os_ubuntu_20", name: "Ubuntu 20.04 LTS", type: "linux", logo: "/assets/os/ubuntu.png" },
  { id: "os_centos_7", name: "CentOS 7", type: "linux", logo: "/assets/os/centos.png" },
  { id: "os_alma_9", name: "AlmaLinux 9", type: "linux", logo: "/assets/os/alma.png" },
  { id: "os_win_2019", name: "Windows Server 2019", type: "windows", logo: "/assets/os/windows.png", surcharge: 350000 } // Phụ phí bản quyền
];

// E. Dịch vụ bổ trợ (Add-ons)
export const addonServices = [
  {
    id: "ADDON_SSL",
    name: "SSL Comodo Positive",
    price: 150000,
    unit: "năm",
    description: "Bảo mật website, tăng uy tín với Google."
  },
  {
    id: "ADDON_IP",
    name: "Mua thêm IP Riêng",
    price: 50000,
    unit: "tháng",
    description: "IP dedicated sạch, tốt cho SEO và gửi Email."
  }
];