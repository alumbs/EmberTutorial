App = Ember.Application.create();

App.Router.map(function(){
	this.resource('about');
	this.resource('posts', function(){
		this.resource('post', { path: ':post_id'});
	});
});

App.PostsRoute = Ember.Route.extend({
	model: function(){
		return posts;
	}
});

App.PostRoute = Ember.Route.extend({
	model: function(params){
		return posts.findBy('id', params.post_id);
	}
});

App.PostController = Ember.ObjectController.extend({
	isEditing: false,

	actions: {
		edit: function(){
			this.set('isEditing', true);
		},

		doneEditing: function() {
			this.set('isEditing', false);
		}
	}
});

Ember.Handlebars.helper('format-date', function(date){
	return moment(date).fromNow();
});

var posts = [{
	id: '1',
	title: "Rails is Good",
	author: {name: "sam"},
	date: new Date('12-27-2014'),
	excerpt: "Lorem ipsums",
	body: "Some template info to use"
}, {
	id: '2',
	title: "Rails is bad",
	author: {name: "sam"},
	date: new Date('12-27-2014'),
	excerpt: "Lorem ipsumssss",
	body: "Some other template info to be used"
}];