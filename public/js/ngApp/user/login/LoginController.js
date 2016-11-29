angular.module('oSource')
.controller('LoginController', ['$scope', '$auth', '$state', function($scope, $auth, $state) {

    $scope.authenticate = function(provider) {
        $auth.authenticate(provider).then(function(response) {
            console.log(response);
            $state.go('Home');
        }).catch(function(error) {
            console.log(error);
            throw error;
        })
    };
}]);
