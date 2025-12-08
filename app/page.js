import Link from "next/link";
import styles from "./page.module.css";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEarthAfrica } from "@fortawesome/free-solid-svg-icons";

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
        "Website: 1",
        "Dung lượng: 2GB NVMe",
        "Ram: 1GB",
        "CPU: Full 1 Core",
        "Băng thông: Không giới hạn",
        "SSL: Miễn phí",
        "Tên miền phụ miễn phí: 1",
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
      oldPrice: "150,000đ",
      discount: "-33%",
      isPopular: false,
      features: [
        "Số lượng: 3 Static Websites",
        "Tên miền phụ miễn phí: 3",
        "Băng thông: Không giới hạn",
        "SSL: Miễn phí tự động",
        "Custom Domain: Hỗ trợ miễn phí",
        "Uptime Guarantee: 99.9%",
        "Hỗ trợ kỹ thuật: Ticket 24/7",
      ],
    },
    {
      id: 2,
      name: "Business App",
      price: "250,000 đ",
      oldPrice: "",
      discount: "Chỉ từ",
      isPopular: false,
      features: [
        "Ứng dụng: Dynamic (NodeJS, Python, Go...)",
        "Docker & Container Registry: Có",
        "Zero Downtime Deployment: Có",
        "Database: Tùy nhu cầu",
        "Auto-scaling: CPU & RAM",
        "Monitoring & Metrics: Real-time",
        "Support: Priority 24/7 (Ưu tiên)",
      ],
    },
  ];

  return (
    <>
      <Header />
      <section id="home" className={styles.heroHosting}>
        <div className={styles.container}>
          <div className={styles.heroWrapper}>
            {/* LEFT SIDE: CONTENT */}
            <div className={styles.heroContent}>
              {/* Badge trên cùng */}
              <div className={styles.topBadgeWrapper}>
                <span className={styles.badgePill}>
                  <i className="fa-solid fa-globe"></i> Hosting NVME giá rẻ Giảm
                  đến 60%
                </span>
              </div>

              <h1>
                HOSTING NVME
                <br />
                Tốc Độ Cao.
              </h1>

              {/* Thay thế ul bằng paragraph mô tả */}
              <p className={styles.heroDescription}>
                Trải nghiệm Web Hosting tốc độ cao trên nền tảng CPU Intel
                Scalable/AMD EPYC và NVMe Enterprise RAID-10. Băng thông không
                giới hạn, đảm bảo website vận hành mượt mà và ổn định tuyệt đối.
              </p>

              {/* Group button hành động */}
              <div className={styles.btnGroup}>
                <a href="#trial" className={styles.btnPrimary}>
                  Đăng ký ngay
                </a>
              </div>
            </div>

            <div className={styles.heroImage}>
              <Image
                src="/assets/Server-amico.svg"
                width={500}
                height={500}
                alt="server"
              />

              {/* Box 1: Top Left - Super Reliable */}
              <div className={`${styles.floatBox} ${styles.boxReliable}`}>
                <div className={styles.iconCloud}>
                  <i className="fa-solid fa-cloud"></i>
                </div>
                <div className={styles.boxTextContent}>
                  <div className={styles.boxLabelStrong}>Ổn định Tuyệt đối</div>
                  <div className={styles.boxSubText}>
                    Hoạt động liên tục 24/7
                  </div>
                </div>
              </div>

              {/* Box 2: Top Right - Purple Globe */}
              <div className={`${styles.floatBox} ${styles.boxGlobe}`}>
                <FontAwesomeIcon
                  icon={faEarthAfrica}
                  style={{ color: "grey", fontSize: "24px" }}
                />
              </div>

              {/* Box 3: Bottom Right - Engagements */}
              <div className={`${styles.floatBox} ${styles.boxEngagement}`}>
                <div className={styles.iconChart}>
                  <i className="fa-solid fa-chart-line"></i>
                </div>
                <div className={styles.boxTextContent}>
                  <div className={styles.boxValueBig}>+100%</div>
                  <div className={styles.boxSubText}>Tương tác</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Bảng giá */}
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
      <section id="deploy" className={styles.deploySection}>
        <div className={styles.container}>
          <div className={styles.deployWrapper}>
            {/* Cột Nội Dung */}
            <div className={styles.deployContent}>
              <div className={styles.deployBadge}>Giải pháp Web Toàn Diện</div>
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
                <h1 className={styles.heading}>
                  Đặc tính <br />
                  <span className={styles.highlight}>Nổi bật</span>
                </h1>
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
                      src="/assets/digital.png"
                      width={500}
                      height={500}
                      alt="Hạ tầng mạnh mẽ"
                      className={styles.icon}
                    />
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
                    <Image
                      src="/assets/drive.png"
                      width={500}
                      height={500}
                      alt="Truy xuất nhanh"
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
                    <Image
                      src="/assets/security.png"
                      width={500}
                      height={500}
                      alt="Hạ tầng mạnh mẽ"
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
                    <Image
                      src="/assets/support.png"
                      width={500}
                      height={500}
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

      {/* <section id="services" className={styles.sectionPadding}>
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
      </section> */}
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
