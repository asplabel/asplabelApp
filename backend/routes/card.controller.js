const express = require('express')

const CardModel = require('../models/card')
const UserModel = require('../models/user')

const cardRouter = express.Router()

/*
 ***************************************************************
 ***********   CARD CRUD *********************************
 ***************************************************************
 */
/* CREATE */
cardRouter.post('/addCard', (req, res, next) => {
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
})
/* READ */
cardRouter.get('/getCards', async (req, res, next) => {
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
        is_user: card.is_user,
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
        is_user: card.is_user,
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

/* READ CARDS NOT ASIGNED*/
cardRouter.get('/getCardsNotAsigned', async (req, res, next) => {
  var cards = await CardModel.find({ is_user: false })
  for (let i = 0; i < cards.length; i++) {
    let card = cards[i]
    card = {
      id: card._id,
      UID: card.UID,
      type: card.type,
      is_active: card.is_active,
      is_user: card.is_user,
      state: card.state,
      user_id: null,
      firstname: null,
      lastname: null,
    }
    cards[i] = card
  }
  res.status(201).json(cards)
})

/* DELETE */
cardRouter.delete('/deleteCard/:id', (req, res, next) => {
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
  CardModel.updateOne(
    { _id: id },
    { UID: UID, type: type, is_active: is_active, state: state },
    { new: true },
  ).then((result) => {
    console.log(result)
    res.status(201).json({
      message: 'Tarjeta editada con éxito',
    })
  })
})
module.exports = cardRouter
