angular.module('oSource').controller('NavbarController', ['$scope', '$auth', '$route', 'ProfileService', function($scope, $auth, $route, ProfileService) {
    $scope.isAuthenticated = function() {
        return $auth.isAuthenticated();
    };

    $scope.getProfile = function() {
      ProfileService.getProfile()
        .then(function(response) {
          $scope.user = response.data;
        })
        .catch(function(response) {
          toastr.error(response.data.message, response.status);
        });
    };



    $scope.getProfile()
    $route.reload();
}]);
