angular.module('oSource')
    .factory('SearchService', ['$resource', '$http', 'localStorageService', function($resource, $http, localStorageService) {


        var search = $resource('/search/:term/:lang/:sort');
        var user = $resource('/search/user/:user');
        var repo = $resource('/search/:login/:repo');
        var added = $resource('/search/added/:user');
        var addedFn = added.get({user: localStorageService.get('username')}, (res) => {
                    localStorageService.set('added', res);
                })

        return {
            search: search,
            user: user,
            repo: repo,
            added: added,
            addedFn: addedFn
        }
    }]);
