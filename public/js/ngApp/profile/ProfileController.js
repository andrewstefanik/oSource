angular.module('oSource')
.controller('ProfileController', ['$scope', '$rootScope', '$http', 'ProfileService', 'SearchService', 'localStorageService', function($scope, $http, $rootScope, ProfileService, SearchService, localStorageService) {
    $scope.title = 'Repos';

    ProfileService.getProfile().then(function (response) {
        var userName = response.data.userName;
        $scope.userName = userName;
        SearchService.user.get({user: userName}, function (res) {
            var data = JSON.parse (res.data);
            $scope.repoList = data;
            console.log (data);
        })
        ProfileService.getRepos($scope.userName).then(function(res) {
            console.log('Yes sir', res.data);
            // var repoData = JSON.parse(res.data);
            $scope.repos = res.data;
            // console.log(repoData);
        })
    })
}]);
