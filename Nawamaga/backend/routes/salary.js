const express = require('express')
const { 
    createsalary ,
    getSalarys,
    getsalary,
    deletesalary,
    updatesalary
    

} = require('../controllers/salaryController')


const router =express.Router()

//Get all salaries

router.get('/',getSalarys)

//Get a single workout

router.get('/:id',getsalary)

//Post a new salary

router.post('/',createsalary)

//Delete a salary

router.delete('/:id',deletesalary)

//Update a salary

router.patch('/:id',updatesalary)

module.exports =router