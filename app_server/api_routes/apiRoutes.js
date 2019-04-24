const express = require('express');
const router = express.Router();

const apiController = require('../api_controllers/apiControllers');

/* POST location data */
router.post('/geoProfile', apiController.geopostCtrlr);

/* GET location data for tabulation. */
router.get('/location', apiController.dataTableCtrlr);

/* GET location locations data. Source for populating /location-map */
router.get('/locations', apiController.locationsDataCtrlr);

module.exports = router;
