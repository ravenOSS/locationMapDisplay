let mongoose = require('mongoose');

const pointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point', 'Multipoint', 'Linestring', 'MultiLineString', 'Polygon', 'MultiPolygon'],
    default: 'Point',
    required: true
  },
  coordinates: {
    type: [Number],
    required: true,
    index: '2dsphere'
  }
});

const geoBranchSchema = new mongoose.Schema({
  branchNumber: { type: Number, required: true, unique: true },
  city: { type: String, required: true },
  location: pointSchema
});

var Geobranch = mongoose.model('geobranch', geoBranchSchema, 'geobranches');
module.exports = Geobranch;

// It is important to look at the two key data types in the pointSchema and ensure that the
// new location to be POSTed has these two parameters (type: 'Point') and the [lng, lat] array
// Check for valid geoJSON point
// Best practice would be to store the nested schema in its own file
