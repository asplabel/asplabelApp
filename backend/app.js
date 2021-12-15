const path = require("path")
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const departmentRouter = require('./routes/department.router')
const jobTitleRouter = require('./routes/jobTitle.router')
const cardRouter = require('./routes/card.router')
const userRouter = require('./routes/user.router')
const recordRouter = require('./routes/record.router')

const app = express()

mongoose
  .connect(
    'mongodb+srv://NodeJS:'+process.env.MONGO_ATLAS_PW+'@clusterasplabel2021.qrd4x.mongodb.net/asplabelDB?retryWrites=true&w=majority',
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
app.use("/images", express.static(path.join("images")))

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-requested-With, Content-Type, Accept, Authorization',
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
 * Usar las urls que controla el Router de Records (Monitor)
 */
app.use(recordRouter)

// exportar
module.exports = app
