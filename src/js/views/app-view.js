
var TodoView = Backbone.View.extend({

  tagName: '#todo',

  // Cache the template function for a single item.
  // todoTpl: _.template( $('#item-template').html() ),

  events: {
    'keypress .search': 'createOnEnter',
  },

  // Called when the view is first created
  initialize: function() {
    this.$el = $('#todo');
    this.fooList = $('#fooList');
    this.input = this.$('.search');
    this.foodLists = new ServiceList();
    // this.foodLists = '';
    // Later we'll look at:
    // this.listenTo(someCollection, 'all', this.render);
    // but you can actually run this example right now by
    // calling
    this.listenTo(this.foodLists, 'all', this.render);
  },

  // Re-render the titles of the todo item.
  render: function() {
    // this.$el.html( this.todoTpl( this.model.attributes ) );
    // $el here is a reference to the jQuery element
    // associated with the view, todoTpl is a reference
    // to an Underscore template and model.attributes
    // contains the attributes of the model.
    // Altogether, the statement is replacing the HTML of
    // a DOM element with the result of instantiating a
    // template with the model's attributes.
    // 清除了原有内容
    this.fooList.html('');
    if (this.foodLists) {
      this.foodLists.each(function(todo) {
        this.fooList.append('<li><input type="checkbox" value="1" name="' + todo.get('title') + '" /> ' + todo.get('title') + '<span>$' + todo.get('title') + '</span></li>');
  		}, this);	// "this" is the context in the callback
    }
    return this;
  },

  edit: function() {
    // executed when todo label is double clicked
  },

  close: function() {
    // executed when todo loses focus
  },
  // If you hit `enter`, we're through editing the item.
	createOnEnter: function(e) {
    var self = this;
    var food = this.input.val();
    var nutUrl = 'https://api.nutritionix.com/v1_1/search/"+ food +"?fields=item_name%2Citem_id%2Cbrand_name%2Cnf_calories%2Cnf_total_fat'
      + '&appId=fafaa50d&appKey=dd6e5d7563cfb23e902d053eca5c80a4';
		if (e.which === ENTER_KEY) {
      // 清空列表
      // self.fooList.html('');
      self.foodLists.reset();
      $.ajax({
        url: nutUrl,
      })
      .done(function(result) {
        if (Object.prototype.toString.call(result).indexOf('Object') !== -1) {
          if (result.hits) {
            var myTodos = [];
          for (var i = 0; i < result.hits.length; i++) {
            var myTodo = new Todo({title: result.hits[i].fields.item_name});
            myTodos.push(myTodo);
          }
          self.foodLists.push(myTodos);
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
