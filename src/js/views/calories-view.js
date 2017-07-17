var CalCaloriesView = Backbone.View.extend({

  tagName: '#calculate',

  initialize: function() {
    this.selectedFood = $('#selectedFood');
    this.calCalories = $('#calCalories');

    this.listenTo(selectedFoods, 'add', this.addOne);
    // 初始化获取localStorage的内容，并render
    this.listenTo(selectedFoods, 'reset', this.addAll);

    this.listenTo(selectedFoods, 'all', this.render);
    selectedFoods.fetch({ reset: true });
  },

  render: function() {
    // 计算卡路里总数
    var totalCalorise = 0;
    selectedFoods.models.forEach(function(model) {
      // 卡路里为0不计算
      if (model.get('calories') == 0) return;
      totalCalorise += model.get('calories');
    });

    if (typeof totalCalorise === 'number') {
      this.calCalories.text('Total Calories: ' + totalCalorise.toFixed(2));
    } else {
      alert('model的calories参数不是number类型');
    }

    return this;
  },
  // 增加一个food到卡路里计算列表中
  addOne: function (food) {
    var view = new SeletedFoodView({ model: food });
    this.selectedFood.append(view.render().el);
  },
  // Add all items in the **Todos** collection at once.
  addAll: function () {
    this.selectedFood.html('');
    selectedFoods.each(this.addOne, this);
  },
  clear: function () {
    this.model.destroy();
  }
});
