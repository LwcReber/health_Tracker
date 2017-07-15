var SelectedView = Backbone.View.extend({

  tagName: '#selectedFood',

  initialize: function() {
    this.selectedFood = $('#selectedFood');
    this.calCalories = $('#calCalories');

    // 获取localStorage的内容，并render
    this.listenTo(selectedFoods, 'reset', this.render);
    this.listenTo(selectedFoods, 'all', this.render);
    selectedFoods.fetch({reset: true});
  },

  render: function() {
    // 计算卡路里总数
    var totalCalorise = 0;
    selectedFoods.models.forEach(function(model) {
      // 卡路里为0不计算
      if (model.get('calories') == 0) return;
      totalCalorise += model.get('calories');
    });

    if (typeof(totalCalorise) === 'number') {
      this.calCalories.text('total calories: ' + totalCalorise.toFixed(2));
    } else {
      alert('model的calories参数不是number类型');
    }

    // render the selected food
    var foodTemplate = _.template( $('#select-template').html(), {selectedFood: selectedFoods.models});
    this.selectedFood.html(foodTemplate);

    return this;
  }
});
