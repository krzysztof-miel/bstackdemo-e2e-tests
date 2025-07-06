export class CheckoutPage {
  constructor() {
    this.firstNameInput = '#firstNameInput';
    this.lastNameInput = '#lastNameInput';
    this.addressInput = '#addressLine1Input';
    this.stateInput = '#provinceInput';
    this.postalCodeInput = '#postCodeInput';
    this.submitOrderBtn = '#checkout-shipping-continue';
    this.errorMessage = '.error-message';
    this.layoutCart = '.layout-cart'
  }

  fillCheckoutForm(data) {
    cy.get(this.firstNameInput).type(data.firstName);
    cy.get(this.lastNameInput).type(data.lastName);
    cy.get(this.addressInput).type(data.address);
    cy.get(this.stateInput).type(data.state);
    cy.get(this.postalCodeInput).type(data.postalCode);
  }

    fillCheckoutFormUsingBrokenData(data) {
    cy.get(this.firstNameInput).type(data.firstName);
    cy.get(this.lastNameInput).type(data.lastName);
    cy.get(this.addressInput).type(data.address);
  }

  submitOrder() {
    cy.get(this.submitOrderBtn).click();
  }

  verifyLayoutCartVisible() {
    cy.get(this.layoutCart).should('be.visible');
  }

}