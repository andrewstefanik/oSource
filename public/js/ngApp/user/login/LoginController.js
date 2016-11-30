angular.module('oSource')
.controller('LoginController', ['$scope', '$auth', '$location', function($scope, $auth, $location) {

    $scope.authenticate = function(provider) {
        $auth.authenticate(provider).then(function(response) {
            console.log(response);
            $location.path('/profile');
        }).catch(function(error) {
            console.log(error);
            throw error;
        })
    };
}]);
