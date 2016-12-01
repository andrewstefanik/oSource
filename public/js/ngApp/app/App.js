angular.module('oSource', ['ui.router', 'satellizer', 'ngResource', 'toastr'])
.config (['$stateProvider', '$urlRouterProvider', '$locationProvider', '$authProvider',
function ($stateProvider, $urlRouterProvider, $locationProvider, $authProvider) {

    var skipIfLoggedIn = ['$q', '$auth', '$location', function($q, $auth, $location) {
        var deffered = $q.defer();
        if ($auth.isAuthenticated()) {
            $location.path('/profile');
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
        controller: 'LoginController'
    })
    .state('Home', {
        url: '/home',
        templateUrl: '/js/ngApp/home/home.html',
        controller: 'HomeController'
    })
    .state('Add', {
        url: '/add',
        templateUrl: '/js/ngApp/add/add.html'
        // controller: 'AddController'
    })
    .state('Search', {
        url: '/search',
        templateUrl: '/js/ngApp/search/search.html',
        controller: 'SearchController'
    })
    .state('Search.results', {
        url: '/results',
        templateUrl: '/js/ngApp/search/result.html',
        controller: 'ResultController'
    })
    .state('Logout', {
        url: '/logout',
        template: null,
        controller: 'LogoutController'
    })
    .state('Profile', {
        url: '/profile',
        templateUrl: '/js/ngApp/profile/profile.html',
        controller: 'ProfileController',
        // resolve: {
        //     loginRequired: loginRequired
        // }
    })
    .state('Settings', {
        url: '/settings',
        templateUrl: '/js/ngApp/settings/setting.html',
        controller: 'SettingsController'
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

}]);
