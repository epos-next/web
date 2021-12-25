const dotenv = require("dotenv");

dotenv.config({
    path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
    siteMetadata: {
        title: "epos-next",
    },
    plugins: [
        "gatsby-plugin-styled-components",
        "gatsby-plugin-typescript",
        `gatsby-plugin-sass`,
        "gatsby-plugin-use-query-params",
    ],
};
