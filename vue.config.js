module.exports = {
  // chainWebpack: config => {
  //   config
  //     .plugin('webpack-bundle-analyzer')
  //     .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
  // },
  configureWebpack: {
    externals: {
      'highlight.js': 'hljs'
    }
  }
}
