App = Ember.Application.create(
	//{
		//socket: window.io.connect('http://localhost');
		/*socket.on('connection', function(data){                                                                               
      		//self.store.push(data.type, data.item);
      		console.log('Socket connected');                                                                             
    	});*/
	//}
	);

App.ApplicationRoute = Ember.Route.extend({                                                              
  activate: function() {
  	console.log('Ember active is called');               
    // connect to the websocket once we enter the application route                                                                   
    var socket = window.io.connect('http://localhost');                                                           

    var self = this;                                                                                                   

    socket.on('message', function(data){                                                                               
      //self.store.push(data.type, data.item);                                                                              
    });
    socket.on('connection', function(data){                                                                               
      //self.store.push(data.type, data.item);
      console.log('Socket connected');                                                                             
    });                                                                                                                   
  }
});

App.Router.map(function(){
	this.resource('about');
	this.resource('posts', function(){
		this.resource('post', { path: ':post_id'});
	});
	//this.resource('app');
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