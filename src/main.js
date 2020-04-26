// 项目入口文件
var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var router = require('./router.js')
var cors = require('cors')

var app = express()

app.use('/node_modules/', express.static(path.join(__dirname, '../node_modules/')))

app.use(cors())

// 配置解析表单 POST 请求体插件（注意：一定要在 app.use(router) 之前 ）
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(router)

// 配置一个处理 404 的中间件
app.use(function (req, res) {
  res.send('<h1>404</h1><h3>该页面不存在</h3>')
})

// 配置一个全局错误处理中间件
app.use(function (err, req, res, next) {
  res.status(500).json({
    err_code: 500,
    message: err.message
  })
})

app.listen(5000, () => {
  console.log('running 5000 ...')
})