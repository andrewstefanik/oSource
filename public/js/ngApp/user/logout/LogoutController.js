angular.module('oSource').controller('LogoutController', ['$location', '$auth', function($location, $auth) {
    if (!$auth.isAuthenticated()) { return; }
    $auth.logout()
    .then(function() {
        console.log('You have been logged out');
        $location.path('/');
    });
}]);
