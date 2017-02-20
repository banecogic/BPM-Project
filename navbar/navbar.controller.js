(function() {
    'use strict';

    angular
        .module('phdapp')
        .controller('NavbarController', NavbarController);

    NavbarController.$inject = ['$scope', '$rootScope', '$state', 'User'];

    function NavbarController($scope, $rootScope, $state, User) {

        $scope.isAdmin = function() {
        	return User.hasRole('admin');
        }

        $scope.isLoggedIn = function() {
        	if($rootScope.currentUser != null && $rootScope.currentUser != undefined)
        		return true;
        	return false;
        }

        $scope.logout = function() {
            $rootScope.currentUser = null;
        }
    }
})();
