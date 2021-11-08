/// <reference types="cypress" />

it("should require all fields", () => {
  cy.visit("http://localhost:3000");
  cy.findByText("Submit talk").click();

  // Now validation errors should display
  cy.findByText("Title is required.");
});

it("should save talk submission", () => {
  cy.visit("http://localhost:3000");
  cy.findByLabelText("Title").type("React Intro");
  cy.findByLabelText("Abstract").type("Intro to React.");
  cy.findByText("Submit talk").click();
});
