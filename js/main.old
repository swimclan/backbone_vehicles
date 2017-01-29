var Song = Backbone.Model.extend({
	defaults: {
		id: 0,
		title: "No title",
		artist: "No artist",
		publishYear: "No publish year",
		listeners: 0
	}
});

var Songs = Backbone.Collection.extend({
	model: Song
});

var SongView = Backbone.View.extend({
	tagName: 'li',
	initialize: function() {
		this.model.on("change", this.render, this);
	},
	events: {
		"click .add": "addListener"
	},
	render: function() {
		this.$el.attr("id", this.model.id);
		var template = _.template($('#songTemplate').html());
		var html = template(this.model.toJSON());
		this.$el.html(html);
		return this;
	},
	addListener: function(event) {
		var currentListenerCount = this.model.get("listeners");
		this.model.set("listeners", ++currentListenerCount);
	}
});

var SongsView = Backbone.View.extend({
	initialize: function() {
		this.model.on("add", this.onSongAdded, this);
		this.model.on("remove", this.onSongRemoved, this);
	},
	render: function() {
		var self = this;
		this.model.each(function(song) {
			var songView = new SongView({ model: song });
			self.$el.append(songView.render().$el);
		});
		return this;
	},
	onSongAdded: function(song) {
		var songView = new SongView({ model: song })
		this.$el.append(songView.render().$el);
	},
	onSongRemoved: function(song) {
		this.$('li#' + song.id).remove();
	}
});

var songs = new Songs([
	new Song({
		id: 1,
		title: "Surfin' with an Alien",
		artist: "Joe Satriani",
		publishYear: 1992
	}),
	new Song({
		id: 2,
		title: "Summer Song",
		artist: "Joe Satriani",
		publishYear: 1994
	}),
	new Song({
		id: 3,
		title: "My Favorite Things",
		artist: "John Coltrane",
		publishYear: 1960
	})
]);

var songsView = new SongsView({ model: songs, el: '#songs' });
songsView.render();



