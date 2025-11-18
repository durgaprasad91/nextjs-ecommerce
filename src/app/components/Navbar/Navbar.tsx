"use client";

import Link from "next/link";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import {
  FiSearch,
  FiMenu,
  FiShoppingCart,
  FiChevronDown,
  FiHeart,
  FiUser,
} from "react-icons/fi";

import LoginMenu from "./LoginMenu";
import MobileMenu from "./MobileMenu";
import SearchSuggestions from "./SearchSuggestions";
import CategorySelect from "./CategorySelect";
import useDebounce from "./useDebounce";

import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

import styles from "./Navbar.module.css";

function Navbar() {
  const router = useRouter();
  const { user } = useAuth();

  const [openMenu, setOpenMenu] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  const searchRef = useRef<HTMLDivElement>(null);
  const loginRef = useRef<HTMLDivElement>(null);

  const debounced = useDebounce(searchQuery, 400);

  const { cart } = useCart();
  const { wishlist } = useWishlist();

  const cartCount = cart.length;
  const wishlistCount = wishlist.length;

  // Close login dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (loginRef.current && !loginRef.current.contains(e.target as Node)) {
        setOpenLogin(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Memoized suggestions to avoid recomputation
  const suggestions = useMemo(() => {
    if (!debounced) return [];

    const data = ["iPhone", "Samsung", "Laptop", "Camera", "Shoes", "Watch"];
    return data.filter((i) =>
      i.toLowerCase().includes(debounced.toLowerCase())
    );
  }, [debounced]);

  // Memoized handler for search action
  const goToSearch = useCallback(() => {
    if (!searchQuery.trim()) return;
    router.push(`/search?q=${searchQuery.trim()}`);
  }, [router, searchQuery]);

  // Memoized category change
  const handleCategoryChange = useCallback((val: string) => {
    setSelectedCategory(val);
  }, []);

  return (
    <header className={styles.navbarWrapper}>
      <div className={styles.navbarContainer}>
        
        {/* LOGO */}
        <Link href="/" className={styles.logo}>
          NextEcom
        </Link>

        {/* SEARCH BAR */}
        <div className={styles.searchBarWrapper} ref={searchRef}>
          <FiSearch className={styles.searchIcon} onClick={goToSearch} />

          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && goToSearch()}
            placeholder="Search for anything"
            className={styles.animatedSearchInput}
          />

          <CategorySelect
            selected={selectedCategory}
            onChange={handleCategoryChange}
          />

          <SearchSuggestions
            suggestions={suggestions}
            onSelect={goToSearch}
          />
        </div>

        {/* RIGHT SIDE */}
        <div className={styles.rightSection}>

          {/* Wishlist */}
          <Link href="/wishlist" className="relative flex items-center gap-1">
            <FiHeart size={22} />
            <span className="hidden sm:block">Wishlist</span>
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-pink-600 text-white text-xs px-2 rounded-full">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link href="/cart" className="relative flex items-center gap-1">
            <FiShoppingCart size={22} />
            <span className="hidden sm:block">Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs px-2 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          {/* LOGIN / PROFILE */}
          <div className="relative" ref={loginRef}>
            <button
              onClick={() => setOpenLogin((prev) => !prev)}
              className={styles.loginBtn}
            >
              {user ? (
                <div className="flex items-center gap-2">
                  <FiUser size={18} />
                  <span className="hidden sm:block">
                    {user.name?.split(" ")[0]}
                  </span>
                  <FiChevronDown size={14} />
                </div>
              ) : (
                <>
                  Login <FiChevronDown size={14} />
                </>
              )}
            </button>

            {openLogin && (
              <LoginMenu onClose={() => setOpenLogin(false)} />
            )}
          </div>

          {/* MOBILE MENU */}
          <button className="md:hidden" onClick={() => setOpenMenu(true)}>
            <FiMenu size={26} />
          </button>
        </div>
      </div>

      {openMenu && <MobileMenu onClose={() => setOpenMenu(false)} />}
    </header>
  );
}

export default Navbar;
