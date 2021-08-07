import {bigDataObject} from "../fixtures/big-data-object";

describe("Home page test", () => {

    it("test by screenshots", () => {
        cy.intercept(
            "GET",
            Cypress.env("server_url") + "/demo/data",
            {
                success: true,
                data: bigDataObject
            }
        ).as("data-route")

        cy.intercept(
            "GET",
            Cypress.env("server_url") + "/demo/data/lessons*",
            {
                success: true,
                data: bigDataObject.lessons
            }
        ).as("lessons-route")

        cy.login()
        cy.visit("/")
        cy.wait(["@data-route", "@lessons-route"])

        cy.get("body").toMatchImageSnapshot()
    })

    it("should ")
})
