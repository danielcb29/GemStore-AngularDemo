(function(){
	var app =  angular.module('store-products', []);

	//Directives
	app.directive('productTitle', function(){
		return {
			restrict: 'A',
			templateUrl: 'src/product/product-title.html'
		}
	});

	var panelController = function($scope){
		this.tab = 1;

		this.selectTab = function(setTab){
			this.tab = setTab;
		}

		$scope.$on('broadcastParent', function(event, data){
			console.log('En otra directiva', data);
		});
	};

	app.directive('productPanels', function(){
		return {
			restrict: 'E',
			templateUrl: 'src/product/product-panels.html',
			controller: panelController,
			controllerAs: 'panel'
		}
	});

	app.directive('productInformation', function(localStorageHandler){
		return {
			restrict: 'E',
			templateUrl: 'src/product/product-information.html',
			controller: function($scope){

				$scope.option = 'Hello World';

				$scope.$on('broadcastTest', function(event, data){
					//console.log(data);
					$scope.option = 'ok';
				});

				this.addToCart = function(product){
					localStorageHandler.setProduct(product);
					$scope.$emit('broadcastParent', {msn:'mensaje para el padre'});
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