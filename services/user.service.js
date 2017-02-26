(function () {
    'use strict';

    angular
        .module('phdapp')
        .factory('User', User);

    User.$inject = ['$rootScope', '$http'];

    function User ($rootScope, $http) {
        var service = {
            getUser: getUser,
            getRolesForUser: getRolesForUser,
            hasRole: hasRole,
            login: login
        }

        return service;

        function getUser (userId) {
            var url = 'http://' + $rootScope.currentUser.id + ':' + $rootScope.currentUser.password + '@localhost:8080/activiti-rest/service/identity/users?id=' + userId;

            var req = {
                method: 'GET',
                url: url,
                headers: {
                    'Accept': 'application/json',
                }
            }

            return $http(req);
        }

        function hasRole (role) {
            var currentUser = $rootScope.currentUser;
            if (currentUser != undefined && currentUser != null){
                if (currentUser.groups != undefined && currentUser.groups != null){
                    for (var i=0 ; i < currentUser.groups.length ; i++){
                        if (currentUser.groups[i].id == role) {
                            return true;
                        }
                    }
                }
            }
            return false;
        }

        function login(username, password) {
            var url = 'http://' + username + ':' + password + '@localhost:8080/activiti-rest/service/identity/users?id=' + username;

            var req = {
                method: 'GET',
                url: url,
                headers: {
                    'Accept': 'application/json',
                }
            }

            return $http(req);
        }

        function getRolesForUser(id) {
            var url = 'http://' + $rootScope.currentUser.id + ':' + $rootScope.currentUser.password + '@localhost:8080/activiti-rest/service/identity/groups?member=' + id;

            var req = {
                method: 'GET',
                url: url,
                headers: {
                    'Accept': 'application/json',
                }
            }

            return $http(req);
        }
    }
})();