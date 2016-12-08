angular.module('oSource').controller('RepoSearchController', ['localStorageService', 'SearchService', '$mdSidenav', function(localStorageService, SearchService, $mdSidenav) {
    var userRepos = localStorageService.get('added').data;
    var osourceRepos = localStorageService.get('allAdded').data;
    
    console.log(osourceRepos);

    this.repo = [];
    this.searchTerm = '';

    osourceRepos.forEach((repo) => {
            this.repo.push({
                name: repo.repo_name,
                description: repo.repo_description,
                language: repo.languages,
                skill: repo.skill_level,
                owner: repo.repo_owner
            });
            return this.repo;
    });

    userRepos.forEach((repo) => {
            this.repo.push({
                name: repo.repo_name,
                description: repo.repo_description,
                language: repo.languages,
                skill: repo.skill_level
            });
            return this.repo;
    });
    this.open = (() => {
        $mdSidenav('repoSearch').toggle();
    });
    this.findMatches = (() => {
        console.log('finding matches......');
        this.repoMatch = compareCharacter(this.repo, this.searchTerm);
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
