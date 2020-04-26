var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/myproj-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

var Schema = mongoose.Schema

var userSchema = new Schema({
  account: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    required: true
  },
  isTopAdmin: {
    type: Boolean,
    required: true
  }
})

module.exports = mongoose.model('User', userSchema)