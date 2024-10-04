describe('Product Listing App - Desktop view', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/src/index.html');
  });

  it('should fetch products and display them', async () => {
    await cy.wait(1000);
    cy.get('#product-list-section').should('be.visible');

    cy.get('.product-item').should('have.length.greaterThan', 0);
  });

  it('should render the categories correctly', async() => {
    await cy.wait(1000);
    cy.get('.filter-section').should('be.visible');

    const expectedCategories = ["Men's Clothing", "Women's Clothing", "Jewelery", "Electronics"];

    expectedCategories.forEach((category) => {
      cy.contains(category).should('exist');
    });
  });

  it('should open the product modal when a product is clicked', async() => {
    await cy.wait(1000);
    cy.get('.product-item').should('have.length.greaterThan', 0);
    cy.get('.product-item').first().click();

    cy.get('.modal').should('be.visible');
    cy.get('.product-title').should('be.visible');
  });

  it('should close the modal when clicking the close button', async() => {
    await cy.wait(1000);
    cy.get('.product-item').should('have.length.greaterThan', 0);
    cy.get('.product-item').first().click();

    cy.get('.modal').should('be.visible');
    cy.get('.close-button').click();

    cy.get('.modal').should('not.exist'); 
  });

  it('should apply selected filter and update product list', async() => {
    await cy.wait(1000);
    cy.get('.filter-checkbox').first().check(); 

    cy.get('.product-item').should('have.length.greaterThan', 0);
  });

  it('should clear selected filters and reload product list', async() => {
    await cy.wait(1000);
    cy.get('.filter-checkbox').first().check();
    cy.get('.clear-all-button').click(); 

    cy.get('.product-item').should('have.length.greaterThan', 0); 
  });

  it('should lazy load images below the fold', async() => {
    await cy.wait(1000);
    cy.get('.product-item').should('have.length.greaterThan', 0);
    cy.scrollTo('bottom'); 

    cy.get('img').each(($img) => {
      expect($img[0].naturalWidth).to.be.greaterThan(0); 
    });
  });
});

describe('Product Listing App - Mobile View', () => {
  beforeEach(() => {
    cy.viewport('iphone-6');
    cy.visit('http://localhost:3000/src/index.html');
  });

  it('should toggle the navigation menu', async() => {
    await cy.wait(1000);
    cy.get('#nav-menu').should('not.be.visible');

    cy.get('#menu-toggle').click();
    cy.get('#nav-menu').should('be.visible');

    cy.get('#menu-toggle').click();
    cy.get('#nav-menu').should('not.be.visible');
  });

  it('should open the filter modal when filter button is clicked', async() => {
    await cy.wait(1000);
    cy.get('#filter-button').click();
    cy.get('.filter-modal').should('be.visible');
  });

  it('should close the filter modal when clicking the close button', async() => {
    await cy.wait(1000);
    cy.get('#filter-button').click();
    cy.get('.filter-modal').should('be.visible');

    cy.get('.close-filter-button').click();
    cy.get('.filter-modal').should('not.be.visible');
  });

  it('should display products in a 2-column grid on mobile', async() => {
    await cy.wait(1000);
    cy.get('.product-item').should('have.length.greaterThan', 0);
    cy.get('.product-item').should('have.css', 'flex-basis', '50%'); 
  });
});
