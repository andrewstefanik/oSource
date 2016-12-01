angular.module('oSource').controller('SearchController', [
    '$scope',
    '$http',
    '$state',
    'SearchService',
    function($scope, $http, $state, SearchService) {
        var results;
        $scope.results = '';
        $scope.term = '';
        $scope.lang = 'javascript';
        $scope.sort = 'stars';

        $scope.search = (() => {
            SearchService.search.get({
                term: $scope.term,
                lang: $scope.lang || null,
                sort: $scope.sort || null
            }, function(res) {
                $scope.results = res.items;
            })
            $scope.term = '';
        })
    }
])