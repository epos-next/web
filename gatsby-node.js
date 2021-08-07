const path = require("path");

exports.onCreateWebpackConfig = function({ actions }) {
    actions.setWebpackConfig({
        resolve: {
            alias: {
                '@src': path.resolve(__dirname, 'src'),
                '@redux': path.resolve(__dirname, 'src/redux'),
                '@utils': path.resolve(__dirname, 'src/utils'),
                '@helpers': path.resolve(__dirname, 'src/helpers'),
                '@services': path.resolve(__dirname, "src/services"),
                '@components': path.resolve(__dirname, "src/components"),
                '@layouts': path.resolve(__dirname, 'src/layouts'),
            }
        }
    })
}
