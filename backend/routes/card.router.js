const express = require('express')

const checkAuth = require('../middleware/check-auth')

const cardRouter = express.Router()
const cardController = require('../controllers/card.controller')

/*
 ***************************************************************
 ***********   CARD CRUD *********************************
 ***************************************************************
 */
/* CREATE */
cardRouter.post('/addCard',checkAuth, cardController.add)

/* READ ONE */
cardRouter.get('/getCard/:id',checkAuth, cardController.getOne)

/* READ */
cardRouter.get('/getCards',checkAuth, cardController.getAll)

/* READ CARDS NOT ASSIGNED*/
cardRouter.get('/getCardsNotAssigned',checkAuth,cardController.getNotAssigned)

/* DELETE */
cardRouter.delete('/deleteCard/:id',checkAuth, cardController.delete)

/* UPDATE */
cardRouter.put('/updateCard',checkAuth, cardController.update)
module.exports = cardRouter
