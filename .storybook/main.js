const path = require("path");

module.exports = {
    "stories": [
        "../src/**/*.stories.mdx",
        "../src/**/*.stories.@(js|jsx|ts|tsx)"
    ],
    "addons": [
        "@storybook/addon-links",
        "@storybook/addon-essentials"
    ],
    webpackFinal: async config => {
        // Transpile Gatsby module because Gatsby includes un-transpiled ES6 code.
        config.module.rules[0].exclude = [/node_modules\/(?!(gatsby)\/)/]
        // use babel-plugin-remove-graphql-queries
        // to remove static queries from components when rendering in storybook
        config.module.rules[0].use[0].options.plugins.push(
            require.resolve("babel-plugin-remove-graphql-queries")
        )

        config.resolve.alias = {
            '@src': path.resolve(__dirname, '../src'),
            '@redux': path.resolve(__dirname, '../src/redux'),
            '@utils': path.resolve(__dirname, '../src/utils'),
            '@helpers': path.resolve(__dirname, '../src/helpers'),
            '@services': path.resolve(__dirname, '../src/services'),
            '@components': path.resolve(__dirname, '../src/components'),
            '@layouts': path.resolve(__dirname, '../src/layouts'),
        }

        // Make whatever fine-grained changes you need
        config.module.rules.push({
            test: /\.scss$/,
            use: ['style-loader', 'css-loader', 'sass-loader'],
            include: path.resolve(__dirname, '../'),
        });

        return config
    },
}
