window.Shoplist = {
  Models: {},
  Collections: {},
  Views: {},
  Router: {}
};

Shoplist.Models.Comment = Backbone.Model.extend({
  defaults: {
    author: 'Автор',
    comment: 'Коммент',
    rate: 5
  }
});

newComment = new Shoplist.Models.Comment();

Shoplist.Collections.Comment = Backbone.Collection.extend({
  model: Shoplist.Models.Comment
});

Shoplist.Models.Shop = Backbone.Model.extend({
  defaults: {
    title: 'Магазин',
    address: 'Город',
    score: 0
  }
});

Shoplist.Views.Shop = Backbone.View.extend({
  tagName: 'li',
  events: {
    'click .addCmnt': 'addComment',
    'click .showCmnts': 'showComments'
  },
  addComment: function(){
    this.model.comments.add({
      author: 'Автор',
      comment: 'Коммент',
      rate: 5
    })
  },
  
  shopTemplate: _.template($('#shopTemplate').html()),
  commTemplate: _.template($('#commentTemplate').html()),
  initialize: function() {
    this.render();
  },
  render: function() {
    this.$el.html(this.shopTemplate(this.model.toJSON()));
  },
  showComments: function() {
    this.collection.each(function(Comment){
      var commentView = new Shoplist.Views.Comment({model: Comment});
      $(document.body).append(commentView.el);
    });
  }
});



Shoplist.Collections.Shop = Backbone.Collection.extend({
  model: Shoplist.Models.Shop
});

var shopCollection = new Shoplist.Collections.Shop([
  {
    title: 'Дикси',
    address: 'Торжок',
    score: 3,
    authors: ['123', '234'],
  },
  {
    title: 'Магнит',
    address: 'Тверь',
    score: 4
  },
  {
    title: 'Карусель',
    address: 'Москва',
    score: 5
  },
  {
    title: 'Глобус',
    address: 'Город',
    score: 4
  },
  {
    title: 'Fix Price',
    address: 'Бежецк',
    score: 2
  }
]);

Shoplist.Views.Shops = Backbone.View.extend({
  tagName: 'ul',
  initialize: function(){
    this.collection;
  },
  render: function(){
    this.collection.each(function(Shop){
      var shopView = new Shoplist.Views.Shop({model: Shop});
      $(document.body).append(shopView.el);
    });
  }
});

var shopsView = new Shoplist.Views.Shops({collection: shopCollection});
shopsView.render();
