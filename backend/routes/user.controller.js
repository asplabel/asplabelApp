const express = require('express')
const CardModel = require('../models/card')
const UserModel = require('../models/user')
const mongoose = require('mongoose')
 /* DOCUMENTACIÓN DE MULTER
 * https://github.com/expressjs/multer
 */
const multer = require('multer')
const MIME_TIPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg'
}

const userRouter = express.Router()

/* Configurar en donde se almacenará la imagen*/
const storage = multer.diskStorage({
  /*req: el request
    file: el archivo que se va a extraer
    cb: callback*/
  destination: (req, file, cb) => {
    let err
    let isValid
    if (file !=null){
      isValid = MIME_TIPE_MAP[file.mimetype]
      err = new Error("Invalid mime type")
    }else{
      isValid = false
    }
    if(isValid){
      err = null
      cb(err, "backend/images")
    }

  },
  filename: (req,file,cb) =>{
    if (file !=null){
      const name = file.originalname.toLowerCase().split(' ').join('-')
      const ext = MIME_TIPE_MAP[file.mimetype]
      cb(null, name + '-' + Date.now() + '.' + ext)
    }
  }
})

/*
 ***************************************************************
 ***********   USER CRUD *********************************
 ***************************************************************
 */

/* READ ONE USER*/
userRouter.get('/getUser/:id', (req, res, next) => {
  if (req.params.id != null & req.params.id != '' ) {
    UserModel.findOne({ _id: req.params.id }).then((user) => {
      res.status(201).json(user)
    })
  }else{
    res.status(201).json({
      message: "error"
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
        card_id: { $ifNull: ['$card._id', ''] },
        card_UID: { $ifNull: ['$card.UID', ''] },
      },
    },
  ]).then((result) => {
    res.status(201).json(result)
  }).catch((err)=>{
    res.status(201).json({message: "Error: "+err})
  })
})

