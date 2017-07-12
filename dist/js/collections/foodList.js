"use strict";var ServiceList=Backbone.Collection.extend({initialize:function(){this._meta={completed:!1}},model:Todo,meta:function(e){return this._meta.completed=e},getChecked:function(){return this.where({checked:!0})}}),foodLists=new ServiceList;
//# sourceMappingURL=foodList.js.map
