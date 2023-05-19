const express = require('express')

const {
  getClassfees, 
  getClassfee, 
  createClassfee, 
  deleteClassfee, 
  updateClassfee
  
} = require('../controllers/classfeeControllers')

const router = express.Router()

// GET all classfees
router.get('/', getClassfees)
  
  // GET a single classfees
  router.get('/:id', getClassfee)
  
  // POST a new classfees
  router.post('/', createClassfee)
  
  // DELETE a classfees
  router.delete('/:id', deleteClassfee)

  // UPDATE a classfees
  router.patch('/:id', updateClassfee)

module.exports = router