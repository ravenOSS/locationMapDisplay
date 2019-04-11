let GeoBranch = require('../api_models/geoBranch');

const geopostCtrlr = (req, res, next) => {
  let branchNumber = req.body.branchNumber;
  let city = req.body.city;
  let lat = parseFloat(req.body.lat);
  let lng = parseFloat(req.body.lng);

  GeoBranch.findOne({ branchNumber: branchNumber }, function (err, branch) {
    if (err) { return next(err); }
    if (branch) {
      console.log(`Branch ${branchNumber} already registered`);
      return res.redirect('/geoProfile');
    }

    let newBranch = new GeoBranch({
      branchNumber: branchNumber,
      city: city,
      location:
      { type: 'Point', coordinates: [lng, lat] }
    });
    newBranch.save();
  });
  res.redirect('geoProfile');
};

// Render a basic table
const tabledataCtrlr = (req, res, next) => {
  GeoBranch.find()
    .sort({ branchNumber: 'ascending' })
    .exec(function (err, branches) {
      if (err) { return next(err); }
      console.log(branches);
      res.render('branchesTable', { title: 'Our Branches', branches: branches });
    });
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

module.exports = {
  // homepageCtrlr,
  // geoprofileCtrlr,
  geopostCtrlr,
  tabledataCtrlr,
  branchdataCtrlr
  // leafletmapCtrlr,
  // branchmapCtrlr,
  // mapboxCtrlr,
  // googlemapCtrlr
};
