angular.module('oSource')
.controller('LoginController', ['$scope', '$auth', function($scope, $auth) {

    $scope.authenticate = function(provider) {
        $auth.authenticate(provider).then(function(response) {
            response.redirect('/')
        }).catch(function(error) {
            throw error;
            console.log(error);
        })
    };
}]);
