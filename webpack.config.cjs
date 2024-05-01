const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const configuracionWebpack = {
    entry: path.resolve(__dirname, 'src/main.jsx'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'myFirstWebpack.bundle.js',
        //assetModuleFilename: "./imagenes/[name].[hash].[ext]",
        publicPath: ''
    },
    mode: 'production',
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {test: /\.(js|jsx)$/, exclude: /node_modules/, use: {loader: 'babel-loader', options: {presets: ['@babel/preset-env', ["@babel/preset-react", {"runtime": "automatic"}]]}}}, // React JS.
            {test: /\.css$/, exclude: /node_modules/, use: [MiniCssExtractPlugin.loader, 'css-loader']},   // Regular CSS.
            {test: /\.css$/, include: /node_modules/, use: ['style-loader', 'css-loader']},  // Bootstrap CSS.
            {test: /\.(png|jpg|webp|)$/i, type: 'asset'},
            {test: /\.(woff|woff2|eot|ttf|otf)$/i, type: 'asset/resource'},
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './index.html', filename: 'index.html', favicon: './public/favicon.ico' }),
        new MiniCssExtractPlugin({ filename: '[name].css', chunkFilename: '[id].css'})
    ],
    devServer: {
        // Solo para webpack-dev-server
        //contentBase: path.join(__dirname, 'dist'),
        static: path.resolve(__dirname, 'dist'),    // "contentBase" ya no es una propiedad permitida.
        compress: true,
        port: 8080,
        
    },
    performance: {
        // Solo para evitar problemas de assets demaciado grandes por no usar Lazy Load para webpack-dev-server.
        maxAssetSize: 1024 * 1024,   // 1MB.
        hints: false    // No mostrar alertas.
    }
};

module.exports = configuracionWebpack;