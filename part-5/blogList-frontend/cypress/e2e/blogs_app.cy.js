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

      cy.get(".success")
        .should("contain", "Welcome test to the Blog app")
        .and("have.css", "color", "rgb(0, 128, 0)");
    });

    it("fails with wrong credentials", function () {
      cy.contains("log in").click();
      cy.get("input:first").type("test");
      cy.get("input:last").type("wrong password");
      cy.get("#login-button").click();

      cy.contains("invalid username or password");

      cy.get(".error")
        .should("contain", "invalid username or password")
        .and("have.css", "color", "rgb(165, 42, 42)");
    });
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.contains("log in").click();
      cy.get("#username").type("test");
      cy.get("#password").type("test");
      cy.get("#login-button").click();
    });

    it("A blog can be created", function () {
      cy.contains("create new blog").click();
      cy.get("#title").type("blog created to test Cypress");
      cy.get("#author").type("Cypress");
      cy.get("#url").type("testing.com");
      cy.get("#create").click();
      // cy.contains("blog created to test Cypress Cypress");
      cy.get(".blogList").should("contain", "blog created to test Cypress");
    });
  });
});
