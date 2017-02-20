(function() {
    'use strict';

    angular.module('phdapp',
        ['ui.router',
        'ngMessages',
        'ui.bootstrap',])
        .run(run);

      run.$inject = ['$rootScope', '$state'];

      function run($rootScope, $state) {

      }


 })();