(function () {
    'use strict';

    angular
        .module('phdapp')
        .factory('Task', Task);

    Task.$inject = ['$rootScope', '$http'];

    function Task ($rootScope, $http) {
        var service = {
            getTaskForCandidateGroups: getTaskForCandidateGroups
        }

        return service;

        // param 'groups' should be comma separated list of groups. Eg. groups="engineering,marketing,admin"
        function getTaskForCandidateGroups(groups) {
            var url = 'http://' + $rootScope.currentUser.id + ':' + $rootScope.currentUser.password + '@localhost:8080/activiti-rest/service/runtime/tasks?candidateGroups=' + groups;
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