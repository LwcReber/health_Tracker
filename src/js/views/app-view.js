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
    this.listenTo(foodLists, 'add', this.render);
    this.listenTo(foodLists, 'change', this.render);
  },

  // Re-render the titles of the todo item.
  render: function() {
    // 刷新食物列表
    var foodTemplate = _.template( $('#food-template').html(), {foodLists: foodLists.models});
    this.fooList.html(foodTemplate);
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
      // 清除列表内容
      foodLists.reset();
      if (self.searchBtnStatus === true) {
        self.searchBtnStatus = false;
      }
      $.ajax({
        url: nutUrl,
      })
      .done(function(result) {
        if (Object.prototype.toString.call(result).indexOf('Object') !== -1) {
          if (result.hits) {
            var myTodos = [];
          for (var i = 0; i < result.hits.length; i++) {
            // new 一个 model
            var myTodo = new TodoView({
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
