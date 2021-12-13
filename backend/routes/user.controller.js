const express = require('express')
const CardModel = require('../models/card')
const UserModel = require('../models/user')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const checkAuth = require('../middleware/check-auth')

 /* DOCUMENTACIÓN DE MULTER
 * https://github.com/expressjs/multer
 */
const multer = require('multer')
const user = require('../models/user')
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
userRouter.get('/getUser/:id',checkAuth, (req, res, next) => {
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
userRouter.get('/getUsers',checkAuth, (req, res, next) => {
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
        photo: 1,
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
userRouter.post('/addUser',checkAuth, multer({storage: storage}).single("photo"), (req, res, next) => {
  let user
  const url = req.protocol + '://' + req.get("host")
  let roleColaborador = '619db81197dfc0c05c85f629'
  //console.dir(req.file)
  if (req.body.job_title_id !='null' && req.body.job_title_id != '') {
    //console.log("sí jobTitle")
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
userRouter.put('/updateUser',checkAuth,  multer({storage: storage}).single("photo"), (req, res, next) => {
  let imagePath = req.body.photo
  if(req.file){
     const url = req.protocol + '://' + req.get("host")
     imagePath = url + "/images/" + req.file.filename
  }
  const userUpdate = {
    id: req.body._id,
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
    photo: imagePath
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
      photo: userUpdate.photo
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
userRouter.delete('/deleteUser/:id',checkAuth, (req, res, next) => {
  UserModel.findOne({ _id: req.params.id }).then((user) => {
    if (user) {
      if (user.card_id != null && user.card_id != '' && user.card_id != 'null' ) {
        CardModel.findByIdAndUpdate(
          user.card_id,
          {
            is_user: false,
            is_active: false,
          },
          { new: true },
        ).then((card) => {
          UserModel.deleteOne({ _id: req.params.id }).then((result) => {
            res.status(201).json({
              message: 'Usuario eliminado exitosamente',
            })
          })
        })
      }
    }
  })

})

/*ASIGNAR TARJETA*/
userRouter.post('/asignarTarjeta',checkAuth, (req, res, next) => {
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
userRouter.get('/quitarTarjeta/:id',checkAuth, async (req, res, next) => {
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

// SIGN UP ADMINISTRADOR
userRouter.post("/signup",checkAuth, (req,res,next)=>{
  console.log(req.body)
  let admin_role_id= '6167051ccb06eba131faee63'
  bcrypt.hash(req.body.password, 10).then(hash =>{
    const userAdmin = new UserModel({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      document: req.body.document,
      is_active: true,
      type: req.body.type,
      role_id : mongoose.Types.ObjectId(admin_role_id),
      password: hash
    })
    userAdmin.save().then(result =>{
      res.status(201).json({
        message: 'Administrador creado exitosamente'
      })
    }).catch((err)=>{
      res.status(500).json({
        message: 'Error: ' + err
      })
    })
  })

})

/****  LOG IN *****/
userRouter.post("/login", (req,res,next)=>{
  let fetchedUser
  //console.log(req.body)
  UserModel.findOne({
    email: req.body.email
  }).then(user =>{
    if (!user){
      return res.status(401).json(
        {message: "El correo no existe"})
    } else {
      if (user.role_id == '6167051ccb06eba131faee63'){
        fetchedUser = user
        return bcrypt.compare(req.body.password, user.password)
      }else {
        return res.status(401).json(
          {message: "No tienes permiso para ingresar a la plataforma (No eres administrador) "})
      }
    }
  }).then( result =>{
      if (!result){
        return res.status(401).json(
          {message: "Contraseña incorrecta "})
      }else{
        /* Creación del token */
        /* https://jwt.io/ */
        const token = jwt.sign({email: fetchedUser.email, user_id: fetchedUser._id}, 'hoi123ashdbjbae',{expiresIn: '24h'})
        res.status(200).json({
          token: token
        })
      }
  }).catch(err =>{
    return res.status(401).json(
      {message: "Error en la autenticación: "+ err})
  })
})
module.exports = userRouter
