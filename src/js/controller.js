'use strict'

var app = angular.module('GassyApp', [])

app.controller('InputController', ['$scope', '$log', '$http', function($scope, $log, $http){

  $scope.cars = []
  $scope.result_final = {};
  $scope.userCar = "";

  $http({
    method: 'GET',
    url: './src/data/carData.json'
  }).then(function successCallback(response) {
    console.log(response.data.Cars);
    response.data.Cars.forEach(function(car) {
      $scope.cars.push(car);
    }, this);
  }, function errorCallback(response) {
    console.log("ERROR:" + response);
  });

  $scope.getPrice = function(Car, CrusingRange) {
    var THEcar = [];
    $scope.cars.forEach(function(car) {
      if (car.make === Car) {
        THEcar.push(car);
      }
    }, this);

    var max_miles = THEcar[0].mpg * THEcar[0].fuel_capacity;
    var miles_used = max_miles - CrusingRange;
    var gallons_to_fill = miles_used / THEcar[0].mpg;
    console.log(gallons_to_fill);
    return gallons_to_fill;
  }



}]);