'use strict'

var app = angular.module('GassyApp', [])

app.controller('InputController', ['$scope', '$log', '$http', function($scope, $log, $http){

  $scope.cars = []
  $scope.result_final = {};
  $scope.userCar = "";
  $scope.gasPrices = {};

  // Request to get the cars
  $http({
    method: 'GET',
    url: './src/data/carData.json'
  }).then(function successCallback(response) {
    response.data.Cars.forEach(function(car) {
      $scope.cars.push(car);
    }, this);
  }, function errorCallback(response) {
    console.log("ERROR:" + response);
  });

  // Request to get the gas prices
  $http({
    method: 'GET',
    url: 'http://www.fueleconomy.gov/ws/rest/fuelprices'
  }).then(function successCallback(response) {
    $scope.gasPrices = response.data;
  }, function errorCallback(response) {
    console.log("ERROR:" + response);
  });

  $scope.getPrice = function(Car, CrusingRange, gasType) {
    var the_car = [];
    var price_for_type = $scope.gasPrices[gasType.toLowerCase()];
    console.log(price_for_type);
    $scope.cars.forEach(function(car) {
      if (car.make === Car) {
        the_car.push(car);
      }
    }, this);

    var max_miles = the_car[0].mpg * the_car[0].fuel_capacity;
    var miles_used = max_miles - CrusingRange;
    var gallons_to_fill = miles_used / the_car[0].mpg;
    var price = gallons_to_fill * price_for_type;
    console.log(price);
    return price;
  }



}]);