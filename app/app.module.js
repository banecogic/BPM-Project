(function() {
    'use strict';

	angular.module('phdapp',
		['ui.router',
		'ngMessages',
		'ui.bootstrap',])
		.run(run);

	run.$inject = ['$rootScope', '$state', 'User'];

	function run($rootScope, $state, User) {
    	var promise = User.login("bane", "cogic");
        promise.then(function(response){
                var user = response.data.data[0];
                user.password = "cogic";
                console.log('Successfully login so i dont lose time loging after each refresh');
                $rootScope.currentUser = user;
                var groupsPromise = User.getRolesForUser(user.id);
                groupsPromise.then(function(response){
                        $rootScope.currentUser.groups = response.data.data;
                        console.log('Successfully fetched groups for user ' + $rootScope.currentUser.id);
                        console.log('Going from state "login" to state "home"');
                        $state.go('home');
                    }, function (response) {
                        console.log('Fething groups for user ' + $rootScope.currentUser.id + ' failed! Probably end point doesn\'t exist!');
                    })

            }, function(response) {
                console.log('Default login so i dont lose time loging after each refresh failed');
            })
	}


 })();