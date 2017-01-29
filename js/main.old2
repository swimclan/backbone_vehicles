var person = {
	name: "Matt",
	walk: function() {
		this.trigger("walking", { speed: 23, startTime: "2012-03-12 12:00:00" });
	}
};

_.extend(person, Backbone.Events);

person.once("walking", function(event) {
	console.log("Person is walking");
	console.log(event);
});

person.walk();
