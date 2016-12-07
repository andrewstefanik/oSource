angular.module('oSource')
    .factory('SearchService', ['$resource', '$http', function($resource, $http) {


        var search = $resource('/search/:term/:lang/:sort');
        var user = $resource('/search/user/:user');
        var repo = $resource('/search/:login/:repo');

        return {
            search: search,
            user: user,
            repo: repo,
        }
    }]);
