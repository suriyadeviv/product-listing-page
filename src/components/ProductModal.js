export function generateProductModal(product) {
  const modal = document.createElement('div');
  modal.className = 'modal';

  const modalContent = document.createElement('div');
  modalContent.className = 'modal-content';

  // Close button
  const closeButton = document.createElement('span');
  closeButton.id = 'close-product';
  closeButton.textContent = '×';
  closeButton.addEventListener('click', closeModal);
  closeButton.className = 'close-button';
  modalContent.appendChild(closeButton);

  const modalMainContainer = document.createElement('div');
  modalMainContainer.className = 'modal-main-container';

  // Product details container
  const productDetailsContainer = document.createElement('div');
  productDetailsContainer.className = 'product-details';

  // Title
  const modalTitle = document.createElement('h2');
  modalTitle.className = 'product-title';
  modalTitle.textContent = product.title;
  productDetailsContainer.appendChild(modalTitle);

  // Price and rating container
  const priceRatingContainer = document.createElement('div');
  priceRatingContainer.className = 'price-rating-container';

  // Price element
  const modalPrice = document.createElement('p');
  modalPrice.className = 'modal-price';
  modalPrice.textContent = `$${product.price}`;
  priceRatingContainer.appendChild(modalPrice);

  // Rating element
  const modalRating = document.createElement('p');
  modalRating.className = 'modal-rating';
  modalRating.textContent = `Rating: ${product.rating.rate} (${product.rating.count})`;
  priceRatingContainer.appendChild(modalRating);
  productDetailsContainer.appendChild(priceRatingContainer);

  // Image container
  const modalImage = document.createElement('img');
  modalImage.src = product.image;
  modalImage.className = 'product-image';

  rearrangeModalContent();

  // Add to Cart Button
  const addToCartButton = document.createElement('button');
  addToCartButton.className = "atb-button";
  addToCartButton.textContent = 'Add to Basket';
  productDetailsContainer.appendChild(addToCartButton);

  // Product Description
  const productDescription = document.createElement('p');
  productDescription.className = 'product-description';
  productDescription.textContent = `${product.description}`;
  productDetailsContainer.appendChild(productDescription);

  modalMainContainer.appendChild(productDetailsContainer);

  modalContent.appendChild(modalMainContainer);

  modal.appendChild(modalContent);

  // Close modal when clicking outside of the modal content
  document.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  // Close modal on pressing the escape key
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeModal();
    }
  });

  window.addEventListener('resize', rearrangeModalContent);

  function rearrangeModalContent() {
    if (window.innerWidth <= 600) {
      priceRatingContainer.parentNode.insertBefore(modalImage, priceRatingContainer.nextSibling);
    } else {
      modalMainContainer.prepend(modalImage);
    }
  }

  return modal;
}

// Close modal function
export function closeModal() {
  const modal = document.querySelector('.modal');
  if (modal) {
    modal.remove();
  }
}
