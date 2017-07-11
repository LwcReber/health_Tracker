var TodoView = Backbone.View.extend({

  tagName: 'li',
  // Cache the template function for a single item.
  // todoTpl: _.template($('#item-template').html()),

  events: {
    'click': 'toggleService'
  },

  // Called when the view is first created
  initialize: function() {
    this.$el = $('#todo');

    // Later we'll look at:
    // this.listenTo(someCollection, 'all', this.render);
    // but you can actually run this example right now by
    // calling
    this.listenTo(this.model, 'change', this.render);
  },

  // Re-render the titles of the todo item.
  render: function() {
    // this.$el.html(this.todoTpl(this.model.attributes));
    this.$('input').prop('checked', this.model.get('checked'));
    return this;
  },

  edit: function() {
    // executed when todo label is double clicked
  },

  close: function() {
    // executed when todo loses focus
  },
  toggleService: function(){
    console.log(222);
		this.model.toggle();
	}
});
