describe("A failed login", () => {
  it("can not log in when provided with invalid credentials and is shown a message", () => {
    cy.visit("/");
    cy.wait(500);
    cy.get('button[data-auth="login"]').last().click();
    cy.wait(500);
    cy.fixture("failedLogin.json").then((loginData) => {
      cy.get("input#loginEmail").type(loginData.email);
      cy.get("input#loginPassword").type(loginData.password);
    });
    cy.get('button[type="submit"]').contains("Login").click();
    cy.get("#loginModal").should("be.visible");
    cy.on("window:alert", (text) => {
      expect(text).to.include(
        "Either your username was not found or your password is incorrect",
      );
    });

    // Check that there is no token in local storage after failed login
    cy.window().then((win) => {
      const token = win.localStorage.getItem("token");
      expect(token).to.be.null;
    });
  });
});
