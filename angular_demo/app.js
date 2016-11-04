(function(){
	var app = angular.module('store', []);
	
	//Controlllers
	app.controller('StoreController', function(){
		this.products = gems;
		this.type = false;
		this.icon = 'glyphicon-chevron-down'
		this.sort = function(){
			this.type = !this.type;
			if (this.type){
				this.icon = 'glyphicon-chevron-up';
			}else{
				this.icon = 'glyphicon-chevron-down';
			}
		}
	});

	var panelController = function(){
		this.tab = 1;

		this.selectTab = function(setTab){
			this.tab = setTab;
		}
	};

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

	//Directives
	app.directive('productTitle', function(){
		return {
			restrict: 'A',
			templateUrl: 'product-title.html'
		}
	});

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

	//Objects
	var gems = [
		{
			name: 'Dodecahedron',
			price: 2.95,
			description: 'This is a classic gem',
			canPurchase: true,
			soldOut: false,
			images: [
				{
					full:'images/gem1.svg',
					thumb: ''
				}
			],
			reviews : [
				{
					stars: 5,
					body: 'Great gem dude',
					author: 'joe@gems.com'
				}
			]
		},
		{
			name: 'GemLife',
			price: 0.25,
			description: 'This gem is sheap',
			canPurchase: true,
			soldOut: false,
			images: [
				{
					full:'images/gem2.png',
					thumb: ''
				}
			],
			reviews : [
				{
					stars: 3,
					body: 'Normal gem for any purpose',
					author: 'dael@gems.com'
				}
			]
		},
		{
			name: 'MegaGem',
			price: 10,
			description: 'This is a awesome gem',
			canPurchase: true,
			soldOut: false,
			images: [
				{
					full:'images/gem3.jpg',
					thumb: ''
				}
			],
			reviews : [
				{
					stars: 2,
					body: 'So expensive',
					author: 'doe@gems.com'
				}
			]
		},
		{
			name: 'Dodecahedron++',
			price: 22.95,
			description: '+ of normal gem',
			canPurchase: true,
			soldOut: false,
			images: [
				{
					full:'images/gem4.jpg',
					thumb: ''
				}
			],
			reviews : [
				{
					stars: 4,
					body: 'Awesome!',
					author: 'tim@gems.com'
				}
			]
		}
	]
})();


