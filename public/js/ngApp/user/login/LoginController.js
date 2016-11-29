angular.module('oSource')
.controller('LoginController', ['$scope', '$location', '$auth', function($scope, $loction, $auth) {

    $scope.authenticate = function(provider) {
        $auth.authenticate(provider)
        .then(function(response) {
            console.log('Successfully logged in with ' + provider + '!');
            $location.path('/home');
        })
        .catch(function(error) {
            if (error) {
                throw error;
                console.log(error)
            } else if (error.data) {
                throw (error);
                console.log(error);
            } else {
                console.log(error);
            }
        });
    };
}]);
