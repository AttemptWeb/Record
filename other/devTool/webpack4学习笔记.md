3-8 -> 

* webpack-dev-server
  * contentBase 启动(打包)的路径
  * open  自动打开页签
  * port  端口号
  * proxy 代理
  * hot 开启热更新
  * hotOnly
  * [proxy 代理](https://webpack.js.org/configuration/dev-server/#devserverproxy)
  * [historyApiFallback](https://webpack.js.org/configuration/dev-server/#devserverhistoryapifallback)
  ```js
  const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
  module.exports = {
    devServer: {
      contentBase: './dist',
      open: true,
      port: 8080,
      hot: true,
      proxy: {
        '/api': 'https://www.dell-lee.com',
        '/api': {
          target: 'http://www.dell-lee.com',
          secure: false,  // 转发https时使用
          pathRewrite: {
            'header.json': 'demo.json',
          },
          changeOrigin: true,
        },
      },
      historyApiFallback: {
        rewrites: [
          { from: /^\/$/, to: '/views/landing.html' },
          { from: /^\/subpage/, to: '/views/subpage.html' },
          { from: /./, to: '/views/404.html' }
        ]
      },
    },
  };
  ```

* webpack-dev-middleware

* hot module replacement  热模块更新
  * new webpack.HotModuleReplacementPlugin()
  * if(module.hot) module.hot.accept('./xxx', ()=>{})

* [babel](https://www.babeljs.cn/)
  * babel-loader  // 打通babel和webpack的桥梁
  * @babel/core   // babel核心库，把js转化成[AST抽象语法树](https://segmentfault.com/a/1190000016231512)
  * @babel/preset-env // 真正将es6转换成es5
  * [@babel/polyfill -> core-js regenerator-runtime](https://github.com/zloirock/core-js/blob/master/docs/2019-03-19-core-js-3-babel-and-a-look-into-the-future.md)
  * [core-js@3带来的惊喜](https://www.cnblogs.com/sefaultment/p/11631314.html)
  * 
    ```js
    module.exports = {
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader",
            options: {  // .babelrc
              "presets": [["@babel/preset-env", {
                useBuiltIns: 'usage',
                corejs: 3,
              }]]
            }
          }
        ]
      }
    }
    ```
  * @babel/preset-react ```"presets": ["@babel/preset-react"]```

* Tree Shaking
  * 只支持 ES Module (import是静态引入,require是动态引入)
  * 只在dev配置
    ```js
    plugins: [optimization: {usedExports: true}]
    "sideEffects": false  // package.json 如果配置了TreeShaking，打包的所有模块都会运用这种方式；假如引用的模块没有到处任何内容，需要对其做特殊的设置 eg: ["*.css"]
    ```
  * 2

* webpack-merge
  ```js
  const merge = require('webpack-merge')
  merge(commonConf, thisConf)
  ```

* clean webpack plugin 清除文件
  ```js
  plugins: [new CleanWebpackPlugin(['dist'], {
    root: path.resolve(__dirname, '../')
  })]
  ```

* [Code Splitting](https://webpack.js.org/plugins/split-chunks-plugin/)
  ```js
  module.exports = {
    optimization: {
      splitChunks: {
        chunks: 'all',          // 表明将选择哪些代码块进行代码分割（all|async|initial）
        minSize: 30000,
        minRemainingSize: 0,
        // maxSize: 0,
        minChunks: 1,           // 拆分前必须共享模块的最小块数
        maxAsyncRequests: 6,    // 同时加载的模块数最多个数
        maxInitialRequests: 4,  // 入口文件加载时最多分割个数
        automaticNameDelimiter: '~',  // 文件生成时中间的连接符
        name: true,             // cacheGroups里的filename生效
        cacheGroups: {          // 分割文件分组
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,      // 打包优先级
            filename: 'vendors.js',
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true  // 如果当前块包含已从主捆绑包中拆分出的模块，则将重用该模块，而不是生成新的模块
            filename: 'common.js',
          }
        }
      }
    }
  }
  ```

* [打包分析](www.github.com/webpack/analyse)
* preloading prefetching
* [工具](https://webpack.js.org/guides/code-splitting/#bundle-analysis)
* 控制台 ctrl+alt+p => Show Coveage

* [css代码分割 MiniCssExtractPlugin (线上)](https://webpack.js.org/plugins/mini-css-extract-plugin/#root)
  ```js
  const MiniCssExtractPlugin = require('mini-css-extract-plugin');
  module.exports = {
    plugins: [new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].chunk.css',
    })],
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
      ],
    },
  };
  ```
  
* [css压缩 optimize-css-assets-webpack-plugin](https://webpack.js.org/plugins/mini-css-extract-plugin/#minimizing-for-production)
  ```js
  const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
  module.exports = {
    optimization: {
      minimizer: [new OptimizeCSSAssetsPlugin({})],
    },
  };
  ```

* 浏览器缓存(Caching)
  ```js
  module.exports = {
    optimization: {
      runtimeChunk: {
        name: 'manifest',
      },
    },
  };
  ```

* Shimming
  ```js
  module.exports = {
    plugins: [new webpack.ProvidePlugin({
      $: 'jquery',
      _join: ['lodash', 'join'],
    })]
  };
  
  const OptimizeCSSAssetsPlugin = require('imports-loader');
  use: [{
    loader: 'imports-loader?this=>window',  // 不建议
  }]
  ```

* library 打包
  ```js
  module.exports = {
    mode: 'prodution',
    entry: './src/index.js',
    // externals: 'lodash',  // 忽略打包，防止重复打包
    externals: {
      lodash: {
        commonjs: 'lodash', //  commonjs引入，名字必须为lodash
      }
    },  
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'library',
      library: 'root',  // script引入时，注入的变量
      libraryTarget: 'umd', // umd 支持所有引入方式
    },
  };
  
  // package.json
  module.exports = {
    name: 'library',
    main: './dist/library.js',
  };

  ```

* PWA(progressive Web Appliation)

* eslint
  ```js
  npm i eslint
  npx eslint --init
  module.exports = {
    devServer: {
      overlay: true,  // eslint
    }
    module: {
        rules: [{
          test: /\.js$/,
          exclude: /node_modules/,
          use: ['babel-loader', 'eslint-loader'],
        }]
      }
  }
  ```

* 性能优化（打包速度）
  * 更新版本（webpack、node、npm、yarn）
  * 在尽可能少的模块上使用loader
  * plugin尽可能精简并确保可靠

