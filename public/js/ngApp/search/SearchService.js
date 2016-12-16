angular.module('oSource')
    .factory('SearchService', ['$resource', function($resource) {


        var search = $resource('/search/:term/:lang/:sort');
        var user = $resource('/search/user/:user');
        var repo = $resource('/search/:login/:repo');
        var added = $resource('/search/added/:user');
        var all = $resource('/search/allRepos');
        var userInfo = $resource('/search/userInfo');

        return {
            search: search,
            user: user,
            repo: repo,
            added: added,
            all: all,
            userInfo: userInfo
        }
    }]);