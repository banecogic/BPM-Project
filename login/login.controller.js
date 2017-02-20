(function() {
    'use strict';

    angular
        .module('phdapp')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope', '$rootScope', '$state', 'User'];

    function LoginController ($scope, $rootScope, $state, User) {

    	$scope.login = function(){
        	var promise = User.login($scope.username, $scope.password);
            promise.then(function(response){
                    var user = response.data.data[0];
                    user.password = $scope.password;
                    console.log('Successfully fetched user: "' + $scope.username + '".');
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
                    console.log('Fetching user "' + $scope.username + '" failed. Probably wrong credentials.');
                })
    	}
    }
})();
