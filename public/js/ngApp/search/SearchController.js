angular.module('oSource').controller('SearchController', [
    '$scope',
    '$http',
    '$state',
    'SearchService',
    'ProfileService',
    function($scope, $http, $state, SearchService, ProfileService) {

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
                
            });
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