var GeoBranch = require('../models/geoBranch');

const homepageCtrlr = (req, res) => {
  res.render('frontpage', { title: 'Banco del Oro', strapline: 'Please register a branch' });
};

const geoprofileCtrlr = (req, res) => {
  res.render('geoProfile');
};

const geopostCtrlr = (req, res, next) => {
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
};

const tabledataCtrlr = (req, res, next) => {
  GeoBranch.find()
    .sort({ branchNumber: 'ascending' })
    .exec(function (err, branches) {
      if (err) { return next(err); }
      console.log(branches);
      res.render('branchesTable', { title: 'Our Branches', branches: branches });
    });
};

const leafletmapCtrlr = (req, res) => {
  res.render('leafletLocations');
};

const branchmapCtrlr = (req, res) => {
  res.render('branch-map', { title: 'Branch Map' });
};

const mapboxCtrlr = (req, res) => {
  res.render('branch-Mapbox', { title: 'Mapbox Map' });
};

const googlemapCtrlr = (req, res) => {
  res.render('googleTest', { title: 'Google Map' });
};

const branchdataCtrlr = (req, res) => {
  GeoBranch.find()
    .sort({ branchNumber: 'ascending' })
    .select({_id: 0})
    .exec(function (err, locations) {
      if (err) {
        console.log(err);
      }
      console.log(`These are our branch-locations ${locations}`);
      res.json(locations);
    });
};

module.exports = { homepageCtrlr };
module.exports = { geoprofileCtrlr };
module.exports = { geopostCtrlr };
module.exports = { tabledataCtrlr };
module.exports = { leafletmapCtrlr };
module.exports = { branchmapCtrlr };
module.exports = { mapboxCtrlr };
module.exports = { googlemapCtrlr };
module.exports = { branchdataCtrlr };
