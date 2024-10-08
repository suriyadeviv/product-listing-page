import { generateFilter, filterModal } from './components/Filter.js';
import { generateProductList } from './components/ProductList.js';

let allProducts = [];
let categories = [];
let priceRanges = [];

async function fetchProducts() {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    allProducts = await response.json();

    // Extract unique categories
    categories = Array.from(new Set(allProducts.map(product => product.category)));

    // Find minimum and maximum price
    const prices = allProducts.map(product => product.price);
    const minPrice = Math.floor(Math.min(...prices) / 100) * 100;
    const maxPrice = Math.ceil(Math.max(...prices) / 100) * 100;

    // Create price ranges dynamically
    priceRanges = [];
    for (let i = minPrice; i <= maxPrice; i += 500) {
      priceRanges.push({ min: i, max: i + 499 });
    }

    renderFilters('desktop');
    displayProductList(allProducts);
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}


// Display filtered products
function filterProducts(selectedCategories, selectedPrices) {

  let filteredProducts = allProducts;
  // Filter by selected categories
  if (selectedCategories && selectedCategories.length > 0) {
    filteredProducts = filteredProducts.filter(product => selectedCategories.includes(product.category));
  }

  if (selectedPrices && selectedPrices.length > 0) {
    // Create a filter function to check if the product price is in any of the selected ranges
    filteredProducts = filteredProducts.filter(product =>
      selectedPrices.some(range =>
        product.price >= range.min && product.price <= range.max
      )
    );
  }
  displayProductList(filteredProducts);
}

// Display product list
function displayProductList(products) {
  const productListSection = document.getElementById('product-list-section');
  productListSection.innerHTML = '';
  if (products.length === 0) {
    const noProducts = document.createElement('div');
    noProducts.className = 'product-not-available';
    noProducts.textContent = 'No products available for selected filters';
    productListSection.appendChild(noProducts);
  } else {
    productListSection.appendChild(generateProductList(products));
  }
}

// Render filter component based on the target view (desktop or modal)
function renderFilters(viewType) {
  if (viewType === 'desktop') {
    const filterContainer = generateFilter(categories, priceRanges, filterProducts);
    const filterSection = document.getElementById('filter-section');
    filterSection.innerHTML = '';
    filterSection.appendChild(filterContainer);
  } else if (viewType === 'modal') {
    const modalElement = filterModal(categories, priceRanges, filterProducts);
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
    renderFilters('modal');
    modalView.style.display = 'block';
  });
}


function onSearch(event) {

  const searchTerm = event.target.value.toLowerCase();
  let filteredProducts = allProducts;
  if (searchTerm) {
    filteredProducts = allProducts.filter(product => product.title.toLowerCase().includes(searchTerm));

  }

  displayProductList(filteredProducts);
}

function resetSearch() {

  const searchTerm = document.getElementById('search-bar');
  searchTerm.value = ''
  displayProductList(allProducts);
}

// Initialize the app
function initializeApp() {
  fetchProducts();
  setupFilterModalListeners();

  const searchTerm = document.getElementById('search-bar');
  searchTerm.addEventListener('input', onSearch);

  const reset = document.getElementById('reset-search');
  reset.addEventListener('click', resetSearch);

  document.getElementById('menu-toggle').addEventListener('click', function () {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.toggle('open');
  });
}

initializeApp();
