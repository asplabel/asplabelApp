const express = require('express')
const CardModel = require('../models/card')
const UserModel = require('../models/user')
const mongoose = require('mongoose')

const userRouter = express.Router()
/*
 ***************************************************************
 ***********   USER CRUD *********************************
 ***************************************************************
 */
/* READ ONE USER*/
userRouter.get('/getUser/:id', (req, res, next) => {
  if (req.params.id) {
    UserModel.findOne({ _id: req.params.id }).then((user) => {
      res.status(201).json(user)
    })
  }
})
/*READ*/
userRouter.get('/getUsers', (req, res, next) => {
  UserModel.aggregate([
    {
      $lookup: {
        from: 'cards',
        localField: 'card_id',
        foreignField: '_id',
        as: 'card',
      },
    },
    {
      $lookup: {
        from: 'jobtitles',
        localField: 'job_title_id',
        foreignField: '_id',
        as: 'jobtitle',
      },
    },
    {
      $lookup: {
        from: 'departments',
        localField: 'jobtitle.department_id',
        foreignField: '_id',
        as: 'department',
      },
    },
    {
      $unwind: { path: '$card', preserveNullAndEmptyArrays: true },
    },
    {
      $unwind: { path: '$jobtitle', preserveNullAndEmptyArrays: true },
    },
    {
      $unwind: { path: '$department', preserveNullAndEmptyArrays: true },
    },
    {
      $project: {
        _id: 1,
        firstname: 1,
        lastname: 1,
        email: 1,
        phone: 1,
        document: 1,
        address: 1,
        date_of_birth: 1,
        job_title_name: '$jobtitle.name',
        department_name: '$department.name',
        type: 1,
        is_active: 1,
        card_id: '$card._id',
        card_UID: '$card.UID',
      },
    },
  ]).then((result) => {
    res.status(201).json(result)
  })
})

/* CREATE*/
userRouter.post('/addUser', (req, res, next) => {
  let user
  let roleColaborador = '619db81197dfc0c05c85f629'
  if (req.body.job_title_id && req.body.job_title_id != '') {
    user = new UserModel({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      phone: req.body.phone,
      document: req.body.document,
      address: req.body.address,
      date_of_birth: req.body.date_of_birth,
      is_active: req.body.is_active,
      job_title_id: mongoose.Types.ObjectId(req.body.job_title_id),
      role_id: mongoose.Types.ObjectId(roleColaborador),
      card_id: null,
      type: req.body.type,
    })

    user.save().then((user) => {
      res.status(201).json({
        message: 'Usuario agregado con éxito',
        user_id: user._id,
      })
    })
  } else {
    user = new UserModel({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      phone: req.body.phone,
      document: req.body.document,
      address: req.body.address,
      date_of_birth: req.body.date_of_birth,
      is_active: req.body.is_active,
      role_id: mongoose.Types.ObjectId(roleColaborador),
      card_id: null,
      type: req.body.type,
    })

    user.save().then((user) => {
      res.status(201).json({
        message: 'Usuario agregado con éxito',
        user_id: user._id,
      })
    })
  }
})

/*UPDATE*/
userRouter.put('/updateUser', (req, res, next) => {
  const userUpdate = {
    id: req.body.id,
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
  }
  UserModel.updateOne(
    { _id: userUpdate.id },
    {
      firstname: userUpdate.firstname,
      lastname: userUpdate.lastname,
      email: userUpdate.email,
      phone: userUpdate.phone,
      document: userUpdate.document,
      address: userUpdate.address,
      date_of_birth: userUpdate.date_of_birth,
      is_active: userUpdate.is_active,
      job_title_id: userUpdate.job_title_id,
      type: userUpdate.type,
    },
    { new: true },
  ).then((result) => {
    //console.log(result)
    res.status(201).json({
      message: 'Usuario editado con éxito ',
    })
  })
})

/* DELETE */
userRouter.delete('/deleteUser/:id', (req, res, next) => {
  UserModel.findOne({ _id: req.params.id }).then((user) => {
    if (user.card_id && user.card_id != '') {
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
    }
  })
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
  CardModel.findByIdAndUpdate(
    card_id,
    { is_user: true, is_active: true },
    { new: true },
  ).then((card) => {
    // console.log(card)
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
