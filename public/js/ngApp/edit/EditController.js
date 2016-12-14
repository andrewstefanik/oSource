angular.module('oSource').controller('EditController', ['ProfileService', '$scope', '$stateParams', 'EditService', '$state', '$http', function(ProfileService, $scope, $stateParams, EditService, $state, $http) {
    $scope.title = 'Repos';
    $scope.id = $stateParams.id;
    $scope.user = null;
    $scope.isCurrentUser = false;
    ProfileService.getProfile().then((data) => {
        $scope.user = data.data.userName;
        console.log($scope.user);
    })
    EditService.getRepo($stateParams.id).then(function(res) {
        console.log('Yeppers', res.data);
        $scope.formData = res.data;
        if($scope.user == res.data.repo_owner){
            $scope.isCurrentUser = true;
            console.log($scope.isCurrentUser);
        }
    });
    $scope.update = function() {

        $http({
            url: '/edit/' + $scope.id,
            method: 'POST',
            data: $scope.formData
        }).then((res) => {
            $state.go('detail', {id: $scope.id});
        }, (err) => {
            console.log(err);
        });
    };
}]);
