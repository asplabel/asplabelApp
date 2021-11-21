const express = require('express')
const JobTitleModel = require('../models/jobTitle')
const DepartmentModel = require('../models/department')
const UserModel = require('../models/user')

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
jobTitleRouter.get('/getJobTitles', (req, res, next) => {
  JobTitleModel.find()
    .sort({ name: 1 })
    .populate('department_id')
    .then((job_titles) => {
      for (let i = 0; i < job_titles.length; i++) {
        if (job_titles[i].department_id && job_titles[i].department_id != '') {
          let jobTitle = {
            id: job_titles[i]._id,
            name: job_titles[i].name,
            department_id: job_titles[i].department_id._id,
            department_name: job_titles[i].department_id.name,
          }
          job_titles[i] = jobTitle
        } else {
          let jobTitle = {
            id: job_titles[i]._id,
            name: job_titles[i].name,
            department_id: '',
            department_name: '',
          }
          job_titles[i] = jobTitle
        }
      }
      res.status(201).json({
        message: 'Cargos listados',
        jobTitles: job_titles,
      })
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
  UserModel.find({ job_title_id: req.params.id }).then((result) => {
    result.forEach((user) => {
      UserModel.updateOne(
        { _id: user._id },
        { job_title_id: '' },
        { new: true },
      ).then((res) => {
        console.log(res)
      })
    })
  })
  JobTitleModel.deleteOne({ _id: req.params.id }).then((result) => {
    //console.log(result)
    res.status(201).json({
      message: 'Cargo eliminado exitosamente',
    })
  })
})
module.exports = jobTitleRouter
