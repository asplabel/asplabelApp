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
 ****************   MONITORING *********************************
 ***************************************************************
 */
app.get('/getRecords', (req, res, next) => {
  RecordModel.find()
    .sort({ date: -1, time: -1 })
    .then((records) => {
      res.status(201).json({
        message: 'Cargos enviado con éxito',
        records: records,
      })
    })
})

app.delete('/deleteRecord/:id', (req, res, next) => {
  RecordModel.deleteOne({ _id: req.params.id }).then((result) => {
    res.status(201).json({
      message: 'Cargo eliminado exitosamente',
    })
  })
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
  DepartmentModel.find()
    .sort({ name: 1 })
    .then((departments) => {
      res.status(200).json({
        message: 'Cargos enviado con éxito',
        departments: departments,
      })
    })
})

/* DELETE */
app.delete('/deleteDepartment/:id', (req, res, next) => {
  DepartmentModel.deleteOne({ _id: req.params.id }).then((result) => {
    //console.log(result)
    res.status(201).json({
      message: 'Cargo eliminado exitosamente',
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
app.get('/getJobTitles', async (req, res, next) => {
  let jobTitles = await JobTitleModel.find().sort({ name: 1 })

  for (let i = 0; i < jobTitles.length; i++) {
    let jobTitle = jobTitles[i]
    var department = await DepartmentModel.findOne({
      _id: jobTitle.department_id,
    })

    if (department != null) {
      jobTitle = {
        id: jobTitle._id,
        name: jobTitle.name,
        department_id: jobTitle.department,
        department_name: department.name,
      }
    } else {
      jobTitle = {
        id: jobTitle._id,
        name: jobTitle.name,
        department_id: jobTitle.department,
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

/* DELETE */
app.delete('/deleteJobTitle/:id', (req, res, next) => {
  JobTitleModel.deleteOne({ _id: req.params.id }).then((result) => {
    //console.log(result)
    res.status(201).json({
      message: 'Cargo eliminado exitosamente',
    })
  })
})

/*
 ***************************************************************
 ***********   CARD CRUD *********************************
 ***************************************************************
 */
/* CREATE */
app.post('/addCard', (req, res, next) => {
  const card = new CardModel({
    UID: req.body.UID,
    type: req.body.type,
    is_active: false,
    state: 'Salida',
  })
  card.save().then((card) => {
    res.status(201).json({
      message: 'Tarjeta agregada con éxito',
      card: card._id,
    })
  })
})
/* READ */
app.get('/getCards', async (req, res, next) => {
  var cards = await CardModel.find()
  for (let i = 0; i < cards.length; i++) {
    let card = cards[i]
    var user = await UserModel.findOne({ card_id: card._id })
    if (user != null) {
      card = {
        id: card._id,
        UID: card.UID,
        type: card.type,
        is_active: card.is_active,
        state: card.state,
        user_id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
      }
    } else {
      card = {
        id: card._id,
        UID: card.UID,
        type: card.type,
        is_active: card.is_active,
        state: card.state,
        user_id: null,
        firstname: null,
        lastname: null,
      }
    }
    cards[i] = card
  }
  res.status(201).json(cards)
})

/*
 ***************************************************************
 ***********   USER CRUD *********************************
 ***************************************************************
 */
app.get('/getUsers', async (req, res, next) => {
  var users = await UserModel.find()
  for (let i = 0; i < users.length; i++) {
    var user = users[i]
    let isJobTitle = false
    let isCard = false
    var card
    var jobTitle
    var department
    if (user.job_title_id != null) {
      jobTitle = await JobTitleModel.findOne({ _id: user.job_title_id })
      // console.log(jobTitle)
      department = await DepartmentModel.findOne({
        _id: jobTitle.department_id,
      })
      isJobTitle = true
    }
    if (user.card_id != null) {
      card = await CardModel.findOne({ _id: user.card_id })
      isCard = true
    }
    if (isCard & isJobTitle) {
      var newUser = {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        jobTitle: jobTitle.name,
        department: department.name,
        type: user.type,
        is_active: user.is_active,
        card_UID: card.UID,
      }
      users[i] = newUser
    } else {
      if (isJobTitle) {
        var newUser = {
          id: user._id,
          firstname: user.firstname,
          lastname: user.lastname,
          jobTitle: jobTitle.name,
          department: department.name,
          type: user.type,
          is_active: user.is_active,
          card_UID: null,
        }
        users[i] = newUser
      }
      if (isCard) {
        var newUser = {
          id: user._id,
          firstname: user.firstname,
          lastname: user.lastname,
          jobTitle: null,
          department: null,
          type: user.type,
          is_active: user.is_active,
          card_UID: card.UID,
        }
        users[i] = newUser
        if (!isJobTitle & !isCard) {
          var newUser = {
            id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            jobTitle: null,
            department: null,
            type: user.type,
            is_active: user.is_active,
            card_UID: null,
          }
          users[i] = newUser
        }
      }
    }
  }
  res.status(201).json(users)
})

app.post('/addUser', (req, res, next) => {
  const user = new UserModel({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    phone: req.body.phone,
    document: req.body.document,
    address: req.body.address,
    date_of_birth: req.body.date_of_birth,
    is_active: req.body.is_active,
    job_title_id: req.body.job_title_id,

    type: req.body.type,
  })
  user.save().then((user) => {
    res.status(201).json({
      message: 'Usuario agregado con éxito',
      user_id: user._id,
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
  CardModel.findOne({ UID: req.params.uid })
    .then((result) => {
      if (result != null) {
        if (result.is_active == true) {
          UserModel.findOne({ card_id: result._id }).then((user) => {
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
                  CardModel.findOneAndUpdate(
                    { UID: req.params.uid },
                    { state: 'Ingreso' },
                    { new: true },
                  ).then((updated) => {
                    // La tarjeta existe, tiene usuario y está activa.
                    // Se concede el acceso: Ingreso
                    res.status(201).json(4)
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
                  CardModel.findOneAndUpdate(
                    { UID: req.params.uid },
                    { state: 'Salida' },
                    { new: true },
                  ).then((updated) => {
                    // La tarjeta existe, tiene usuario y está activa. Se concede el acceso de Salida
                    res.status(201).json(3)
                  })
                })
              }
            } else {
              // La tarjeta no tiene usuario
              res.status(201).json(2)
            }
          })
        } else {
          // La tarjeta está desactivada
          res.status(201).json(1)
        }
      } else {
        // La tarjeta no existe en la base de datos
        res.status(201).json(0)
      }
    })
    .catch((err) => {
      console.log(err)
    })
})

// exportar
module.exports = app
