/// <reference types="cypress" />

it("should require all fields", () => {
  cy.visit("http://localhost:3000");

  // Assure that error messages don't display on initial load
  cy.findByText("Title is required.").should("not.exist");
  cy.findByText("Abstract is required.").should("not.exist");

  // Now, submit the form
  cy.findByText("Submit talk").click();

  // Now validation errors should display
  cy.findByText("Title is required.");
  cy.findByText("Abstract is required.");
});

it.only("should save talk submission", () => {
  cy.visit("http://localhost:3000");
  cy.findByLabelText("Title").type("React Intro");
  cy.findByLabelText("Abstract").type("Intro to React.");
  cy.findByText("Submit talk").click();

  // Now the form should be empty
  cy.findByLabelText("Title").should("have.value", "");
  cy.findByLabelText("Abstract").should("have.value", "");

  // Now expect submitted talk to display
  cy.findByText("React Intro");
});
