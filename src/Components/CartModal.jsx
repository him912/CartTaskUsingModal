import CardSummary from "./CardSummary";

// function CartModal({
//   product = [],
//   toggleCartModal,
//   onIncrement,
//   onDecrement,
//   removeFromCart,
// }) {
//   // console.log(`removeFromCart: ${removeFromCart}`);

//   const totalItems = product.reduce((sum, item) => sum + item.qty, 0);
//   const totalValue = product.reduce(
//     (sum, item) => sum + item.qty * (item.price || 0),
//     0,
//   );

//   return (
//     <div className="modal-backdrop" onClick={toggleCartModal}>
//       <div className="modal cart-modal" onClick={(e) => e.stopPropagation()}>
//         <button className="close-btn" onClick={toggleCartModal}>
//           X
//         </button>

//         {product.length === 0 ? (
//           <></>
//         ) : (
//           <h2 className="yourCart">Your Cart ({product.length})</h2>
//         )}

//         {product.length === 0 ? (
//           <div className="empty-cart">
//             <h2>Your Cart is Empty 🛒</h2>
//             <p>Add some products to get started</p>
//           </div>
//         ) : (
//           product.map((item) => (
//             <div key={item.id} className="cart-item-wrapper">
//               <CardSummary
//                 key={item.id}
//                 id={item.id}
//                 name={item.title}
//                 qty={item.qty}
//                 image={item.image}
//                 price={item.price}
//                 onIncrement={() => onIncrement(item.id)}
//                 onDecrement={() => onDecrement(item.id)}
//                 removeFromCart={removeFromCart}
//               />
//             </div>
//           ))
//         )}
//       </div>

//       <div className="delivery-box">
//         <div className="delivery-text">
//           Your order is eligible for FREE Delivery 🚚
//         </div>

//         <h3>Total Items: {totalItems}</h3>

//         <h3 className="total-value">Total Value: ₹{totalValue.toFixed(2)}</h3>

//         <button className="buy-btn">Proceed to Buy</button>
//       </div>
//     </div>
//   );
// }

import React from "react";

function CartModal({
  cartItems = [],
  toggleCartModal,
  onIncrement,
  onDecrement,
  removeFromCart,
}) {
  const totalItems = cartItems.reduce((sum, item) => sum + item.qty, 0);
  const totalValue = cartItems.reduce(
    (sum, item) => sum + item.qty * (item.price || 0),
    0,
  );

  return (
    <div className="modal-backdrop" onClick={toggleCartModal}>
      <div className="modal cart-modal" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="close-btn" onClick={toggleCartModal}>
          ✕
        </button>

        {/* Cart Header */}
        {cartItems.length > 0 && (
          <h2 className="yourCart">Your Cart ({cartItems.length})</h2>
        )}

        {/* Empty Cart Message */}
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <h2>Your Cart is Empty 🛒</h2>
            <p>Add some products to get started</p>
          </div>
        ) : (
          <>
            {/* Cart Items List */}
            <div className="cart-items-list">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item-wrapper">
                  {/* Item Image */}
                  {item.thumbnail && (
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="summary-image"
                    />
                  )}

                  {/* Item Details Section */}
                  <section className="cart-item-details">
                    {/* Title */}
                    <h3 className="item-title">{item.title}</h3>

                    {/* Price and Quantity Row */}
                    <div className="item-price-qty">
                      <p className="item-price">
                        Price: ₹{(item.price * 5).toFixed(2)}
                      </p>
                      <p className="item-qty">Qty: {item.qty}</p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="qty-controls">
                      <button
                        className="add-Increament-btn"
                        onClick={() => onDecrement(item.id)}
                        title="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="amount">{item.qty}</span>
                      <button
                        className="add-Decrement-btn"
                        onClick={() => onIncrement(item.id)}
                        title="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    {/* Subtotal */}
                    <h4 className="item-subtotal">
                      Subtotal: ₹{(item.qty * (item.price * 5)).toFixed(2)}
                    </h4>

                    {/* Remove Button */}
                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(item.id)}
                    >
                      🗑️ Remove
                    </button>
                  </section>
                </div>
              ))}
            </div>

            {/* Delivery Box - Summary */}
            <div className="delivery-box">
              <div className="delivery-text">
                ✓ Your order is eligible for FREE Delivery 🚚
              </div>

              <h3>Total Items: {totalItems}</h3>

              <h3 className="total-value">
                Total Value: ₹{totalValue.toFixed(2)}
              </h3>

              <button className="buy-btn">Proceed to Buy</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CartModal;
