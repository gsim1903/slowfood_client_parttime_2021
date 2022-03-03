describe("user can add more products to their order", () => {
  beforeEach(() => {
    cy.intercept("GET", "**/api/products", {
      fixture: "products.json",
    }).as("getProducts");
    cy.visit("/");
    
    cy.intercept("POST", "**/api/orders", {
      fixture: "order.json",
    }).as("Orders.create");

    cy.intercept("PUT", "**/api/orders", {
      fixture: "orderUpdate.json",
    }).as("OrderUpdate");

    cy.get("[data-cy=order-button]").last().click();
    cy.get("[data-cy=order-button]").first().click();
  });

  it("is expected to display a message when another product is added", () => {
    cy.get("#message-box").should(
      "contain.text",
      "chicken wings was added to your order"
    );
  });

  it("is expected to make a PUT request", () => {
    cy.wait("@OrderUpdate").its("request.method").should("eq", "PUT");
  });

  // it("is expected that the total order quantity of 3", () => {
  //   cy.get("[data-cy=order-list]").children().should("have.length", 3);
  // });

  // it("is expected that the total order cost is  750", () => {
  //   cy.get("[data-cy=total-cost]".should("equal", 750));
  // });

});
  
