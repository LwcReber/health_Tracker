var selcetedFood = Backbone.Collection.extend({
		model: Todo,
		// 获取已经被选择的食物
		// getChecked: function() {
		// 	return this.where({checked:true});
		// }
});
var selectedFoods = new selcetedFood();
