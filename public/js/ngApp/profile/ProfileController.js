angular.module('oSource')
.controller('ProfileController', ['$scope', '$rootScope', '$http', 'ProfileService', 'SearchService', 'localStorageService', function($scope, $http, $rootScope, ProfileService, SearchService, localStorageService) {
    $scope.title = 'Repos';

    ProfileService.getProfile().then(function (response) {
        userName = response.data.userName;
        $scope.userName = userName;
        SearchService.user.get(
            {user: userName}, function (res) {
                var data = JSON.parse (res.data);
                $scope.repoList = data;
                localStorageService.set('userData', data);
                console.log (data);
            });
        });
}]);
