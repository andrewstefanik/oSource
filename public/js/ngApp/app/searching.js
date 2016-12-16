angular.module('oSource').controller('RepoSearchController', ['$mdSidenav', '$http', function($mdSidenav, $http) {
    this.repo= [];
    $http({
        url: '/search/allRepos',
        method: 'GET'
    }).then(
        (res) => {
            console.dir(res.data);
            res.data.map((val) => {
                this.repo.push(val);
                return this.repo;
            })
            this.message = `Showing ${this.repo.length} of ${this.repo.length} items`;
        },
        (err) => {
            console.error(err);
        }
    )
    this.message = '';
    this.searchTerm = '';
    this.isSearching = false;

    this.open = (() => {
        $mdSidenav('repoSearch').toggle();
    });

    this.findMatches = (() => {
        this.isSearching = true;
        console.log('finding matches......');
        this.repoMatch = compareCharacter(this.repo, this.searchTerm);
        this.message = `Showing ${this.repoMatch.length} of ${this.repo.length} items`;
    });
    function compareCharacter(arrayToSearch, charsToMatch) {
        var newArr = [];
        var singleWord = arrayToSearch.map((el, idx, arr) => {
            var len = charsToMatch.length;
            var partWord = el.repo_name.slice(0, len);
                if(partWord == charsToMatch) {
                    newArr.push(el);
                }
            });
            return newArr;
        };
}]);
