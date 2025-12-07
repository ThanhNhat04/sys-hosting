import Link from "next/link";
import styles from "./page.module.css";
import Image from "next/image";

import Header from "@/components/header/header.js";
import Footer from "@/components/footer/Footer";
import PricingCard from "@/components/pricing/PricingCard.js";

export default function Home() {
  const pricingPlans = [
    {
      id: 1,

      name: "Basic NVMe",
      price: "25,000 đ",
      oldPrice: "35,000 đ",
      discount: "-30%",
      // url: "https://storyset.com/data",
      isPopular: false,
      features: [
        // --- 8 THÔNG SỐ QUAN TRỌNG NHẤT (HIỆN RA NGOÀI) ---
        "Website: 1",
        "Dung lượng: 2GB NVMe",
        "Ram: 1GB",
        "CPU: Full 1 Core",
        "Băng thông: Không giới hạn",
        "SSL: Miễn phí",
        "Tên miền phụ miễn phí: 1",
        "Managed WordPress: Có",

        // --- CÁC THÔNG SỐ KHÁC (ẨN TRONG NÚT XEM THÊM) ---
        "MySQL: Không giới hạn",
        "Free 1-click: WordPress Installation",
        "WordPress Acceleration: LiteSpeed",
        "WordPress: Autoupdates",
        "WP-CLI and SSH: Có",
        "WordPress: Staging Tool",
        "Object Cache: for WordPress",
        "Malware: Scanner",
        "Uptime Guarantee: 99,9%",
        "Customer Support: 24/7",
        "PHP X-Ray: Có",
        "AccelerateWP: Có",
        "Max Files (Inodes): Không giới hạn",
      ],
    },
    {
      id: 2,
      name: "Medium NVMe",
      price: "70,000 đ",
      oldPrice: "100,000 đ",
      discount: "-30%",
      isPopular: true, // Gói này sẽ có viền xanh nổi bật
      features: [
        "Website: 3",
        "Dung lượng: 10GB NVMe",
        "Ram: 2GB",
        "CPU: 2 Core",
        "Băng thông: Không giới hạn",
        "SSL: Miễn phí",
        "Tên miền phụ miễn phí: 3",
        "Managed WordPress: Có",
        "MySQL: Không giới hạn",
        "Free 1-click: WordPress Installation",
        "WordPress Acceleration: LiteSpeed",
        "WordPress: Autoupdates",
        "WP-CLI and SSH: Có",
        "WordPress: Staging Tool",
        "Object Cache: for WordPress",
        "Malware: Scanner",
        "Uptime Guarantee: 99,9%",
        "Customer Support: 24/7",
        "PHP X-Ray: Có",
        "AccelerateWP: Có",
        "Max Files (Inodes): Không giới hạn",
      ],
    },
    {
      id: 3,
      name: "Pro NVMe",
      price: "99,000 đ",
      oldPrice: "145,000 đ",
      discount: "-30%",
      isPopular: false,
      features: [
        "Website: 5",
        "Dung lượng: 20GB NVMe",
        "Ram: 4GB",
        "CPU: 3 Core",
        "Băng thông: Không giới hạn",
        "SSL: Miễn phí",
        "Tên miền phụ miễn phí: 5",
        "Managed WordPress: Có",
        "MySQL: Không giới hạn",
        "Free 1-click: WordPress Installation",
        "WordPress Acceleration: LiteSpeed",
        "WordPress: Autoupdates",
        "WP-CLI and SSH: Có",
        "WordPress: Staging Tool",
        "Object Cache: for WordPress",
        "Malware: Scanner",
        "Uptime Guarantee: 99,9%",
        "Customer Support: 24/7",
        "PHP X-Ray: Có",
        "AccelerateWP: Có",
        "Max Files (Inodes): Không giới hạn",
      ],
    },
  ];

  const deploymentPlans = [
    {
      id: 1,
      name: "Static Dev",
      price: "100,000 đ",
      oldPrice: "150,000 đ", // Giá ảo để hiện giảm giá
      discount: "-33%", // Hoặc ghi "Mua năm chỉ 999k"
      isPopular: false,
      features: [
        // --- 8 TÍNH NĂNG QUAN TRỌNG (HIỆN MẶC ĐỊNH) ---
        "Số lượng: 3 Static Websites",
        "Tên miền phụ miễn phí: 3",
        "Băng thông: Không giới hạn",
        "SSL: Miễn phí tự động",
        // "CDN: Global Acceleration",

        // --- CÁC TÍNH NĂNG ẨN (XEM THÊM) ---
        "Custom Domain: Hỗ trợ miễn phí",
        "Uptime Guarantee: 99.9%",
        "Hỗ trợ kỹ thuật: Ticket 24/7",
      ],
    },
    {
      id: 2,
      name: "Business App",
      price: "250,000 đ", // Giá khởi điểm
      oldPrice: "",
      discount: "Start from", // Badge hiển thị "Chỉ từ"
      isPopular: false, // Gói Doanh nghiệp nên để nổi bật
      features: [
        // --- 8 TÍNH NĂNG QUAN TRỌNG (HIỆN MẶC ĐỊNH) ---
        "Ứng dụng: Dynamic (NodeJS, Python, Go...)",
        "Docker & Container Registry: Có",
        "Zero Downtime Deployment: Có",
        "Database: Managed (MySQL)",
        "Auto-scaling: CPU & RAM",
        "Monitoring & Metrics: Real-time",
        "Support: Priority 24/7 (Ưu tiên)",
      ],
    },
  ];

  return (
    <>
      <Header />
      <section className={styles.heroHosting}>
        <div className={styles.container}>
          <div className={styles.heroWrapper}>
            <div className={styles.heroContent}>
              <h1>
                SSD HOSTING <br />
                THẾ HỆ MỚI <span className={styles.badgeNew}>NEW</span>
              </h1>

              <ul className={styles.heroFeatures}>
                <li>
                  <i className="fa-regular fa-circle-check"></i> Tốc độ cao và
                  ổn định
                </li>
                <li>
                  <i className="fa-regular fa-circle-check"></i> Backup dữ liệu
                  hàng ngày
                </li>
                <li>
                  <i className="fa-regular fa-circle-check"></i> Bảo mật với
                  Imunify360
                </li>
                <li>
                  <i className="fa-regular fa-circle-check"></i> Miễn phí chuyển
                  dữ liệu
                </li>
                <li>
                  <i className="fa-regular fa-circle-check"></i> Quản trị cPanel
                  bản quyền
                </li>
                <li>
                  <i className="fa-regular fa-circle-check"></i> Miễn phí SSL và
                  bộ plugin
                </li>
                <li>
                  <i className="fa-regular fa-circle-check"></i> LiteSpeed Web
                  Server
                </li>
                <li>
                  <i className="fa-regular fa-circle-check"></i> Cam kết hoàn
                  tiền
                </li>
              </ul>

              <a href="#register" className={styles.btnRegister}>
                Đăng ký ngay
              </a>
            </div>

            <div className={styles.heroImage}>
              <img src="https://i.imgur.com/1tN5H7p.png" alt="Hosting Model" />

              {/* Dùng Template Literals để nối 2 class */}
              <div className={`${styles.floatBox} ${styles.boxPrice}`}>
                <div className={styles.boxLabel}>Giá ưu đãi</div>
                <div className={styles.boxValue}>Chỉ từ 10.000đ/tháng</div>
              </div>

              <div className={`${styles.floatBox} ${styles.boxSsl}`}>
                <div className={styles.iconCircle}>
                  <i className="fa-solid fa-ticket"></i>
                </div>
                <p>
                  Miễn phí SSL &<br />
                  bộ plugin bản quyền
                </p>
              </div>

              <div className={`${styles.floatBox} ${styles.boxGuarantee}`}>
                <div className={styles.iconCircleOrange}>
                  <i className="fa-solid fa-dollar-sign"></i>
                </div>
                <p>
                  Cam kết hoàn tiền nếu
                  <br />
                  khách hàng không hài lòng
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="pricing"
        className={`${styles.pricingSection} ${styles.sectionPadding}`}
      >
        <div className={styles.container}>
          <div className={styles.sectionTitle}>
            <h2>Bảng Giá Hosting</h2>
            <p>
              Chọn gói phù hợp với nhu cầu của bạn. Nâng cấp bất cứ lúc nào.
            </p>
          </div>

          <div className={styles.pricingTable}>
            {pricingPlans.map((plan) => (
              <PricingCard key={plan.id} plan={plan} />
            ))}
          </div>
        </div>
      </section>

      {/* Dịch vụ giá tăng */}
      <section className={styles.deploySection}>
        <div className={styles.container}>
          <div className={styles.deployWrapper}>
            {/* Cột Nội Dung */}
            <div className={styles.deployContent}>
              <div className={styles.deployBadge}>Dịch Vụ Gia Tăng</div>
              <h2>Bạn Có App Nhưng Không Có Tài Nguyên Để Deploy</h2>
              <p>
                Đừng lo lắng! Đội ngũ kỹ thuật của Tetras sẽ giúp bạn đưa
                website lên Internet một cách chuẩn chỉ, bảo mật và tối ưu hiệu
                suất.
              </p>

              <ul className={styles.deployList}>
                <li>
                  <i className={`fa-brands fa-wordpress ${styles.wpIcon}`}></i>
                  <div>
                    <strong>Cài đặt CMS</strong>
                    <span>WordPress, Joomla, Drupal chuẩn SEO</span>
                  </div>
                </li>
                <li>
                  <i
                    className={`fa-brands fa-laravel ${styles.laravelIcon}`}
                  ></i>
                  <div>
                    <strong>Deploy Framework</strong>
                    <span>Laravel, CodeIgniter, Node.js, ReactJS</span>
                  </div>
                </li>
                <li>
                  <i className={`fa-solid fa-database ${styles.dbIcon}`}></i>
                  <div>
                    <strong>Cấu hình Server</strong>
                    <span>Import Database, Cronjob, SSL, PHP Version</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Cột Giá 1: Tiêu Chuẩn */}
            {/* <div className={styles.deployPricingCard}>
              <h3>Gói Deploy Tiêu Chuẩn</h3>
              <div className={styles.deployPrice}>
                150.000đ <span>/lần</span>
              </div>
              <p className={styles.deployNote}>
                *Miễn phí 100% nếu đăng ký gói <strong>Enterprise</strong> từ 1
                năm.
              </p>
              <hr />
              <ul className={styles.deployFeatures}>
                <li>
                  <i className={`fa-solid fa-check ${styles.checkIcon}`}></i>{" "}
                  Thiết lập môi trường chạy code.
                </li>
                <li>
                  <i className={`fa-solid fa-check ${styles.checkIcon}`}></i>{" "}
                  Tặng subdomain miễn phí.
                </li>
                <li>
                  <i className={`fa-solid fa-check ${styles.checkIcon}`}></i>{" "}
                  Trỏ tên miền & cài đặt SSL HTTPS.
                </li>
                <li>
                  <i className={`fa-solid fa-check ${styles.checkIcon}`}></i>{" "}
                  Bảo hành lỗi kỹ thuật 7 ngày.
                </li>
              </ul>
              <Link href="#" className={styles.btnPrimary}>
                Yêu Cầu Hỗ Trợ
              </Link>
            </div> */}

            {/* Cột Giá 2: Business */}
            {/* <div className={styles.deployPricingCard}>
              <h3>Gói Business</h3>
              <div className={styles.deployPrice}>
                Giá liên hệ */}
            {/* <span>/dự án</span> */}
            {/* </div>
              <p className={styles.deployNote}>
                *Miễn phí 100% nếu đăng ký gói <strong>Business</strong> từ 1
                năm.
              </p>
              <hr />
              <ul className={styles.deployFeatures}>
                <li>
                  <i className={`fa-solid fa-check ${styles.checkIcon}`}></i>{" "}
                  Bao gồm quyền lợi gói Tiêu Chuẩn.
                </li>
                <li>
                  <i className={`fa-solid fa-check ${styles.checkIcon}`}></i>{" "}
                  Tặng Subdomain TetraS độc quyền.
                </li>
                <li>
                  <i className={`fa-solid fa-check ${styles.checkIcon}`}></i> Hỗ
                  trợ cấu hình nâng cao (VPS/Docker).
                </li>
                <li>
                  <i className={`fa-solid fa-check ${styles.checkIcon}`}></i>{" "}
                  Bảo hành lỗi kỹ thuật 30 ngày.
                </li>
              </ul>
              <Link href="#" className={styles.btnPrimary}>
                Yêu Cầu Hỗ Trợ
              </Link>
            </div> */}
            {deploymentPlans.map((plan) => (
              <PricingCard key={plan.id} plan={plan} />
            ))}
          </div>
        </div>
      </section>

      {/* sesion đặc diểm nổi bật */}
      <section className={`${styles.featureSection} ${styles.sectionPadding}`}>
        <div className={styles.container}>
          <div className={styles.layoutWrapper}>
            {/* --- CỘT TRÁI: Tiêu đề & Ảnh --- */}
            <div className={styles.leftColumn}>
              <div className={styles.stickyContent}>
                <h2 className={styles.heading}>
                  Đặc tính <br />
                  <span className={styles.highlight}>Nổi bật</span>
                </h2>
                <p className={styles.subHeading}>
                  Công nghệ tiên tiến giúp website của bạn vận hành ổn định và
                  bảo mật.
                </p>

                <div className={styles.illustrationImage}>
                  <Image
                    src="assets/data.svg"
                    width={700}
                    height={700}
                    alt="Máy chủ"
                  />
                </div>
              </div>
            </div>

            {/* --- CỘT PHẢI: Viết trực tiếp từng Item (Không dùng Map) --- */}
            <div className={styles.rightColumn}>
              <div className={styles.featureGrid}>
                {/* Item 1 */}
                <div className={styles.featureItem}>
                  <div className={styles.iconWrapper}>
                    <Image
                      src="assets/data.svg"
                      width={500}
                      height={500}
                      alt="Hạ tầng mạnh mẽ"
                      className={styles.icon}
                    />
                    {/* <Image
                      src="/assets/data.svg"
                      alt="Hạ tầng mạnh mẽ"
                      className={styles.icon}
                    /> */}
                  </div>
                  <h3 className={styles.featureTitle}>Hạ tầng mạnh mẽ</h3>
                  <p className={styles.featureDesc}>
                    Cấu hình máy chủ cao cấp sử dụng Chipset Intel E5 V4 cùng
                    RAM DDR4 mới nhất hiện nay mang lại hiệu suất xử lý vượt
                    trội cho website của bạn.
                  </p>
                </div>

                {/* Item 2 */}
                <div className={styles.featureItem}>
                  <div className={styles.iconWrapper}>
                    {/* <img
                      src="/icons/ssd.png"
                      alt="Truy xuất nhanh"
                      className={styles.icon}
                    /> */}
                    <Image
                      src="assets/data.svg"
                      width={500}
                      height={500}
                      alt="Hạ tầng mạnh mẽ"
                      className={styles.icon}
                    />
                  </div>
                  <h3 className={styles.featureTitle}>
                    Truy xuất nhanh - Tăng tốc
                  </h3>
                  <p className={styles.featureDesc}>
                    Máy chủ sử dụng ổ cứng SSD Server Enterprise cùng công nghệ
                    LiteSpeed Web Server cho tốc độ truy xuất nhanh, gấp 10 lần
                    so với hệ thống thông thường.
                  </p>
                </div>

                {/* Item 3 */}
                <div className={styles.featureItem}>
                  <div className={styles.iconWrapper}>
                    <img
                      src="/icons/security.png"
                      alt="An toàn bảo mật"
                      className={styles.icon}
                    />
                  </div>
                  <h3 className={styles.featureTitle}>An toàn - Bảo mật</h3>
                  <p className={styles.featureDesc}>
                    Phần mềm quản trị cPanel với hệ điều hành CloudLinux cùng
                    phần mềm cPGuard giúp ngăn chặn 99.99% nguy cơ tấn công
                    Local-Attack.
                  </p>
                </div>

                {/* Item 4 */}
                <div className={styles.featureItem}>
                  <div className={styles.iconWrapper}>
                    <img
                      src="/icons/support.png"
                      alt="Hỗ trợ 24/7"
                      className={styles.icon}
                    />
                  </div>
                  <h3 className={styles.featureTitle}>Hỗ trợ 24/7</h3>
                  <p className={styles.featureDesc}>
                    Đội ngũ kỹ thuật 20+ năm kinh nghiệm, nhiệt tình và chu đáo
                    luôn sẵn sàng hỗ trợ khách hàng trong suốt quá trình sử
                    dụng.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className={styles.sectionPadding}>
        <div className={styles.container}>
          <div className={styles.sectionTitle}>
            <h2>Tại Sao Chọn TetraS Hosting?</h2>
            <p>
              Chúng tôi cung cấp giải pháp tốt nhất để website của bạn luôn vận
              hành mượt mà.
            </p>
          </div>
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <i className="fa-solid fa-gauge-high"></i>
              </div>
              <h3>Tốc Độ Siêu Nhanh</h3>
              <p>
                Sử dụng ổ cứng NVMe SSD Enterprise và công nghệ LiteSpeed Web
                Server.
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <i className="fa-solid fa-shield-halved"></i>
              </div>
              <h3>Bảo Mật Tuyệt Đối</h3>
              <p>
                Hệ thống chống DDoS tự động, quét mã độc Imunify360 và Backup
                hàng ngày.
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <i className="fa-solid fa-headset"></i>
              </div>
              <h3>Hỗ Trợ 24/7/365</h3>
              <p>
                Đội ngũ kỹ thuật viên giàu kinh nghiệm luôn sẵn sàng hỗ trợ bạn.
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <i className="fa-solid fa-uptime"></i>
              </div>
              <h3>99.9% Uptime</h3>
              <p>Cam kết thời gian hoạt động của máy chủ luôn ổn định.</p>
            </div>
          </div>
        </div>
      </section>
      <section className={`${styles.faqSection} ${styles.sectionPadding}`}>
        <div className={styles.container}>
          <div className={styles.sectionTitle}>
            <h2>Câu Hỏi Thường Gặp</h2>
          </div>
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <div className={styles.faqItem}>
              <details className={styles.details} open>
                <summary className={styles.summary}>
                  Tôi có thể nâng cấp gói hosting sau này không?
                </summary>
                <p>
                  Hoàn toàn được. Bạn có thể nâng cấp gói hosting lên gói cao
                  hơn bất cứ lúc nào.
                </p>
              </details>
            </div>
            <div className={styles.faqItem}>
              <details className={styles.details}>
                <summary className={styles.summary}>
                  Hosting có hỗ trợ WordPress không?
                </summary>
                <p>
                  Có, tất cả các gói hosting của chúng tôi đều được tối ưu hóa
                  100% cho WordPress.
                </p>
              </details>
            </div>
            <div className={styles.faqItem}>
              <details className={styles.details}>
                <summary className={styles.summary}>
                  Chính sách hoàn tiền như thế nào?
                </summary>
                <p>
                  Chúng tôi cam kết hoàn tiền 100% trong vòng 30 ngày đầu tiên
                  nếu bạn không hài lòng.
                </p>
              </details>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
