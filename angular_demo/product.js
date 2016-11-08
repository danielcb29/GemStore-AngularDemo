(function(){
	var app =  angular.module('store-products', []);

	//Directives
	app.directive('productTitle', function(){
		return {
			restrict: 'A',
			templateUrl: 'product-title.html'
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
			templateUrl: 'product-panels.html',
			controller: panelController,
			controllerAs: 'panel'
		}
	});

	app.directive('productInformation', function(){
		return {
			restrict: 'E',
			templateUrl: 'product-information.html'
		}
	});

})();