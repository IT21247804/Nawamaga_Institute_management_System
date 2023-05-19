const mongoose = require('mongoose')

const Schema = mongoose.Schema

const assignmentSchema = new Schema({
  topic: {
    type: String,
    required: true
  },
  number: {
    type: Number,
    required: true
  },

 description: {
    type: String,
    required: true
 },
 date:{
  type:Date,
  required:true
 }

//  duedate:{
//   type: dateandtime
//   required: true
//  }

  
}, { timestamps: true })

module.exports = mongoose.model('Assignment', assignmentSchema )

