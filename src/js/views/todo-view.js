var TodoView = Backbone.View.extend({

  tagName: 'li',

  // todoTpl: _.template($('#item-template').html()),

  events: {
    'click': 'toggleService'
  },

  // Called when the view is first created
  initialize: function() {
    // Later we'll look at:
    // this.listenTo(someCollection, 'all', this.render);
    // but you can actually run this example right now by
    // calling
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

  close: function() {
    // executed when todo loses focus
  },

  toggleService: function(){
		this.model.toggle();
	}
});
