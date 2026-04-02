import React from "react";

function ProductCard({ product, openModel }) {
  // Calculate discounted price
  const originalPrice = product.price;
  const discountPercentage = product.discountPercentage || 0;
  const discountedPrice =
    originalPrice - (originalPrice * discountPercentage) / 100;

  // Get rating (default to 0 if not available)
  const rating = product.rating?.rate || product.rating || 0;
  const ratingRounded = Math.round(rating * 10) / 10;

  // Get stock status
  const inStock = product.stock > 0;
  const stock = product.stock || 0;

  // Star rating component
  const StarRating = ({ rate }) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span
          key={i}
          className={`star ${i < Math.floor(rate) ? "filled" : ""}`}
        >
          ★
        </span>,
      );
    }
    return stars;
  };
  return (
    <div className="card" onClick={() => openModel(product)}>
      {/* Badges Section */}
      <div className="card-badges">
        {discountPercentage > 0 && (
          <span className="discount-badge">
            -{Math.round(discountPercentage)}%
          </span>
        )}
        <span className="category-badge">{product.category}</span>
      </div>

      {/* Image Section */}
      <div className="card-image-container">
        <img
          src={product.thumbnail || product.image}
          alt={product.title}
          className="product-image"
        />
      </div>

      {/* Title */}
      <h3 className="card-title">{product.title}</h3>

      {/* Rating Section */}
      <div className="card-rating">
        <div className="stars">
          <StarRating rate={ratingRounded} />
        </div>
        <span className="rating-number">({ratingRounded})</span>
      </div>

      {/* Price Section */}
      <div className="card-price-section">
        {discountPercentage > 0 ? (
          <>
            <span className="original-price">
              ₹{Math.round(originalPrice * 5)}
            </span>
            <span className="discounted-price">
              ₹{Math.round(discountedPrice * 5)}
            </span>
          </>
        ) : (
          <span className="discounted-price">
            ₹{Math.round(originalPrice * 5)}
          </span>
        )}
      </div>

      {/* Stock Status */}
      <div className={`card-stock ${inStock ? "in-stock" : "out-of-stock"}`}>
        <span className="stock-indicator">
          {inStock ? "✓ In Stock" : "✗ Out of Stock"}
        </span>
        {inStock && <span className="stock-count">({stock} available)</span>}
      </div>

      {/* Add to Cart Button (Implicit - whole card is clickable) */}
      <button className="card-action-btn">View Details</button>
    </div>
  );
}

export default ProductCard;
