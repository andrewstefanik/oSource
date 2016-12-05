angular.module('oSource')
.controller('ProfileController', ['$scope', '$http', 'ProfileService', 'SearchService', function($scope, $http, ProfileService, SearchService) {
    $scope.title = 'Repos';

    var userName;


    ProfileService.getProfile().then(function (response) {
        userName = response.data.userName;
        $scope.userName = userName;
        SearchService.user.get(
            {user: userName}, function (res) {
                $scope.list = res.data;
                // console.log(res.data);
            });
        }).catch(function (error) {
            console.log(error);
            throw error;
        });

    // $scope.getRepos();

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
