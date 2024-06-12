describe("Logut", () => {
  it("should allow a logged in user to log out", () => {
    cy.visit("/");
    cy.wait(500);
    cy.get('button[data-auth="login"]').last().click();
    cy.wait(500);
    cy.fixture("validLogin.json").then((loginData) => {
      cy.get("input#loginEmail").type(loginData.email);
      cy.get("input#loginPassword").type(loginData.password);
    });
    cy.get('button[type="submit"]').contains("Login").click();
    cy.url().should("include", "/?view=profile&name");
    cy.get(`header button[data-auth="logout"]`).should("be.visible");

    // Check the token in local storage after successful login
    cy.window().then((win) => {
      const token = win.localStorage.getItem("token");
      expect(token).to.be.a("string");
      expect(token).not.to.be.empty;
    });
    cy.wait(2000);
    cy.get('button[data-auth="logout"]').first().click();

    // Check that the token is removed after logging out
    cy.window().then((win) => {
      const token = win.localStorage.getItem("token");
      expect(token).to.be.null;
    });
  });
});
