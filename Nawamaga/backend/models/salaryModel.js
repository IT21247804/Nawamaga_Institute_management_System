const mongoose = require('mongoose')

const Schema =mongoose.Schema 

const salarySchema =new Schema({

FullName :{
    type:String,
    required:true
},
Email :{
    type:String,
    required:true

}, 
NumberOfStudents:{
    type:String,
    

},
oneStudentFee:{
    type:String,
   
    
},
Sal:{
    type:String,
    required:true

},

NetSalary:{
    type:String,
    required:true

},
date:{
    type:String,
    required:true,
}


},{timestaps:true})

module.exports = mongoose.model('salary',salarySchema)

