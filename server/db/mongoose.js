var mongoose = require('mongoose');

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp' || process.env.MONGOLAB_URI);

module.exports = {mongoose};
