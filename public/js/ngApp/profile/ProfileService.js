angular.module('oSource').factory('ProfileService', ['$http', function($http) {
    return {
        getProfile: function() {
            console.log('************ here ************');
            return $http.get('/api/me');
        },
        updateProfile: function(profileData) {
            return $http.put('/api/me', profileData);
        }
    };
}]);
