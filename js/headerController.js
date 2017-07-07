jetjedi.controller('headerController',['$scope','$state','$cookieStore',  function ($scope,$state,$cookieStore){
    
    $scope.auth = function() {
            return $state.current.name != "auth" ;
        }


    $scope.signOut = function(){
    	$cookieStore.remove("access_token");
        $state.go("auth");
    }

    $scope.changeState = function(state){
    	$state.go(state);
    }
        
}]);

