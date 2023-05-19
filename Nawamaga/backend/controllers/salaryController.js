const salary = require('../models/salaryModel')
const mongoose=require('mongoose')

//get all salaries
const getSalarys =async(req,res) =>{
    const salaries =await salary.find({}).sort({createdAt:-1})

    res.status(200).json(salaries)
}

//get a single Salary
const getsalary = async(req,res) =>{

    const{id} =req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such person'})
    }

    const Salary =await salary.findById(id)

    if(!Salary){
        return res.status(404).json({error:'No such salary'})
    }
    res.status(200).json(Salary)


}




//create a new salary
const createsalary = async(req,res)=>{

    const {FullName,Email,NumberOfStudents,oneStudentFee,Sal,NetSalary,date} =req.body

    let emptyFields =[]

    if(!FullName){
        emptyFields.push('FullName')
    }
    if(!Email){
        emptyFields.push('Email')
    }
    if(!NumberOfStudents){
        emptyFields.push('NumberOfStudents')
    }
    if(!oneStudentFee){
        emptyFields.push('oneStudentFee')
    }
    if(!Sal){
        emptyFields.push('Sal')
    }
    if(!NetSalary){
        emptyFields.push('NetSalary')
    }
    if(!date){
        emptyFields.push('date')
    }

   
    if(emptyFields.length >0){
        return res.status(400).json({error:'[Please fill in all the fields',emptyFields})
    }
//add doc to db
    try{
        const Salary =await salary.create({FullName,Email,NumberOfStudents,oneStudentFee,Sal,NetSalary,date})
        res.status(200).json(Salary)

    }catch(error){
        res.status(400).json({error:error.message})

    }
}



//delete a salary
const deletesalary = async(req,res) =>{
    const{id} =req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such person'})
    }

    const Salary = await salary.findOneAndDelete({_id:id})
    if(!Salary){
        return res.status(404).json({error:'No such salary'})
    }
    res.status(200).json(Salary)

}



// update a salary
// update a classfee
const updatesalary= async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'No such classfee'})
    }
  
    const Salary = await salary.findById(id)
  
    if (!Salary) {
      return res.status(400).json({error: 'No such classfee'})
    }
  
    // Update classfee details
  Salary.FullName = req.body.FullName || Salary.FullName
  Salary.Email = req.body.Email || Salary.Email
 Salary.NumberOfStudents= req.body.NumberOfStudents || Salary.NumberOfStudents
 Salary.oneStudentFee= req.body.oneStudentFee || Salary.oneStudentFee
 Salary.Sal= req.body.Sal || Salary.Sal
 Salary.NetSalary= req.body.NetSalary || Salary.NetSalary
 Salary.date=req.body.date || Salary.date



  try {
    const updatedsalary = await Salary.save()
    res.status(200).json(updatedsalary)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
  }

    

    



module.exports ={
    getSalarys,
    getsalary,
    createsalary,
    deletesalary,
    updatesalary
}