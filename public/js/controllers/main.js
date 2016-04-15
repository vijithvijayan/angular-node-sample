angular.module('todoController', [])

    .controller('mainController', function($scope, $http, Todos) {
            
           $scope.formData = {};

        Todos.get()
            .success(function(data) {
                $scope.todos = data;            
            })
            .error(function(err) {
                console.log('Error: ' + err);
            });

        $scope.createTodo = function(){ 
            if (!$.isEmptyObject($scope.formData)) {
                Todos.create($scope.formData)
                    .success(function(data){
                        $scope.formData = {}; // clear the form so our user is ready to enter another
                        $scope.todos.push(data);               
                    })
                    .error(function(err){ 
                        console.log('Error: ' + err);
                    })
            }
        }

        $scope.deleteTodo = function(id){
            Todos.delete(id)
                .success(function(data) {
                    if(data.ok)
                        $scope.todos = _.reject($scope.todos, function(todo){ return todo['_id'] == id});               
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
        }

    });