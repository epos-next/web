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
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `Эпос Next`,
                short_name: `Эпос`,
                start_url: `/`,
                background_color: `#FFF`,
                theme_color: `#9569FD`,
                icon: `static/favicon.png`,
            },
        },
        {
            resolve: `gatsby-plugin-offline`,
            options: {
                workboxConfig: {
                    globPatterns: ['*.html']
                }
            }
        },
    ],
};
