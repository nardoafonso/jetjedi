jetjedi.controller('createController',['$scope','$state','Backand','$cookieStore','Jedi','sharedId', function ($scope,$state,Backand,$cookieStore,Jedi,sharedId){

	$scope.salvar = function(){

	var data = 
		{ 
			"name":$scope.name,
			"planet":$scope.planet,
			"master":$scope.master,
			"status":$scope.status,
		}
		
	Jedi.createJedi(data).then(
			function(res){
				console.log(res);
				$state.go('jedis');
			}
		);

	}

	Jedi.getStatus().then(
			function(res){
				$scope.options = res.data;
			}

		);


	$scope.cancelar = function(){
		$state.go('jedis');
	}


}]);