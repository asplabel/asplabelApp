const express = require('express')
const JobTitleModel = require('../models/jobTitle')
const UserModel = require('../models/user')

const jobTitleRouter = express.Router()

/*
 ***************************************************************
 ***********   JOB TITLES CRUD *********************************
 ***************************************************************
 */

/* CREATE */
jobTitleRouter.post('/addJobTitle', (req, res, next) => {
  if (req.body.name != null && req.body.name != '') {
    let jobTitle
    if (req.body.department_id != null && req.body.department_id != '') {
      jobTitle = new JobTitleModel({
        name: req.body.name,
        department_id: req.body.department_id,
      })
    } else {
      jobTitle = new JobTitleModel({
        name: req.body.name,
      })
    }
    jobTitle
      .save()
      .then(() => {
        res.status(201).json({
          message: 'Cargo agregado con éxito',
        })
      })
      .catch((err) => {
        res.status(201).json({
          message: 'No se pudo agregar el cargo: ' + err,
        })
      })
  } else {
    res.status(201).json({
      message: 'Error al agregar cargo',
    })
  }
})

/* READ */
/*
 * Listar los cargos
 */
jobTitleRouter.get('/getJobTitles', (req, res, next) => {
  JobTitleModel.aggregate([
    {
      $lookup: {
        from: 'departments',
        localField: 'department_id',
        foreignField: '_id',
        as: 'departamento',
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        department_id: 1,
        department_name: '$departamento.name',
      },
    },
    { $sort: { name: 1 } },
  ])
    .then((job_titles) => {
      res.status(201).json({
        message: 'Cargos listados',
        jobTitles: job_titles,
      })
    })
    .catch((err) => {
      res.status(201).json({
        message: 'No se pudo obtener los cargos: ' + err,
        jobTitles: null,
      })
    })
})

/* UPDATE */
jobTitleRouter.put('/updateJobTitle', (req, res, next) => {
  if (
    req.body.id &&
    req.body.name &&
    req.body.id != '' &&
    req.body.name != ''
  ) {
    if (req.body.department_id && req.body.department_id != '') {
      JobTitleModel.updateOne(
        { _id: req.body.id },
        { name: req.body.name, department_id: req.body.department_id },
        { new: true },
      ).then((result) => {
        //console.log(result)
        res.status(201).json({
          message: 'Cargo editado con éxito',
        })
      })
    } else {
      JobTitleModel.updateOne(
        { _id: req.body.id },
        { name: req.body.name, department_id: null },
        { new: true },
      ).then((result) => {
        res.status(201).json({
          message: 'Cargo editado con éxito',
        })
      })
    }
  } else {
    res.status(201).json({
      message: 'Error al editar el cargo',
    })
  }
})

/* DELETE */
jobTitleRouter.delete('/deleteJobTitle/:id', (req, res, next) => {
  UserModel.updateMany(
    { job_title_id: req.params.id },
    { job_title_id: null },
    { new: true },
  ).then((result) => {
    //console.log(result)
  })
  JobTitleModel.deleteOne({ _id: req.params.id }).then((result) => {
    //console.log(result)
    res.status(201).json({
      message: 'Cargo eliminado exitosamente',
    })
  })
})

module.exports = jobTitleRouter
