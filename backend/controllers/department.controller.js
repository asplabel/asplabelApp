const JobTitleModel = require('../models/jobTitle')
const DepartmentModel = require('../models/department')

exports.add = (req, res, next) => {
  // Verificar que el nombre no sea nulo ni vacío
  if (req.body.name != null && req.body.name != '') {
    const department = new DepartmentModel({
      name: req.body.name,
    })
    department
      .save()
      .then(() => {
        res.status(201).json({
          message: 'Departamento agregado con éxito',
        })
      })
      .catch((err) => {
        res.status(500).json({
          message: 'No se agrego el departamento: ' + err,
        })
      })
  } else {
    res.status(500).json({
      message: 'Error al agregar departamento',
    })
  }
}

exports.getDepartments =(req, res, next) => {
  DepartmentModel.find()
    .sort({ name: 1 })
    .then((departments) => {
      res.status(200).json({
        departments: departments,
      })
    })
    .catch((err) => {
      res.status(500).json({
        message: 'Error: '+err
      })
    })
}

exports.delete = (req, res, next) => {
  if ((req.params.id != null) & (req.params.id != '')) {
    JobTitleModel.updateMany(
      { department_id: req.params.id },
      { department_id: null },
      { new: true },
    )
      .then(() => {
        DepartmentModel.deleteOne({ _id: req.params.id })
          .then(() => {
            res.status(201).json({
              message: 'Departamento eliminado exitosamente',
            })
          })
          .catch((err) => {
            res.status(500).json({
              message: 'NO se elimino el cargo: ' + err,
            })
          })
      })
      .catch((err) => {
        res.status(500).json({
          message:
            'No se pudo desvincular cargos del departamento a eliminar: ' + err,
        })
      })
  } else {
    res.status(500).json({
      message: 'No se recibio el ID',
    })
  }
}

exports.update = (req, res, next) => {
  if (
    req.body.id != null &&
    req.body.name != null &&
    req.body.id != '' &&
    req.body.name != ''
  ) {
    DepartmentModel.updateOne({ _id: req.body.id }, { name: req.body.name })
      .then(() => {
        res.status(201).json({
          message: 'Departamento editado',
        })
      })
      .catch((err) => {
        res.status(500).json({
          message: 'NO fue posible editar el departamento: ' + err,
        })
      })
  } else {
    res.status(500).json({
      message: 'Error al actualizar el departamento',
    })
  }
}
