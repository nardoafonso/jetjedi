var jetjedi =  angular.module('jetjedi', ['ui.router','ng-fusioncharts','backand','ngCookies']);

jetjedi.config(function($stateProvider,BackandProvider, $httpProvider, $provide, $urlRouterProvider) {

			function httpInterceptor($q, $log, $cookieStore) {
		        return {
		            request: function(config) {
		                config.headers['Authorization'] = $cookieStore.get('access_token');
		                return config;
		            }
		        };
		    }

		    $provide.factory('httpInterceptor', httpInterceptor);
			$httpProvider.interceptors.push('httpInterceptor');

			BackandProvider.init({
			      appName: 'jetjedi',
			      anonymousToken: 'ANONYMOUS_TOKEN'
			    });

			$urlRouterProvider.otherwise('/auth');

			$stateProvider
				.state('auth', {
					url: '/auth',
					templateUrl: 'views/authView.html',
					controller: 'authController',
				})
				.state('home', {
					url: '/home',
					templateUrl: 'views/homeView.html',
					controller: 'homeController',
				})
				.state('jedis',{
					url:'/jedis',
					templateUrl: 'views/jedisView.html',
					controller: 'jedisController',
				})
				.state('edit',{
					url:'/edit',
					templateUrl:'views/editView.html',
					controller: 'editController',
				})
				.state('create',{
					url:'/create',
					templateUrl:'views/createView.html',
					controller:'createController',
				});

});

jetjedi.service('Jedi', ['Backand', function(Backand){

	var self = this;

	let params = {
	  pageSize: 10000,
	};

	self.readJedis = function(){
		return Backand.object.getList('jedi',params)
		  .then(
		  	function(res){
				var arr=[];
				for(var i=0;i<res.data.length;i++){
					if(!(res.data[i].name == "" && res.data[i].status == "" && res.data[i].planet == "" && res.data[i].master == ""))
					{
						arr.push({'id':res.data[i].id,'name':res.data[i].name, 'planet': res.data[i].planet, 'status':res.data[i].status,'master':res.data[i].master});
					}
				}
				return arr;
			})
			.catch(function(err)
		  		{
		    		console.log(err);
		  		}
		 );
	}

	let paramsS = {
	  pageSize: 10000,
	  deep:true,
	};

	self.readStatus = function(){
		return Backand.object.getList('jedi',paramsS)
		  .then(
		  	function(res){
			    var obj = {};
				for (var i = 0, j = res.data.length; i < j; i++) {
				   obj[res.data[i].status] = (obj[res.data[i].status] || 0) + 1;
				}

				var arr=[];
				for (var key in obj) {
					if (obj.hasOwnProperty(key)) {
						arr.push(JSON.parse(JSON.stringify({label:key,value:obj[key]})))
					  }
				};
			    return JSON.parse(JSON.stringify({data:arr}));
			})
			.catch(function(err)
		  		{
		    		console.log(err);
		  		}
		 );
	}


	self.readPlanets = function(){
		return Backand.object.getList('jedi',paramsS)
		  .then(
		  	function(res){
			    var obj = {};
				for (var i = 0, j = res.data.length; i < j; i++) {
				   obj[res.data[i].planet] = (obj[res.data[i].planet] || 0) + 1;
				}

				var arr=[];
				for (var key in obj) {
					if (obj.hasOwnProperty(key)) {
						arr.push(JSON.parse(JSON.stringify({label:key,value:obj[key]})))
					  }
				};
			    return JSON.parse(JSON.stringify({data:arr}));
			})
			.catch(function(err)
		  		{
		    		console.log(err);
		  		}
		 );
	}

	let statusParams = {pageSize:5};

	self.getStatus = function(){
		return Backand.object.getList('status',statusParams)
		  .then(
		  	function(res){
			    return res;
			})
			.catch(function(err)
		  		{
		    		console.log(err);
		  		}
		 );

	}

	self.getJedi = function(id){
		return Backand.object.getOne('jedi',id)
		.then(
			function(res){
				return res.data;
			}
		)
		.catch(
			function(err){
				console.log(err);
			}
		);
	}


	self.updateJedi = function(id,data){
		return Backand.object.update('jedi',id,data)
		.then(
			function(res){
				return res;
			}
		)
		.catch(
			function(err){
				console.log(err);
			}
			);
	}


	self.deleteJedi = function(id){
		return Backand.object.remove('jedi',id)
		.then(
				function(res){
						return res;
				}
			)
		.catch(function(err){console.log(err)});
	}


	self.createJedi = function(data){
		return Backand.object.create('jedi', data)
			  .then(res => {
			    console.log('jedi created');
			    return res;
			  })
			  .catch(err => {
			    console.log(err);
			  });
	}


}]);



jetjedi.service('sharedId', function() {
    var id = 0;
    return {
        getId: function() {
            return id;
        },
        setId: function(value) {
            id = value;
        }
    }
});
