import React from "react";
import CardSummary from "../Components/CardSummary";

function CartModal({
  product = [],
  toggleCartModal,
  onIncrement,
  onDecrement,
  removeFromCart,
}) {
  // console.log(`removeFromCart: ${removeFromCart}`);

  const totalItems = product.reduce((sum, item) => sum + item.qty, 0);
  const totalValue = product.reduce(
    (sum, item) => sum + item.qty * (item.price || 0),
    0,
  );

  return (
    <div className="modal-backdrop" onClick={toggleCartModal}>
      <div className="modal cart-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={toggleCartModal}>
          X
        </button>

        {product.length === 0 ? (
          <></>
        ) : (
          <h2 className="yourCart">Your Cart ({product.length})</h2>
        )}

        {product.length === 0 ? (
          <div className="empty-cart">
            <h2>Your Cart is Empty 🛒</h2>
            <p>Add some products to get started</p>
          </div>
        ) : (
          product.map((item) => (
            <div key={item.id} className="cart-item-wrapper">
              <CardSummary
                key={item.id}
                id={item.id}
                name={item.title}
                qty={item.qty}
                image={item.image}
                price={item.price}
                onIncrement={() => onIncrement(item.id)}
                onDecrement={() => onDecrement(item.id)}
                removeFromCart={removeFromCart}
              />
            </div>
          ))
        )}
      </div>

      <div className="delivery-box">
        <div className="delivery-text">
          Your order is eligible for FREE Delivery 🚚
        </div>

        <h3>Total Items: {totalItems}</h3>

        <h3 className="total-value">Total Value: ₹{totalValue.toFixed(2)}</h3>

        <button className="buy-btn">Proceed to Buy</button>
      </div>
    </div>
  );
}

export default CartModal;
