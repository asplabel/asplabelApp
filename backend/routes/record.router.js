const express = require('express')
const checkAuth = require('../middleware/check-auth')

const recordRouter = express.Router()

const recordController = require('../controllers/record.controller')
/*
 ***************************************************************
 ****************   MONITORING *********************************
 ***************************************************************
 */
recordRouter.get('/getRecords', checkAuth, recordController.getRecords)

/**************************************************************
* DELETE
*/
recordRouter.delete('/deleteRecord/:id', checkAuth, recordController.deleteRecord)

/*
 ***************************************************************
 ***********   ESP8266 ACCESO *********************************
 ***************************************************************
 */

/* VALIDATE ACCESS AND ADD A RECORD*/
recordRouter.get('/validateAccess/:uid', recordController.validateAccess)

module.exports = recordRouter
