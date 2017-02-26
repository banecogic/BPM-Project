(function() {
    'use strict';

    angular
        .module('phdapp')
        .controller('GroupTasksController', GroupTasksController);

    GroupTasksController.$inject = ['$scope', '$rootScope', '$state', 'Task'];

    function GroupTasksController ($scope, $rootScope, $state, Task) {
    	var groups = $rootScope.currentUser.groups;
    	var groupsCommaSeparated = '';
    	if(groups != undefined){
    		for(var i = 0 ; i < groups.length ; i++) {
    			if (groupsCommaSeparated != '')
    				groupsCommaSeparated = groupsCommaSeparated + ',';
    			groupsCommaSeparated = groupsCommaSeparated + groups[i].id;
    		}
		}
		console.log('Groups = ' + groupsCommaSeparated);

		Task.getTasksForCandidateGroups(groupsCommaSeparated).then(function(response) {
                console.log('Successfully fetched tasks where candidate groups are: ' + groupsCommaSeparated);
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
                console.log('Fetching tasks where candidate groups are: ' + groupsCommaSeparated + ' failed!');
            });
    }
})();