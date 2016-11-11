(function(){
	var app = angular.module('store-services', []);

	app.service('localStorageHandler', ['$localStorage', function($localStorage){
		return {
			setProduct: function(product){
				var products = ($localStorage.products) ? $localStorage.products : [];
				products.push(product);
				$localStorage.products = products;
			},	
			getProducts: function(){
				return $localStorage.products;
			},
			removeProduct: function(index){
				$localStorage.products.splice(index, 1);
			},
			totalProducts: function(){
				return $localStorage.products.length;
			}
		}
	}]);


	app.service('dataStorage', ['$http', function($http){
		return{
			getElements: function(){
				return $http.get('./data/products.json').then(function(response){
					return response.data;	
				}, function(err){
					return [];
				});
			}
		}
	}]);

})();