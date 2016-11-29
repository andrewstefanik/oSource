angular.module('oSource', ['ui.router', 'satellizer', 'ngResource'])
    .config (['$stateProvider', '$urlRouterProvider', '$locationProvider', '$authProvider',
    function ($stateProvider, $urlRouterProvider, $locationProvider, $authProvider) {
        $authProvider.github({
            clientId: '5481e8f59a1a3622cdd9'
        });
        $authProvider.linkedin({
            clientId: '7851i9yrepkdi1'
        });
        $authProvider.bitbucket({
            clientId: 'zneuXuQUP8DrSRJnUP'
        });

        $stateProvider
        .state('Login', {
            url: '/',
            templateUrl: '/js/ngApp/user/login/login.html',
            controller: 'LoginController'
        })
        .state('Home', {
            url: '/home',
            templateUrl: '/js/ngApp/home/home.html',
            controller: 'HomeController'
        })
        .state('Add', {
            url: '/add',
            templateUrl: '/js/ngApp/add/add.html',
            controller: 'AddController'
        })
        $urlRouterProvider.otherwise('/');
        $locationProvider.html5Mode(true);
    }]
);
