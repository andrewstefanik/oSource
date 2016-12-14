angular.module('oSource').controller('DetailController', function($stateParams,$http) {
    this.id = $stateParams['id'];
    this.repo = null;
    $http.get('search/detail/'+ this.id).then((res) => {
        this.repo = res.data;
    }, (err) => {
        console.log(err);
    });
});