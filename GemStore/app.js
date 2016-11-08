(function(){
	var app = angular.module('store', ['store-products']);
	
	//Controlllers
	app.controller('StoreController', ['$http', function($http){

		var store = this;

		store.products = [];

		$http.get('/products.json').success(function(data){
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

