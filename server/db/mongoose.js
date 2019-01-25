var mongoose = require('mongoose');

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGOLAB_URI, { useNewUrlParser: true });
// mongoose.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true });

module.exports = {mongoose};
