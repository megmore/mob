const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const argv = require('yargs').argv

const path = require('path')
const distPath = path.resolve(__dirname,'./package')
const entry = path.resolve(__dirname,'./src/index.js')
const nodeExternals = require('webpack-node-externals');
const packageJson=require('./package.json')
const initEntry=require('./initEntry')
initEntry()
const prod = {
    mode: argv.watch?'development':'production',
    entry,
    output: {
        path:distPath + '/lib',
        filename: 'index.js',
        library: 'sdk',
        libraryTarget: 'commonjs2'
    },
    module:{
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader", options: {
                            minimize: true,
                            sourceMap: false
                        }
                    }, {
                        loader: 'postcss-loader', options: {
                            sourceMap: false
                        }
                    }, {
                        loader: "sass-loader", options: {
                            sourceMap: false
                        }
                    }
                ]
            },
            {
                test: /\.jsx?$/,
                loader:'babel-loader',
                include:[path.resolve(__dirname,'./src')],
                    options:{
                    presets: [
                        '@vue/app',
                    ]
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'static/[name].[hash].[ext]',
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'static/[name].[hash].[ext]'
                }
            },
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: 'vue-loader',
                        options: {
                            compilerOptions: {
                                preserveWhitespace: false
                            }
                        }
                    }
                ]
            },
        ],
    },
    resolve: {
        extensions: ['.js','.jsx','.vue','.pug'],
        alias:{
            '@':path.resolve(__dirname,'./src')
        }
    },
    externals : [
        // ...Object.keys(packageJson.dependencies),
        nodeExternals({
            modulesFromFile:true
        })
    ],
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename:'style.css',
            chunkFilename: '[name]/style.css',
        }),
        new UglifyJsPlugin({
            uglifyOptions: {
                compress: {
                    warnings: false
                }
            },
            sourceMap: false,
            parallel: true
        }),
        new VueLoaderPlugin(),
	    new CopyWebpackPlugin([
		    { from: 'src/theme', to: 'theme/' },
		    { from: 'src/components', to: 'components/' },
		    { from: 'src/directives', to: 'directives/' },
		    { from: 'src/mixins', to: 'mixins/' }
	    ])
    ],
    devtool: 'source-map',
    watch:argv.watch
};
const rm = require('rimraf')
const webpack=require('webpack')
rm(distPath, err => {
    if (err) throw err
    webpack(prod, (err, stats) => {
        if (err) throw err
        process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false, // if you are using ts-loader, setting this to true will make typescript errors show up during build
            chunks: true,
            chunkModules: true
        }) + '\n\n')

        if (stats.hasErrors()) {
            process.exit(1)
        }
    })
})

