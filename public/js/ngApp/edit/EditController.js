angular.module('oSource').controller('EditController', ['$scope', '$stateParams', 'EditService', function($scope, $stateParams, EditService) {
    $scope.title = 'Repos';
    $scope.id = $stateParams.id;

    EditService.getRepo($stateParams.id).then(function(res) {
        console.log('Yeppers', res.data);
        // var repoData = JSON.parse(res.data);
        $scope.formData = res.data;
        // console.log(repoData);
    })
}]);
