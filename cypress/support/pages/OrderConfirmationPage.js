export class OrderConfirmationPage {
  constructor() {
    this.orderNumber = '.order-number';
  }

  verifyOrderSuccess() {
    cy.contains('Your Order has been successfully placed').should('be.visible');
  }

  verifyOrderNumber(orderNumber) {
    cy.contains(`Your order number is ${orderNumber}`).should('be.visible');
  }
}