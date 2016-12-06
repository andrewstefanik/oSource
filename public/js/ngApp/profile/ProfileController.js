angular.module('oSource')
.controller('ProfileController', ['$scope', '$http', 'ProfileService', 'SearchService', function($scope, $http, ProfileService, SearchService) {
    $scope.title = 'Repos';

    var userName;


    ProfileService.getProfile().then(function (response) {
        userName = response.data.userName;
        $scope.userName = userName;
        SearchService.user.get(
            {user: userName}, function (res) {
                var data = JSON.parse (res.data);
                $scope.repoList = data;
                console.log (data);
            });
        });
}]);
