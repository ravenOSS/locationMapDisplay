const express = require('express');
const router = express.Router();

const ctrlr = require('../controllers/main');

/* GET home page. */
router.get('/', ctrlr.homepageCtrlr);

/* GET geoProfiler - enter location data */
router.get('/geoProfile', ctrlr.geoprofileCtrlr);

/* POST location data */
router.post('/geoProfile', ctrlr.geopostCtrlr);

/* GET branches data for tabulation. */
router.get('/branches', ctrlr.tabledataCtrlr);

/* GET branch locations data. Source for populating /branch-map */
router.get('/branch-locations', ctrlr.branchdataCtrlr);

/* GET Locations Map. Display hardcoded leaflet locations */
router.get('/leafletLocations', ctrlr.leafletmapCtrlr);

/* GET Locations Map. Display leaflet with stored data */
router.get('/branch-map', ctrlr.branchmapCtrlr);

/* GET Locations Map. Display Mapbox with stored data */
router.get('/mapbox', ctrlr.mapboxCtrlr);

/* GET Locations Map. Display Google Map with hard data */
router.get('/google', ctrlr.googlemapCtrlr);

module.exports = router;

// /* render branch profile page. */
// router.get('/branch-details', function (req, res, next) {
//   res.render('branch-details', { title: 'Branch Profile' });
// });

// /* GET branch test data. */
// router.get('/branch-test', function (req, res, next) {
//   GeoBranch.find()
//     .sort({ branchNumber: 'ascending' })
//     .select({_id: 0})
//     .exec(function (err, branches) {
//       if (err) { return next(err); }
//       console.log(branches);
//       res.render('branchDataTest', { title: 'Branch Test', branches: branches });
//     });
// });

/* GET profiler */
// router.get('/geoProfile', function (req, res, next) {
//   res.render('geoProfile');
// });

// router.post('/geoProfile', function (req, res, next) {
//   var branchNumber = req.body.branchNumber;
//   var city = req.body.city;
//   var state = req.body.state;
//   var lat = req.body.lat;
//   var lng = req.body.lng;

//   GeoBranch.findOne({ branchNumber: branchNumber }, function (err, branch) {
//     if (err) { return next(err); }
//     if (branch) {
//       //      req.flash('error', 'Branch already exists');
//       return res.redirect('/geoProfile');
//     }

//     var newBranch = new GeoBranch({
//       branchNumber: branchNumber,
//       city: city,
//       state: state,
//       lat: lat,
//       lng: lng
//     });
//     newBranch.save();
//   });
//   res.redirect('geoProfile');

/* GET table data content. */
/*
router.get('/datatablebranchs', function (req, res, next) {
  Branch.find()
    .sort({ createdAt: 'descending' })
    .exec(function (err, branches) {
      if (err) { return next(err); }
      res.json(branches);
    });
});
*/

// /* GET branch listing. */
// router.get('/branch-details', function (req, res, next) {
//   Branch.find()
//     .sort({ branchNumber: 'descending' })
//     .exec(function (err, branches) {
//       if (err) { return next(err); }
//       console.log(`These are the branches ${branches}`);
//       res.json(branches);
//     });
// });
/*
router.get('/branch/:number', function (req, res, next) {
  Branch.findOne({ branch: req.params.braanchNumber }, function (err, branch) {
    if (err) { return next(err); }
    if (!branch) { return next(404); }
    res.render('profile', { branch: branch });
  });
});
*/
