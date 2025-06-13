import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import { AnimatePresence } from "framer-motion";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import ProductDetails from "./pages/ProductDetails";
import About from "./pages/About";
import PageTransition from "./components/PageTransition";

function App() {
  const location = useLocation();

  return (
    <div className="bg-[#f9f9f9] min-h-screen text-gray-900">
      <Navbar />
      <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/catalog" element={<PageTransition><Catalog /></PageTransition>} />
        <Route path="/product/:productId" element={<PageTransition><ProductDetails /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
      </Routes>
      </AnimatePresence>

    </div>
  );
}

export default App;