angular.module('oSource', ['ui.router', 'satellizer', 'ngResource', 'toastr', 'LocalStorageModule', 'angularUtils.directives.dirPagination'])
 .config (['$stateProvider', '$urlRouterProvider', '$locationProvider', '$authProvider', 'localStorageServiceProvider',
 function ($stateProvider, $urlRouterProvider, $locationProvider, $authProvider, localStorageServiceProvider) {

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
        controller: 'LoginController',
        data: {
            loggedIn: false
        }
    })
    .state('Home', {
        url: '/home',
        templateUrl: '/js/ngApp/home/home.html',
        controller: 'HomeController',
        data: {
            loggedIn: true
        }
    })
    .state('Add', {
        url: '/add/:userName/:name',
        templateUrl: '/js/ngApp/add/add.html',
        controller: 'AddController',
        data: {
            loggedIn: true
        }
    })
    // .state('Addnew', {
    //     url: '/add/:userName/:name',
    //     templateUrl: 'js/ngApp/add/add.html',
    //     controller: 'AddController',
    //     data: {
    //         loggedIn: true
    //     }
    // })
    .state('Search', {
        url: '/search',
        templateUrl: '/js/ngApp/search/search.html',
        controller: 'SearchController',
        data: {
            loggedIn: true
        }
    })
    .state('Search.details', {
        url: '/details/:reponame',
        templateUrl: '/js/ngApp/search/result.html',
        controller: 'DetailController'
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
        // },
        data: {
            loggedIn: true
        }
    })
    .state('Settings', {
        url: '/settings',
        templateUrl: '/js/ngApp/settings/setting.html',
        controller: 'SettingsController',
        data: {
            loggedIn: true
        }
    });
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);

    localStorageServiceProvider
        .setPrefix('userRepos');


$authProvider.github({
    clientId: '5481e8f59a1a3622cdd9'
});
$authProvider.linkedin({
    clientId: '7851i9yrepkdi1'
});
$authProvider.bitbucket({
    clientId: 'zneuXuQUP8DrSRJnUP'
});

}]).run(($rootScope, SecureRouteService) => {
    $rootScope.$on('$stateChangeStart', (event, arg) => {
        if (arg.data && arg.data.loggedIn) {
            if(!SecureRouteService.loggedIn()) {
                event.preventDefault();
                $state.go('Login');
            }
        }
    })
})
