angular.module('oSource').factory('ProfileService', ['$http', function($http) {
    return {
        getProfile: function() {
            return $http.get('/api/me');
        },
        updateProfile: function(profileData) {
            return $http.put('/api/me', profileData);
        },
        getRepos: function() {
            return $http.get('/:userName/repos');
        }
    }
}]);
