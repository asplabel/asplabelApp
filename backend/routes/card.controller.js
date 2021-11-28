const express = require('express')
const CardModel = require('../models/card')
const users = require('../models/user')

const cardRouter = express.Router()

/*
 ***************************************************************
 ***********   CARD CRUD *********************************
 ***************************************************************
 */
/* CREATE */
cardRouter.post('/addCard', (req, res, next) => {
  if (
    req.body.UID &&
    req.body.type &&
    req.body.UID != '' &&
    req.body.type != ''
  ) {
    const card = new CardModel({
      UID: req.body.UID,
      type: req.body.type,
      is_active: false,
      state: 'Salida',
      is_user: false,
    })
    card.save().then((card) => {
      res.status(201).json({
        message: 'Tarjeta agregada con éxito',
        card: card._id,
      })
    })
  } else {
    res.status(201).json({
      message: 'Error al agregar tarjeta',
    })
  }
})

/* READ ONE */
cardRouter.get('/getCard/:id', (req, res, next) => {
  CardModel.findOne({ _id: req.params.id }).then((card) => {
    res.status(201).json(card)
  })
})

/* READ */
cardRouter.get('/getCards', (req, res, next) => {
  CardModel.aggregate([
    {
      $lookup: {
        from: 'users',
        localField: '_id',
        foreignField: 'card_id',
        as: 'usuario',
      },
    },
    {
      $project: {
        _id: 1,
        UID: 1,
        type: 1,
        is_active: 1,
        state: 1,
        is_user: 1,
        user_id: '$usuario._id',
        firstname: '$usuario.firstname',
        lastname: '$usuario.lastname',
      },
    },
  ]).then((result) => {
    res.status(201).json(result)
  })
})

/* READ CARDS NOT ASIGNED*/
cardRouter.get('/getCardsNotAsigned', (req, res, next) => {
  CardModel.aggregate([
    {
      $match: {
        is_user: false,
      },
    },
    {
      $project: {
        _id: 1,
        UID: 1,
        type: 1,
        is_active: 1,
        is_user: 1,
        state: 1,
        user_id: null,
        firstname: null,
        lastname: null,
      },
    },
  ]).then((cards) => {
    res.status(201).json(cards)
  })
})

/* DELETE */
cardRouter.delete('/deleteCard/:id', (req, res, next) => {
  users
    .updateMany({ card_id: req.params.id }, { card_id: null }, { new: true })
    .then((result) => {})
  CardModel.deleteOne({ _id: req.params.id }).then((result) => {
    //console.log(result)
    res.status(201).json({
      message: 'Tarjeta eliminada exitosamente',
    })
  })
})

/* UPDATE */
cardRouter.put('/updateCard', (req, res, next) => {
  let id = req.body.id
  let UID = req.body.UID
  let type = req.body.type
  let is_active = req.body.is_active
  let state = req.body.state

  if (
    id != null &&
    UID != null &&
    type != null &&
    is_active != null &&
    state != null
  ) {
    CardModel.updateOne(
      { _id: id },
      { UID: UID, type: type, is_active: is_active, state: state },
      { new: true },
    ).then((result) => {
      //console.log(result)
      res.status(201).json({
        message: 'Tarjeta editada con éxito',
      })
    })
  } else {
    res.status(201).json({
      message: 'Error: no fue posible editar la tarjeta',
    })
  }
})
module.exports = cardRouter
