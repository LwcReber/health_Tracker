var TodoView = Backbone.View.extend({

  tagName: '#todo',

  events: {
    'keypress .searchIpt': 'createOnEnter',
    'click .searchBtn': 'search'
  },

  // Called when the view is first created
  initialize: function() {
    this.$el = $('#todo');
    this.fooList = $('#fooList');
    this.input = this.$('.searchIpt');
    this.searchBtnStatus = false;
    // 监听collections有改变就render
    this.listenTo(foodLists, 'change: _meta', this.render);
    // this.listenTo(foodLists, 'change', this.render);
  },

  // Re-render the titles of the todo item.
  render: function() {

    // 刷新食物列表
    foodLists.each(function(food) {
      console.log(food);
      var view = new TodoView({model: food});
      this.fooList.append(view.render().el);
    }, this);
    // var foodTemplate = _.template( $('#food-template').html(), {foodLists: foodLists.models});
    // this.fooList.html(foodTemplate);
    return this;
  },

  edit: function() {
    // executed when todo label is double clicked
  },

  close: function() {
    // executed when todo loses focus
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
      this.fooList.html('');
      // 显示加载中显示器
      spinner.spin(loadTarget);
      $.ajax({
        url: nutUrl,
      })
      .done(function(result) {
        // 清除collections内容
        foodLists.reset();
        // 重设加载状态
        foodLists.meta(false);
        // 成功响应后，关闭加载显示器
        spinner.spin();
        if (Object.prototype.toString.call(result).indexOf('Object') !== -1) {
          if (result.hits) {
            var myTodos = [];
          for (var i = 0; i < result.hits.length; i++) {
            // new 一个 model
            var myTodo = new Todo({
              title: result.hits[i].fields.item_name,
              brandName: result.hits[i].fields.brand_name,
              calories: result.hits[i].fields.nf_calories
            });
            // 如果是USDA的不用显示USDA name
            if (myTodo.get('brandName') === 'USDA') {
              myTodo.set('brandName', '');
            }
            myTodos.push(myTodo);
          }
          // 添加到collections中
          foodLists.push(myTodos);
          foodLists.meta(true);
          console.log(foodLists);
          console.log(foodLists._meta.completed);
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
