"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Sidebar.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCube,
  faList,
  faServer,
  faGlobe,
  faLifeRing,
  faUser,
  faLock,
  faEnvelope,
  faCloud,
  faChevronDown,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const MENU_ITEMS = [
  // Dashboard
  {
    name: "Tổng quan",
    icon: faCube,
    path: "/",
  },

  // Services management
  {
    name: "Đăng ký dịch vụ",
    icon: faLifeRing,
    path: "#",
    children: [
      { name: "Hosting", path: "/account/profile", icon: faUser },
      {
        name: "Dịch vụ deploy",
        path: "",
        icon: faLifeRing,
        children: [
          {
            name: "Static deploy",
            path: "/deploy/static",
            icon: faCloud,
          },
          { name: "Deploy Project", path: "/deploy/project", icon: faGlobe },
        ],
      },
    ],
  },

  // Account management
  {
    name: "Tài khoản",
    icon: faUser,
    children: [
      { name: "Thông tin", path: "/profileUser", icon: faUser },
      // { name: "Thông tin thanh toán", path: "/transaction", icon: faEnvelope },
    ],
  },
  // Support
  {
    name: "Hỗ trợ",
    icon: faLifeRing,
    children: [
      { name: "Mở yêu cầu hỗ  trợ", path: "/ticket/create", icon: faLifeRing },
      { name: "Các yêu cầu đã gửi", path: "/ticket/list", icon: faLifeRing },
    ],
  },
];

const checkIsActive = (item, pathname) => {
  if (item.path === pathname) return true;
  if (item.children) {
    return item.children.some((child) => checkIsActive(child, pathname));
  }
  return false;
};

const SidebarItem = ({ item, isOpen, openMenus, toggleSubMenu, level = 0 }) => {
  const pathname = usePathname();
  const hasChildren = item.children && item.children.length > 0;
  const isMenuOpen = openMenus.includes(item.name);

  const isActive = checkIsActive(item, pathname);
  const isParentActive = hasChildren && isActive;
  const isSingleActive = !hasChildren && item.path === pathname;

  // Tính toán padding dựa trên cấp độ (level) để thụt đầu dòng
  // Level 0: 16px, Level 1: 30px, Level 2: 45px...
  const paddingLeft = isOpen ? 16 + level * 14 : 10;

  return (
    <>
      {hasChildren ? (
        <div
          className={`${styles.menuItem} ${
            isParentActive ? styles.activeParent : ""
          }`}
          onClick={() => (!isOpen ? null : toggleSubMenu(item.name))}
          style={{ paddingLeft: `${paddingLeft}px` }}
        >
          <div className={styles.labelContainer}>
            <FontAwesomeIcon icon={item.icon} className={styles.iconFixed} />
            {isOpen && <span className={styles.labelText}>{item.name}</span>}
          </div>

          {isOpen && (
            <FontAwesomeIcon
              icon={isMenuOpen ? faChevronDown : faChevronRight}
              className={styles.arrowIcon}
              style={{ fontSize: "0.8em", marginLeft: "auto" }}
            />
          )}
        </div>
      ) : (
        <Link
          href={item.path}
          className={`${styles.menuItem} ${
            isSingleActive ? styles.active : ""
          }`}
          style={{ paddingLeft: `${paddingLeft}px` }}
        >
          <div className={styles.labelContainer}>
            <FontAwesomeIcon icon={item.icon} className={styles.iconFixed} />
            {isOpen && <span className={styles.labelText}>{item.name}</span>}
          </div>
        </Link>
      )}

      {hasChildren && (
        <div
          className={`${styles.subMenu} ${
            isMenuOpen && isOpen ? styles.open : ""
          }`}
          style={{
            display: isMenuOpen && isOpen ? "block" : "none",
          }}
        >
          {item.children.map((child, index) => (
            <SidebarItem
              key={index}
              item={child}
              isOpen={isOpen}
              openMenus={openMenus}
              toggleSubMenu={toggleSubMenu}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </>
  );
};

// --- MAIN COMPONENT ---
export default function Sidebar({ isOpen }) {
  const [openMenus, setOpenMenus] = useState(["Dịch vụ"]);

  const toggleSubMenu = (name) => {
    if (openMenus.includes(name)) {
      setOpenMenus(openMenus.filter((item) => item !== name));
    } else {
      setOpenMenus([...openMenus, name]);
    }
  };

  return (
    <aside className={`${styles.sidebar} ${!isOpen ? styles.collapsed : ""}`}>
      <nav className={styles.nav}>
        {MENU_ITEMS.map((item, index) => (
          <div key={index} className={styles.menuGroup}>
            <SidebarItem
              item={item}
              isOpen={isOpen}
              openMenus={openMenus}
              toggleSubMenu={toggleSubMenu}
              level={0}
            />
          </div>
        ))}
      </nav>
    </aside>
  );
}
