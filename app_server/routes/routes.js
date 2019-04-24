const express = require('express');
const router = express.Router();

const ctrlr = require('../controllers/main');
// const apiController = require('../api_controllers/apiControllers');

/* GET home page. */
router.get('/', ctrlr.homepageCtrlr);

/* GET geoProfiler - enter location data */
router.get('/geoProfile', ctrlr.geoprofileCtrlr);

/* GET branches data for tabulation. */
router.get('/locations', ctrlr.dataCtrlr);

/* GET locationsDataTable */
router.get('/locationsDataTable', ctrlr.dataTableCtrlr);

/* GET LocationsBSTable */
router.get('/locationsBSTable', ctrlr.BSTableCtrlr);

/* GET Locations Map. Display leaflet with stored data */
router.get('/branch-map', ctrlr.branchmapCtrlr);

/* GET Locations Map. Display Mapbox with stored data */
router.get('/mapbox', ctrlr.mapboxCtrlr);

/* GET Locations Map. Display Google Map with hard data */
router.get('/google', ctrlr.googlemapCtrlr);

/* POST location data */
router.post('/geoProfile', ctrlr.geoPostCtrlr);

/* GET branch locations data. Source for populating /branch-map */
// router.get('/branch-locations', ctrlr.dataCtrlr);

module.exports = router;
