/*
* PurrJS JavaScript library. 
* (c) 2013, happyCoda. 
* MIT License. 
* https://github.com/happyCoda/purrjs
*/

var Purr = Purr || {};

Purr.MVC = {};

Purr.MVC.eventHub = function () {
	if (!(this instanceof Purr.MVC.eventHub)) {
		return new Purr.MVC.eventHub();
	}

	this.subscribers = {};
	
};

Purr.MVC.eventHub.prototype.subscribe = function (event, subscriber) {
	var self = this;

	self.subscribers[event] = [];
	self.subscribers[event].push(subscriber);
};

Purr.MVC.eventHub.prototype.fire = function (event, message) {
	var self = this;

	self.subscribers[event].forEach(function (subscriber, idx) {
		subscriber(message);
	});
};

Purr.MVC.eventHub.prototype.unsubscribe = function (event, subscriber) {
	var self = this;

	Purr.array.remove(self.subscribers[event], subscriber);
};


Purr.MVC.controller = function () {
	if (!(this instanceof Purr.MVC.controller)) {
		return new Purr.MVC.controller();
	}
};

Purr.MVC.controller.prototype.init = function (params) {
	var self = this;

	self.model = params.model;
	self.view = params.view;

	self.evtHub = Purr.MVC.eventHub();

	self.eventHub.subscribe('modelChange', self.view.listen);
	self.eventHub.subscribe('viewChange', self.model.listen);
};



Purr.MVC.model = function (defaults) {
	if (!(this instanceof Purr.MVC.model)) {
		return new Purr.MVC.model();
	}

	this.defaults = this.data = defaults || {};
};

Purr.MVC.model.prototype.init = function () {};
Purr.MVC.model.prototype.listen = function (msg) {};

Purr.MVC.model.prototype.update = function () {

};

Purr.MVC.view = function () {
	if (!(this instanceof Purr.MVC.view)) {
		return new Purr.MVC.view();
	}
};

Purr.MVC.view.prototype.init = function () {};

Purr.MVC.view.prototype.listen = function (msg) {};

Purr.MVC.tpl = {
	parse: function (tpl, data) {
		var res = tpl.replace(/\{\$(\w*)\}/gi, function (m, cg1) {
			return tpl.replace(m, 'foo');
		});
		return res;
	}
};
