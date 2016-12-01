angular.module('oSource')
.controller('ProfileController', ['$scope', '$auth', 'ProfileService', 'ListService', function($scope, $auth, ProfileService, ListService) {
    $scope.title = 'Activity';

    $scope.getProfile = function() {
        ProfileService.getProfile().then(function(response) {
            $scope.user = response.data;
        }).catch(function(error) {
            throw error;
            // console.log(error);
        });
    };

    $scope.listRepos = function() {
        ListService.listRepos().then(function(response) {
            $scope.list = response.data;
        }).catch(function(error) {
            throw error;
        });
    };

    $scope.listRepos();
}]);
