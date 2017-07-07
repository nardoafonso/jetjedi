jetjedi.controller('homeController',['$scope','$state','Backand','$cookieStore','Jedi', function($scope,$state,Backand,$cookieStore,Jedi){


	var ctx = $("#statusChart");

	Jedi.readStatus().then(
		function(res){
			var labels =[]
			var data =[]
			for(var i=0;i<res.data.length;i++){
				
				labels.push(res.data[i].label);

				data.push(res.data[i].value);

			}

			var myChart = new Chart(ctx, {
			    type: 'pie',
			    data: {
			        labels: labels,
			        datasets: [{
			            label: 'Jedis por Status',
			            data: data,
			            backgroundColor: [
			                'rgba(255, 99, 132, 0.2)',
			                'rgba(54, 162, 235, 0.2)',
			                'rgba(255, 206, 86, 0.2)',
			                'rgba(75, 192, 192, 0.2)',
			                'rgba(153, 102, 255, 0.2)',
			                'rgba(255, 159, 64, 0.2)'
			            ],
			            borderColor: [
			                'rgba(255,99,132,1)',
			                'rgba(54, 162, 235, 1)',
			                'rgba(255, 206, 86, 1)',
			                'rgba(75, 192, 192, 1)',
			                'rgba(153, 102, 255, 1)',
			                'rgba(255, 159, 64, 1)'
			            ],
			            borderWidth: 1
			        }]
			    }
			});

		}


	);

	var ctx2 = $("#planetChart");

	Jedi.readPlanets().then(
		function(res){
			var labels =[]
			var data =[]
			for(var i=0;i<res.data.length;i++){
				
				labels.push(res.data[i].label);

				data.push(res.data[i].value);

			}

			var myChart = new Chart(ctx2, {
			    type: 'pie',
			    data: {
			        labels: labels,
			        datasets: [{
			            label: 'Jedis por Planeta',
			            data: data,
			            backgroundColor: [
			                'rgba(255, 99, 132, 0.2)',
			                'rgba(54, 162, 235, 0.2)',
			                'rgba(255, 206, 86, 0.2)',
			                'rgba(75, 192, 192, 0.2)',
			                'rgba(153, 102, 255, 0.2)',
			                'rgba(255, 159, 64, 0.2)'
			            ],
			            borderColor: [
			                'rgba(255,99,132,1)',
			                'rgba(54, 162, 235, 1)',
			                'rgba(255, 206, 86, 1)',
			                'rgba(75, 192, 192, 1)',
			                'rgba(153, 102, 255, 1)',
			                'rgba(255, 159, 64, 1)'
			            ],
			            borderWidth: 1
			        }]
			    }
			});

		}


	);


	
	

}]);
