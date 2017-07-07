
jetjedi.controller('authController',['$scope','$state','Backand','$cookieStore',  function ($scope,$state,Backand,$cookieStore){

    $scope.loginError = false;
    $scope.loginErrorText;

    
    $scope.signIn = function() {
            Backand.signin($scope.email,$scope.password)
            .then(
              function (data) {
                $cookieStore.put("access_token", data.data.access_token);
                $state.go('home');
              }
            ).catch(
            function (data, status, headers, config) {
                //handel error
                alert("Error:"+data);
              });
        }
        
}]);

