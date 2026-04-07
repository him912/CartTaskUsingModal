import React from "react";

function ProductModel({ product, closeModal, addToCart }) {
  // Calculate discounted price
  const originalPrice = product.price;
  const discountPercentage = product.discountPercentage || 0;
  const discountedPrice =
    originalPrice - (originalPrice * discountPercentage) / 100;

  // Get rating
  const rating = product.rating?.rate || product.rating || 0;
  const ratingRounded = Math.round(rating * 10) / 10;
  const ratingCount = product.rating?.count || 0;

  // Get stock status
  const inStock = product.stock > 0;
  const stock = product.stock || 0;

  return (
    <div className="modal-backdrop" onClick={closeModal}>
      <div className="modal modal-product" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="close-btn" onClick={closeModal}>
          ✕
        </button>

        {/* Top Badges Section */}
        <div className="modal-badges">
          {discountPercentage > 0 && (
            <span className="modal-discount-badge">
              -{Math.round(discountPercentage)}% OFF
            </span>
          )}
          <span className="modal-category-badge">{product.category}</span>
          <span
            className={`modal-stock-badge ${inStock ? "in-stock" : "out-of-stock"}`}
          >
            {inStock ? "✓ In Stock" : "✗ Out of Stock"}
          </span>
        </div>

        {/* Image Section */}
        <div className="modal-image-container">
          <img
            src={product.thumbnail || product.image}
            alt={product.title}
            className="modal-product-image"
          />
          {/* {discountPercentage > 0 && (
            <div className="discount-circle">
              {Math.round(discountPercentage)}%
            </div>
          )} */}
        </div>

        {/* Product Title */}
        <h2 className="modal-title">{product.title}</h2>
        {/* Category & Brand Info */}
        <div className="modal-info-grid">
          <div className="modal-info-item">
            <span className="modal-info-label">Category</span>
            <span className="modal-info-value">{product.category}</span>
          </div>
          {product.brand && (
            <div className="modal-info-item">
              <span className="modal-info-label">Brand</span>
              <span className="modal-info-value">{product.brand}</span>
            </div>
          )}
          <div className="modal-info-item">
            <span className="modal-info-label">Availability</span>
            <span
              className={`modal-info-value ${inStock ? "stock-yes" : "stock-no"}`}
            >
              {inStock ? `${stock} items` : "Out of Stock"}
            </span>
          </div>
        </div>

        {/* Price Section */}
        <div className="modal-price-container">
          {discountPercentage > 0 ? (
            <>
              <div className="modal-price-row">
                <span className="modal-original-price">
                  ₹{Math.round(originalPrice * 5)}
                </span>
                <span className="modal-discount-text">
                  {Math.round(discountPercentage)}% OFF
                </span>
              </div>
              <div className="modal-price-row">
                <span className="modal-discounted-price">
                  ₹{Math.round(discountedPrice * 5)}
                </span>
              </div>
            </>
          ) : (
            <div className="modal-price-row">
              <span className="modal-discounted-price">
                ₹{Math.round(originalPrice * 5)}
              </span>
            </div>
          )}
        </div>

        {/* Description */}
        <div className="modal-description-section">
          <h3 className="modal-description-title">About this product</h3>
          <p className="modal-description">{product.description}</p>
        </div>

        {/* Stock Warning */}
        {inStock && stock < 5 && (
          <div className="modal-stock-warning">
            ⚠️ Only {stock} items left! Order soon.
          </div>
        )}

        {/* Add to Cart Button */}
        <div className="button-row-add-btn">
          <button
            className="modal-add-btn"
            onClick={() => addToCart(product)}
            disabled={!inStock}
          >
            {inStock ? "🛒 Add to Cart" : "Out of Stock"}
          </button>
        </div>

        {/* Additional Info */}
        <div className="modal-additional-info"></div>
      </div>
    </div>
    // <div className="modal-backdrop" onClick={closeModal}>
    //   <div className="modal modal-product" onClick={(e) => e.stopPropagation()}>
    //     {/* Close Button */}
    //     <button className="close-btn" onClick={closeModal}>
    //       ✕
    //     </button>

    //     {/* Top Badges Section */}
    //     <div className="modal-badges">
    //       {discountPercentage > 0 && (
    //         <span className="modal-discount-badge">
    //           -{Math.round(discountPercentage)}% OFF
    //         </span>
    //       )}
    //       <span className="modal-category-badge">{product.category}</span>
    //       <span
    //         className={`modal-stock-badge ${inStock ? "in-stock" : "out-of-stock"}`}
    //       >
    //         {inStock ? "✓ In Stock" : "✗ Out of Stock"}
    //       </span>
    //     </div>

    //     {/* Image Section */}
    //     <div className="modal-image-container">
    //       <img
    //         src={product.thumbnail || product.image}
    //         alt={product.title}
    //         className="modal-product-image"
    //       />
    //       {/* {discountPercentage > 0 && (
    //         <div className="discount-circle">
    //           {Math.round(discountPercentage)}%
    //         </div>
    //       )} */}
    //     </div>

    //     {/* Product Title */}
    //     <h2 className="modal-title">{product.title}</h2>
    //     {/* Category & Brand Info */}
    //     <div className="modal-info-grid">
    //       <div className="modal-info-item">
    //         <span className="modal-info-label">Category</span>
    //         <span className="modal-info-value">{product.category}</span>
    //       </div>
    //       {product.brand && (
    //         <div className="modal-info-item">
    //           <span className="modal-info-label">Brand</span>
    //           <span className="modal-info-value">{product.brand}</span>
    //         </div>
    //       )}
    //       <div className="modal-info-item">
    //         <span className="modal-info-label">Availability</span>
    //         <span
    //           className={`modal-info-value ${inStock ? "stock-yes" : "stock-no"}`}
    //         >
    //           {inStock ? `${stock} items` : "Out of Stock"}
    //         </span>
    //       </div>
    //     </div>

    //     {/* Price Section */}
    //     <div className="modal-price-container">
    //       {discountPercentage > 0 ? (
    //         <>
    //           <div className="modal-price-row">
    //             <span className="modal-original-price">
    //               ₹{Math.round(originalPrice * 5)}
    //             </span>
    //             <span className="modal-discount-text">
    //               {Math.round(discountPercentage)}% OFF
    //             </span>
    //           </div>
    //           <div className="modal-price-row">
    //             <span className="modal-discounted-price">
    //               ₹{Math.round(discountedPrice * 5)}
    //             </span>
    //           </div>
    //         </>
    //       ) : (
    //         <div className="modal-price-row">
    //           <span className="modal-discounted-price">
    //             ₹{Math.round(originalPrice * 5)}
    //           </span>
    //         </div>
    //       )}
    //     </div>

    //     {/* Description */}
    //     <div className="modal-description-section">
    //       <h3 className="modal-description-title">About this product</h3>
    //       <p className="modal-description">{product.description}</p>
    //     </div>

    //     {/* Stock Warning */}
    //     {inStock && stock < 5 && (
    //       <div className="modal-stock-warning">
    //         ⚠️ Only {stock} items left! Order soon.
    //       </div>
    //     )}

    //     {/* Add to Cart Button */}
    //     <div className="button-row-add-btn">
    //       <button
    //         className="modal-add-btn"
    //         onClick={() => addToCart(product)}
    //         disabled={!inStock}
    //       >
    //         {inStock ? "🛒 Add to Cart" : "Out of Stock"}
    //       </button>
    //     </div>

    //     {/* Additional Info */}
    //     <div className="modal-additional-info"></div>
    //   </div>
    // </div>
  );
}

export default ProductModel;
