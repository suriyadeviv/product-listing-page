# TWE Technical - Product Listing Page

## Overview

This single page application lists the variety of products available for shopping.

### Product Listing Page

Upon launching the page, users will see a grid displaying the products list retrieved from the API that are available for shopping.

## In this app

The Product Listing Page (PLP) is implemented using Vanilla Javascript, HTML and CSS.
The functionalities included based on 3 endpoints - Desktop, Tablet and Mobile.

### Desktop and Tablet View functionalities
1. Navigation Menu: A full-width navigation menu loads on the page.
2. Filter Section: Displays available product categories and price range. Checkboxes allow users to select filters.
3. Filter Selection: When a checkbox is ticked, the selected category/price appears with a close icon, updating the product list accordingly.
4. Clear Selection: The close icon on a selected filter clears that checkbox and keeps the others available for filtering.
5. Clear All Button: Resets the filter selection and reloads the grid with all products. 
6. Clickable Products: Each product in the grid is clickable, opening a modal with more information. For desktop view, the modal presents information in a horizontal stack using Flexbox, with the image on the left and product details on the right.
7. Hardcoded Navigation Menu: Currently hardcoded for full width but can be evolved in the future with actual data.

### Mobile View functionalities
1. Hamburger Menu: A navigation hamburger menu loads on the page
2. Filter Button: Opens the filter section in a modal, utilizing the same filter functionality as in the desktop view.  
3. Clickable Products: Products in the grid open a modal with information stacked vertically (image below the price and rating).

### Other functionalities
1. Modal Interaction: The modal closes when the close icon is clicked, when clicking outside the modal area, or when the escape key is pressed.
2. Lazy Loading: Images below the fold utilize lazy loading, applied to images in three rows.
3. Responsive Design: For screens smaller than 360px, a single product grid is displayed.
4. Search products: Search text box is added to filter the products based on user search.

### Future Considerations
These functionalities can be achieved based on data availability.
1. Pricing Updates: Implement striked actual prices and red sale prices as per design.
2. Additional Filters: Consider adding more filters, such as price range and rating range.

### Cypress E2E test scripts
Using Cypress, E2E testing scripts is added in cypress/e2e/plp.cy.js This covers most of the dektop and mobile view functionalities.

## Installation
Install the NPM dependencies using `npm i`.

Start the server using `npm start`.

Run cypress test `npm run cypress:open` && `npm run cypress:run`.

Open [http://localhost:3000/src/index.html](http://localhost:3000/src/index.html) with your browser.

## Performance, Accessibility and SEO 

The lighthouse report for Mobile and Desktop is

| Mobile                                           | Desktop                                          |
|--------------------------------------------------|--------------------------------------------------|
| <img alt="coverage" src="/images/mobile-lighthouse.png" width="50%"> | <img alt="coverage" src="/images/desktop-lighthouse.png" width="50%"> |

## Libraries used
1. http-server - to start the server in localhost
2. cypress - to test the UI for dektop and mobile view