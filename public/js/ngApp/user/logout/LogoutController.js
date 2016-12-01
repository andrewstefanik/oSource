angular.module('oSource').controller('LogoutController', ['$location', '$auth', 'toastr', function($location, $auth, toastr) {
    if (!$auth.isAuthenticated()) { return; }
    $auth.logout()
    .then(function() {
        toastr.info('You have been logged out');
        $location.path('/');
    });
}]);
