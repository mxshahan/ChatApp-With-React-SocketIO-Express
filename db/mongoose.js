const mongoose = require('mongoose');

mongoose.connect('mongodb://root:12345@ds123658.mlab.com:23658/chat');
mongoose.Promise = global.Promise;

module.exports = mongoose;