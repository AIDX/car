window.Shoplist = {
  Models: {},
  Collections: {},
  Views: {},
  Router: {}
};

Shoplist.Models.Comment = Backbone.Model.extend({
  defaults: {
    author: '',
    comment: '',
    rate: 0
  }
});

var currentComment = new Shoplist.Models.Comment();

Shoplist.Collections.Comment = Backbone.Collection.extend({
  model: Shoplist.Models.Comment
});

Shoplist.Models.Shop = Backbone.Model.extend({
  defaults: {
    title: 'Магазин',
    address: 'Город',
    score: 0
  },
  initialize: function() {
    this.cComments = new Shoplist.Collections.Comment();
  }
});

Shoplist.Views.Comment = Backbone.View.extend({
  tagName: 'p',
  commentTemplate: _.template($('#commentTemplate').html()),
  initialize: function() {
    this.render();
  },
  render: function() {
    this.$el.html(this.commentTemplate(this.model.toJSON()));
  }
});
Shoplist.Views.Edit = Backbone.View.extend({
  tagName: 'div',
  events: {
    'change .name': 'onChangeInputName',
    'change .comm': 'onChangeInputComm',
    'change .rate': 'onChangeInputRate'
  },
  editTemplate: _.template($('#editTemplate').html()),
  initialize: function() {
    this.render();
  },
  render: function() {
    this.$el.html(this.editTemplate);
  },
  onChangeInputName: function(e){
    currentComment.set('author', e.target.value);
  },
  onChangeInputComm: function(e){
    currentComment.set('comment', e.target.value);
  },
  onChangeInputRate: function(e){
    currentComment.set('rate', e.target.value);
  }
});

Shoplist.Collections.Comment = Backbone.Collection.extend({
  model: Shoplist.Models.Comment
});

Shoplist.Models.Shop = Backbone.Model.extend({
  defaults: {
    id: '0',
    title: 'Магазин',
    address: 'Город',
    score: 0
  },
  initialize: function() {
    this.cComments = new Shoplist.Collections.Comment();
  }
});

Shoplist.Views.Shop = Backbone.View.extend({
  tagName: 'li',
  id: function() {return this.model.get('id')},
  events: {
    'click .addCmnt': 'addComment',
    'click .showCmnts': 'showComments',
    'click .saveCmnt': 'saveComment',
  },
  addComment: function(){
    $('div').remove();
    var currentEditId = this.id();
    var editView = new Shoplist.Views.Edit();
    $('#'+currentEditId).append(editView.el);
    currentComment.clear();
  },
  saveComment: function () {
    this.model.cComments.add(currentComment.toJSON());
    $('div').remove();
  },
  shopTemplate: _.template($('#shopTemplate').html()),
  initialize: function() {
    this.render();
  },
  render: function() {
    this.$el.html(this.shopTemplate(this.model.toJSON()));
  },
  showComments: function() {
    $('p').remove();
    var currentId = this.id();
    this.model.cComments.each(function(Comment){
      var commentView = new Shoplist.Views.Comment({model: Comment});
      $('#'+currentId).append(commentView.el);
    });
  }
});



Shoplist.Collections.Shop = Backbone.Collection.extend({
  model: Shoplist.Models.Shop
});

var shopCollection = new Shoplist.Collections.Shop([
  {
    id: '0',
    title: 'Дикси',
    address: 'Торжок',
    score: 3,
  },
  {
    id: '1',
    title: 'Магнит',
    address: 'Тверь',
    score: 4
  },
  {
    id: '2',
    title: 'Карусель',
    address: 'Москва',
    score: 5
  },
  {
    id: '3',
    title: 'Глобус',
    address: 'Город',
    score: 4
  },
  {
    id: '4',
    title: 'Fix Price',
    address: 'Бежецк',
    score: 2
  }
]);

Shoplist.Views.Shops = Backbone.View.extend({
  tagName: 'ul',
  render: function(){
    this.collection.each(function(Shop){
      var shopView = new Shoplist.Views.Shop({model: Shop});
      $(document.body).append(shopView.el);
    });
  }
});

var shopsView = new Shoplist.Views.Shops({collection: shopCollection});
shopsView.render();
