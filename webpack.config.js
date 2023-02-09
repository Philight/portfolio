const path = require("path");
const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "public"),
//    publicPath: "/", // NOT
//    publicPath: "public/",
//    publicPath: "portfolio/",
    filename: "bundle.js",
  },

  module: {
    rules:[
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader"
      },
      {
        test: /\.html$/,
        use: "html-loader"
      },
      /*Choose only one of the following two: if you're using 
      plain CSS, use the first one, and if you're using a
      preprocessor, in this case SASS, use the second one*/
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        loader: 'file-loader'
      }
/*
      {
        //test: /\.(jpe?g|gif|png|svg|woff|ttf|wav|mp3)$/,
        type: "asset/resource",
        generator: {
            filename: '/src/assets/images/kinokuke-logo.png'
        }
      }  
*/
/*      
      {
        test: /\.scss$/,
        use:[
          "style-loader",
          "css-loader",
          "sass-loader"
        ],
      },
*/
    ], 
  },  

  resolve: {
    alias: {
     "@assets": path.resolve(__dirname, "src", "assets"),
     "@css": path.resolve(__dirname, "src", "assets", "css"),
     "@icons": path.resolve(__dirname, "src", "assets", "icons"),
     "@images": path.resolve(__dirname, "src", "assets", "images"),
     "@components": path.resolve(__dirname, "src", "components"),
     "@contexts": path.resolve(__dirname, "src", "contexts"),
     "@data": path.resolve(__dirname, "src", "data"),
     "@layouts": path.resolve(__dirname, "src", "layouts"),
     "@pages": path.resolve(__dirname, "src", "pages"),
     "@utils": path.resolve(__dirname, "src", "utils"),
    }
  },

  devServer: {
    //compress: true,
    historyApiFallback: true,
    //open: true,
    //hot: true,
    //port: 7000,
  /*
    static: {
      directory: path.join(__dirname, "public")
    }
*/
    /*
    static: {
      directory: path.join(__dirname, "src")
    }
*/
    //static: './src'
    //static: './public'

    //publicPath: "/"
  },
  
  plugins: [
    new HTMLWebpackPlugin({
      template: "./src/index.html"
    }),
    
    new CopyPlugin({
      patterns: [
        { from: './src/assets/images', to: 'assets/images' }
      ]
    })
    
  ]
}