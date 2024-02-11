describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");

    const user = {
      username: "test",
      name: "test",
      password: "test",
    };
    cy.request("POST", "http://localhost:3003/api/users", user);
    cy.visit("http://localhost:5173");
  });

  it("Login form is shown", function () {
    cy.contains("log in").click();
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.contains("log in").click();
      cy.get("input:first").type("test");
      cy.get("input:last").type("test");
      cy.get("#login-button").click();

      cy.contains("test logged in");
    });

    it("fails with wrong credentials", function () {
      cy.contains("log in").click();
      cy.get("input:first").type("test");
      cy.get("input:last").type("wrong password");
      cy.get("#login-button").click();

      cy.contains("invalid username or password");
    });
  });
});
