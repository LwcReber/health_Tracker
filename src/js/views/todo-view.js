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

  toggleService: function() {
		this.model.toggle();
    this.food.hide(500);
    selectedFoods.push(this.model);
    console.log(selectedFoods);
	}
});
