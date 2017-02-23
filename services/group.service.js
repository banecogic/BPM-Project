(function () {
    'use strict';

    angular
        .module('phdapp')
        .factory('Group', Group);

    Group.$inject = ['$rootScope', '$http'];

    function Group ($rootScope, $http) {
        var service = {
        }

        return service;

    }
})();