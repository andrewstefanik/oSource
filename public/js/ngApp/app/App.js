angular.module('oSource', ['ui.router', 'satellizer', 'ngResource'])
    .config (['$stateProvider', '$urlRouterProvider', '$locationProvider', '$authProvider',
    function ($stateProvider, $urlRouterProvider, $locationProvider, $authProvider) {
        $authProvider.github({
            clientId: 'Github clientId'
        });
        $authProvider.linkedin({
            clientId: 'LinkedIn clientId'
        });
        $authProvider.bitbucket({
            clientId: 'Bitbucket clientId'
        });

        $stateProvider
        .state('Login', {
            url: '/',
            templateUrl: '/js/ngApp/user/login/login.html',
            controller: 'LoginController'
        })
        $urlRouterProvider.otherwise('/');
        $locationProvider.html5Mode(true);
    }]
);
