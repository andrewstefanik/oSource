angular.module('oSource').controller('NavbarController', ['$scope', '$auth', 'ProfileService', function($scope, $auth, ProfileService) {
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
}]);
