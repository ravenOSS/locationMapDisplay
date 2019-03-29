const mongoose = require('mongoose');
var dotenv = require('dotenv');
let dbURI = 'mongodb+srv://cftw_2018:QfpiTfhJ6NUlyo2h@bancodeloro-keebo.azure.mongodb.net/cftw_auth?retryWrites=true';

// if (process.env.NODE_ENV === 'production') {
//   dbURI = process.env.MONGODB_URI;
// }
// added qualifiers to stop mongoose deprecation warnings
mongoose.connect(dbURI, { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);

mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected to ${dbURI}`);
});
mongoose.connection.on('error', err => {
  console.log('Mongoose connection error:', err);
});
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

const gracefulShutdown = (msg, callback) => {
  mongoose.connection.close(() => {
    console.log(`Mongoose disconnected through ${msg}`);
    callback();
  });
};

// For nodemon restarts
process.once('SIGUSR2', () => {
  gracefulShutdown('nodemon restart', () => {
    process.kill(process.pid, 'SIGUSR2');
  });
});

// For app termination
process.on('SIGINT', () => {
  gracefulShutdown('app termination', () => {
    process.exit(0);
  });
});
// For Heroku app termination
process.on('SIGTERM', () => {
  gracefulShutdown('Heroku app shutdown', () => {
    process.exit(0);
  });
});
