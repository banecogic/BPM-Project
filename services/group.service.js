(function () {
    'use strict';

    angular
        .module('phdapp')
        .factory('Group', Group);

    Group.$inject = ['$rootScope', '$http'];

    function Group ($rootScope, $http) {
        var service = {
            getRolesForUser: getRolesForUser
        }

        return service;

        function getGroup(id) {
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