var SelectedView = Backbone.View.extend({

  tagName: '#selectedFood',
  // template: _.template($('#select-template').html()),
  initialize: function() {
    this.selectedFood = $('#selectedFood');
    this.calCalories = $('#calCalories');

    this.listenTo(selectedFoods, 'all', this.render);
  },

  // Re-render the titles of the todo item.
  render: function() {
    // 卡路里总数
    var totalCalorise = 0;
    selectedFoods.models.forEach(function(model) {
      if (model.get('calories') == 0) return;
      totalCalorise += model.get('calories');
    });

    if (typeof(totalCalorise) === 'number') {
      this.calCalories.text('total calories: ' + totalCalorise.toFixed(2));
    } else {
      alert('model的calories参数不是number类型');
    }

    var foodTemplate = _.template( $('#select-template').html(), {selectedFood: selectedFoods.models});
    this.selectedFood.html(foodTemplate);
    return this;
  },
});
