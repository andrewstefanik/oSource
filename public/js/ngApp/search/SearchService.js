angular.module('oSource')
    .factory('SearchService', function($resource) {
        var search = $resource('/search/:term/:lang/:sort');
        return {
            search: search
        }
    });