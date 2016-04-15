// load the todo model
var Todo = require('./models/todo');

// expose the routes to our app with module.exports
module.exports = function(app) {

	app.get('/api/todos', function (req, res) { 
		Todo.find().limit(10).exec(function(err, todos){
			console.log(err)
			if (err) 
				res.send(err)

			res.json(todos)
		})
	}); 

	app.post('/api/todos', function (req, res){ console.log('create todos')
		Todo.create({
			text:req.body.text
		}, function (err, todo){
			if (err) 
				res.send(err);

			res.json(todo)
		})
	});
	 
	app.delete('/api/todos/:todo_id', function (req, res){
		Todo.remove({
			_id : req.params.todo_id
		}, function (err, todo){		
			if(err)
				res.send(err)

			res.json(todo)

		})
	});

	app.get('*', function(req, res){
		res.sendfile("./public/index.html");
	})
}