var AppView = Backbone.View.extend({

  el: '#todo',
  events: {
    'keypress .searchIpt': 'createOnEnter',
    'click .searchBtn': 'search',
  },

  // Called when the view is first created
  initialize: function() {
    this.foodListEle = $('#foodList');
    this.input = this.$('.searchIpt');
    this.searchBtnStatus = false;
  },

  // Re-render the titles of the todo item.
  render: function() {
    // 刷新食物列表
    if (foodsCol.length > 0) {
      foodsCol.each(function(food) {
        var view = new TodoView({model: food});
        this.foodListEle.append(view.render().el);
      }, this);
      this.foodListEle.show();
    }
    return this;
  },

  search: function() {
    this.searchBtnStatus = true;
    this.createOnEnter();
  },

	createOnEnter: function(e) {
    var self = this;
    var food = self.input.val();
    var nutUrl = 'https://api.nutritionix.com/v1_1/search/' + food +'?fields=item_name%2Citem_id%2Cbrand_name%2Cnf_calories%2Cnf_total_fat'
     + '&appId=fafaa50d&appKey=dd6e5d7563cfb23e902d053eca5c80a4';

		if (self.searchBtnStatus === true || e.which === ENTER_KEY) {
      if (self.searchBtnStatus === true) {
        self.searchBtnStatus = false;
      }
      // 清除原来内容
      this.foodListEle.html('');
      // 显示加载显示器
      spinner.spin(loadTarget);
      $.ajax({
        url: nutUrl,
      })
      .done(function(result) {
        // 清除collections内容
        foodsCol.reset();
        // 成功响应后，关闭加载显示器
        spinner.spin();
        if (Object.prototype.toString.call(result).indexOf('Object') !== -1) {
          if (result.hits) {
            var newFoods = [];
            for (var i = 0; i < result.hits.length; i++) {
              // new 一个 model
              var newFood = new Food({
                title: result.hits[i].fields.item_name,
                brandName: result.hits[i].fields.brand_name,
                calories: result.hits[i].fields.nf_calories
              });
              // 如果是USDA的不用显示USDA name
              if (newFood.get('brandName') === 'USDA') {
                newFood.set('brandName', '');
              }
              newFoods.push(newFood);
            }
            // 添加到collections中
            foodsCol.push(newFoods);
            self.render();
          }
        } else {
          alert('响应的结果数据类型不是一个对象');
        }
      })
      .fail(function(respond) {
        alert('响应失败')
      });
		}
	}
});
