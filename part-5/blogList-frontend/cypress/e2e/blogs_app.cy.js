describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);

    const user = {
      username: "test",
      name: "test",
      password: "test",
    };

    const secUser = {
      username: "another user",
      name: "secUser",
      password: "1234",
    };
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, secUser);
    cy.visit("");
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
      cy.get("#username").type("test");
      cy.get("#password").type("wrong password");
      cy.get("#login-button").click();

      cy.contains("invalid username or password");

      cy.get(".error")
        .should("contain", "invalid username or password")
        .and("have.css", "color", "rgb(165, 42, 42)");
    });
  });

  describe.only("when logged in", function () {
    beforeEach(function () {
      cy.login({ username: "test", password: "test" });
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

    it("users can like a blog", function () {
      cy.createBlog({
        title: "like testing",
        author: "user",
        url: "http://testing.com",
      });

      cy.contains("view").click();
      cy.contains("like").click();
      cy.contains("1");
    });
    it("user who created the blog, only can delete the blog", function () {
      cy.createBlog({
        title: "test for delete only by blog's user",
        author: "user",
        url: "http://testing.com",
      });
      cy.contains("view").click();
      cy.contains("remove").click();
      cy.contains("#title").should("not.exist");
    });

    it("only creator can see the delete button", function () {
      cy.createBlog({
        title: "del button visible to only owner",
        author: "tester",
        url: "testing.com",
      });
      cy.contains("view").click();
      cy.contains("Logout").click();

      cy.login({ username: "another user", password: "1234" });
      cy.contains("view").click();
      cy.contains("remove").should("not.exist");
      // cy.contains("del button visible to only owner");
    });
  });
});
