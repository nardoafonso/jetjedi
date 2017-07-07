jetjedi.controller('editController',['$scope','$state','Backand','$cookieStore','Jedi','sharedId', function ($scope,$state,Backand,$cookieStore,Jedi,sharedId){


	var id = sharedId.getId();
	Jedi.getJedi(id).then(
			function(res){
				$scope.jediName = res.name;
			}
	);

	Jedi.getStatus().then(
			function(res){
				$scope.options = res.data;
			}

		);


	$scope.cancelar = function(){
		$state.go('jedis');
	}

	$scope.salvar = function(){

		var data = 
		{ 
			"id":id,
			"name":$scope.name,
			"planet":$scope.planet,
			"master":$scope.master,
			"status":$scope.status,
		};

		Jedi.updateJedi(id,data).then(
				function(res){
					console.log(res);
					$state.go('jedis');

				}

			);


		
	}


}]);