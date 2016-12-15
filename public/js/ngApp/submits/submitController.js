angular.module('oSource').controller('SubmitController', function(SearchService, $scope, $http) {
    $scope.reason = 'reason is to contribute';

    SearchService.userInfo.get({},((res) => {console.log(res.data); $scope.users = res.data}, (err) => {console.log(err);}));
    //console.log($scope.users);
    $scope.send = (() => {
        console.log($scope.msgToSend);
    });
});
