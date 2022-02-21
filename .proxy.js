module.exports = {
  '/api': {
    target: 'https://www.zhoubiyun.com/',
    changeOrigin: true,
    pathRewrite: {
      '^/api': ''
    }
  }
};
