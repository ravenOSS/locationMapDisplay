let GeoLocation = require('../api_models/geoBranch');

const geopostCtrlr = (req, res, next) => {
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
const dataTableCtrlr = (req, res, next) => {
  GeoLocation.find()
    .sort({ branchNumber: 'ascending' })
    .exec(function (err, branches) {
      if (err) { return next(err); }
      console.log(branches);
      res.json(branches);
    });
};

const locationsDataCtrlr = (req, res) => {
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
  geopostCtrlr,
  dataTableCtrlr,
  locationsDataCtrlr
};
