(function () {
    'use strict';

    angular
        .module('phdapp')
        .factory('Task', Task);

    Task.$inject = ['$rootScope', '$http'];

    function Task ($rootScope, $http) {
        var service = {
            getTaskById: getTaskById,
            getTasksForCandidateGroups: getTasksForCandidateGroups,
            getTasksForCandidateUser: getTasksForCandidateUser,
            getTasksForUserAssignee: getTasksForUserAssignee
        }

        return service;


        function getTaskById(taskId) {
            var url = 'http://' + $rootScope.currentUser.id + ':' + $rootScope.currentUser.password + '@localhost:8080/activiti-rest/service/runtime/tasks/' + taskId;
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

        // param 'groups' should be comma separated list of groups. Eg. groups="engineering,marketing,admin"
        function getTasksForCandidateGroups(groups) {
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

        function getTasksForCandidateUser(user) {
            var url = 'http://' + $rootScope.currentUser.id + ':' + $rootScope.currentUser.password + '@localhost:8080/activiti-rest/service/runtime/tasks?candidateUser=' + user;
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


        function getTasksForUserAssignee(user) {
            var url = 'http://' + $rootScope.currentUser.id + ':' + $rootScope.currentUser.password + '@localhost:8080/activiti-rest/service/runtime/tasks?assignee=' + user;
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