angular.module('oSource').controller('DetailController', function(localStorageService, $stateParams,$http) {
    var user = localStorageService.get('username');
    this.repoName = $stateParams['repo'];
    this.repo = null;
    $http.get('search/repo/'+ this.repoName + '/' + user).then((res) => {
        this.repo = res.data[0];
    }, (err) => {
        console.log(err);
    });
});