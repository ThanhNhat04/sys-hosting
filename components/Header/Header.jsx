// Header.js
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./header.module.css"; // Giữ nguyên CSS cũ của bạn
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faShoppingCart,
  faBell,
  faUser,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

export default function Header({ toggleSidebar }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.navWrapper}>
          <div className={styles.leftSection}>
            <button
              onClick={toggleSidebar}
              className={styles.menuBtn}
              aria-label="Toggle Sidebar"
            >
              <FontAwesomeIcon icon={faBars} size="lg" />
            </button>

            <Link href="/" className={styles.logo}>
              <Image
                src="/assets/logo.svg"
                width={100}
                height={75}
                alt="iNET"
                className={styles.logoImage}
              />
            </Link>
          </div>

          <div className={styles.rightSection}>
            <button className={styles.iconAction}>
              <FontAwesomeIcon icon={faShoppingCart} />
            </button>
            <button className={styles.iconAction}>
              <FontAwesomeIcon icon={faBell} />
            </button>
            <div className={styles.profileWrapper}>
              <button className={styles.avatarBtn} onClick={toggleProfile}>
                <div className={styles.avatarCircle}>
                  <FontAwesomeIcon icon={faUser} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
