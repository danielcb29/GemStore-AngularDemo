(function(){
	var app = angular.module('store', ['store-products', 'ngStorage', 'ngRoute', 'store-services']);
	

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

	app.controller('DetailController', ['$scope', '$routeParams', '$location', function($scope, $routeParams, $location){
		$scope.test = "Hello";
		console.log($routeParams);

		$scope.goDashboard = function(){
			$location.path("/");
		}
	}]);
		

})();


