var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/myproj-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

var Schema = mongoose.Schema

var recordSchema = new Schema({
  license: {
    type: String,
    required: true
  },
  record: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now()
  }
})

module.exports = mongoose.model('Record', recordSchema)