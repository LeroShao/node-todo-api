const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client) => {
  if(err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  const db = client.db('TodoApp');

  db.collection('Users').find({name: 'Terry'}).toArray().then((docs) => {
    console.log(docs);
  },(err) => {
    console.log('Unable to fetch data');
  });

//find() returns a cursor point to the document
//toArray() returns a promise, so we can tack on a then(), and add a callback
  // db.collection('Todos').find({
  //   _id: new ObjectID('5c4909ec0f50b8088413865a')
  // }).toArray().then((docs) => {
  //   console.log('Todos');
  //   console.log(docs);
  // }, (err) => {
  //   console.log('Unable to fetch todos', err);
  // })

  client.close();
});
