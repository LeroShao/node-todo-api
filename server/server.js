const {ObjectID} = require('mongodb');

var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc)
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({
      todos: todos
    })
  }, (e) => {
    res.status(400).send(e)
  })
})

//GET /todos/1234
app.get('/todos/:id', (req, res) => {
  var id = req.params.id;

  if(!ObjectID.isValid(id)) {
    return res.status(404).send({
      errorMes: 'Id not valid'
    });
  }

  Todo.findById(id).then((todo) => {
    if(!todo) {
      return res.status(404).send({
        errorMes: 'No match data'
      });
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send(e);
  })
})

app.delete('/todos/:id', (req, res) => {
  var id = req.params.id;

  if(!ObjectID.isValid(id)) {
    return res.status(404).send({
      errorMes: 'Id not valid'
    })
  }
  Todo.findByIdAndRemove(id).then((todo) => {
    if(!todo) {
      return res.status(404).send({
        errorMes: 'No match data'
      })
    }
    res.send({
      deleted: todo
    }).catch((e) => {
      res.status(400).send(e)
    });
  })
})

app.listen(port, () => {
  console.log((`Started on port ${port}`));
});

module.exports = {app};
