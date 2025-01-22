import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Header from "./components/Header"

import Home from "./pages/Home"
import Cart from "./pages/Cart"
import Product from "./pages/Product"

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <main>
        <Routes>
          <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
        </Routes>
        </main>
      </Router>
    </>
  )
}

export default App