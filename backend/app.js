const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const moment = require('moment')

const departmentRouter = require('./routes/department.controller')
const jobTitleRouter = require('./routes/jobTitle.controller')
const cardRouter = require('./routes/card.controller')
const userRouter = require('./routes/user.controller')
const recordRouter = require('./routes/record.controller')

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
 *
 */
app.use(departmentRouter)

/*
 *
 */
app.use(jobTitleRouter)

/*
 *
 */
app.use(cardRouter)

/*
 *
 */
app.use(userRouter)

/*
 *
 */
app.use(recordRouter)

// exportar
module.exports = app
