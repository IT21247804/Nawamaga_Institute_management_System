const Assignment = require('../models/assignmentModel')
const mongoose = require('mongoose')

// get all assignments
const getAssignments = async (req, res) => {
  const assignment = await Assignment.find({}).sort({createdAt: -1})

  res.status(200).json(assignment)
}

// get a single assignment
const getAssignment = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such assignment'})
  }

  const assignment = await Assignment.findById(id)

  if (!assignment) {
    return res.status(404).json({error: 'No such assignment'})
  }

  res.status(200).json(assignment)
}

// create a new assignment
const createAssignment = async (req, res) => {
  const {topic, description, number,date} = req.body

  let emptyFields = []

  if (!topic) {
    emptyFields.push('topic')
  }
  if (!description) {
    emptyFields.push('description')
  }
  if (!number) {
    emptyFields.push('number')
  }
  if (!date) {
    emptyFields.push('date')
  }

  // if (!duedate) {
  //   emptyFields.push('duedate')
  // }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
  }

  // add to the database
  try {
    const assignment = await Assignment.create({ topic, description, number,date })
    res.status(200).json(assignment)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a assignment
const deleteAssignment = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such assignment'})
  }

  const assignment = await Assignment.findOneAndDelete({_id: id})

  if(!assignment) {
    return res.status(400).json({error: 'No such assignment'})
  }

  res.status(200).json(assignment)
}

// update a assignment
const updateAssignment = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such assignment'})
  }

  const assignment = await Assignment.findById(id)
   

  if (!assignment) {
    return res.status(400).json({error: 'No such assignment'})
  }

  assignment.topic = req.body.topic || assignment.topic
  assignment.number = req.body.number || assignment.number
  assignment.description = req.body.description || assignment.description
  assignment.date = req.body.date || assignment.date


  try {
    const updatedAssignment = await assignment.save()
    res.status(200).json(updatedAssignment)
  } catch (error) {
    res.status(400).json({error: error.message})
  }


 
}

module.exports = {
  getAssignments,
  getAssignment,
  createAssignment,
  deleteAssignment,
  updateAssignment
}