var Vehicle = Backbone.Model.extend({
	defaults: {
		id: Math.floor((Math.random())*100)+1,
		registration: "0000000000",
		make: "No Make",
		model: "No Model",
		color: "white"
	}
});

var Vehicles = Backbone.Collection.extend({
	model: Vehicle
});

var VehicleView = Backbone.View.extend({
	tagName: 'li',
	attributes: function() {
		var color = this.model.get("color");
		return {
			"data-color": color
		}
	},
	initialize: function() {
		this.$el.attr("id", 'car' + this.model.get('id'));
	},
	events: {
		"click .btn-delete": "deleteVehicle"
	},
	render: function() {
		//this.$el.html(this.model.get("registration"));
		var template = _.template($("#carTemplate").html());
		var html = template(this.model.toJSON());
		this.$el.html(html);
		return this;
	},
	deleteVehicle: function(e) {
		this.$el.remove();
	}
});

var VehiclesView = Backbone.View.extend({
	initialize: function(options) {
		var self = this;
		this.bus = options.bus;
		this.bus.on("vehicleAdded", this.addVehicle, this);
		this.model.on("add", function(vehicle) {
			var vehicleView = new VehicleView({ model: vehicle })
			self.$el.append(vehicleView.render().$el);
		}, this);
	},
	render: function() {
		var self = this;
		this.model.each(function(vehicle) {
			var vehicleView = new VehicleView({ model: vehicle });
			self.$el.append(vehicleView.render().$el);
		});
		return this;
	},
	addVehicle: function(e) {
		console.log("About to add a vehicle!");
		this.model.add({ registration: e.reg });
	}
});

var NewVehicleView = Backbone.View.extend({
	tagName: 'form',
	events: {
		"click .btn-add": "addVehicle"
	},
	initialize: function(options) {
		this.bus = options.bus;
	},
	render: function() {
		var template = _.template($('#newCarTemplate').html());
		var html = template({});
		this.$el.html(html);
		return this;
	},
	addVehicle: function(e) {
		this.bus.trigger("vehicleAdded", { reg: this.$('#carInput').val() })
	}
});

var bus = _.extend({}, Backbone.Events);

var vehicles = new Vehicles([
	{
		id: 1,
		registration: "0002938293",
		make: "Honda",
		model: "Accord",
		color: "purple"
	},
	{
		id: 2,
		registration: "0003948822",
		make: "Ford",
		model: "Focus",
		color: "green"
	},
	{
		id: 3,
		registration: "0004938229",
		make: "Toyota",
		model: "Camry",
		color: "red"
	}
]);
var newVehicleView = new NewVehicleView({ model: {}, el: '#newcar', bus: bus });
var vehiclesView = new VehiclesView({ model: vehicles, el: 'ul#cars', bus: bus });
newVehicleView.render();
vehiclesView.render();