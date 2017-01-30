var Car = Backbone.Model.extend({
	initialize: function() {
		this.set("id", Math.floor(Math.random()*100)+1)
	},
	defaults: {
		make: "No make",
		model: "No model"
	}
});

var Boat = Backbone.Model.extend({
	initialize: function() {
		this.set("id", Math.floor(Math.random()*100)+1)
	},
	defaults: {
		make: "No make",
		model: "No model"
	}
});

var Cars = Backbone.Collection.extend({
	model: Car
});

var Boats = Backbone.Collection.extend({
	model: Boat
});

var CarView = Backbone.View.extend({
	tagName: 'li',
	render: function() {
		this.$el.html(this.model.get("model"));
		return this;
	}
});

var BoatView = Backbone.View.extend({
	tagName: 'li',
	render: function() {
		this.$el.html(this.model.get("model"));
		return this;
	}	
});

var NavView = Backbone.View.extend({
	events: {
		"click": "navigateRoute"
	},
	navigateRoute: function(e) {
		var userClicked = $(e.target).data("url");
		router.navigate(userClicked, { trigger: true });

	}
});

var HomeView = Backbone.View.extend({
	render: function() {
		this.$el.html("<h1>Welcome</h1><p>The Super Car & Boat Mega Show!</p>");
		return this;
	}
});

var CarsView = Backbone.View.extend({
	render: function() {
		var self = this;
		this.$el.html("");
		this.model.each(function(car) {
			var carView = new CarView({ model: car });
			self.$el.append(carView.render().$el);
		});
		return this;
	}
});

var BoatsView = Backbone.View.extend({
	render: function() {
		var self = this;
		this.$el.html("");
		this.model.each(function(boat){
			var boatView = new BoatView({ model: boat });
			self.$el.append(boatView.render().$el);
		});
		return this;
	}
});

var cars = new Cars([
	{
		make: "Honda",
		model: "Accord"
	},
	{
		make: "Toyota",
		model: "Corolla"
	},
	{
		make: "Ford",
		model: "F150"
	}
]);

var boats = new Boats([
	{
		make: "Pursuit",
		model: "2850 Angler"
	},
	{
		make: "Boston Whaler",
		model: "Island Runner"
	},
	{
		make: "Ocean",
		model: "4250 Statesman"
	}
]);

var AppRouter = Backbone.Router.extend({
	routes: {
		"home": "viewHome",
		"cars": "viewCars",
		"boats": "viewBoats",
		"*other": "viewDefault"
	},
	viewHome: function() {
		var homeView = new HomeView({ el: '#container' });
		homeView.render();
	},
	viewCars: function() {
		var carsView = new CarsView({ model: cars, el: '#container' });
		carsView.render();
	},
	viewBoats: function() {
		var boatsView = new BoatsView({ model: boats, el: '#container' });
		boatsView.render();
	},
	viewDefault: function() {

	}
});

var navView = new NavView({ el: '#main-nav' });
var homeView = new HomeView({ el: '#container' });
homeView.render();
var router = new AppRouter();
Backbone.history.start();
