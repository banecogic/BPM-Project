(function() {
    'use strict';

    angular
        .module('phdapp')
        .controller('UserTasksController', UserTasksController);

    UserTasksController.$inject = ['$scope', '$rootScope', '$state', 'Task', 'Process'];

    function UserTasksController ($scope, $rootScope, $state, Task, Process) {

    	var userId = $rootScope.currentUser.id;


		$scope.claimTask = function(task) {
			Task.claimTask(task.id).then(function(response) {
					console.log('Successfully claimed task ' + task.id);
					refreshTasks();
				}, function(response) {
					console.log('Claiming task ' + task.id + ' failed!');
				});
		}

		var refreshTasks = function() {
			Task.getTasksForCandidateUser(userId).then(function(response) {
					console.log('Successfully fetched tasks where candidate user is ' + userId);
					$scope.candidateTasks = response.data.data;
					$scope.candidateTasks.forEach(function(task, index, arr){
				    	Process.getProcessDefinition(task.processDefinitionId).then(function(response) {
								console.log('Successfully fetched process definition of task ' + task.id);
								task.processDefinition = response.data;
					    	}, function(response) {
								console.log('Fetching process definition of task ' + $scope.assignedTasks[j].id + ' failed!');
					    	});
					});
				}, function(response) {
					console.log('Fetching tasks where candidate user is ' + userId + ' failed!');
				});

			Task.getTasksForUserAssignee(userId).then(function(response) {
					console.log('Successfully fetched tasks where assigned user is ' + userId);
					$scope.assignedTasks = response.data.data;
					$scope.assignedTasks.forEach(function(task, index, arr){
				    	Process.getProcessDefinition(task.processDefinitionId).then(function(response) {
								console.log('Successfully fetched process definition of task ' + task.id);
								task.processDefinition = response.data;
					    	}, function(response) {
								console.log('Fetching process definition of task ' + $scope.assignedTasks[j].id + ' failed!');
					    	});
					});
				}, function(response) {
					console.log('Fetching tasks where assigned user is ' + userId + ' failed!');
				});
		}

		refreshTasks();
    }
})();
