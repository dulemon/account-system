module.exports = {
  devServer: {
    // https: false,
    // hotOnly: false,
    port: 8088,
    // 跨域
    proxy: {
      '/user': {
        target: 'http://accounts.free.idcfengye.com',
        changeOrigin: true,
        // pathRewrite:{
        //     '^/api':''
        //   }
      },
      '/bill': {
        target: 'http://accounts.free.idcfengye.com',
        changeOrigin: true,
        // pathRewrite:{
        //     '^/api':''
        //   }
      },
      '/consumptionType': {
        target: 'http://accounts.free.idcfengye.com',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
}
