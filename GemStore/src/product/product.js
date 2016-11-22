(function(){
	var app =  angular.module('store-products', []);

	//Directives
	app.directive('productTitle', function(){
		return {
			restrict: 'A',
			templateUrl: './src/product/product-title.html'
		}
	});

	var panelController = function(){
		this.tab = 1;

		this.selectTab = function(setTab){
			this.tab = setTab;
		}
	};

	app.directive('productPanels', function(){
		return {
			restrict: 'E',
			templateUrl: './src/product/product-panels.html',
			controller: panelController,
			controllerAs: 'panel'
		}
	});

	app.directive('productInformation', function(localStorageHandler){
		return {
			restrict: 'E',
			templateUrl: './src/product/product-information.html',
			controller: function(){
				this.addToCart = function(product){
					localStorageHandler.setProduct(product);
				};
			},
			controllerAs: 'title'
		}
	});

	app.filter('cutText', function(){
		return function(text){
			return text.substring(0, 200) + '...';
		}
	});

})();