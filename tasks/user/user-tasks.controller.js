(function() {
    'use strict';

    angular
        .module('phdapp')
        .controller('UserTasksController', UserTasksController);

    UserTasksController.$inject = ['$scope', '$rootScope', '$state', 'Task'];

    function UserTasksController ($scope, $rootScope, $state, Task) {

    	var userId = $rootScope.currentUser.id;

		Task.getTasksForCandidateUser(userId).then(function(response) {
				console.log('Successfully fetched tasks where candidate user is ' + userId);
				console.log('response data is : ');
				console.log(response.data);
				$scope.candidateTasks = response.data.data;
			}, function(response) {
				console.log('Fetching tasks where candidate user is ' + userId + ' failed!');
			});

		Task.getTasksForUserAssignee(userId).then(function(response) {
				console.log('Successfully fetched tasks where assigned user is ' + userId);
				console.log('response data is : ');
				console.log(response.data);
				$scope.assignedTasks = response.data.data;
			}, function(response) {
				console.log('Fetching tasks where assigned user is ' + userId + ' failed!');
			});

    }
})();
