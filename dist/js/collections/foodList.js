"use strict";var ServiceList=Backbone.Collection.extend({model:Todo,getChecked:function(){return this.where({checked:!0})}}),foodsCol=new ServiceList;
//# sourceMappingURL=foodList.js.map
