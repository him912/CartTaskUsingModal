/**
 * App.jsx
 * Main application component handling product listing, cart management, and routing
 */

import { useEffect, useState } from "react";

import axios from "axios";

import Header from "./Components/Header";
import ProductCard from "./Components/ProductCard";
import ProductModel from "./Components/ProductModel";
import CartModal from "./Components/CartModal";
import "./App.css";
import "./styles/ProductCard.css";
import "./styles/Header.css";
import "./styles/ProductModel.css";
import "./styles/CartModal.css";

const FAKE_STORE_API = "https://dummyjson.com/products";

function App() {
  // State Management
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [showCartModal, setShowCartModal] = useState(false);

  /**
   * Fetch products from Fake Store API on component mount
   */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios(FAKE_STORE_API);
        console.log(response.data.products);
        // console.log(response.data.total);
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  /**
   * Close product modal
   */
  const closeModal = () => {
    setSelectedProduct(null);
  };

  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      // Product already in cart, show alert
      alert("Item already added to the cart");
      return;
    }

    // New product, add with qty = 1
    setCart((prev) => [...prev, { ...product, qty: 1 }]);
    closeModal();
  };

  /**
   * Change product quantity in cart
   * @param {number} productId - Product ID
   * @param {number} delta - Change in quantity (+1 or -1)
   */
  const changeQty = (productId, delta) => {
    setCart(
      (prev) =>
        prev
          .map((item) =>
            item.id === productId
              ? { ...item, qty: Math.max(1, item.qty + delta) }
              : item,
          )
          .filter((item) => item.qty > 0), // Remove items with qty 0
    );
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };
  /**
   * Toggle cart modal visibility
   */
  const toggleCartModal = () => {
    setShowCartModal(!showCartModal);
  };
  /**
   * Open product modal for details view
   * @param {Object} product - Product to display
   */
  const openModel = (product) => {
    setSelectedProduct(product);
  };

  // Calculate total cart count
  // const totalCartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const uniqueCount = cart.length;

  return (
    <div>
      <Header cartCount={uniqueCount} toggleCartModal={toggleCartModal} />

      {/* Home - Product Listing */}
      {loading ? (
        <p className="message">Loading products...</p>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              openModel={openModel}
            />
          ))}
        </div>
      )}

      {/* Product Details Modal */}
      {selectedProduct && (
        <ProductModel
          product={selectedProduct}
          closeModal={closeModal}
          addToCart={addToCart}
        />
      )}

      {/* Cart - Order Summary */}
      {/* Cart Modal */}
      {showCartModal && (
        <CartModal
          cartItems={cart}
          toggleCartModal={toggleCartModal}
          onIncrement={(id) => changeQty(id, 1)}
          onDecrement={(id) => changeQty(id, -1)}
          removeFromCart={removeFromCart}
        />
      )}
    </div>
  );
}

export default App;
