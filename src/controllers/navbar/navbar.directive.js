(function() {
  
  'use strict';
  
  angular
    .module('GassyApp')
    .directive('navbar', navbar);
    
  function navbar() {
    return {
      templateUrl: './src/controllers/navbar/navbar.html',
      controller: navbarController,
      controllerAs: 'vm'
    }
  }

  navbarController.$inject = ['authService'];
    
  function navbarController(authService) {
    var vm = this;
    vm.auth = authService;
  }
  
})();