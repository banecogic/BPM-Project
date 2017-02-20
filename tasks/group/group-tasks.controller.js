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

		Task.getTaskForCandidateGroups(groupsCommaSeparated).then(function(response) {
				console.log('Successfully fetched tasks where candidate groups are one that user ' + $rootScope.currentUser.id + ' is in.');
				console.log('response data is : ');
				console.log(response.data);
			}, function(response) {
				console.log('Fetching tasks where candidate groups are one that user ' + $rootScope.currentUser.id + ' is in failed!');
			})
    }
})();