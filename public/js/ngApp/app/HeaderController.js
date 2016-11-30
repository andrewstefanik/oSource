angular.module('oSource').controller('NavbarController', ['$scope', '$auth', function($scope, $auth) {
    $scope.isAuthenticated = function() {
        return $auth.isAuthenticated();
    };
}]);
