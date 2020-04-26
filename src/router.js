var express = require('express')
var User = require('./models/user')
var Record = require('./models/record')
var Vehicle = require('./models/vehicle')

var router = express.Router();

//添加管理员
router.post('/api/addadmin', function(req, res){
  var body = req.body
  var account = body.account
  User.find({
    account
  }, function(err, result) {
    if(err) {
      res.json(errMessage)
    } else {
      if(result.length) {
        res.json({
          res_code: 41,
          message: '该账号已存在！'
        })
      } else {
        User.create({
          account,
          password: body.password,
          isAdmin: true,
          isTopAdmin: false
        }, function(err) {
          if(err) {
            res.json(errMessage)
          } else {
            res.json({
              res_code: 2,
              message: '添加管理员成功！'
            })
          }
        })
      }
    }
  })
})

//删除管理员
router.get('/api/deladmin/:account', function(req, res){
  var account = req.params.account
  User.find({
    account
  }, function(err, result) {
    if(err) {
      res.json(errMessage)
    } else {
      if(result.length) {
        User.deleteMany({
          account
        }, function(err) {
          if(err) {
            res.json(errMessage)
          } else {
            res.json({
              res_code: 2,
              message: '删除管理员成功！'
            })
          }
        })
      } else {
        res.json({
          res_code: 41,
          message: '该账号不存在！'
        })
      }
    }
  })
})

//登录验证
router.post('/api/loginjudge', function(req, res){
  var account = req.body.account
  User.find({
    account
  }, function(err, result) {
    if(err) {
      res.json(errMessage)
    } else {
      if(result.length) {
        if(result[0].password === req.body.password) {
          res.json({
            res_code: 2,
            message: '登录成功！',
            isAdmin: result[0].isAdmin,
            isTopAdmin: result[0].isTopAdmin
          })
        } else {
          res.json({
            res_code: 41,
            message: '账号或密码错误！',
            // input: req.body,
            // output: result
          })
        }
      } else {
        res.json({
          res_code: 41,
          message: '该账号不存在！'
        })
      }
    }
  })
})

//修改密码
router.post('/api/changepassword', function(req, res){
  var account = req.body.account
  User.find({
    account
  }, function(err, result) {
    if(err) {
      res.json(errMessage)
    } else {
      if(result.length) {
        var password = result[0].password
        if(req.body.oldpassword === password) {
          var updates = {$set: {password: req.body.newpassword}}
          User.updateMany({
            account
          }, updates, function(err) {
            if(err) {
              res.json(errMessage)
            } else {
              res.json({
                res_code: 2,
                message: '密码修改成功！'
              })
            }
          })
        } else {
          res.json({
            res_code: 41,
            message: '原密码错误！'
          })
        }
      } else {
        res.json({
          res_code: 41,
          message: '该账号不存在！'
        })
      }
    }
  })
})

//添加用户账号和车辆信息
router.post('/api/addvehicle', function(req, res){
  var body = req.body
  var account = body.tel
  var license = body.license
  User.find({
    account
  }, function(err, result) {
    if(err) {
      res.json(errMessage)
    } else {
      if(result.length) {
        res.json({
          res_code: 41,
          message: '该账号已存在！'
        })
      } else {
        Vehicle.find({
          license
        }, function(err, result2) {
          if(err) {
            res.json(errMessage)
          } else {
            if(result2.length) {
              res.json({
                res_code: 411,
                message: '车牌号已存在！'
              })
            } else {
              User.create({
                account,
                password: body.password,
                isAdmin: false,
                isTopAdmin: false
              }, function(err) {
                if(err) {
                  res.json(errMessage)
                } else {
                  Vehicle.create({
                    license,
                    exp: body.exp,
                    name: body.name,
                    tel: body.tel,
                    idNum: body.idNum,
                    address: body.address
                  }, function(err) {
                    if(err) {
                      res.json(errMessage)
                    } else {
                      res.json({
                        res_code: 2,
                        message: '添加成功！'
                      })
                    }
                  })
                }
              })
            }
          }
        })
      }
    }
  })
})

//删除用户账号和车辆信息
router.get('/api/delvehicle/:license', function(req, res){
  var license = req.params.license
  Vehicle.find({
    license
  }, function(err, result1) {
    if(err) {
      res.json(errMessage)
    } else {
      if(result1.length) {
        var account = result1[0].tel
        Vehicle.deleteMany({
          license
        }, function(err) {
          if(err) {
            res.json(errMessage)
          } else {
            User.find({
              account
            }, function(err, result2) {
              if(err) {
                res.json(errMessage)
              } else {
                if(result2.length) {
                  User.deleteMany({
                    account
                  }, function(err) {
                    if(err) {
                      res.json(errMessage)
                    } else {
                      res.json({
                        res_code: 2,
                        message: '删除成功！'
                      })
                    }
                  })
                }
              }
            })
          }
        })
      } else {
        res.json({
          res_code: 411,
          message: '该车牌号信息不存在！'
        })
      }
    }
  })
})

//查询车辆信息
router.get('/api/searchvehicle/:license', function(req, res){
  var license = req.params.license
  Vehicle.find({
    license
  }, function(err, result) {
    if(err) {
      res.json(errMessage)
    } else {
      if(result.length) {
        res.json(result)
      } else {
        res.json({
          res_code: 411,
          message: '该车牌号信息不存在！'
        })
      }
    }
  })
})

//修改车辆信息
router.post('/api/updatevehicle', function(req, res){
  var body = req.body
  var license = body.license
  Vehicle.find({
    license
  }, function(err, result) {
    if(err) {
      res.json(errMessage)
    } else {
      if(result.length) {
        Vehicle.updateMany({
          license
        }, {
          exp: body.exp,
          name: body.name,
          tel: body.tel,
          idNum: body.idNum,
          address: body.address
        }, function(err) {
          if(err) {
            res.json(errMessage)
          } else {
            res.json({
              res_code: 2,
              message: '修改成功！'
            })
          }
        })
      } else {
        res.json({
          res_code: 411,
          message: '该车牌号信息不存在！'
        })
      }
    }
  })
})

//查询车辆通行记录
router.get('/api/searchrecord/:license', function(req, res){
  var license = req.params.license
  Record.find({
    license
  }, function(err, result) {
    if(err) {
      res.json(errMessage)
    } else {
      if(result.length) {
        res.json(result)
      } else {
        res.json({
          res_code: 411,
          message: '暂无该车辆通行记录！'
        })
      }
    }
  })
})

//获取车辆通行信息
router.get('/api/getrecord', function(req, res){
  var account = req.params.account
  Record.find(function(err, result) {
    if(err) {
      res.json(errMessage)
    } else {
      if(result.length) {
        res.json(result)
      } else {
        res.json({
          res_code: 411,
          message: '暂无车辆通行信息！'
        })
      }
    }
  })
})

//按需获取车辆通行信息
router.post('/api/demandrecord', function(req, res){
  var body = req.body
  var license = body.license
  var record = body.record
  var datestart = body.datestart
  var dateend = body.dateend
  Record.find({
    license: {$regex: license, $options: 'i'},
    record: {$regex: record},
    date: {$gte: datestart, $lte: dateend}
  }, function(err, result) {
    if(err) {
      res.json(errMessage)
    } else {
      if(result.length) {
        res.json(result)
      } else {
        res.json({
          res_code: 411,
          message: '暂无满足以上条件的车辆通行信息！'
        })
      }
    }
  })
})

module.exports = router