var TodoView = Backbone.View.extend({

  tagName: 'li',

  events: {
    'click': 'toggleService'
  },

  // Called when the view is first created
  initialize: function() {
    this.food = $('#foodList');
    this.listenTo(this.model, 'change', this.render);
  },

  // Re-render the titles of the todo item.
  render: function() {
    this.$el.html(
      '<input type="radio" value="" name="food"/>'
      + '<span>' + this.model.get('brandName') + '</span>'
      + '<span>' + this.model.get('title') + '</span>'
      + '<span class="calories">calories: ' + this.model.get('calories') + '</span>'
    );
    this.$('input').prop('checked', this.model.get('checked'));
    return this;
  },

  // 新建属性
	newAttributes: function () {
    var self = this;
		return {
      title: self.model.get('title'),
      brandName: self.model.get('brandName'), // 店铺名
      calories: self.model.get('calories'),
      checked: self.model.get('checked') // 选中状态
    };
	},

  toggleService: function() {
		this.model.toggle();
    this.food.hide(500);
    // 保存到localStorage中 重要步骤！！ 直接传入this.model是不能保存到localStorage中的
    selectedFoods.create(this.newAttributes());
    console.log(selectedFoods);
	}
});
