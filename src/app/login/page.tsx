"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import { useAuth } from "../components/context/AuthContext";
import toast from "react-hot-toast";
import { FiMail, FiLock } from "react-icons/fi";

const LoginPage = React.memo(() => {
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Stable handleChange using useCallback
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    []
  );

  // Stable handleLogin using useCallback
  const handleLogin = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const { email, password } = formData;

      if (!email || !password) {
        toast.error("Please fill all fields");
        return;
      }

      login(email, password);
    },
    [formData, login]
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* BG */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 animate-bgMove opacity-95"></div>

      {/* Floating Shapes */}
      <div className="floating floating-1"></div>
      <div className="floating floating-2"></div>
      <div className="floating floating-3"></div>

      {/* LOGIN CARD */}
      <div className="relative w-full max-w-md p-8 rounded-3xl glass-card shadow-2xl transition-transform duration-300 hover:scale-[1.02]">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Welcome back
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* EMAIL */}
          <div>
            <label className="text-white font-medium">Email</label>
            <div className="inputField flex items-center gap-3">
              <FiMail className="text-white text-lg" />
              <input
                name="email"
                type="email"
                onChange={handleChange}
                className="bg-transparent flex-1 outline-none text-white placeholder-white/70"
                placeholder="Enter your email"
                value={formData.email}
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-white font-medium">Password</label>
            <div className="inputField flex items-center gap-3">
              <FiLock className="text-white text-lg" />
              <input
                name="password"
                type="password"
                onChange={handleChange}
                className="bg-transparent flex-1 outline-none text-white placeholder-white/70"
                placeholder="Enter your password"
                value={formData.password}
              />
            </div>
          </div>

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            className="w-full mt-4 py-3 bg-white text-indigo-700 font-semibold rounded-xl shadow-lg hover:bg-gray-100 transition"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-white mt-4">
          Don't have an account?{" "}
          <Link href="/signup" className="underline font-semibold">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
});

export default LoginPage;
