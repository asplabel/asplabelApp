const express = require('express')

const RecordModel = require('../models/record')
const CardModel = require('../models/card')
const UserModel = require('../models/user')
const moment = require('moment')

const recordRouter = express.Router()
/*
 ***************************************************************
 ****************   MONITORING *********************************
 ***************************************************************
 */
recordRouter.get('/getRecords', (req, res, next) => {
  RecordModel.find()
    .sort({ date: -1, time: -1 })
    .then((records) => {
      res.status(201).json({
        message: 'Cargos enviado con éxito',
        records: records,
      })
    })
})

recordRouter.delete('/deleteRecord/:id', (req, res, next) => {
  RecordModel.deleteOne({ _id: req.params.id }).then((result) => {
    res.status(201).json({
      message: 'Registro eliminado exitosamente',
    })
  })
})

/*
 ***************************************************************
 ***********   ESP8266 ACCESO *********************************
 ***************************************************************
 */

/* VALIDATE ACCESS AND ADD A RECORD*/
recordRouter.get('/validateAccess/:uid', (req, res, next) => {
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

module.exports = recordRouter
