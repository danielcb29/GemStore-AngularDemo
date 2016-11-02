(function(){
	var app = angular.module('store', []);
	
	app.controller('StoreController', function(){
		this.products = gems;
	});

	app.controller('PanelController', function(){
		this.tab = 1;

		this.selectTab = function(setTab){
			this.tab = setTab;
		}
	});

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
			]
		}
	]
})();


