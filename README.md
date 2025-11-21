# 🛒 Next.js E-Commerce Project

A complete, responsive, fully functional **E-Commerce Web App** built using **Next.js (App Router)**, **React Context**, **TailwindCSS**, and **LocalStorage persistence**.

This project includes **Cart**, **Wishlist**, **Product Details**, **Search**, **Image Upload UI**, **Related Products**, and **full performance optimization** using memoization.

---

## 🚀 Tech Stack

* **Next.js 14 (App Router)**
* **React 18**
* **TypeScript**
* **TailwindCSS**
* **LocalStorage** (for Cart & Wishlist)
* **React Hot Toast** (Notifications)
* **Mock Product Data** (local JSON)
* **Next/Image** Optimization
* **Hooks: useMemo, useCallback, React.memo** for performance

---

## 📦 Features

### 🔥 Core E-Commerce Features

* Full product listing
* Product details page
* Add to Cart / Remove from Cart
* Add to Wishlist / Remove from Wishlist
* Quantity Increase / Decrease
* Related products section
* Discounts & ratings

### 🧠 Smart Functionality

* LocalStorage persistence for cart + wishlist
* Prevent duplicate cart items
* Optimized performance using:

  * `useMemo`
  * `useCallback`
  * `React.memo`
* Skeleton loading screens

### 🎨 UI Features

* Modern, responsive design
* Light & Dark Mode friendly
* Toast notifications
* Clean product thumbnails gallery

---

## 📁 Project Folder Structure

```
src/
 ├── app/
 │    ├── page.tsx                     # Home Page
 │    ├── products/
 │    │      ├── [id]/page.tsx         # Product Details Page
 │    │      └── page.tsx              # Product Listing Page
 │    ├── wishlist/page.tsx            # Wishlist Page
 │    ├── cart/page.tsx                # Cart Page
 │    └── globals.css                  # Tailwind Styles
 ├── components/
 │    ├── context/
 │    │      ├── CartContext.tsx
 │    │      └── WishlistContext.tsx
 │    ├── DealsSection/
 │    │      └── RelatedProducts.tsx
 │    ├── ProductCard.tsx
 │    └── UI Components
 ├── MockData/
 │    └── allProducts.ts               # Product database
```

---

## 🛒 Cart System

### ✔ Features

* Add items with quantity
* Remove items
* Increase / Decrease quantity
* Automatic LocalStorage save
* Toast messages
* Optimized with:

  * stable callbacks
  * memoized values

---

## ❤️ Wishlist System

### ✔ Features

* Add/remove from wishlist
* Saved in LocalStorage
* Fast rendering using `React.memo`
* Empty and filled UI

---

## 🔍 Search Functionality

* Search products by title
* Renders results on a new page
* Home button included

---

## 🖼️ Product Details Page

* Full image gallery with thumbnails
* Price, ratings, description
* Add to Cart / Remove from Cart
* Buy Now option (dummy)
* Product specifications section
* Related products section
---

## ⚡ Performance Optimizations Applied

* Split UI into memoized components
* Stable callbacks using `useCallback`
* Expensive operations wrapped in `useMemo`
* Prevented re-renders using `React.memo`
* Removed unnecessary dependencies
* Avoided inline functions where possible

---

## 👨‍💻 Author

Built with ❤️ by **Durga Prasad**.

For any improvements or changes, feel free to contribute.

---

## 🛠️ License

This project is open-source for learning purposes.
