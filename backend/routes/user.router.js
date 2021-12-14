const express = require('express')
const checkAuth = require('../middleware/check-auth')
const extractFile = require('../middleware/file')
const userController = require("../controllers/user.controller")
const userRouter = express.Router()


/*
 ***************************************************************
 ***********   USER CRUD *********************************
 ***************************************************************
 */

/* READ ONE USER*/
//userRouter.get('/getUser/:id', userController.getOneUser)
userRouter.get('/getUser/:id', checkAuth, userController.getOneUser)

/*READ*/
userRouter.get('/getUsers',checkAuth, userController.getUsers)

/* CREATE*/
// Create with Image //
userRouter.post('/addUser',checkAuth, extractFile , userController.createUser)

/*UPDATE*/
userRouter.put('/updateUser',checkAuth,  extractFile, userController.updateUser)

/* DELETE */
userRouter.delete('/deleteUser/:id',checkAuth, userController.deleteUser)

/*******************************************************************************************************

/*ASIGNAR TARJETA*/
userRouter.post('/asignarTarjeta',checkAuth, userController.assignCard)

/*
QUITAR TARJETA
*/
userRouter.get('/quitarTarjeta/:id',checkAuth, userController.removeCard)

/* SIGN UP ADMINISTRADOR */
userRouter.post("/signup",checkAuth, userController.signUp)

/****  LOG IN *****/
userRouter.post("/login", userController.logIn)


module.exports = userRouter
