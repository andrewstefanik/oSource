angular.module('oSource').controller('SearchController', [
    '$scope',
    '$http',
    '$state',
    '$window',
    'SearchService',
    'ProfileService',
    function($scope, $http, $state, $window, SearchService, ProfileService) {


        $scope.lang = 'javascript';
        $scope.sort = 'stars';
        $scope.details = false;
        $scope.user;
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
        $scope.showUser = (() => {
            SearchService.user.get({
                user: userName
            }, function(res) {
                $scope.displayUser = res;
            })
        })
        $scope.pick = ((repo) => {
            $scope.selectedRepo = repo;
            $scope.details = true;
        });
    }
]).directive('searchResults', function () {
    return {
        restrict: 'EA',
        templateUrl: 'js/ngApp/search/result.html',
        scope: {
            results: '=',
            term: '@'
        }
    }
});
