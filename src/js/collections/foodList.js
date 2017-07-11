var ServiceList = Backbone.Collection.extend({
		// Will hold objects of the Service model
		model: Todo,

		getChecked: function() {
			return this.where({checked:true});
		}
});
var foodLists = new ServiceList();
