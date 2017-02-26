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
            getTasksForUserAssignee: getTasksForUserAssignee,
            getFormForTask: getFormForTask,
            claimTask: claimTask,
            completeTask: completeTask
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

        function getFormForTask(taskId) {
            var url = 'http://' + $rootScope.currentUser.id + ':' + $rootScope.currentUser.password + '@localhost:8080/activiti-rest/service/form/form-data?taskId=' + taskId;
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

        function completeTask(task) {
            var url = 'http://' + $rootScope.currentUser.id + ':' + $rootScope.currentUser.password + '@localhost:8080/activiti-rest/service/runtime/tasks/' + task.id;
            console.log(url);
            var requestBody = {};
            requestBody.action = "complete";
            requestBody.variables = [];
            if(task.form != undefined && task.form.formProperties != undefined){
                for(var i = 0 ; i < task.form.formProperties.length ; i++){
                    var variable = {};
                    variable.name = task.form.formProperties[i].id;
                    variable.value = task.form.formProperties[i].value;
                    variable.type = task.form.formProperties[i].type;
                    requestBody.variables.push(variable);
                }
            }
            var req = {
                method: 'POST',
                url: url,
                headers: {
                    'Accept': 'application/json',
                },
                data: requestBody
            }

            return $http(req);
        }

        function claimTask(taskId) {
            var url = 'http://' + $rootScope.currentUser.id + ':' + $rootScope.currentUser.password + '@localhost:8080/activiti-rest/service/runtime/tasks/' + taskId;
            console.log(url);

            var requestBody = {};
            requestBody.action = "claim";
            requestBody.assignee = $rootScope.currentUser.id;
            var req = {
                method: 'POST',
                url: url,
                headers: {
                    'Accept': 'application/json',
                },
                data: requestBody
            }

            return $http(req);
        }
    }
})();