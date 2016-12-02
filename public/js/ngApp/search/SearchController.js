angular.module('oSource').controller('SearchController', [
    '$scope',
    '$http',
    '$state',
    'SearchService',
    'ProfileSerivce',
    function($scope, $http, $state, SearchService, ProfileSerivce) {

        $scope.getProfile = function() {
            ProfileService.getProfile().then(function(response) {
                $scope.user = response.data;
                
            }).catch(function(error) {
                throw error;
                console.log(error);
        });
    };

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
                
            })
            $scope.term = '';
        })
        $scope.showUser = ((a) => {
            console.log(theUser)
            SearchService.user.get({
                user: a
            }, function(res) {
                $scope.displayUser = res
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