/* CREATE*/
// Create with Image //
userRouter.post('/addUser', multer({storage: storage}).single("photo"), (req, res, next) => {
  let user
  const url = req.protocol + '://' + req.get("host")
  let roleColaborador = '619db81197dfc0c05c85f629'
  console.dir(req.file)
  if (req.body.job_title_id !='null' && req.body.job_title_id != '') {
    console.log("sí jobTitle")
    user = new UserModel({
      firstname: req.body.firstname, // Nunca puede ser nulo
      lastname: req.body.lastname, // Nunca puede ser nulo
      email: req.body.email === 'null' || req.body.email === '' ? null : req.body.email,
      phone: req.body.phone === 'null'? null: req.body.phone,
      document: req.body.document, // Nunca puede ser nulo
      address: req.body.address === 'null'? null : req.body.address,
      date_of_birth: req.body.date_of_birth === 'null' || req.body.date_of_birth === '' ? null : req.body.date_of_birth,
      is_active: req.body.is_active === 'true'? true: false ,
      job_title_id: mongoose.Types.ObjectId(req.body.job_title_id),
      role_id: mongoose.Types.ObjectId(roleColaborador),
      card_id: null,
      type: req.body.type,
      photo: req.file != undefined ? url + "/images/" + req.file.filename : ''
    })

    user.save().then((user) => {
      res.status(201).json({
        message: 'Usuario agregado con éxito',
      })
    }).catch((err)=>{
      res.status(201).json({
        message: 'ERROR: '+err,
      })
    })
  } else {
    console.log("NO jobTitle")
    user = new UserModel({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email === 'null' || req.body.email === '' ? null : req.body.email,
      phone: req.body.phone === 'null'? null: req.body.phone,
      document: req.body.document, // Nunca puede ser nulo
      address: req.body.address === 'null'? null : req.body.address,
      date_of_birth: req.body.date_of_birth === 'null' || req.body.date_of_birth === '' ? null : req.body.date_of_birth,
      is_active: req.body.is_active === 'true'? true: false ,
      role_id: mongoose.Types.ObjectId(roleColaborador),
      card_id: null,
      type: req.body.type,
      photo:  req.file != undefined ? url + "/images/" + req.file.filename : ''
    })

    user.save().then((user) => {
      res.status(201).json({
        message: 'Usuario agregado con éxito',
      })
    }).catch((err)=>{
      res.status(201).json({
        message: 'ERROR: '+err,
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
  )
    .then(() => {
      res.status(201).json({
        message: 'Usuario editado con éxito ',
      })
    })
    .catch((err) => {
      res.status(201).json({
        message: 'Error: ' + err,
      })
    })
})

/* DELETE */
userRouter.delete('/deleteUser/:id', (req, res, next) => {
  UserModel.findOne({ _id: req.params.id }).then((user) => {
    if (user) {
      if (user.card_id && user.card_id != '') {
        CardModel.findByIdAndUpdate(
          user.card_id,
          {
            is_user: false,
            is_active: false,
          },
          { new: true },
        ).then((card) => {

        })
      }
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
  /*Se recibio el Id del usuario al que se le va asignar una tarjeta y se recibe
    el id de esa tarjeta que se asignará
  */
  if (card_id != null && user_id != null && card_id != '' && user_id != '') {
    UserModel.findOne({ _id: user_id })
      .then((user) => {
        /* El usuario previamente no tenía tarjeta */
        if (user.card_id == null || user.card_id == '') {
          UserModel.findByIdAndUpdate(
            user_id,
            { card_id: card_id },
            { new: true },
          ).then(() => {
            CardModel.findByIdAndUpdate(
              card_id,
              { is_user: true, is_active: true },
              { new: true },
            )
              .then(() => {
                res.status(201).json({message:'Tarjeta asignada con éxito'})
              })
              .catch((err) => {
                res.status(201).json({message:'Error: '+err})
              })
          }).catch((err)=>{
            res.status(201).json({message:'Error: '+err})
          })
        } else {
          /*El usuario previamente tenía tarjeta, por lo tanto se debe liberar esa primero para asignar la nueva*/
          CardModel.findByIdAndUpdate(
            user.card_id,
            {
              is_user: false,
              is_active: false,
            },
            { new: true },
          ).then(() => {
            // la tarjeta se libero, ahora sí se asigna la tarjeta al usuario
            UserModel.findByIdAndUpdate(
              user_id,
              { card_id: card_id },
              { new: true },
            ).then(() => {
              /* Al usuario se le asigno la tarjeta, ahora se va a actualizar el estado de la tarjeta que ha sido asignada*/
              CardModel.findByIdAndUpdate(
                card_id,
                { is_user: true, is_active: true },
                { new: true },
              )
                .then(() => {
                  res.status(201).json({message:'Tarjeta asignada con éxito'})
                })
                .catch((err) => {
                  res.status(201).json({message:'Error: '+err})
                })
            }).catch((err)=>{
              res.status(201).json({message:'Error: '+err})
            })
          }).catch((err)=>{
            res.status(201).json({message:'Error: '+err})
          })
        }
      })
      .catch((err) => {
        res.status(201).json('Error: ' + err)
      })
  }else{
    res.status(201).json({message: 'Error: No se obtuvo el Id de la tarjeta o del usuario' })
  }
})

/*
QUITAR TARJETA
*/
userRouter.get('/quitarTarjeta/:id', async (req, res, next) => {
  //console.log(req.params.id)
  UserModel.findById(req.params.id).then((user) => {
    // El usuario tenía una tarjeta asignada
    if (user.card_id) {
      // Se libera la tarjeta
      CardModel.findByIdAndUpdate(
        user.card_id,
        {
          is_user: false,
          is_active: false,
        },
        { new: true },
      ).then(() => {
        // Se pone null en el valor del id de la tarjeta del usuario
        UserModel.findByIdAndUpdate(
          req.params.id,
          { card_id: null },
          { new: true },
        ).then((user) => {
          res.status(201).json({message:'Se ha quitado la tarjeta de: ' + user.firstname})
        })
      })
    } else {
      //console.log('No card_id: ' + user.card_id)
      res.status(201).json({message: 'Error: No hay tarjeta'})
    }
  })
})
module.exports = userRouter
