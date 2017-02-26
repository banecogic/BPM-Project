(function() {
    'use strict';

    angular
        .module('phdapp')
        .controller('TaskController', TaskController);

    TaskController.$inject = ['$scope', '$rootScope', '$state', '$stateParams', 'Process', 'task', 'User', 'Task'];

    function TaskController ($scope, $rootScope, $state, $stateParams, Process, task, User, Task) {

    	$scope.task = task.data.data[0];
    	Process.getProcessDefinition($scope.task.processDefinitionId).then(function(response) {
				console.log('Successfully fetched process definition of task ' + $scope.task.id);
				console.log('response data is : ');
				console.log(response.data);
				$scope.processDefinition = response.data;
	    	}, function(response) {
				console.log('Fetching process definition of task ' + task.id + ' failed!');
	    	});
        User.getUser($scope.task.assignee).then(function(response) {
                console.log('Successfully fetched assignee for the task ' + $scope.task.id);
                $scope.task.assignee = response.data.data[0];
            }, function(response) {
                console.log('Fetching assignee for the task ' + $scope.task.id + ' failed!');
            });
        Task.getFormForTask($scope.task.id).then(function(response) {
                console.log('Successfully fetched form for the task ' + $scope.task.id);
                $scope.task.form = response.data;
            }, function(response) {
                console.log('Fetching from for the task ' + $scope.task.id + ' failed!');
            });

        $scope.completeTask = function() {
            console.log('Complete button to complete task ' + $scope.task.id + ' clicked!');
            Task.completeTask($scope.task).then(function(response) {
                    console.log('Successfully completed task ' + $scope.task.id);
                    alert("Uspešno ste izvršili zadatak");
                    $state.go('tasks');
                }, function(response) {
                    console.log('Completing task ' + $scope.task.id + ' failed!');
                    alert("Došlo je do greške prilikom izvršavanja zadatka. Zadatak nije zavšren.");
                });
        }
        $scope.isCompleteDisabled = function() {
            if($scope.task.form != undefined && $scope.task.form.formProperties != undefined)
            for(var i=0 ; i<$scope.task.form.formProperties.length ; i++) {
                if($scope.task.form.formProperties[i].required) {
                    if($scope.task.form.formProperties[i].value == undefined || $scope.task.form.formProperties[i].value == null) {
                        return true;
                    }
                    if($scope.task.form.formProperties[i].type == "string" && $scope.task.form.formProperties[i].value.length <1){
                        return true;
                    }
                }
            }
            return false;
        }
    }
})();
