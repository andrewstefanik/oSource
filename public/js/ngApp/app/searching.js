angular.module('oSource').controller('RepoSearchController', ['localStorageService', 'SearchService', '$mdSidenav', function(localStorageService, SearchService, $mdSidenav) {
    var userName = localStorageService.get('username');
    var userRepos;
    console.log(userName);
    SearchService.added.get({user: userName}, function(res) {
        console.log(res.data)
        userRepos = res.data;
        console.log(userRepos);
        this.repo = [];
        this.searchTerm = '';
        this.repoMatch;
        var repoNames = userRepos.forEach(function(repo) {
            this.repo.push({
                name: repo.name,
                description: repo.description,
                language: repo.language
            });
        });
        function compareCharacter(arrayToSearch, charsToMatch) {
            var newArr = [];
            var singleWord = arrayToSearch.map((el, idx, arr) => {
                var len = charsToMatch.length;
                var partWord = el.name.slice(0, len);
                if(partWord == charsToMatch) {
                    newArr.push(el);
                }
            });
            return newArr;
        };
        this.findMatches = (() => {
            console.log('finding matches......');
            this.repoMatch = compareCharacter(this.repo, this.searchTerm);
        });
    })
    this.open = (() => {
        $mdSidenav('repoSearch').toggle();
    })
}]);
