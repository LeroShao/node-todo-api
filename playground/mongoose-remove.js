const {ObjectID} = require('mongodb')

const {mongoose} = require('./../server/db/mongoose')
const {User} = require('./../server/models/user')

// User.remove({}).then((result) => console.log(result))

// User.findOneAndRemove({_id: ''}).then(() =>)

User.findByIdAndRemove('5c4ab252c4ac9dc06d5a343c').then((user) => console.log(user));
