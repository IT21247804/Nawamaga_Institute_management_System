const mongoose = require('mongoose')

const Schema = mongoose.Schema

const classfeeSchema = new Schema({
    studentno : {
        type: String,
        required: true
    },
    subject: {
        type:String,
        required : true
    },
    classtype: {
        type:String,
        required : true
    },
    email: {
        type:String,
        required : true
    }
   


},{ timestamps: true} )

module.exports = mongoose.model('Classfee',classfeeSchema)
