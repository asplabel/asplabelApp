const express = require('express')

const checkAuth = require('../middleware/check-auth')

const departmentRouter = express.Router()
const departmentController = require('../controllers/department.controller')

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
departmentRouter.post('/addDepartment',checkAuth, departmentController.add)

/* READ */
/*
 * Listar departamentos
   return los departamentos
 */
departmentRouter.get('/getDepartments',checkAuth, departmentController.getDepartments)

/* DELETE */
/*
 * Eliminar un departamento. Si hay cargos que hagan parte del departamento a eliminar
 * quedan en null (sin departamento)
 */
departmentRouter.delete('/deleteDepartment/:id',checkAuth, departmentController.delete)

/*  UPDATE */
/*
 * Actualizar, editar el nombre del departamento
 * @param name : Nombre nuevo del departamento
 */
departmentRouter.put('/updateDepartment',checkAuth, departmentController.update)

module.exports = departmentRouter
