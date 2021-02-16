const path = require("path");
var webpack = require("webpack");

var HtmlWebpackPlugin = require("html-webpack-plugin");

function getApiUrl(){
    const { API_URL } = process.env;

    if(!API_URL) {
        console.error('ERROR! Can\'t build bundle. \n Env-param API_URL is required!');
        return false;
    }
    else return API_URL
}

const { DEPLOY_PATH } = process.env;

module.exports = {
    entry : ['@babel/polyfill', './src/index.js'],
    output : {
        path : DEPLOY_PATH ? DEPLOY_PATH : path.join(__dirname, "/dist"),
        filename : "index_bundle.js",
        publicPath: "/"
    },
    devtool: 'eval-source-map',
    devServer: {
        historyApiFallback: true,
        port : 3123,
        // host : "192.168.43.176"
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
                test : /\.(jpg|jpeg|png|svg|xml|ico)$/,
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
            favicon: "./src/favicon.ico"
        }),
        new webpack.DefinePlugin({
           API_HOST_URL : JSON.stringify(getApiUrl())
        }),
        new webpack.ProvidePlugin({
            "React" : "react",
        })
    ]
}
