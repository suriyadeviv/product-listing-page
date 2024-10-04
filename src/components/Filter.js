export function generateFilter(categories, onFilterChange) {
    const filterContainer = document.createElement('div');
    filterContainer.className = 'filter-container';

    const filterTitle = document.createElement('h2');
    filterTitle.textContent = 'Filter';

    // Create the Clear All button
    const clearButton = document.createElement('button');
    clearButton.textContent = 'Clear All';
    clearButton.className = 'clear-all';
    clearButton.addEventListener('click', () => {
        const checkboxes = filterContainer.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => (checkbox.checked = false));
        updateSelectedFilters([]);
        onFilterChange(categories);
    });

    filterTitle.appendChild(clearButton);
    filterContainer.appendChild(filterTitle);

    const selectedFiltersContainer = document.createElement('div');

    const updateSelectedFilters = (selectedCategories) => {
        selectedFiltersContainer.className = 'filtered-categories';
        selectedFiltersContainer.textContent = '';

        selectedCategories.forEach((checkboxValue) => {
            createFilterTag(checkboxValue);
        });
    }

    // Function to create a filter tag with close button
    function createFilterTag(value) {
        const filterTag = document.createElement('div');
        filterTag.classList.add('filter-tag');
        filterTag.setAttribute('data-filter', value);

        const filterLabel = document.createElement('span');
        filterLabel.textContent = value;

        const closeButton = document.createElement('span');
        closeButton.classList.add('close-icon');
        closeButton.innerHTML = '&times;';

        closeButton.addEventListener('click', () => {
            const checkbox = document.querySelector(`input[value="${value}"]`);

            if (checkbox) {
                checkbox.checked = false;
            }

            filterTag.remove();
            const updatedCategories = Array.from(document.querySelectorAll('.filter-tag')).map(tag => tag.getAttribute('data-filter'));

            if (updatedCategories.length !== 0) {
                updateSelectedFilters(updatedCategories);
                onFilterChange(updatedCategories);
            } else {

                updateSelectedFilters([])
                onFilterChange(categories);
            }
        });

        filterTag.appendChild(filterLabel);
        filterTag.appendChild(closeButton);
        selectedFiltersContainer.appendChild(filterTag);

        const checkbox = document.querySelector(`input[value="${value}"]`);
        if (checkbox) {
            checkbox.checked = true;
        }

    }

    filterContainer.appendChild(selectedFiltersContainer);
    filterContainer.appendChild(document.createElement('hr'));

    const categoryHeader = document.createElement('div');
    categoryHeader.textContent = 'CATEGORY';
    categoryHeader.className = 'category-header';
    filterContainer.appendChild(categoryHeader);

    const filterSection = document.createElement('div');
    filterSection.className = 'filter-section';

    categories.forEach(category => {
        const label = document.createElement('label');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = category;

        checkbox.addEventListener('change', () => {
            const selectedCategories = Array.from(
                filterContainer.querySelectorAll('input:checked')
            ).map(input => input.value);

            onFilterChange(selectedCategories);
            updateSelectedFilters(selectedCategories);
        });

        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(category));
        filterSection.appendChild(label);
    });

    filterContainer.appendChild(filterSection);

    return filterContainer;
}


// Close modal function
export function filterModal(categories, onFilterChange) {
    const modal = document.createElement('div');
    modal.className = 'modal-filter';
    const filterContainer = generateFilter(categories, onFilterChange);

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

    return modal
}
