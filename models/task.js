var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/reminder', { useNewUrlParser: true });
// Create task Schema
const TaskSchema = new Schema({
   name: String,
   time: String
});

const Task = mongoose.model('task', TaskSchema);

var urlendodedParser = bodyParser.urlencoded({extended: false});

module.exports = (app) => {

   app.get('/', function(req, res, next) {
      Task.find({}, function (err, data)  {
         if (err) throw  err;
         res.render('index', {tasks: data});
      });

   });

   app.post('/', urlendodedParser, function(req, res,next) {
      var newTask = Task(req.body).save(function(err,data) {
         if (err) throw  err;
         res.json(data);
      });

   });

    app.delete('/:name', function(req, res, next) {
        Task.find({name: req.params.name.replace(/\-/g, " ")}).remove(function(err, data) {
            if (err) throw err;
            res.json(data);
        });
    });
};