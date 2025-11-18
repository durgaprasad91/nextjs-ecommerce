"use client";

import Link from "next/link";
import { FiX } from "react-icons/fi";
import { memo, useCallback, useMemo } from "react";
import styles from "./Navbar.module.css";

function MobileMenu({ onClose }: { onClose: () => void }) {
  // Stop propagation memoized (prevents re-created function)
  const stopPropagation = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  // Menu Items (memoized)
  const menuItems = useMemo(
    () => [
      { href: "/wishlist", label: "❤️ Wishlist" },
      { href: "/cart", label: "🛒 Cart" },
      { href: "/products", label: "📦 Products" },
      { href: "/login", label: "🔐 Login" },
    ],
    []
  );

  return (
    <div className={styles.mobileMenuOverlay} onClick={onClose}>
      <div className={styles.mobileMenuPanel} onClick={stopPropagation}>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Menu</h3>
          <FiX size={26} className="cursor-pointer" onClick={onClose} />
        </div>

        <div className="flex flex-col space-y-4">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={styles.mobileItem}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default memo(MobileMenu);
