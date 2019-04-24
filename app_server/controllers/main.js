let GeoLocation = require('../api_models/geoBranch');

const homepageCtrlr = (req, res) => {
  res.render('frontpage', { title: 'ravenIoT', strapline: 'Please enter a location' });
};

const geoprofileCtrlr = (req, res) => {
  res.render('geoProfiler');
};

const dataTableCtrlr = (req, res, next) => {
  res.render('locationsDataTable');
};

const BSTableCtrlr = (req, res, next) => {
  GeoLocation.find()
    .sort({ branchNumber: 'ascending' })
    .exec(function (err, branches) {
      if (err) { return next(err); }
      res.render('locationsBSTable', { title: 'Bootstrap LocationsTable - Mongodb data', branches: branches });
    });
};

const branchmapCtrlr = (req, res) => {
  res.render('locations-map', { title: 'Locations Map - Leaflet / Mongo Data' });
};

const mapboxCtrlr = (req, res) => {
  res.render('locationsMapbox', { title: 'Mapbox Map - Vector Graphic Tiles' });
};

const googlemapCtrlr = (req, res) => {
  res.render('googleTest', { title: 'Google Map' });
};

const geoPostCtrlr = (req, res, next) => {
  let branchNumber = req.body.branchNumber;
  let city = req.body.city;
  let lat = parseFloat(req.body.lat);
  let lng = parseFloat(req.body.lng);

  GeoLocation.findOne({ branchNumber: branchNumber }, function (err, branch) {
    if (err) { return next(err); }
    if (branch) {
      console.log(`Branch ${branchNumber} already registered`);
      return res.redirect('/geoProfile');
    }

    let newBranch = new GeoLocation({
      branchNumber: branchNumber,
      city: city,
      location:
      { type: 'Point', coordinates: [lng, lat] }
    });
    newBranch.save();
  });
  res.redirect('geoProfile');
};

// api controller for table data
const dataCtrlr = (req, res, next) => {
  GeoLocation.find()
    // .select({branchNumber, city, coordinates})
    .sort({ branchNumber: 'ascending' })
    .exec(function (err, locations) {
      if (err) { return next(err); }
      console.log(`dataCtrlr: ${locations}`);
      res.json(locations);
    });
};

const branchdataCtrlr = (req, res) => {
  GeoLocation.find()
    .sort({ branchNumber: 'ascending' })
    .select({_id: 0})
    .exec(function (err, locations) {
      if (err) {
        console.log(err);
      }
      console.log(`These are our locations ${locations}`);
      res.json(locations);
    });
};

module.exports = {
  homepageCtrlr,
  geoprofileCtrlr,
  BSTableCtrlr,
  dataTableCtrlr,
  geoPostCtrlr,
  dataCtrlr,
  branchdataCtrlr,
  branchmapCtrlr,
  mapboxCtrlr,
  googlemapCtrlr
};
