const path = require('path')
const resolve = dir => path.join(__dirname, dir)
const TerserPlugin = require('terser-webpack-plugin') // 去除打印
const CompressionPlugin = require('compression-webpack-plugin') // 开启gizp压缩
const { openGzip } = require('./package.json')
const version = new Date().getTime()
//全局添加共有颜色变量配置
function addStyleResource(rule) {
  rule
    .use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [path.resolve(__dirname, './src/styles/variables.scss')]
    })
}
module.exports = {
  lintOnSave: true,
  publicPath: './',
  outputDir: 'dist', // 打包的目录,打包需修改对应的项目
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('components', resolve('src/components'))
      .set('views', resolve('src/views'))
      .set('assets', resolve('src/assets'))
      .set('common', resolve('src/common'))
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type =>
      addStyleResource(config.module.rule('scss').oneOf(type))
    )
  },

  configureWebpack: config => {
    config.devtool = 'source-map'
    // 生产环境去除console
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
      config.mode = 'production'
      // 将每个依赖包打包成单独的js文件
      const optimization = {
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          maxInitialRequests: Infinity,
          minSize: 20000, // 依赖包超过20000bit将被单独打包
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name(module) {
                const packageName = module.context.match(
                  /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                )[1]
                // npm package names are URL-safe, but some servers don't like @ symbols
                return `npm.${packageName.replace('@', '')}`
              }
            }
          }
        },
        minimizer: [
          new TerserPlugin({
            terserOptions: {
              ecma: undefined,
              warnings: false,
              parse: {},
              compress: {
                drop_console: true,
                drop_debugger: false,
                pure_funcs: ['console.log'] // 移除console
              }
            }
          })
        ]
      }
      Object.assign(config, {
        optimization
      })
      if (openGzip) {
        config.plugins = [
          ...config.plugins,
          new CompressionPlugin({
            test: /\.js$|\.html$|.\css/, // 匹配文件名
            threshold: 10240, // 对超过10k的数据压缩
            deleteOriginalAssets: false // 不删除源文件
          })
        ]
      }
    } else {
      // 为开发环境修改配置...
      config.mode = 'development'
    }
    // 输出重构  打包编译后的 文件名称  【模块名称.版本号.时间戳】
    config.output.filename = `js/[name].${version}.js`
    config.output.chunkFilename = `js/[name].${version}.js`
  },

  // css相关配置
  css: {
    extract: false, // 是否使用css分离插件 ExtractTextPlugin
    sourceMap: false, // 开启 CSS source maps
    loaderOptions: {}, // css预设器配置项
    modules: false // 启用CSS modules for all css
  },
  productionSourceMap: false,
  // 跨域请求
  devServer: {
    port: 8090,
    disableHostCheck: true,
    https: false // 启用https
    // 跨域代理
    // proxy: baseUrl
  }
}
