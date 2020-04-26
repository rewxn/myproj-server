var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/myproj-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

var Schema = mongoose.Schema

var vehicleSchema = new Schema({
  license: {
    type: String,
    required: true
  },
  exp: {
    type: Date,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  tel: {
    type: String,
    required: true
  },
  idNum: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: false
  }
})

module.exports = mongoose.model('Vehicle', vehicleSchema)