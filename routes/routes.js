var express = require('express');

var router = express.Router();
var GeoBranch = require('../models/geoBranch');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('frontpage', { title: 'Banco del Oro', strapline: 'Please register a branch' });
});

/* GET geoProfiler */
router.get('/geoProfile', function (req, res, next) {
  res.render('geoProfile');
});

router.post('/geoProfile', function (req, res, next) {
  var branchNumber = req.body.branchNumber;
  var city = req.body.city;
  var lat = parseFloat(req.body.lat);
  var lng = parseFloat(req.body.lng);

  GeoBranch.findOne({ branchNumber: branchNumber }, function (err, branch) {
    if (err) { return next(err); }
    if (branch) {
      console.log(`Branch ${branchNumber} already registered`);
      //      req.flash('error', 'Branch already exists');
      return res.redirect('/geoProfile');
    }

    var newBranch = new GeoBranch({
      branchNumber: branchNumber,
      city: city,
      location:
      { type: 'Point', coordinates: [lng, lat] }
    });
    newBranch.save();
  });
  res.redirect('geoProfile');
});

/* GET branches data. */
router.get('/branches', function (req, res, next) {
  GeoBranch.find()
    .sort({ branchNumber: 'ascending' })
    .exec(function (err, branches) {
      if (err) { return next(err); }
      console.log(branches);
      res.render('branchesTable', { title: 'Our Branches', branches: branches });
    });
});

/* GET Locations Map. */
router.get('/branch-map', function (req, res, next) {
  res.render('branch-map', { title: 'Branch Map' });
});

/* GET branch locations data. */
router.get('/branch-locations', function (req, res, next) {
  GeoBranch.find()
    .sort({ branchNumber: 'ascending' })
    .select({_id: 0})
    .exec(function (err, locations) {
      if (err) {
        console.log(err);
      }
      console.log(`These are our branch-locations ${locations}`);
      res.json(locations);
      // res.render('branch-map', { title: 'Our Branches', locations: locations });
    });
});

/* GET Locations Map. */
router.get('/leafletLocations', function (req, res, next) {
  res.render('leafletLocations');
});

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

module.exports = router;
