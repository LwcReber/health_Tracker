var selcetedFood = Backbone.Collection.extend({
	model: Food,

	localStorage: new Backbone.LocalStorage('selcetedFood-backbone'),
});
var selectedFoods = new selcetedFood();
