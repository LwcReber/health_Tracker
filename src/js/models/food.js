// Define a Food Model
var Food = Backbone.Model.extend({
  // Default todo attribute values
  defaults: {
    title: '',
    brandName: '', // 店铺名
    calories: '',
    checked: false, // 选中状态
  },
  // 切换选中状态
  toggle: function() {
		this.set('checked', !this.get('checked'));
	}
});
