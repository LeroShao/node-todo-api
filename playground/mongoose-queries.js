const {ObjectID} = require('mongodb')

const {mongoose} = require('./../server/db/mongoose')
const {User} = require('./../server/models/user')

var id = '5c4a3ab0c4ac9dc06d5a263e';

if(!ObjectID.isValid(id)) {
  return console.log('ID not valid');
}

User.find().then((users) => console.log('Users: ', users))

User.findOne({
  _id: id
}).then((user) => console.log('User: ', user))

User.findById(id).then((user) => {
  if(!user) {
    return console.log('Id not found');
  }
  console.log('User by Id:', user);
})
