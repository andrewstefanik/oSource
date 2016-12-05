angular.module('oSource')
.controller('ProfileController', ['$scope', 'ProfileService', function($scope, ProfileService) {
    $scope.title = 'Repos';

    $scope.getProfile = function() {
        ProfileService.getProfile().then(function(response) {
            $scope.user = response.data;
            $scope.userName = response.data.userName;
        }).catch(function(error) {
            throw error;
            // console.log(error);
        });
    };

    $scope.getProfile();

    // $scope.listRepos = function() {
    //     ListService.listRepos().then(function(response) {
    //         $scope.list = response.data;
    //     }).catch(function(error) {
    //         throw error;
    //     });
    // };
    //
    // $scope.listRepos();
}]);
