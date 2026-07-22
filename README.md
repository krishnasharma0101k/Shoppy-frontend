# 🛍️ Shoppy — E-Commerce Frontend

The customer- and admin-facing web client for **Shoppy**, an e-commerce platform. Built with React 19, React Router, and Redux Toolkit, it consumes the [Shoppy backend API](https://github.com/krishnasharma0101k/shoppy) to deliver product browsing, cart & checkout, order tracking, and a full admin dashboard.

**Live site:** [live-shoppy.netlify.app](https://live-shoppy.netlify.app)

---

## ✨ Features

### Storefront
- 🏠 Home, shop, and product detail pages
- 🛒 Persistent shopping cart (Redux Toolkit + `localStorage`)
- 💳 Checkout with Razorpay payment integration
- 👤 User registration, login, and profile with order history
- 📄 Static info pages — About, Disclaimer, Return Policy

### Admin Dashboard
- 📊 Admin overview dashboard
- 📦 Product management — add, edit, delete products
- 🧾 Order management — view all orders, update order status
- 👥 User management

---

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| Library | React 19 |
| Routing | React Router DOM 6 |
| State Management | Redux Toolkit + React Redux (cart), Context API (auth) |
| Build Tooling | Create React App (`react-scripts`) |
| Payments | Razorpay Checkout (client-side) |
| Deployment | Netlify |

---

## 📁 Project Structure

```
Shoppy-frontend/
├── public/
│   ├── index.html
│   ├── ShoppyLOGO.svg
│   └── _redirects              # Netlify SPA routing config
├── src/
│   ├── admin.Route/             # Admin-only pages
│   │   ├── admindashboard.jsx
│   │   ├── adminProducts.jsx
│   │   ├── AddProduct.jsx
│   │   ├── editProduct.jsx
│   │   ├── admineOrder.jsx
│   │   └── adminUser.jsx
│   ├── components/              # Shared UI components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── products.card.jsx
│   ├── context/
│   │   └── AuthContext.jsx      # User auth state (login/logout, token storage)
│   ├── pages/                   # Storefront pages
│   │   ├── home.jsx
│   │   ├── shop.jsx
│   │   ├── Products.jsx         # Product detail page
│   │   ├── cart.jsx
│   │   ├── checkout.jsx
│   │   ├── ordersuccess.jsx
│   │   ├── profile.jsx
│   │   ├── login.jsx
│   │   ├── RegisterUser.jsx
│   │   ├── about.jsx
│   │   ├── disclaimer.jsx
│   │   └── returnPolicy.jsx
│   ├── redux/
│   │   ├── store.js
│   │   └── cardSlice.js         # Cart state slice
│   ├── style/                   # Component/page-level CSS
│   ├── App.jsx                  # Route definitions
│   └── index.js                 # App entry point
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- A running instance of the [Shoppy backend API](https://github.com/krishnasharma0101k/shoppy) (locally or deployed)

### 1. Clone & install

```bash
git clone https://github.com/krishnasharma0101k/Shoppy-frontend.git
cd Shoppy-frontend
npm install
```

### 2. Configure environment variables

Create a `.env` file in the project root:

```env
REACT_APP_BACKEND_URL=http://localhost:4000
```

This should point to wherever your Shoppy backend API is running. Every API call in the app — auth, products, orders, payments — is built from this variable.

### 3. Run the app

```bash
npm run dev      # starts the dev server (react-scripts start)
```

> Note: the `dev` script sets `PORT=4000` for the frontend dev server. If your backend is also running on port 4000, you'll get a conflict — either run the frontend on a different port (e.g. `set PORT=3000 && react-scripts start`) or point `REACT_APP_BACKEND_URL` at wherever the backend actually ends up running.

Other available scripts:

```bash
npm run build     # production build to /build
npm test          # run tests in watch mode
npm run eject     # eject CRA config (irreversible)
```

---

## 🔌 Backend Integration

This frontend expects the [Shoppy backend](https://github.com/krishnasharma0101k/shoppy) to expose the following endpoints under `REACT_APP_BACKEND_URL`:

| Feature | Endpoint(s) used |
|---|---|
| Auth | `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/users` |
| Products | `GET /api/products`, `GET /api/products/:id`, `POST /api/products`, `PUT /api/products/:id` |
| Orders | `POST /api/orders`, `GET /api/orders/myorders`, `GET /api/orders`, `PUT /api/orders/:id/status` |
| Payments | `POST /api/payment/verify` |

Authenticated requests include a JWT (issued at login and stored via `AuthContext`) as a Bearer token in the `Authorization` header.

---

## 🔐 Authentication Flow

- On login/registration, the backend returns a JWT + user info.
- `AuthContext` (`src/context/AuthContext.jsx`) stores this in React state and persists it to `localStorage` (`userInfo`, `token`).
- Protected UI (profile, checkout, admin routes) reads from this context to gate access and attach the token to API requests.

---

## 🛒 Cart State

Cart state is managed via a Redux Toolkit slice (`src/redux/cardSlice.js`) and persisted to `localStorage` under `cartItems`, so the cart survives page reloads.

---

## 🌐 Deployment

The app is configured for **Netlify** deployment:
- `public/_redirects` rewrites all routes to `index.html`, enabling client-side routing (React Router) to work correctly on Netlify.
- Set `REACT_APP_BACKEND_URL` as an environment variable in your Netlify site settings to point to your production backend.

```bash
npm run build
# deploy the /build folder to Netlify (or any static host)
```

---

## 📄 License

ISC — © Krishna Sharma
