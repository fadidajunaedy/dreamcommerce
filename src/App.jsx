import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Navbar from "./components/Navbar"

import Home from "./pages/Home"
import Product from "./pages/Product"
import Wishlist from "./pages/Wishlist"
import Cart from "./pages/Cart"
import Footer from "./components/Footer"

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <main className="py-4">
        <Routes>
          <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/cart" element={<Cart />} />
        </Routes>
        </main>
        <Footer />
      </Router>
    </>
  )
}

export default App