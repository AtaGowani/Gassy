(function () {

  'use strict';

  angular
    .module('GassyApp')
    .controller('HomeController', homeController);

  homeController.$inject = ['authService'];

  function homeController(authService) {

    var vm = this;
    vm.auth = authService;

  }

})();