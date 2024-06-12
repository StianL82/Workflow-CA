describe("A successful login", () => {
  it("can log in successfully when provided with valid credentials", () => {
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
  });
});
