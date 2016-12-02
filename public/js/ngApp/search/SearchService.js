angular.module('oSource')
    .factory('SearchService', function($resource) {
        var search = $resource('/search/:term/:lang/:sort');
        var user = $resource('/search/user/:user');
        return {
            search: search,
            user: user
        }
    });