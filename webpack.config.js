const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
	template: './src/templates/index.html',
	filename: 'index.html',
	inject: true
})

const ExtractTextPluginConfig = new ExtractTextPlugin({
	filename: 'bundle.css',
	disable: false,
	allChunks: true
})

var BUILD_DIR = path.resolve(__dirname, 'src/public')
var APP_DIR = path.resolve(__dirname, 'src/app')

var config = {
	entry: APP_DIR + '/root.jsx',
	output: {
		path: BUILD_DIR,
		filename: 'build.js',
		publicPath: '/'
	},
	module: {
	  rules: [
        {
        test: /\.jsx$/,
	      include: APP_DIR,
	      loader: 'babel-loader',
	      options: {presets: ['es2015', 'react']}
	    },
	    {
	      test: /\.scss$/,
				exclude: /node_modules|main.scss/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',

          // Could also be write as follow:
          // use: 'css-loader?modules&importLoader=2&sourceMap&localIdentName=[name]__[local]___[hash:base64:5]!sass-loader'
          use: [
              {
                  loader: 'css-loader',
                  query: {
                      modules: true,
                      sourceMap: true,
                      importLoaders: 2,
											allowMultiple: true,
                      localIdentName: '[name]__[local]___[hash:base64:5]'
                  }
              },
              {
								loader: 'sass-loader',
								query: {
										modules: true,
										sourceMap: true
								}
          		}
						]
         })
		 	 },
			 {
 	      test: /main.scss$/,
 				exclude: /node_modules/,
         use: ExtractTextPlugin.extract({
           fallback: 'style-loader',

           // Could also be write as follow:
           // use: 'css-loader?modules&importLoader=2&sourceMap&localIdentName=[name]__[local]___[hash:base64:5]!sass-loader'
           use: [
               {
                   loader: 'css-loader',
                   query: {
                      importLoaders: 2,
 											allowMultiple: true,
                      localIdentName: '[name]__[local]___[hash:base64:5]'
                   }
               },
               {
 								loader: 'sass-loader'
           		}
 						]
        })
	    },
	    {
	      test: /\.(jpe?g|png|gif|svg|mp3|ttf|pdf)$/i,
	      use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]'
						}
					}
				]
	    }
      ]
    },
    devServer: {
    	disableHostCheck: true,
    	historyApiFallback: true,
    	contentBase: BUILD_DIR,
    	inline: true,
    	port:17009
    },
    plugins: [HtmlWebpackPluginConfig, ExtractTextPluginConfig]
 }

module.exports = config
