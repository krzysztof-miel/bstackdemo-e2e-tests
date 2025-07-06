# BStackDemo E2E Test Suite

This project contains end-to-end test automation for the BStackDemo application using Cypress.

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm

### Installation
```bash
npm install
```

### Running Tests
```bash
# Open Cypress Test Runner (interactive mode)
npm run cypress:open

# Run tests in headless mode
npm run cypress:run

# Run tests with reporting
npm run test:report
```

## 📁 Project Structure

```
cypress/
├── e2e/
│   └── bstackdemo-e2e-test.cy.js    # Main test suite
├── fixtures/
│   └── checkoutData.json            # Test data
├── support/
│   ├── commands.js                  # Custom Cypress commands
│   ├── e2e.js                      # Support file
│   └── pages/                      # Page Object Models
│       ├── CheckoutPage.js
│       ├── LoginPage.js
│       ├── OrderConfirmationPage.js
│       └── ProductsPage.js
```

## 🧪 Test Coverage

The test suite covers the complete shopping flow including:

- **Product Management**: Adding products to cart, vendor filtering
- **Authentication**: Login functionality (programmatic and UI)
- **Checkout Process**: Form validation, order submission
- **API Testing**: Request/response interception and validation
- **Error Handling**: Invalid data scenarios, server errors

### Test Scenarios

1. **Complete Shopping Flow** - Original backend response
2. **Positive API Response** - Intercepted successful checkout
3. **Filtered Vendors** - Product filtering and price validation
4. **Invalid User Data** - Form validation testing
5. **Server Error Handling** - 500 error response simulation
6. **Unauthenticated User** - Redirect to login flow
7. **Empty Cart Order** - UI state verification


## 📊 Test Reports

Test reports are generated using Cypress Mochawesome Reporter:
- **Location**: `cypress/reports/html/`
- **Format**: HTML with detailed test results

## 🛠️ Custom Commands

- `cy.loginProgrammatically(username)` - Programmatic user login
- `cy.clearAllSessionStorage()` - Clear session storage

## 📋 Page Object Model

The project uses Page Object Model pattern for maintainable test structure:

- **ProductsPage**: Product catalog interactions
- **CheckoutPage**: Checkout form and validation
- **LoginPage**: User authentication
- **OrderConfirmationPage**: Order success verification

## 🎯 Key Features

- **API Interception**: Mock and validate API responses
- **Session Management**: Programmatic login and session handling
- **Data-Driven Testing**: External test data from fixtures
- **Cross-Browser Testing**: Chrome (default), can be extended

## 🔍 Test Data

Test data is externalized in `cypress/fixtures/checkoutData.json`:
- Valid user data for successful scenarios
- Invalid user data for error testing
- Login credentials for UI authentication
