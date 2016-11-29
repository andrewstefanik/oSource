angular.module('oSource', ['ui.router', 'satellizer', 'ngResource'])
    .config (['$stateProvider', '$urlRouterProvider', '$locationProvider', '$authProvider',
    function ($stateProvider, $urlRouterProvider, $locationProvider, $authProvider) {

        var skipIfLoggedIn = ['$q', '$auth', function($q, $auth) {
            var deffered = $q.defer();
            if ($auth.isAuthenticated()) {
                deffered.reject();
            } else {
                deferred.resolve();
            }
            return deferred.promise;
        }];

        var loginRequired = ['$q', '$location', '$auth', function($q, $location, $auth) {
            var deffered = $q.defer();
            if ($auth.isAuthenticated()) {
                deffered.resolve();
            } else {
                $location.path('/');
            }
            return deferred.promise;
        }];
        $stateProvider
        .state('Login', {
            url: '/',
            templateUrl: '/js/ngApp/user/login/login.html',
            controller: 'LoginController',
            resolve: {
                skipIfLoggedIn: skipIfLoggedIn
            }
        })
        .state('Logout', {
            url: '/logout',
            template: null,
            controller: 'LogoutController'
        })
        .state('Home', {
            url: '/home',
            templateUrl: '/js/ngApp/home/home.html',
            controller: 'HomeController',
            resolve: {
                loginRequired: loginRequired
            }
        });
        $urlRouterProvider.otherwise('/');
        $locationProvider.html5Mode(true);


        $authProvider.github({
            clientId: '5481e8f59a1a3622cdd9'
        });
        $authProvider.linkedin({
            clientId: '7851i9yrepkdi1'
        });
        $authProvider.bitbucket({
            clientId: 'zneuXuQUP8DrSRJnUP'
        });

    }]
);
