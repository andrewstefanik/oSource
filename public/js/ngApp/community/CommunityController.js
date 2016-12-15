angular.module('oSource').controller('CommunityController', ['$scope', '$http', '$resource', function($scope, $http, $resource) {

    $http({
        method: 'GET',
        url: '/community/list',
    }).then(function (response) {
        $scope.results = response.data;
    });
}]);
