var TodoView = Backbone.View.extend({

  tagName: 'li',
  // Cache the template function for a single item.
  todoTpl: _.template($('#item-template').html()),

  events: {
  },

  // Called when the view is first created
  initialize: function() {
    this.$el = $('#todo');

    // Later we'll look at:
    // this.listenTo(someCollection, 'all', this.render);
    // but you can actually run this example right now by
    // calling
    this.render();
  },

  // Re-render the titles of the todo item.
  render: function() {
    this.$el.html(this.todoTpl(this.model.attributes));
    // $el here is a reference to the jQuery element
    // associated with the view, todoTpl is a reference
    // to an Underscore template and model.attributes
    // contains the attributes of the model.
    // Altogether, the statement is replacing the HTML of
    // a DOM element with the result of instantiating a
    // template with the model's attributes.
    this.input = this.$('.edit');
    return this;
  },

  edit: function() {
    // executed when todo label is double clicked
  },

  close: function() {
    // executed when todo loses focus
  },

	// If you're pressing `escape` we revert your change by simply leaving
	// the `editing` state.
	revertOnEscape: function(e) {
		if (e.which === ESC_KEY) {
		}
	}
});
