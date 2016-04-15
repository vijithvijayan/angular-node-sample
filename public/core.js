var todo = angular.module('todo', []);

function mainController($scope, $http){
	$scope.formData = {};

	$http.get('/api/todos')
		.success(function(data) {
            $scope.todos = data;
            console.log(data);
        })
		.error(function(err) {
            console.log('Error: ' + err);
        });

    $scope.createTodo = function(){
    	$http.post('/api/todos', $scope.formData)
    		.success(function(data){
    			$scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.todos.push(data);
                console.log(data);
    		})
    		.error(function(err){
    			console.log('Error: ' + err);
    		})
    }

    $scope.deleteTodo = function(id){
    	$http.delete('/api/todos/'+id)
    		.success(function(data) {
    			if(data.ok)
                	$scope.todos = _.reject($scope.todos, function(todo){ return todo['_id'] == id});
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    }
}
