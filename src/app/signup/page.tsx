"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "../components/context/AuthContext";
import toast from "react-hot-toast";

export default function SignupPage() {
  const { signup } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = (e: any) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      toast.error("Please fill all fields");
      return;
    }

    signup(formData.name, formData.email, formData.password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">

      {/* ANIMATED GRADIENT BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-indigo-600 to-sky-500 animate-bgMove opacity-90"></div>

      {/* Floating shapes */}
      <div className="floating floating-1"></div>
      <div className="floating floating-2"></div>
      <div className="floating floating-3"></div>

      {/* 3D SIGNUP CARD */}
      <div
        className="relative w-full max-w-md p-8 rounded-3xl glass-card shadow-2xl transition-transform duration-300 hover:scale-[1.02]"
      >
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Create Account
        </h2>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="text-white font-medium">Full Name</label>
            <input
              name="name"
              type="text"
              onChange={handleChange}
              className="inputField"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="text-white font-medium">Email</label>
            <input
              name="email"
              type="email"
              onChange={handleChange}
              className="inputField"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="text-white font-medium">Password</label>
            <input
              name="password"
              type="password"
              onChange={handleChange}
              className="inputField"
              placeholder="Create a password"
            />
          </div>

          {/* SIGNUP BUTTON */}
          <button
            type="submit"
            className="w-full mt-4 py-3 bg-white text-indigo-700 font-semibold rounded-xl shadow-lg hover:bg-gray-100 transition"
          >
            Sign Up
          </button>
        </form>

        {/* Link To Login */}
        <p className="text-center text-white mt-4">
          Already have an account?{" "}
          <Link href="/login" className="underline font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
