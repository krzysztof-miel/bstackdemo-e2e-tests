import { ProductsPage } from '../support/pages/ProductsPage';
import { CheckoutPage } from '../support/pages/CheckoutPage';
import { LogiPage } from '../support/pages/LoginPage';
import { OrderConfirmationPage } from '../support/pages/OrderConfirmationPage';

describe('BStackDemo - Complete Shopping Flow', () => {
    const productsPage = new ProductsPage();
    const checkoutPage = new CheckoutPage();
    const LoginPage = new LogiPage();
    const orderConfirmationPage = new OrderConfirmationPage();

  let testData;

    before(() => {
        cy.fixture('checkoutData').then((data) => {
            testData = data;
        });
    });

    beforeEach(() => {
        cy.clearAllSessionStorage();
        cy.loginProgrammatically('demouser');
        cy.log('user logged')

        cy.visit('/');
    });


    it('should complete full shopping flow - orginal backend response', () => {

        productsPage.addProductToCartByProductName('iPhone 12');
        productsPage.addProductToCartByProductName('iPhone 12 Mini');

        productsPage.verifyCartItemCount(2);
    
        productsPage.goToCheckout();

        checkoutPage.fillCheckoutForm(testData.validUser);    

        cy.intercept('POST', '**/api/checkout').as('checkoutOrder');

        checkoutPage.submitOrder();

        cy.wait('@checkoutOrder').then((interception) => {
            expect(interception.response.statusCode).to.equal(200);
            expect(interception.response.body).to.deep.equal({}); 
        });

        orderConfirmationPage.verifyOrderSuccess();

    });


    it('should complete full shopping flow - intercept positive response', () => {

        cy.intercept('POST', '**/api/checkout', {
            statusCode: 200,
            body: {
                orderId: 123,
                message: 'Order completed'
            }
        }).as('checkoutOrder');

        productsPage.addProductToCartByProductName('iPhone 12');

        productsPage.verifyCartItemCount(1);
    
        productsPage.goToCheckout();
    
        checkoutPage.fillCheckoutForm(testData.validUser);    


        checkoutPage.submitOrder();


        cy.wait('@checkoutOrder').then((interception) => {
            expect(interception.response.statusCode).to.equal(200);
            expect(interception.response.body.orderId).to.equal(123);
            expect(interception.response.body.message).to.equal('Order completed');

            expect(interception.request.body).to.exist;
            expect(interception.request.method).to.equal('POST');
        });

        orderConfirmationPage.verifyOrderSuccess();
    });


    it('should complete full shopping flow - filtered vendors and check total price', () => {

        cy.intercept('POST', '**/api/checkout', {
            statusCode: 200,
            body: {
                message: 'Order completed',
                totalPrice: 1897
            }
        }).as('checkoutOrder');

        productsPage.selectVendor('Google');

        productsPage.addProductToCartByProductName('Pixel 4');
        productsPage.addProductToCartByProductName('Pixel 3');
        productsPage.addProductToCartByProductName('Pixel 2');

        productsPage.verifyCartItemCount(3);

        productsPage.goToCheckout();

        checkoutPage.fillCheckoutForm(testData.validUser);    

        checkoutPage.submitOrder();

        cy.wait('@checkoutOrder').then((interception) => {
            expect(interception.response.statusCode).to.equal(200);
            expect(interception.response.body.message).to.equal('Order completed');
            expect(interception.response.body.totalPrice).to.equal(1897);

            expect(interception.request.body).to.exist;
            expect(interception.request.method).to.equal('POST');
        });

        orderConfirmationPage.verifyOrderSuccess();

    });


    it('should reject checkout submit - invalid user data', () => {

        productsPage.addProductToCartByProductName('Galaxy S9');

        productsPage.goToCheckout();

        checkoutPage.fillCheckoutFormUsingBrokenData(testData.invalidUser);    

        checkoutPage.submitOrder();

        checkoutPage.verifyLayoutCartVisible();


    });


    it('should break - intercept negative scenario - status code 500', () => {

        cy.intercept('POST', '**/api/checkout', {
            statusCode: 500,
            body: {
                error: 'Internal Server Error'
            }
        }).as('checkoutOrder');

        productsPage.addProductToCartByProductName('iPhone 12');
        productsPage.addProductToCartByProductName('iPhone 12 Mini');
        productsPage.addProductToCartByProductName('Galaxy S20');


        productsPage.verifyCartItemCount(3);
    
        productsPage.goToCheckout();
    
        checkoutPage.fillCheckoutForm(testData.validUser);    

        checkoutPage.submitOrder();


        cy.wait('@checkoutOrder').then((interception) => {
            expect(interception.response.statusCode).to.equal(500);
            expect(interception.response.body.error).to.equal('Internal Server Error');
        });

    });


    it('should redirect to login page - checkout by unloged user', () => {

        cy.clearAllSessionStorage();
        cy.visit('/');

        productsPage.addProductToCartByProductName('Galaxy S20+');

        productsPage.goToCheckout();

        cy.url().should('include', '/signin?checkout=true');

        // Login using UI
        LoginPage.loginViaUI(testData.userToLoginViaUI.username, testData.userToLoginViaUI.password);

        checkoutPage.fillCheckoutForm(testData.validUser);

        cy.intercept('POST', '**/api/checkout').as('checkoutOrder');

        checkoutPage.submitOrder();

        cy.wait('@checkoutOrder').then((interception) => {
            expect(interception.response.statusCode).to.equal(200);
            expect(interception.response.body).to.deep.equal({}); 
        });

        orderConfirmationPage.verifyOrderSuccess();

    });

    it('checkout button should not be visible', () => {

        productsPage.openFloatCart();

        productsPage.checkIfContiunueShoppingButtonExists();

    });

});