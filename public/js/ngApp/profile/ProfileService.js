angular.module('oSource').factory('ProfileService', ['$http', function($http) {
    return {
        getProfile: function() {
            return $http.get('/api/me');
        },
        updateProfile: function(profileData) {
            return $http.put('/api/me', profileData);
        }
    };
}])
.factory('ListService', ['http', function($http) {
    return {
        listRepos: function() {
            return $http.get(`https://api.github.com/${user.userName}/repos?type=owner`);
        }
    }
}]);
