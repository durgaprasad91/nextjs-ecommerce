"use client";

import Link from "next/link";
import { memo, useCallback } from "react";
import { useAuth } from "../context/AuthContext";

function LoginMenuComponent({ onClose }: { onClose: () => void }) {
  const { user, logout } = useAuth();

  // Stop menu close
  const handleContainerClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  // Logout
  const handleLogout = useCallback(() => {
    logout();
    onClose();
  }, [logout, onClose]);

  // Close when clicking link
  const handleLinkClick = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <div
      className="absolute right-0 mt-2 bg-white shadow-xl p-4 rounded-xl w-56 z-50"
      onClick={handleContainerClick}
    >
      {/* Header — only if user NOT logged in */}
      {!user && (
        <div className="flex justify-between items-center mb-3">
          <span className="text-gray-500 text-sm">New Customer?</span>

          <Link
            href="/signup"
            onClick={handleLinkClick}
            className="text-indigo-600 text-sm font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </div>
      )}

      <ul className="space-y-3 text-gray-700 text-sm">
        <li>
          <Link
            href="/profile"
            onClick={handleLinkClick}
            className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-lg"
          >
            👤 My Profile
          </Link>
        </li>

        <li>
          <Link
            href="/orders"
            onClick={handleLinkClick}
            className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-lg"
          >
            📦 Orders
          </Link>
        </li>

        <li>
          <Link
            href="/wishlist"
            onClick={handleLinkClick}
            className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-lg"
          >
            ❤️ Wishlist
          </Link>
        </li>

        <li className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-lg cursor-pointer">
          ⭐ Rewards
        </li>

        <li className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-lg cursor-pointer">
          🎁 Gift Cards
        </li>

        {user && (
          <li
            onClick={handleLogout}
            className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-lg cursor-pointer text-red-600 font-semibold"
          >
            🚪 Logout
          </li>
        )}
      </ul>
    </div>
  );
}

export default memo(LoginMenuComponent);
