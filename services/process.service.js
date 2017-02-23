(function () {
    'use strict';

    angular
        .module('phdapp')
        .factory('Process', Process);

    Process.$inject = ['$rootScope', '$http'];

    function Process ($rootScope, $http) {
        var service = {
            getProcessDefinition: getProcessDefinition
        }

        return service;

        // param 'groups' should be comma separated list of groups. Eg. groups="engineering,marketing,admin"
        function getProcessDefinition(processDefinitionId) {
            var url = 'http://' + $rootScope.currentUser.id + ':' + $rootScope.currentUser.password + '@localhost:8080/activiti-rest/service/repository/process-definitions/' + processDefinitionId;
            console.log(url);

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