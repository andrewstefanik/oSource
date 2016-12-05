angular.module('oSource').controller('SearchController', [
    '$scope',
    '$http',
    '$state',
    'SearchService',
    'ProfileService',
    function($scope, $http, $state, SearchService, ProfileService) {
        var userName;
        $scope.getProfile = function() {
            ProfileService.getProfile().then(function(response) {
                $scope.user = response.data;
                $scope.userName = response.data.userName;
                userName = $scope.userName;
            }).catch(function(error) {
                throw error;
                console.log(error);
        });
    };
    $scope.getProfile();

        var results;
        $scope.results = '';
        $scope.term = '';
        $scope.lang = 'javascript';
        $scope.sort = 'stars';
        $scope.details = false;
        $scope.user;
        var theUser = $scope.user;
        $scope.search = (() => {
            SearchService.search.get({
                term: $scope.term,
                lang: $scope.lang,
                sort: $scope.sort
            }, function(res) {
                $scope.results = res.items;
                console.log(res.items);

            })
            $scope.term = '';
        })
        $scope.showUser = (() => {
            console.log(userName)
            SearchService.user.get({
                user: userName
            }, function(res) {
                $scope.displayUser = res;
                console.log(res);
            })
        })

        $scope.pick = ((repo) => {
            $scope.selectedRepo = repo;
            $scope.details = true;
        });
        $scope.back = (() => {
            $scope.details = false;
        })
    }
])
