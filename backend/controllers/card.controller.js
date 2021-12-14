const CardModel = require('../models/card')
const users = require('../models/user')
exports.add = (req, res, next) => {
  if (
    req.body.UID != null &&
    req.body.type != null &&
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
      })
    }).catch((err)=>{
      res.status(500).json({
        message: 'Error: '+err,
      })
    })
  } else {
    res.status(500).json({
      message: 'Error recibir datos de la tarjeta',
    })
  }
}

exports.getOne =  (req, res, next) => {
  CardModel.findOne({ _id: req.params.id }).then((card) => {
    res.status(201).json(card)
  })
}

exports.getAll = (req, res, next) => {
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
}

exports.getNotAssigned = (req, res, next) => {
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
}

exports.delete = (req, res, next) => {
  if (req.params.id != null && req.params.id!=''){
    users
    .updateMany({ card_id: req.params.id }, { card_id: null }, { new: true })
    .then(() => {
      CardModel.deleteOne({ _id: req.params.id }).then(() => {
        res.status(201).json({
          message: 'Tarjeta eliminada exitosamente',
        })
      }).catch(
        (err)=>{
          res.status(500).json({
            message: 'Error: '+err,
          })
        }
      )
    }).catch((err)=>{
      res.status(500).json({
        message: 'Error: '+err,
      })
    })
  }else{
    res.status(500).json({
      message: 'Error al recibir el id de la tarjeta a eliminar',
    })
  }
}

exports.update = (req, res, next) => {
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
    ).then(() => {
      res.status(201).json({
        message: 'Tarjeta editada con éxito',
      })
    }).catch((err)=>{
      res.status(500).json({
        message: 'Error: '+err,
      })
    })
  } else {
    res.status(500).json({
      message: 'Error: no se obtuvieron las datos para editar la tarjeta',
    })
  }
}
