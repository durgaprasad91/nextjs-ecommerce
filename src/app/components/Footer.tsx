"use client";

import Link from "next/link";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaCcVisa,
  FaCcMastercard,
  FaCcAmazonPay,
} from "react-icons/fa";

import { SiRazorpay, SiGooglepay } from "react-icons/si";
import { PiCurrencyInrBold } from "react-icons/pi";

export default function Footer() {
  const year = new Date().getFullYear();

  const footerLinks = [
    {
      title: "About",
      links: [
        "Who We Are",
        "Careers",
        "Terms & Conditions",
        "Privacy Policy",
      ],
    },
    {
      title: "Help",
      links: ["Payments", "Shipping", "Returns", "FAQ"],
    },
    {
      title: "Shop",
      links: ["Mobiles", "Fashion", "Electronics", "Beauty"],
      isProduct: true,
    },
  ];

  const socialLinks = [
    { icon: <FaFacebook />, label: "Facebook" },
    { icon: <FaInstagram />, label: "Instagram" },
    { icon: <FaTwitter />, label: "Twitter" },
    { icon: <FaYoutube />, label: "YouTube" },
  ];

  const paymentIcons = [
    <FaCcVisa size={33} className="text-blue-400" />,
    <FaCcMastercard size={33} className="text-red-500" />,
    <SiGooglepay size={33} className="text-white" />,
    <SiRazorpay size={33} className="text-blue-300" />,
    <FaCcAmazonPay size={33} className="text-yellow-300" />,
    <PiCurrencyInrBold size={33} className="text-green-400" />,
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 mt-20 pt-12">
      <div className="container mx-auto px-6">

        {/* GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 pb-10">

          {/* DEFAULT LINK COLUMNS */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-lg font-semibold text-white mb-4">
                {section.title}
              </h4>

              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <Link
                      href={section.isProduct ? "/products" : "#"}
                      className="hover:text-white"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* SOCIAL */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Connect</h4>
            <ul className="space-y-3">
              {socialLinks.map(({ icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-2 hover:text-white"
                >
                  {icon} {label}
                </li>
              ))}
            </ul>
          </div>

          {/* PAYMENTS */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">We Accept</h4>

            <div className="grid grid-cols-3 gap-3 mt-2">
              {paymentIcons.map((icon, i) => (
                <div
                  key={i}
                  className="bg-gray-800 p-3 rounded-lg flex justify-center items-center"
                >
                  {icon}
                </div>
              ))}
            </div>
          </div>

        </div>

        <hr className="border-gray-700" />

        {/* BOTTOM */}
        <div className="text-center py-6 text-sm text-gray-400">
          © {year} NextEcom — All Rights Reserved.
        </div>

      </div>
    </footer>
  );
}
