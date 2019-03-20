// 引入项目的数据文件data.json
// nodejs文件引入遵循CommonJS 规范
const data = require('./public/json/citylist.json');
const data2 = require('./public/json/moviedetail.json');
const citylist = data.city; 
const path = require('path')

module.exports = {
    configureWebpack: {
        devServer: {
            before(app) {
                app.get('/api/citylist', function (req, res) {
                    // errno 状态码,真实开发中可以根据状态码
                    // 判断用户当前是否有权限获取数据,或者是是否请求成功,或者是没有数据返回错误原因
                    res.json({data: citylist, errno: 0});
                });
                app.get('/api/moviedetail', function (req, res) {
                    // errno 状态码,真实开发中可以根据状态码
                    // 判断用户当前是否有权限获取数据,或者是是否请求成功,或者是没有数据返回错误原因
                    res.json({data: data2, errno: 0});
                });
            },
            proxy: {
                '/api': {
                  target: 'http://m.maoyan.com',//设置你调用的接口域名和端口号 别忘了加http
                  changeOrigin: true,
                  pathRewrite: {
                    '^/api': ''
                  }
                }
            }
        }
    },

    pluginOptions: {
      'style-resources-loader': {
        preProcessor: 'less',
        patterns: [
            path.resolve(__dirname,'./public/less/_theme.less'),
        ]
      }
    }
}
