(function() {
    'use strict';

    angular
        .module('phdapp')
        .controller('TaskController', TaskController);

    TaskController.$inject = ['$scope', '$rootScope', '$state', '$stateParams', 'Process', 'task'];

    function TaskController ($scope, $rootScope, $state, $stateParams, Process, task) {

    	$scope.task = task.data.data[0];
    	Process.getProcessDefinition($scope.task.processDefinitionId).then(function(response) {
				console.log('Successfully fetched process definition of task ' + task.id);
				console.log('response data is : ');
				console.log(response.data);
				$scope.processDefinition = response.data;
	    	}, function(response) {
				console.log('Fetching process definition of task ' + task.id + ' failed!');
	    	});

    }
})();
