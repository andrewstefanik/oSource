angular.module('oSource').controller('SubmitController', function(SearchService, $scope, $http, $state) {
    this.reason = 'reason is to contribute';
    this.users;
    this.msgToSend = '';
    this.selectedUser;
    this.isSelected = false;
    $http({
        url: '/search/userInfo',
        method: 'GET'
    }).then(
        (res) => {
            this.users = res.data;
        }
    );
    this.selectUser = ((username) => {
        $state.go('submitForm', {username: username});
    });
})
.controller('FormSubmitController', function($http, $state, $stateParams) {

    this.repo;
    $http.get('/search/added/' + $stateParams.username).then(
        (res) => {
            this.user = res.data;
        }
    );

    this.send = (() => {
        console.log(this.msgToSend);
    });
});
