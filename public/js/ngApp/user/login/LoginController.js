angular.module('oSource')
.controller('LoginController', ['$scope', '$auth', '$location', 'toastr', function($scope, $auth, $location, toastr) {

    $scope.authenticate = function(provider) {
        $auth.authenticate(provider).then(function(response) {
            toastr.success('You have successfully signed in with ' + provider + '!');
            $location.path('/profile');
        }).catch(function(error) {
            if (error.message) {
                // Satellizer promise reject error.
                toastr.error(error.message);
            } else if (error.data) {
                // HTTP response error from server
                toastr.error(error.data.message, error.status);
            } else {
                toastr.error(error);
            }

        })
    };
}]);
