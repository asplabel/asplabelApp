const express = require('express')
const checkAuth = require('../middleware/check-auth')

const jobTitleRouter = express.Router()
const jobTitleController = require('../controllers/jobTitle.controller')

/*
 ***************************************************************
 ***********   JOB TITLES CRUD *********************************
 ***************************************************************
 */

/* CREATE */
jobTitleRouter.post('/addJobTitle',checkAuth, jobTitleController.addJobTitle )

/* READ */
/*
 * Listar los cargos
 */
jobTitleRouter.get('/getJobTitles',checkAuth, jobTitleController.getJobTitles)

/* UPDATE */
jobTitleRouter.put('/updateJobTitle',checkAuth, jobTitleController.updateJobTitle)

/* DELETE */
jobTitleRouter.delete('/deleteJobTitle/:id', checkAuth, jobTitleController.deleteJobTitle)

module.exports = jobTitleRouter
