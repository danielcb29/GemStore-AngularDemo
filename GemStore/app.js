(function(){
	var app = angular.module('store', ['store-products', 'ngStorage', 'store-services']);
	
	//Controlllers
	app.controller('StoreController', ['$http', 'localStorageHandler', function($http, localStorageHandler){

		var store = this;

		store.allSold = 0;

		store.products = [];

		$http.get('/data/products.json').success(function(data){
			store.products = data;	
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

})();


