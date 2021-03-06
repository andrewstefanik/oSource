angular.module('oSource', ['ui.router', 'ngRoute', 'satellizer', 'ngResource', 'toastr', 'LocalStorageModule', 'angularUtils.directives.dirPagination', 'ngMaterial'])
 .config (['$stateProvider', '$urlRouterProvider', '$locationProvider', '$authProvider', 'localStorageServiceProvider',
 function ($stateProvider, $urlRouterProvider, $locationProvider, $authProvider, localStorageServiceProvider) {

    var skipIfLoggedIn = ['$q', '$auth', '$location', function($q, $auth, $location) {
        var deffered = $q.defer();
        if ($auth.isAuthenticated()) {
            $location.path('/dashboard');
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
    .state('Landing', {
        url:'/',
        templateUrl: '/js/ngApp/landing/landing.html',
        data: {
            loggedIn: false
        }
    })
    .state('Login', {
        url: '/login',
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
    .state('AddNew', {
        url: '/add',
        templateUrl: 'js/ngApp/add/add.html',
        controller: 'AddController',
        data: {
            loggedIn: true
        }
    })
    .state('Search', {
        url: '/search',
        templateUrl: '/js/ngApp/search/search.html',
        controller: 'SearchController',
        data: {
            loggedIn: true
        }
    })
    .state('detail', {
        url: '/detail/:id',
        templateUrl: '/js/ngApp/detail/detail.html',
        controller: 'DetailController'
    })
    .state('Logout', {
        url: '/logout',
        template: null,
        controller: 'LogoutController'
    })
    .state('Dashboard', {
        url: '/dashboard',
        templateUrl: '/js/ngApp/profile/profile.html',
        controller: 'ProfileController',
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
    })
    .state('Edit', {
        url: '/edit/:id',
        templateUrl: '/js/ngApp/edit/edit.html',
        controller: 'EditController',
        data: {
            loggedIn: true
        }
    })
    .state('Contribute', {
        url: '/contribute',
        templateUrl: '/js/ngApp/submits/contribute.html',
        controller: 'SubmitController',
        data: {
            loggedIn: true
        }
    })
    .state('submitForm', {
        url: '/submitForm/:username',
        templateUrl: '/js/ngApp/submits/submitForm.html',
        controller: 'FormSubmitController',
        data: {
            loggedIn: true
        }
    })
    .state('Community', {
        url: '/community',
        templateUrl: '/js/ngApp/community/community.html',
        controller: 'CommunityController',
        data: {
            loggedIn: true
        }
    })
    .state('About', {
        url: '/about',
        templateUrl: '/js/ngApp/about/about.html',
        data: {
            loggedIn: false
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
