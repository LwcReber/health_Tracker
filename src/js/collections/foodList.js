var ServiceList = Backbone.Collection.extend({
		initialize: function() {
      this._meta = {completed: false};
    },
		// Will hold objects of the Service model
		model: Todo,
		// 判断model是否已经全部加到collection
		meta: function(value) {
			return this._meta.completed = value;
		},
		// 获取已经被选择的食物
		getChecked: function() {
			return this.where({checked:true});
		},

});
var foodLists = new ServiceList();
