import { generateProductModal } from './ProductModal.js';

export function generateProductList(products) {
  const productList = document.createElement('div');
  productList.className = 'product-list';

  products.forEach((product, index) => {
    const productItem = document.createElement('div');
    productItem.className = 'product-item';
    productItem.tabIndex = 0; 
    productItem.setAttribute('aria-label', product.title);

    const productImage = document.createElement('img');
    productImage.className = 'product-image'

    productImage.alt = product.title;

    //lazy loading
    if (index > 6) { 
      productImage.src = product.image;
      productImage.loading = 'lazy';
    } else {
      productImage.src = product.image;
    }

    productItem.appendChild(productImage);

    const productTitle = document.createElement('p');
    productTitle.textContent = product.title;
    productItem.appendChild(productTitle);

    const productPrice = document.createElement('h2');
    productPrice.textContent = `$${product.price}`;
    productItem.appendChild(productPrice);


    productItem.addEventListener('click', () => {
      document.getElementById('modal-container').appendChild(generateProductModal(product));
    });

    // Handle keyboard navigation
    productItem.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        productItem.click(); // Simulate a click when Enter or Space is pressed
      }
    });

    productList.appendChild(productItem);
  });

  return productList;
}
