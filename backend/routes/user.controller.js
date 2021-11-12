const express = require('express')

const CardModel = require('../models/card')
const UserModel = require('../models/user')
const JobTitleModel = require('../models/jobTitle')
const DepartmentModel = require('../models/department')

const userRouter = express.Router()
/*
 ***************************************************************
 ***********   USER CRUD *********************************
 ***************************************************************
 */
/* READ ONE USER*/
userRouter.get('/getUser/:id', async (req, res, next) => {
  var user = await UserModel.findOne({ _id: req.params.id })
  res.status(201).json(user)
})
/*READ*/
userRouter.get('/getUsers', async (req, res, next) => {
  var users = await UserModel.find()
  for (let i = 0; i < users.length; i++) {
    var user = users[i]
    let isJobTitle = false
    let isCard = false
    let isDepartment = false
    var card
    var jobTitle
    var department
    if (user.job_title_id != null) {
      jobTitle = await JobTitleModel.findOne({ _id: user.job_title_id })
      // console.log(jobTitle)
      department = await DepartmentModel.findOne({
        _id: jobTitle.department_id,
      })
      if (department != null) {
        isDepartment = true
      }
      isJobTitle = true
    }
    if (user.card_id != null) {
      card = await CardModel.findOne({ _id: user.card_id })
      if (card) {
        isCard = true
      }
    }
    if (isCard & isJobTitle & isDepartment) {
      var newUser = {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        phone: user.phone,
        document: user.document,
        address: user.address,
        date_of_birth: user.date_of_birth,
        job_title_name: jobTitle.name,
        department_name: department.name,
        type: user.type,
        is_active: user.is_active,
        card_id: user.card_id,
        card_UID: card.UID,
      }
      users[i] = newUser
    } else {
      if (isJobTitle) {
        if (isDepartment) {
          var newUser = {
            id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            job_title_name: jobTitle.name,
            department_name: department.name,
            type: user.type,
            is_active: user.is_active,
            card_id: null,
            card_UID: null,
          }
          users[i] = newUser
        } else {
          var newUser = {
            id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            job_title_name: jobTitle.name,
            department_name: null,
            type: user.type,
            is_active: user.is_active,
            card_id: null,
            card_UID: null,
          }
          users[i] = newUser
        }
      }
      if (isCard) {
        var newUser = {
          id: user._id,
          firstname: user.firstname,
          lastname: user.lastname,
          job_title_name: null,
          department_name: null,
          type: user.type,
          is_active: user.is_active,
          card_id: user.card_id,
          card_UID: card.UID,
        }
        users[i] = newUser
        if (!isJobTitle & !isCard) {
          var newUser = {
            id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            job_title_name: null,
            department_name: null,
            type: user.type,
            is_active: user.is_active,
            card_id: null,
            card_UID: null,
          }
          users[i] = newUser
        }
      }
    }
  }
  res.status(201).json(users)
})
/* CREATE*/
userRouter.post('/addUser', (req, res, next) => {
  let user
  if ((req.body.email != null) & (req.body.email != '')) {
    user = new UserModel({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      phone: req.body.phone,
      document: req.body.document,
      address: req.body.address,
      date_of_birth: req.body.date_of_birth,
      is_active: req.body.is_active,
      job_title_id: req.body.job_title_id,
      role_id: null,
      card_id: null,
      type: req.body.type,
    })
  } else {
    user = new UserModel({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: null,
      phone: req.body.phone,
      document: req.body.document,
      address: req.body.address,
      date_of_birth: req.body.date_of_birth,
      is_active: req.body.is_active,
      job_title_id: req.body.job_title_id,
      role_id: null,
      card_id: null,
      type: req.body.type,
    })
  }
  user.save().then((user) => {
    res.status(201).json({
      message: 'Usuario agregado con éxito',
      user_id: user._id,
    })
  })
})

/* DELETE */
userRouter.delete('/deleteUser/:id', (req, res, next) => {
  UserModel.deleteOne({ _id: req.params.id }).then((result) => {
    res.status(201).json({
      message: 'Usuario eliminado exitosamente',
    })
  })
})

/*ASIGNAR TARJETA*/
userRouter.post('/asignarTarjeta', (req, res, next) => {
  let card_id = req.body.card_id
  let user_id = req.body.user_id
  CardModel.findByIdAndUpdate(
    card_id,
    { is_user: true, is_active: true },
    { new: true },
  ).then((card) => {
    // console.log(card)
  })
  UserModel.findOne({ _id: user_id }).then((user) => {
    if (user.card_id == null) {
      UserModel.findByIdAndUpdate(
        user_id,
        { card_id: card_id },
        { new: true },
      ).then((user) => {
        // console.log(user)
      })
    } else {
      CardModel.findByIdAndUpdate(
        user.card_id,
        {
          is_user: false,
          is_active: false,
        },
        { new: true },
      ).then((card) => {
        //console.log(card)
      })
      UserModel.findByIdAndUpdate(
        user_id,
        { card_id: card_id },
        { new: true },
      ).then((user) => {
        //console.log(user)
      })
    }
  })

  res.status(201).json('Tarjeta asignada')
})

/*
QUITAR TARJETA
*/
userRouter.get('/quitarTarjeta/:id', (req, res, next) => {
  //console.log(req.params.id)
  UserModel.findById(req.params.id).then((user) => {
    CardModel.findByIdAndUpdate(
      user.card_id,
      {
        is_user: false,
        is_active: false,
      },
      { new: true },
    ).then((card) => {
      //console.log(card)
    })
  })
  UserModel.findByIdAndUpdate(
    req.params.id,
    { card_id: null },
    { new: true },
  ).then((user) => {
    //console.log(user)
  })
  res.status(201).json('Tarjeta quitada')
})
module.exports = userRouter
