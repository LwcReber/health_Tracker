"use strict";var AppView=Backbone.View.extend({el:"#todo",events:{"keypress .searchIpt":"createOnEnter","click .searchBtn":"search"},initialize:function(){this.foodListEle=$("#foodList"),this.input=this.$(".searchIpt"),this.calculateAllEle=$("#calculateAll"),this.searchBtnStatus=!1},render:function(){return foodsCol.length>0&&(foodsCol.each(function(e){var t=new FoodView({model:e});this.foodListEle.append(t.render().el)},this),this.foodListEle.show()),this},search:function(){this.searchBtnStatus=!0,this.createOnEnter()},createOnEnter:function(e){var t=this,a=t.input.val();if(""!==a){var i="https://api.nutritionix.com/v1_1/search/"+a+"?fields=item_name%2Citem_id%2Cbrand_name%2Cnf_calories%2Cnf_total_fat&appId=fafaa50d&appKey=dd6e5d7563cfb23e902d053eca5c80a4";!0!==t.searchBtnStatus&&e.which!==ENTER_KEY||(!0===t.searchBtnStatus&&(t.searchBtnStatus=!1),this.foodListEle.html(""),t.calculateAllEle.hide(),spinner.spin(loadTarget),$.ajax({url:i}).done(function(e){if(foodsCol.reset(),spinner.spin(),t.calculateAllEle.show(),-1!==Object.prototype.toString.call(e).indexOf("Object")){if(t.input.val(""),e.hits){for(var a=[],i=0;i<e.hits.length;i++){var s=new Food({title:e.hits[i].fields.item_name,brandName:e.hits[i].fields.brand_name,calories:e.hits[i].fields.nf_calories});"USDA"===s.get("brandName")&&s.set("brandName",""),a.push(s)}foodsCol.push(a),t.render()}}else alert("响应的结果数据类型不是一个对象")}).fail(function(e){t.calculateAllEle.show(500),spinner.spin(),alert("响应失败，请刷新重试")}))}}});
//# sourceMappingURL=app-view.js.map
