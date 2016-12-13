angular.module('oSource').controller('EditController', ['$scope', '$stateParams', 'EditService', '$state', '$http', function($scope, $stateParams, EditService, $state, $http) {
    $scope.title = 'Repos';
    $scope.id = $stateParams.id;

    EditService.getRepo($stateParams.id).then(function(res) {
        console.log('Yeppers', res.data);
        $scope.formData = res.data;
    });
    $scope.update = function() {
        $http({
            url: '/edit/' + $scope.id,
            method: 'POST',
            data: $scope.formData
        }).then((res) => {
            $state.go('detail');
        }, (err) => {
            console.log(err);
        });
    };
}]);
