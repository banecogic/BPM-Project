(function() {
    'use strict';

    angular
        .module('phdapp')
        .config(stateConfig);

        stateConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

        function stateConfig($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/home');

        $stateProvider
            .state('site', {
                'abstract': true,
                views: {
                    'navbar@': {
                        templateUrl: 'navbar/navbar.html',
                        controller: 'NavbarController'
                    }
                }
            })
            .state('home', {
                parent: 'site',
                url: '/home',
                views: {
                    'content@': {
                        templateUrl: 'home/home.html',
                        controller: 'HomeController'
                    }
                }
            })
            .state('admin', {
                'abstract': true,
                parent: 'site',
                url: '/admin'
            })
            .state('deployments', {
                parent: 'admin',
                url: '/deployments',
                views: {
                    'content@': {
                        templateUrl: 'admin/deployments/deployments.html',
                        controller: 'DeploymentsController'
                    }
                }
            })
            .state('processes', {
                parent: 'admin',
                url: '/processes',
                views: {
                    'content@': {
                        templateUrl: 'admin/processes/processes.html',
                        controller: 'ProcessesController'
                    }
                }
            })
            .state('login', {
                parent: 'site',
                url: '/login',
                views: {
                    'content@':{
                        templateUrl: 'login/login.html',
                        controller: 'LoginController'
                    }
                }
            })
            .state('tasks', {
                'abstract': true,
                parent: 'site',
                url: '/tasks'
            })
            .state('archived-tasks', {
                parent: 'tasks',
                url: '/archived-tasks',
                views: {
                    'content@':{
                        templateUrl: 'tasks/archived/archived-tasks.html',
                        controller: 'ArchivedTasksController'
                    }
                }
            })
            .state('group-tasks', {
                parent: 'tasks',
                url: '/group-tasks',
                views: {
                    'content@':{
                        templateUrl: 'tasks/group/group-tasks.html',
                        controller: 'GroupTasksController'
                    }
                }
            })
            .state('user-tasks', {
                parent: 'tasks',
                url: '/user-tasks',
                views: {
                    'content@':{
                        templateUrl: 'tasks/user/user-tasks.html',
                        controller: 'UserTasksController'
                    }
                }
            })
            .state('task', {
                parent: 'tasks',
                url: '/task/{id}',
                views: {
                    'content@':{
                        templateUrl: 'tasks/task.html',
                        controller: 'TaskController'
                    }
                },
                resolve: {
                    task: ['$stateParams', 'Task', function($stateParams, Task) {
                        return Task.getTaskById($stateParams.id);
                    }]
                }
            });
    }
})();