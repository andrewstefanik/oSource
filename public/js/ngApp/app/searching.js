angular.module('oSource').controller('RepoSearchController', function(localStorageService, $scope) {
    var userRepos = localStorageService.get('userData');
    this.repo = [];
    this.searchTerm = '';
    this.repoMatch;
    var repoNames = userRepos.forEach((repo) => {
        this.repo.push(repo.name);
    });
    this.findMatches = (() => {
        console.log('finding matches......');
        this.repoMatch = compareCharacter(this.repo, this.searchTerm);
    });
    function compareCharacter(arrayToSearch, charsToMatch) {
        var newArr = [];
        var singleWord = arrayToSearch.map((el, idx, arr) => {
            var len = charsToMatch.length;
            var partWord = el.slice(0, len);
            if(partWord == charsToMatch) {
                  newArr.push(el);
            }
        });
        return newArr;
    }
});
