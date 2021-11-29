const express = require('express')
const JobTitleModel = require('../models/jobTitle')
const DepartmentModel = require('../models/department')
const departmentRouter = express.Router()

/*
 ***************************************************************
 ***********   DEPARTMENT CRUD *********************************
 ***************************************************************
 */

/* CREATE */
/*
 * Crear un departamento
 * @param name: El nombre del nuevo departamento
 */
departmentRouter.post('/addDepartment', (req, res, next) => {
  // Verificar que el nombre no sea nulo ni vacío
  if (req.body.name && req.body.name != '') {
    const department = new DepartmentModel({
      name: req.body.name,
    })
    department.save().then((departmentCreated) => {
      res.status(201).json({
        message: 'Departamento agregado con éxito',
      })
    })
  } else {
    res.status(201).json({
      message: 'Error al agregar departamento',
    })
  }
})

/* READ */
/*
 * Listar departamentos
   return los departamentos
 */
departmentRouter.get('/getDepartments', (req, res, next) => {
  DepartmentModel.find()
    .sort({ name: 1 })
    .then((departments) => {
      res.status(200).json({
        departments: departments,
      })
    })
})

/* DELETE */
/*
 *
 */
departmentRouter.delete('/deleteDepartment/:id', (req, res, next) => {
  JobTitleModel.updateMany(
    { department_id: req.params.id },
    { department_id: null },
    { new: true },
  ).then((result) => {})
  DepartmentModel.deleteOne({ _id: req.params.id }).then((result) => {
    //console.log(result)
    res.status(201).json({
      message: 'Departamento eliminado exitosamente',
    })
  })
})

/*  UPDATE */
/*
 * @param name : Nombre nuevo del departamento
 */
departmentRouter.put('/updateDepartment', (req, res, next) => {
  if (
    req.body.id &&
    req.body.name &&
    req.body.id != '' &&
    req.body.name != ''
  ) {
    DepartmentModel.updateOne(
      { _id: req.body.id },
      { name: req.body.name },
    ).then(() => {
      res.status(201).json({
        message: 'Departamento actualizado',
      })
    })
  } else {
    res.status(201).json({
      message: 'Error al actualizar el departamento',
    })
  }
})

module.exports = departmentRouter
