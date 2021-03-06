'use strict'

var app = angular.module('GassyApp', []);

app.controller('InputController', ['$scope', '$log', '$http', function($scope, $log, $http){

  $scope.cars = []
  $scope.result_final = {};
  $scope.userCar = "";
  $scope.gasPrices = {};
  $scope.result_ready = false;
  $scope.first_quarter = 0;
  $scope.second_quarter = 0;
  $scope.third_quarter = 0;
  $scope.fourth_quarter = 0;
  $scope.national_average = 40;

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

  $scope.refresh = function () {
    $scope.cars = []
    $scope.result_final = {};
    $scope.userCar = "";
    $scope.gasPrices = {};
    $scope.result_ready = false;
    $scope.first_quarter = 0;
    $scope.second_quarter = 0;
    $scope.third_quarter = 0;
    $scope.fourth_quarter = 0;

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
  }

  $scope.getPrice = function(Car, CrusingRange, gasType) {
    $scope.crusing_range = CrusingRange;
    var the_car = [];
    var price_for_type = $scope.gasPrices[gasType.toLowerCase()];
    console.log(price_for_type);
    $scope.national_average = price_for_type;
    $scope.cars.forEach(function(car) {
      if (car.make === Car) {
        the_car.push(car);
      }
    }, this);

    var max_miles = the_car[0].mpg * the_car[0].fuel_capacity;
    $scope.current_percent = Math.ceil((CrusingRange / max_miles) * 100);
    
    $scope.result_ready = true;
    var miles_used_percentile = (miles_used / max_miles) * 100;
    if (miles_used_percentile == 100) {
      // Do nothing here
      $scope.first_quarter = 0;
      $scope.second_quarter = 0;
      $scope.third_quarter = 0;
      $scope.fourth_quarter = 0;
      console.log("YOU ARE ALREADY AT A 100 BROO!!");
    } else if (miles_used_percentile >= 75) {
      // Go up to 100
      $scope.first_quarter = 0;

      $scope.second_quarter = 0;

      $scope.third_quarter = 0;

      var miles_used = max_miles*(1.00) - CrusingRange;
      var gallons_to_fill = miles_used / the_car[0].mpg;
      var price = gallons_to_fill * price_for_type;
      $scope.fourth_quarter = Math.round(price * 100) / 100; // Rounds to two decimal places
      console.log("Only till 100: $" + price);

    } else if (miles_used_percentile >= 50) {
      // Go up to 75, 100
      $scope.first_quarter = 0;

      $scope.second_quarter = 0;

      var miles_used = max_miles*(0.75) - CrusingRange;
      var gallons_to_fill = miles_used / the_car[0].mpg;
      var price = gallons_to_fill * price_for_type;
      $scope.third_quarter = Math.round(price * 100) / 100; // Rounds to two decimal places
      console.log("till 75%: $" + price);

      miles_used = max_miles*(1.00) - CrusingRange;
      gallons_to_fill = miles_used / the_car[0].mpg;
      price = gallons_to_fill * price_for_type;
      $scope.fourth_quarter = Math.round(price * 100) / 100; // Rounds to two decimal places
      console.log("till 100%: $" + price);

    } else if (miles_used_percentile >= 25){
      // Go up to 50, 75, 100
      $scope.first_quarter = 0;

      var miles_used = max_miles*(0.50) - CrusingRange;
      var gallons_to_fill = miles_used / the_car[0].mpg;
      var price = gallons_to_fill * price_for_type;
      $scope.second_quarter = Math.round(price * 100) / 100; // Rounds to two decimal places
      console.log("till 50%: $" + price);

      miles_used = max_miles*(0.75) - CrusingRange;
      gallons_to_fill = miles_used / the_car[0].mpg;
      price = gallons_to_fill * price_for_type;
      $scope.third_quarter = Math.round(price * 100) / 100; // Rounds to two decimal places
      console.log("till 75%: $" + price);

      miles_used = max_miles*(1.00) - CrusingRange;
      gallons_to_fill = miles_used / the_car[0].mpg;
      price = gallons_to_fill * price_for_type;
      $scope.fourth_quarter = Math.round(price * 100) / 100; // Rounds to two decimal places
      console.log("till 100%: $" + price);

    } else {
      // Go up to 25, 50, 75, 100
      var miles_used = max_miles*(0.25) - CrusingRange;
      var gallons_to_fill = miles_used / the_car[0].mpg;
      var price = gallons_to_fill * price_for_type;
      $scope.first_quarter = Math.round(price * 100) / 100; // Rounds to two decimal places
      console.log("till 25%: $" + price);

      miles_used = max_miles*(0.50) - CrusingRange;
      gallons_to_fill = miles_used / the_car[0].mpg;
      price = gallons_to_fill * price_for_type;
      $scope.second_quarter = Math.round(price * 100) / 100; // Rounds to two decimal places
      console.log("till 50%: $" + price);

      miles_used = max_miles*(0.75) - CrusingRange;
      gallons_to_fill = miles_used / the_car[0].mpg;
      price = gallons_to_fill * price_for_type;
      $scope.third_quarter = Math.round(price * 100) / 100; // Rounds to two decimal places
      console.log("till 75%: $" + price);

      miles_used = max_miles*(1.00) - CrusingRange;
      gallons_to_fill = miles_used / the_car[0].mpg;
      price = gallons_to_fill * price_for_type;
      $scope.fourth_quarter = Math.round(price * 100) / 100; // Rounds to two decimal places
      console.log("till 100%: $" + price);
    }
    return price;
  }

}]);