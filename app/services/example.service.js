'use strict';


// init
// --------------------------------

angular
  .module('app')
  .factory('exampleService', exampleService);

exampleService.$inject = [];


// functionality
// --------------------------------

function exampleService() {


  //callable members
  var service = {
    exampleFunctionality: exampleFunctionality
  };

  return service;


  //service function
  function exampleFunctionality() {
    return false;
  };


};