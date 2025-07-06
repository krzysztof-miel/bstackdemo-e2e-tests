export class ProductsPage {
  constructor() {
    this.productCard = '.shelf-item';
    this.cartIcon = '.bag';
    this.cartCount = '.bag__quantity';
    this.checkoutBtn = '.buy-btn';
    this.productTitle = '.shelf-item__title';
    this.floatCart = '.bag.bag--float-cart-closed';
  }


  verifyCartItemCount(count) {
    cy.get(this.cartCount).should('contain', count.toString());
  }

  goToCheckout() {
    cy.get(this.cartIcon).click();
    cy.get(this.checkoutBtn).click();
  }

  addProductToCartByProductName(productName) {
    cy.contains('.shelf-item__title', productName)
    .parents('.shelf-item') 
    .find('.shelf-item__buy-btn') 
    .click({force: true});
  }

  selectVendor(vendorName) {
    cy.get('label').contains(vendorName).click();
  }

  openFloatCart() {
    cy.get(this.floatCart).click({ force: true });
  }

  checkIfContiunueShoppingButtonExists() {
    cy.get(this.checkoutBtn).should('contain', "Continue Shopping");
  }

}