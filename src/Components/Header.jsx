import React from "react";

function Header({ cartCount, toggleCartModal }) {
  return (
    <header className="header">
      {/* <h2>My Store</h2> */}

      <h2 className="mystore"> 🛒 Store .</h2>

      <div className="cart-box">
        <button
          className="cart-btn"
          onClick={toggleCartModal}
          style={{
            background: "none",
            border: "none",
            color: "inherit",
            cursor: "pointer",
            fontSize: "inherit",
            fontWeight: "inherit",
          }}
        >
          🛍️
        </button>
        Cart: {cartCount}
      </div>
    </header>
  );
}

export default Header;
