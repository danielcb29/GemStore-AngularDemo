(function(){
	var app = angular.module('store', ['store-products', 'ngStorage', 'ngRoute', 'store-services']);
	
	app.constant('configTmdb', {
		apiUri: 'https://api.themoviedb.org/3/',
		apiKey: '6dc0d2605088c01254ffedbd444bc2e4'
	});

	app.config(['$routeProvider', function config($routeProvider){
		$routeProvider.when('/', {
			templateUrl: 'src/templates/dashboard.html',
			controller: 'StoreController',
			controllerAs: 'store'

		});
		$routeProvider.when('/product/:id', {
			templateUrl: 'src/templates/detail.html',
			controller: 'DetailController',
			controllerAs: 'detail'

		});
		$routeProvider.otherwise('/');
	}]);

	//Controlllers
	app.controller('StoreController', ['localStorageHandler', 'dataStorage', function(localStorageHandler, dataStorage){

		var store = this;

		store.allSold = 0;

		dataStorage.getElements().then(function(response){
			console.log("response controller", response);
			store.products = response;	
		});

		store.type = false;
		store.icon = 'glyphicon-chevron-down'
		store.sort = function(){
			store.type = !store.type;
			if (store.type){
				store.icon = 'glyphicon-chevron-up';
			}else{
				store.icon = 'glyphicon-chevron-down';
			}
		}

		store.buy = function(product){
			product.itemsSold++;
			store.allSold++;

		}

		store.productsInCart = localStorageHandler.getProducts();

	}]);

	app.controller('ReviewController', function(){

		empty_review = {
			stars: '5',
			body: 'Not Yet',
			author: 'not@yet.com'
		}; 

		this.review = empty_review;

		this.addReview = function(product){
			product.reviews.push(this.review);
			this.review = empty_review;
		};

	});

	app.controller('DetailController', ['$scope', '$routeParams', '$location', 'tmdb', '$timeout', function($scope, $routeParams, $location, tmdb, $timeout){
		$scope.test = "Hello";

		var timeoutSearch = '';
		$scope.$watch('test', function(newSearch, oldSearch){

			if(timeoutSearch){
				$timeout.cancel(timeoutSearch);
			}
			timeoutSearch = $timeout(function(){
				$scope.executeSearch();
			}, 1000);
		});

		$scope.executeSearch = function(){
			console.log('ejecucion busqueda');
			console.log($scope.test);
		}

		$scope.goDashboard = function(){
			$location.path("/");
		}

		$scope.getPopularMovies = function(){
			var moviesPopupar = tmdb.getPopular('movie/popular', '&language=en-US&page=2');
			moviesPopupar.then(function(response){
				$scope.moviesPopupar = response.data;
			}, function(err){
				console.log("Errorsini");
				console.log(err);
			});
		}

		$scope.getAllMovies = function() {
			var getAll = tmdb.getAll();

			getAll.then(function(response){
				console.log(response);
			}, function(err){
				console.log(err);
			});
			
		}
	}]);
		

})();


