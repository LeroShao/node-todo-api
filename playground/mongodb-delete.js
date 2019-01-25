const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client) => {
  if(err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  const db = client.db('TodoApp');

  //deleteMany
  // db.collection('Users').deleteMany({name: 'Chang'});
  //deleteOne

  //findOneAndDelete
  db.collection('Users').findOneAndDelete({_id: new ObjectID("5c4932b734da28d5d4b88cd6")}).then((result) => {
    console.log(result);
  })

  client.close();
});
