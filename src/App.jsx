import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/home";
import Shop from "./pages/shop";
import About from "./pages/about";
import Disclaimer from "./pages/disclaimer";
import ReturnPolicy from "./pages/returnPolicy";
import Login from "./pages/login";
import Register from "./pages/RegisterUser";
import ProductDetail from "./pages/Products";
import Cart from "./pages/cart";
import Checkout from "./pages/checkout";
import Profile from "./pages/profile";
import AdminDashboard from "./admin.Route/admindashboard";
import AdminUsers from "./admin.Route/adminUser";
import AdminProducts from "./admin.Route/adminProducts";
import AddProduct from "./admin.Route/AddProduct";
import AdminOrders from "./admin.Route/admineOrder";
import EditProduct from "./admin.Route/editProduct";
import OrderSuccess from "./pages/ordersuccess";



function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/return" element={<ReturnPolicy />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/order-success" element={<OrderSuccess />} />




        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/user" element={<AdminUsers />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/add-product" element={<AddProduct />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin/edit-product/:id" element={<EditProduct />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
