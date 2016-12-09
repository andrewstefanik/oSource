angular.module('oSource').factory('EditService', ['$http', function($http) {
    return {
        getRepo: function(id) {
            return $http.get('/edit/'+ id);
        }
    }
}]);
