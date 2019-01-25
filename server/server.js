require('./config/config')

const {ObjectID} = require('mongodb');
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT;

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
      errorMes: 'Id invalid'
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
      errorMes: 'Id invalid'
    })
  }
  Todo.findByIdAndRemove(id).then((todo) => {
    if(!todo) {
      return res.status(404).send({
        errorMes: 'No match data'
      })
    }
    res.send({deleted: todo});
  }).catch((e) => {
    res.status(400).send(e)
  });
})

app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);
  // console.log(body);

  if(!ObjectID.isValid(id)) {
    return res.status(400).send({errorMes: 'Id invalid'});
  }

  if(_.isBoolean(body.completed)) {
    if(body.completed) {
      body.completedAt = new Date().getTime();
      // console.log(body);
    }
    else {
      body.completedAt = null;
    }
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if(!todo) {
      return res.status(404).send();
    }
    // console.log(body);
    res.send({todo});

  }).catch((e) => res.status(400).send());
})

app.listen(port, () => {
  console.log((`Started on port ${port}`));
});

module.exports = {app};
