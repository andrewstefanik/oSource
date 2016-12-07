angular.module('oSource').controller('AddController', ['$stateParams','$scope', '$auth', '$rootScope', 'SearchService', function($stateParams, $scope, $auth, $rootScope, SearchService) {


    $scope.login = $stateParams.userName;
    $scope.repo = $stateParams.name;
    console.log($scope.login);
    console.log($scope.repo);
    // $scope.repo = {
    //     name = 'bob',
    //     description = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    // }

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
