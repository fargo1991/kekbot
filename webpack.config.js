const path = require("path");
var webpack = require("webpack");

var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry : ['@babel/polyfill', './src/index.js'],
    output : {
        path : path.join(__dirname, "/dist"),
        filename : "index_bundle.js",
        publicPath: "/"
    },
    devtool: 'eval-source-map',
    devServer: {
        historyApiFallback: true,
        port : 3123,
        // host : "192.168.0.100"
    },
    module : {
        rules : [
            {
                test : /\.(js|jsx)$/,
                exclude : /node_modules/,
                use : ["babel-loader"]
            },
            {
                test : /\.css/,
                use : ["style-loader",  "css-loader"]
            },
            {
                test : /\.(png|svg|xml|ico)$/,
                use: ["url-loader"],
                exclude: '/node_modules/'
            },
            {
                test : /\.(eot|woff2|woff|ttf|ico)$/,
                use: ["file-loader"],
                exclude: '/node_modules/'
            }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
        }),
        new webpack.ProvidePlugin({
            "React" : "react",
        })
    ]
}
