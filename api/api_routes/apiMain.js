const express = require('express');
const router = express.Router();

const apiController = require('../api_controllers/dataControllers');

/* POST location data */
router.post('/geoProfile', apiController.geopostCtrlr);

/* GET branches data for tabulation. */
router.get('/branches', apiController.tabledataCtrlr);

/* GET branch locations data. Source for populating /branch-map */
router.get('/branch-locations', apiController.branchdataCtrlr);

module.exports = router;
