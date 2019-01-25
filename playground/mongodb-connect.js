const {MongoClient} = require('mongodb');

var user = {name: 'Lero', age: 6};
var {name} = user;
console.log(name);

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client) => {
  if(err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  const db = client.db('TodoApp');

  db.collection('Users').insertMany([{
    name: 'Chang',
    age: 18,
    location: 'New york'
  }], (err, result) => {
    if(err) {
      return console.log('Unable to insert todo', err);
    }
    console.log(JSON.stringify(result.ops, undefined, 2));
  });

  client.close();
});
