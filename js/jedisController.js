jetjedi.controller('jedisController',['$scope','$state','Backand','$cookieStore','Jedi','sharedId', function ($scope,$state,Backand,$cookieStore,Jedi,sharedId){

	Jedi.readJedis().then(
			function(data){
				$scope.jedis = data;
			});   

	$scope.editar = function(id){
		sharedId.setId(id);
		$state.go('edit');
	}



	$scope.excluir = function(id){
		Jedi.deleteJedi(id).then(
				function(res){
					console.log(res);
				}

			);
		$state.go('home');
	}

	$scope.addJedi = function(){
		$state.go('create');
	}


	$scope.copiar = function(id){
		Jedi.getJedi(id)
		.then(
			function(res){
				var data = 
					{ 
						"name":res.name,
						"planet":res.planet,
						"master":res.master,
						"status":res.status,
					};

				Jedi.createJedi(data).then(
					function(res){
						console.log('jedi copiado');
					}
				)
			}
		);

		$state.go('home');			
	}
}]);
