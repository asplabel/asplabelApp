const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const JobTitleModel = require('./models/jobTitle')
const DepartmentModel = require('./models/department')

const app = express()

mongoose
  .connect(
    'mongodb+srv://NodeJS:07erV3ukBjukLOJy@clusterasplabel2021.qrd4x.mongodb.net/asplabelDB?retryWrites=true&w=majority',
  )
  .then(() => {
    console.log('Se ha conectado correctamente a MongoDB Cloud')
  })
  .catch((error) => {
    console.log(error)
    console.log('La conexión a MongoDBCloud ha fallado')
  })

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-requested-With, Content-Type, Accept',
  )
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,POST,PATH,DELETE,PUT, OPTIONS',
  )
  next()
})

/*
 ***************************************************************
 ***********   DEPARTMENT CRUD *********************************
 ***************************************************************
 */

/* CREATE */
app.post('/addDepartment', (req, res, next) => {
  const department = new DepartmentModel({
    name: req.body.name,
  })
  department.save().then((departmentCreated) => {
    res.status(201).json({
      message: 'Departamento agregado con éxito',
      department_id: departmentCreated._id,
    })
  })
})

/* READ */
app.get('/getDepartments', (req, res, next) => {
  DepartmentModel.find().then((departments) => {
    res.status(200).json({
      message: 'Cargos enviado con éxito',
      departments: departments,
    })
  })
})

/*
 ***************************************************************
 ***********   JOB TITLES CRUD *********************************
 ***************************************************************
 */

/* CREATE */
app.post('/addJobTitle', (req, res, next) => {
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
app.get('/getJobTitles', (req, res, next) => {
  JobTitleModel.find().then((jobTitles) => {
    res.status(200).json({
      message: 'Cargos enviado con éxito',
      jobTitles: jobTitles,
    })
  })
})

/* UPDATE */

/* DELETE */
app.delete('/deleteJobTitle/:id', (req, res, next) => {
  JobTitleModel.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result)
    res.status(201).json({
      message: 'Cargo eliminado exitosamente',
    })
  })
})

/*
 ***************************************************************
 ***********   ESP8266 ACCESO *********************************
 ***************************************************************
 */

/* READ */
app.get('/validateAccess/:uid', (req, res, next) => {
  console.log(req.params.uid)
  res.json({
    message: 'Funciona',
  })
})

// exportar
module.exports = app
