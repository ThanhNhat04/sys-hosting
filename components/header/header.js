"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./header.module.css";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinks = [
    { name: "Trang chủ", href: "#home" },
    { name: "Giới thiệu", href: "#home" },
    { name: "Hosting", href: "#pricing" },
    { name: "Deploy", href: "#deploy" , hot: true},
    { name: "Liên hệ", href: "#contact" },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.navWrapper}>
          <div className={styles.mobileBtnWrapper}>
            <button
              onClick={toggleMenu}
              className={styles.mobileBtn}
              aria-label="Toggle menu"
            >
              <FontAwesomeIcon
                icon={isMobileMenuOpen ? faXmark : faBars}
                className={styles.iconStyle}
                size="lg"
              />
            </button>
          </div>

          {/* Logo */}
          <div className={styles.logoWrapper}>
            <Link href="/" className={styles.logo}>
              <Image
                src="/assets/logo.svg"
                width={150}
                height={150}
                quality={1}
                alt="TetreS Company"
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className={styles.desktopNav}>
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} className={`${styles.navLink} ${link.hot ? styles.navHot : ''}`}>
                {link.name}
              </Link>
            ))}
          </div>

          {/* Login/ logout Buttons */}
          {/* <div className={styles.authWrapper}>
            <Link href="#" className={styles.loginBtn}>
              Đăng nhập
            </Link>
            <Link href="#" className={styles.registerBtn}>
              Đăng ký
            </Link>
          </div> */}
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className={styles.mobileMenu}>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={styles.mobileNavLink}
            >
              {link.name}
            </Link>
          ))}

          <div className={styles.mobileAuthDivider}></div>
          <div className={styles.mobileAuthWrapper}>
            <Link
              href="#"
              className={`${styles.mobileNavLink} ${styles.mobileLogin}`}
            >
              Đăng nhập
            </Link>
            <Link
              href="#"
              className={`${styles.mobileNavLink} ${styles.mobileRegister}`}
            >
              Đăng ký
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
