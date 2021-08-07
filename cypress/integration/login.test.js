/// <reference types="Cypress" />
import "cypress-localstorage-commands"
import {email, password} from "../fixtures/login";

describe("Login page test", () => {

    before(() => {
        cy.clearCookies();
    });

    it("User can login", () => {
        cy.intercept(
            "POST",
            Cypress.env("server_url") + "/auth/authenticate",
            {
                success: true,
                id: Cypress.env("uid"),
                tokens: {
                    access: "123.123.123",
                    refresh: "456.456.456",
                },
            }
        ).as("login-route")

        cy.visit(Cypress.env("url") + "/login");

        cy.get("input[placeholder=Email]").type(email);
        cy.get("input[placeholder=Пароль]").type(password);
        cy.get("button#login-button").click();

        cy.wait(["@login-route"]);

        cy.get(".Toastify__toast--error").should("not.exist");

        cy.getCookie('uid').should('have.property', 'value', Cypress.env("uid").toString())
        cy.getCookie('accessToken').should('have.property', 'value', "123.123.123")
        cy.getCookie('refreshToken').should('have.property', 'value', "456.456.456")

        cy.location('pathname').should('eq', '/');
    });

    it("Can't login with invalid email or password", () => {

        cy.intercept(
            "POST",
            Cypress.env("server_url") + "/auth/authenticate",
            {
                statusCode: 400,
                body: {
                    success: false,
                    error: "not-validated-error",
                }
            }
        ).as("login-route")

        cy.visit(Cypress.env("url") + "/login");

        cy.get("input[placeholder=Email]").type(email);
        cy.get("input[placeholder=Пароль]").type(password);
        cy.get("button#login-button").click();

        cy.wait(["@login-route"]);

        cy.get(".Toastify__toast--error").contains("Неверный Email или пароль");

        cy.checkThatAuthCookiesNotExists()

        cy.location('pathname').should('eq', '/login/');
    });

    it("Can't login if server is incorrect", () => {

        cy.visit(Cypress.env("url") + "/login");

        cy.get("input[placeholder=Email]").type(email);
        cy.get("input[placeholder=Пароль]").type(password);
        cy.get("button#login-button").click();

        cy.get(".Toastify__toast--error").contains("сервисы сейчас недоступны");

        cy.checkThatAuthCookiesNotExists()

        cy.location('pathname').should('eq', '/login/');
    });

    it("can reauthenticate", () => {
        let apiCalledTimes = 0

        cy.intercept(
            Cypress.env("server_url") + "/auth/authenticate",
            (req) => {
                if (apiCalledTimes === 0) {
                    req.reply(400, {
                        success: false,
                        error: "not-validated-error",
                    })
                } else {
                    req.reply(200, {
                        success: true,
                        id: Cypress.env("uid"),
                        tokens: {
                            access: "123.123.123",
                            refresh: "456.456.456",
                        },
                    })
                }
                apiCalledTimes++;
            }
        ).as("login-route")

        cy.visit(Cypress.env("url") + "/login");

        cy.get("input[placeholder=Email]").type(email);
        cy.get("input[placeholder=Пароль]").type(password);
        cy.get("button#login-button").click();

        cy.wait(["@login-route"]);

        cy.get(".Toastify__toast--error").contains("Неверный Email или пароль");

        cy.checkThatAuthCookiesNotExists()

        cy.location('pathname').should('eq', '/login/');


        cy.get("input[placeholder=Email]").focus().clear();
        cy.get("input[placeholder=Пароль]").focus().clear();

        cy.get("input[placeholder=Email]").type(email);
        cy.get("input[placeholder=Пароль]").type(password);
        cy.get("button#login-button").click();

        cy.wait(["@login-route"]);

        cy.get(".Toastify__toast--error").should("not.exist");

        cy.getCookie('uid').should('have.property', 'value', Cypress.env("uid").toString())
        cy.getCookie('accessToken').should('have.property', 'value', "123.123.123")
        cy.getCookie('refreshToken').should('have.property', 'value', "456.456.456")

        cy.location('pathname').should('eq', '/');
    })
});
