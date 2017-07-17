var SeletedFoodView = Backbone.View.extend({

  tagName: 'li',
  template: _.template($('#select-template').html()),
  events: {
    'click .destroy': 'clear'
  },

  // Called when the view is first created
  initialize: function() {
    this.food = $('#foodList');
    this.listenTo(this.model, 'destroy', this.remove);
  },

  // Re-render the titles of the seletedfood item.
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },

  clear: function() {
    this.model.destroy();
  }
});
