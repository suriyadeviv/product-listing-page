export function generateFilter(categories, priceRanges, onFilterChange) {
    const filterContainer = createFilterContainer();
    const selectedFiltersContainer = document.createElement('div');

    // Create the Clear All button
    createClearAllButton(filterContainer, selectedFiltersContainer, categories, priceRanges, onFilterChange);
    filterContainer.appendChild(selectedFiltersContainer);
    filterContainer.appendChild(document.createElement('hr'));

    createCategorySection(filterContainer, categories, selectedFiltersContainer, onFilterChange);
    filterContainer.appendChild(document.createElement('hr'));

    createPriceRangeSection(filterContainer, priceRanges, selectedFiltersContainer, onFilterChange);
    
    return filterContainer;
}

function createFilterContainer() {
    const filterContainer = document.createElement('div');
    filterContainer.className = 'filter-container';

    return filterContainer;
}

function createClearAllButton(container, selectedFiltersContainer, categories, priceRanges, onFilterChange) {

    const filterTitle = document.createElement('h2');
    filterTitle.textContent = 'Filter';
    

    const clearButton = document.createElement('button');
    clearButton.textContent = 'Clear All';
    clearButton.className = 'clear-all';
    clearButton.addEventListener('click', () => {
        const checkboxes = container.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => (checkbox.checked = false));
        updateSelectedFilters([], [], selectedFiltersContainer, onFilterChange);
        onFilterChange(categories, priceRanges);
    });
    filterTitle.appendChild(clearButton);
    container.appendChild(filterTitle)
}

function formatPriceRange(priceRange) {
    return `${priceRange.min} - ${priceRange.max}`;
}

function updateSelectedFilters(selectedCategories, selectedPrices, selectedFiltersContainer, onFilterChange) {
    selectedFiltersContainer.className = 'filtered-categories';
    selectedFiltersContainer.textContent = '';

    if (selectedCategories.length > 0) {
        selectedCategories.forEach(value => createFilterTag(value, 'category', selectedFiltersContainer, onFilterChange));
    }

    if (selectedPrices.length > 0) {
        selectedPrices.forEach(value => createFilterTag(formatPriceRange(value), 'price', selectedFiltersContainer, onFilterChange));
    }
}

function createFilterTag(value, type, selectedFiltersContainer, onFilterChange) {
     // Check if the tag already exists
     const existingTag = document.querySelector(`.filter-tag[data-filter="${value}"][data-type="${type}"]`);
     if (existingTag) {
         return; // Exit if the tag already exists
     }
    const filterTag = document.createElement('div');
    filterTag.classList.add('filter-tag');
    filterTag.setAttribute('data-filter', value);
    filterTag.setAttribute('data-type', type);

    const filterLabel = document.createElement('span');
    filterLabel.textContent = value;

    const closeButton = document.createElement('span');
    closeButton.classList.add('close-icon');
    closeButton.innerHTML = '&times;';

    closeButton.addEventListener('click', () => {
        removeFilterTag(value, type, selectedFiltersContainer, onFilterChange);
    });

    filterTag.appendChild(filterLabel);
    filterTag.appendChild(closeButton);
    selectedFiltersContainer.appendChild(filterTag);

    // Check the corresponding checkbox
    const checkbox = document.querySelector(`input[value="${value}"]`);
    if (checkbox) {
        checkbox.checked = true;
    }
}

function removeFilterTag(value, type, selectedFiltersContainer, onFilterChange) {
    const checkbox = document.querySelector(`input[value="${value}"]`);
    if (checkbox) {
        checkbox.checked = false; // Uncheck the corresponding checkbox
    }

    const filterTag = selectedFiltersContainer.querySelector(`.filter-tag[data-filter="${value}"]`);
    if (filterTag) {
        filterTag.remove(); // Remove the tag from the UI
    }

    const selectedCategories = getSelectedCheckboxes('category');
    const selectedPrices = getSelectedCheckboxes('price').map(getMinMax);
    updateSelectedFilters(selectedCategories, selectedPrices, selectedFiltersContainer, onFilterChange);
    onFilterChange(selectedCategories, selectedPrices);
}

function createCategorySection(container, categories, selectedFiltersContainer, onFilterChange) {
    const categoryHeader = document.createElement('div');
    categoryHeader.textContent = 'CATEGORY';
    categoryHeader.className = 'category-header';
    container.appendChild(categoryHeader);

    const filterSection = document.createElement('div');
    filterSection.className = 'filter-section';

    categories.forEach(category => {
        const label = document.createElement('label');
        const checkbox = createCheckbox(category, 'category', selectedFiltersContainer, onFilterChange);
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(category));
        filterSection.appendChild(label);
    });

    container.appendChild(filterSection);
}

function createPriceRangeSection(container, priceRanges, selectedFiltersContainer, onFilterChange) {
    const priceHeader = document.createElement('div');
    priceHeader.textContent = 'PRICE RANGE';
    priceHeader.className = 'price-header';
    container.appendChild(priceHeader);

    const priceSection = document.createElement('div');
    priceSection.className = 'price-section';

    priceRanges.forEach(range => {
        const label = document.createElement('label');
        const checkbox = createCheckbox(`${range.min} - ${range.max}`, 'price', selectedFiltersContainer, onFilterChange);
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(`$${range.min} - $${range.max}`));
        priceSection.appendChild(label);
    });

    container.appendChild(priceSection);
}

function createCheckbox(value, type, selectedFiltersContainer, onFilterChange) {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.value = value;
    checkbox.setAttribute('data-type', type);
    checkbox.setAttribute('tabindex', '0');

    checkbox.addEventListener('change', () => {
        const selectedCategories = getSelectedCheckboxes('category');
        const selectedPriceStrings = getSelectedCheckboxes('price');
        const selectedPrices = selectedPriceStrings.map(getMinMax);
        updateSelectedFilters(selectedCategories, selectedPrices, selectedFiltersContainer, onFilterChange);
        onFilterChange(selectedCategories, selectedPrices);
    });

    return checkbox;
}

function getMinMax(priceRange) {
    const [min, max] = priceRange.split('-').map(value => value.trim());
    return { min: Number(min), max: Number(max) };
}

function getSelectedCheckboxes(type) {
    return Array.from(new Set(Array.from(document.querySelectorAll(`input[data-type="${type}"]:checked`))
        .map(input => input.value)));
}

// Close modal function
export function filterModal(categories, priceRanges, onFilterChange) {
    const modal = document.createElement('div');
    modal.className = 'modal-filter';
    const filterContainer = generateFilter(categories, priceRanges, onFilterChange);

    // Create the modal close button
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.className = 'close-modal';
    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close modal when clicking outside of the modal content
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Close modal on pressing the escape key
    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            modal.style.display = 'none';
        }
    });

    filterContainer.appendChild(closeButton);
    modal.appendChild(filterContainer);
    document.body.appendChild(modal);

    return modal;
}
