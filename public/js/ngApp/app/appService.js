angular.module('oSource')
    .factory('SecureRouteService',['$state', '$auth', function($state, $auth) {
        var loggedIn = (() => {
            if (!$auth.isAuthenticated()) {
                console.log("Can't go there!");
                return false;
            }
            if ($auth.isAuthenticated()) {
                console.log("you are authenticated!!");
                return true;
            }
        })
        return {
            loggedIn: loggedIn
        }
    }]);