define(["angular",
        "angular-route",
        'angular-md5',
        'controllers/maincontroller',
        'directives/maindirective',
        'services/mainservice'
       ],function(angular){
    return angular.module("webapp",['ngRoute','angular-md5','webapp.controllers','webapp.directives','webapp.services']);
})


