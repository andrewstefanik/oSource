angular.module('oSource').controller('RepoSearchController', ['localStorageService', 'SearchService', '$mdSidenav', function(localStorageService, SearchService, $mdSidenav) {
    var osourceRepos = localStorageService.get('allAdded').data;
    this.message = '';
    SearchService.allAdded;
    this.repo = [];
    this.searchTerm = '';
    this.isSearching = false;

    osourceRepos.forEach((repo) => {
            this.repo.push({
                id: repo._id,
                name: repo.repo_name,
                description: repo.repo_description,
                language: repo.languages,
                skill: repo.skill_level,
                owner: repo.repo_owner
            });
            return this.repo;
    });

    this.open = (() => {

        if(!this.isSearching) {
            this.repoMatch = this.repo;
        }
        $mdSidenav('repoSearch').toggle();
        this.repoMatch = this.repo;
        console.log(this.repoMatch);
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
            var partWord = el.name.slice(0, len);
                if(partWord == charsToMatch) {
                    newArr.push(el);
                }
            });
            return newArr;
        };
}]);
