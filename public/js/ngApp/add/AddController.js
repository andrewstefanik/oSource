angular.module('oSource').controller('AddController', ['$stateParams','$scope', '$auth', '$rootScope', 'SearchService', 'ProfileService', function($stateParams, $scope, $auth, $rootScope, SearchService, ProfileService) {


    ProfileService.getProfile().then(function(response) {
        var userName = response.data.userName;
        $scope.userName = userName;
        console.log(userName)
    })

    $scope.login = $stateParams.userName;
    $scope.repo = $stateParams.name;
    // console.log($scope.login);
    // console.log($scope.repo);

    $scope.search = function() {
        console.log ('********* HERE');
        SearchService.repo.get({
            login: $scope.login,
            repo: $scope.repo
        }, function(res) {
            var results = JSON.parse(res.data);
            $scope.results = results
            console.log(results);
        });
    };

    $scope.search()
}]);
