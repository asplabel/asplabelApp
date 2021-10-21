const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const moment = require('moment')

const JobTitleModel = require('./models/jobTitle')
const DepartmentModel = require('./models/department')
const CardModel = require('./models/card')
const UserModel = require('./models/user')
const RecordModel = require('./models/record')

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

/* VALIDATE ACCESS AND ADD A RECORD*/
app.get('/validateAccess/:uid', (req, res, next) => {
  console.log(req.params.uid)
  CardModel.findOne({ UID: req.params.uid })
    .then((result) => {
      //console.log(result)
      if (result != null) {
        if (result.is_active == true) {
          UserModel.findOne({ card_id: result._id }).then((user) => {
            //console.log(user)
            if (user != null) {
              if (result.state == 'Salida') {
                const record = new RecordModel({
                  firstname: user.firstname,
                  lastname: user.lastname,
                  date: moment(Date().now).format('YYYY-MM-DD'),
                  time: moment(Date().now).format('HH:mm'),
                  type: 'Ingreso',
                })
                record.save().then((response) => {
                  //console.log(response)
                  CardModel.findOneAndUpdate(
                    { UID: req.params.uid },
                    { state: 'Ingreso' },
                    { new: true },
                  ).then((updated) => {
                    console.log(updated)
                    res.status(201).json({
                      message: '3', // La tarjeta existe, tiene usuario y está activa. Se concede el acceso
                      type: 'Ingreso',
                    })
                  })
                })
              }
              if (result.state == 'Ingreso') {
                const record = new RecordModel({
                  firstname: user.firstname,
                  lastname: user.lastname,
                  date: moment(Date().now).format('YYYY-MM-DD'),
                  time: moment(Date().now).format('HH:mm'),
                  type: 'Salida',
                })
                record.save().then((response) => {
                  //console.log(response)
                  CardModel.findOneAndUpdate(
                    { UID: req.params.uid },
                    { state: 'Salida' },
                    { new: true },
                  ).then((updated) => {
                    console.log(updated)
                    res.status(201).json({
                      message: '3', // La tarjeta existe, tiene usuario y está activa. Se concede el acceso
                      type: 'Salida',
                    })
                  })
                })
              }
            } else {
              console.log('La tarjeta no tiene usuario')
              res.status(201).json({
                message: '2', // La tarjeta no tiene usuario
              })
            }
          })
        } else {
          console.log('La tarjeta está desactivada')
          res.status(201).json({
            message: '1', // La tarjeta está desactivada
          })
        }
      } else {
        console.log('UID no encontrado en la base de datos')
        res.status(201).json({
          message: '0', // La tarjeta no existe en la base de datos
        })
      }
    })
    .catch((err) => {
      console.log(err)
    })
})

// exportar
module.exports = app
