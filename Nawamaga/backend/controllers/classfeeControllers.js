const Classfee = require('../models/classfeeModel')
const mongoose = require('mongoose')

// get all classfee
const getClassfees = async (req, res) => {
  const classfees = await Classfee.find({}).sort({createdAt: -1})

  res.status(200).json(classfees)
}

// get a single classfee
const getClassfee= async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such classfee'})
  }

  const classfee = await Classfee.findById(id)

  if (!classfee) {
    return res.status(404).json({error: 'No such classfee'})
  }

  res.status(200).json(classfee)
}

// create a new classfee
const createClassfee = async (req, res) => {
  const {studentno, subject,classtype, email} = req.body
  
  let emptyFields = []

  if (!studentno) {
    emptyFields.push('studentno')
  }
  if (!subject) {
    emptyFields.push('subject')
  }
  
  if (!classtype) {
    emptyFields.push('classtype')
  }
  if (!email) {
    emptyFields.push('email')
  }
 
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
  }

  
  // add to the database
  try {
    const classfee = await Classfee.create({ studentno, subject,classtype, email })
    res.status(200).json(classfee)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a classfee
const deleteClassfee = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such classfee'})
  }

  const classfee= await Classfee.findOneAndDelete({_id: id})

  if(!classfee) {
    return res.status(400).json({error: 'No such classfee'})
  }

  res.status(200).json(classfee)
}

// update a classfee
const updateClassfee = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such classfee'})
  }

  const classfee = await Classfee.findById(id)

  if (!classfee) {
    return res.status(400).json({error: 'No such classfee'})
  }
  // Update feedback details
  classfee.studentno = req.body.studentno || classfee.studentno
  classfee.subject = req.body.subject || classfee.subject
  classfee.type = req.body.type || classfee.type
  classfee.email = req.body.email || classfee.email
  

  try {
    const updatedClassfee = await classfee.save()
    res.status(200).json(updatedClassfee)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}
  


module.exports = {
  getClassfees,
  getClassfee,
  createClassfee,
  deleteClassfee,
  updateClassfee
}