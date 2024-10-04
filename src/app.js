import { generateFilter, filterModal } from './components/Filter.js';
import { generateProductList } from './components/ProductList.js';

let allProducts = [];
let categories = [];

async function fetchProducts() {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    allProducts = await response.json();

    // Extract unique categories
    categories = Array.from(new Set(allProducts.map(product => product.category)));

    renderCategories('desktop');
    displayProductList(allProducts);
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}

// Display filtered products
function filterProducts(selectedCategories) {
  const filteredProducts = allProducts.filter(product => selectedCategories.includes(product.category));
  displayProductList(filteredProducts);
}

// Display product list
function displayProductList(products) {
  const productListSection = document.getElementById('product-list-section');
  productListSection.innerHTML = '';
  productListSection.appendChild(generateProductList(products));
}

// Render filter component based on the target view (desktop or modal)
function renderCategories(viewType) {
  if (viewType === 'desktop') {
    const filterContainer = generateFilter(categories, filterProducts);
    const filterSection = document.getElementById('filter-section');
    filterSection.innerHTML = ''; 
    filterSection.appendChild(filterContainer);
  } else if (viewType === 'modal') {
    const modalElement = filterModal(categories, filterProducts);
    const filterModalContainer = document.getElementById('filter-modal');
    filterModalContainer.innerHTML = ''; 
    filterModalContainer.appendChild(modalElement);
  }
}

// Event listeners for modal behavior
function setupFilterModalListeners() {
  const filterBtn = document.getElementById('filter-btn');
  const modalView = document.getElementById('filter-modal');

  filterBtn.addEventListener('click', () => {
    renderCategories('modal');
    modalView.style.display = 'block';
  });
}

// Initialize the app
function initializeApp() {
  fetchProducts();
  setupFilterModalListeners();

  document.getElementById('menu-toggle').addEventListener('click', function () {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.toggle('open');
});
}

initializeApp();
