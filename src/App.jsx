import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/home";
import About from "./pages/about";
import Disclaimer from "./pages/disclaimer";
import ReturnPolicy from "./pages/returnPolicy";
import Login from "./pages/login";
import Register from "./pages/RegisterUser";
import ProductDetail from "./pages/Products";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
       <Route path="/return" element={<ReturnPolicy />} />
       <Route path="/login" element={<Login />} />
       <Route path="/register" element={<Register />} />
       <Route path="/products/:id" element={<ProductDetail />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;