angular.module('oSource')
.controller('ProfileController', ['$scope', '$auth', 'ProfileService', function($scope, $auth, ProfileService) {
    $scope.title = 'Activity';

    $scope.getProfile = function() {
        ProfileService.getProfile().then(function(response) {
            $scope.user = response.data;
        }).catch(function(error) {
            throw error;
            // console.log(error);
        });
    };

    
}]);
