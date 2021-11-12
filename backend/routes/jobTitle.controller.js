const express = require('express')
const JobTitleModel = require('../models/jobTitle')
const DepartmentModel = require('../models/department')

const jobTitleRouter = express.Router()

/*
 ***************************************************************
 ***********   JOB TITLES CRUD *********************************
 ***************************************************************
 */

/* CREATE */
jobTitleRouter.post('/addJobTitle', (req, res, next) => {
  const jobTitle = new JobTitleModel({
    name: req.body.name,
    department_id: req.body.department_id,
  })
  jobTitle.save().then((jobTitleCreated) => {
    res.status(201).json({
      message: 'Cargo agregado con éxito',
      jobTitle_id: jobTitleCreated._id,
    })
  })
})

/* READ */
jobTitleRouter.get('/getJobTitles', async (req, res, next) => {
  let jobTitles = await JobTitleModel.find().sort({ name: 1 })
  for (let i = 0; i < jobTitles.length; i++) {
    let jobTitle = jobTitles[i]
    if ((jobTitle.department_id != null) & (jobTitle.department_id != '')) {
      var department = await DepartmentModel.findOne({
        _id: jobTitle.department_id,
      })
      jobTitle = {
        id: jobTitle._id,
        name: jobTitle.name,
        department_id: jobTitle.department_id,
        department_name: department.name,
      }
    } else {
      jobTitle = {
        id: jobTitle._id,
        name: jobTitle.name,
        department_id: null,
        department_name: null,
      }
    }
    jobTitles[i] = jobTitle
  }
  res.status(201).json({
    message: 'Cargos listados',
    jobTitles: jobTitles,
  })
})

/* UPDATE */
jobTitleRouter.put('/updateJobTitle', (req, res, next) => {
  let id = req.body.id
  let name = req.body.name
  let department_id = req.body.department_id
  if ((department_id != null) & (department_id != '')) {
    //console.log(id + ' ' + name + ' ' + department_id)
    JobTitleModel.updateOne(
      { _id: id },
      { name: name, department_id: department_id },
      { new: true },
    ).then((result) => {
      //console.log(result)
      res.status(201).json({
        message: 'Cargo editado con éxito',
      })
    })
  } else {
    // console.log(id + ' ' + name + ' ' + department_id)
    JobTitleModel.updateOne(
      { _id: id },
      { name: name, department_id: null },
      { new: true },
    ).then((result) => {
      //console.log(result)
      res.status(201).json({
        message: 'Cargo editado con éxito',
      })
    })
  }
})

/* DELETE */
jobTitleRouter.delete('/deleteJobTitle/:id', (req, res, next) => {
  JobTitleModel.deleteOne({ _id: req.params.id }).then((result) => {
    //console.log(result)
    res.status(201).json({
      message: 'Cargo eliminado exitosamente',
    })
  })
})
module.exports = jobTitleRouter
