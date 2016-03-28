/*
* PurrJS JavaScript library.
* (c) 2013, happyCoda.
* MIT License.
* https://github.com/happyCoda/purrjs
*/

'use strict';

var Utils = require('./utils'),
	Interface = require('./interface'),
	Klass = require('./klass'),
	Dispatcher = require('./dispatcher'),
	MVC;

MVC = (function () {

	return {

		model: function (params) {
			var _modelInterface = new Interface(['add', 'get', 'update', 'remove']),
				_model,
				_params = {
					implements: [_modelInterface],
					add: function () {},
					get: function () {},
					update: function () {},
					remove: function () {}
				};

			if (params) {
				Utils.extend(_params, params);
			}

			_model = Klass(_params);

			return new _model();
		},

		view: function (params) {
			var _viewInterface = new Interface(['render']),
				_view,
				_params = {
					implements: [_viewInterface],
					render: function () {}
				};

				if (params) {
					Utils.extend(_params, params);
				}

				_view = Klass(_params);

				return new _view();
		},

		controller: function (params) {
			var _controllerInterface = new Interface(['subscribe', 'publish']),
				_controller,
				_params = {
					implements: [_controllerInterface],

					extends: [Dispatcher],

					initialize: function (_super) {
						_super();
					}
				};

				if (params) {
					Utils.extend(_params, params);
				}

				_controller = Klass(_params);

				return new _controller();
		},

		// controller.prototype.init: function (params) {
		// 	var self = this;
		//
		// 	self.model = params.model;
		// 	self.view = params.view;
		//
		// 	self.evtHub = eventHub();
		//
		// 	self.eventHub.subscribe('modelChange', self.view.listen);
		// 	self.eventHub.subscribe('viewChange', self.model.listen);
		// },

		// eventHub: function () {
		// 	if (!(this instanceof eventHub)) {
		// 		return new eventHub();
		// 	}
		//
		// 	this.subscribers = {};
		//
		// },
		//
		// eventHub.prototype.subscribe: function (event, subscriber) {
		// 	var self = this;
		//
		// 	self.subscribers[event] = [];
		// 	self.subscribers[event].push(subscriber);
		// },
		//
		// eventHub.prototype.fire: function (event, message) {
		// 	var self = this;
		//
		// 	self.subscribers[event].forEach(function (subscriber, idx) {
		// 		subscriber(message);
		// 	});
		// },
		//
		// eventHub.prototype.unsubscribe: function (event, subscriber) {
		// 	var self = this;
		//
		// 	array.remove(self.subscribers[event], subscriber);
		// },
		//
		//
		//
		//
		// tpl = {
		//
		// 	loopPattern: /\{for\s\$(\w*)\sin\s\$(\w*)\}(.*)\{endfor\}/gi,
		//
		// 	varPattern: /\{\{\$(\w*)\}\}/gi,
		//
		// 	parse: function (tpl, data) {
		//
		// 		var self = this,
		// 		formatedTpl = self.format(tpl),
		// 		root,
		// 		loopBody,
		// 		filledLoop = '',
		// 		res;
		//
		// 		res = formatedTpl.replace(self.loopPattern, function (m, cg1, cg2, cg3) {
		// 			loopBody = cg3;
		//
		// 			data.forEach(function (item) {
		// 				filledLoop += self.fillString(loopBody, item);
		// 			});
		//
		// 			return filledLoop;
		// 		});
		//
		// 		return res;
		// 	},
		//
		// 	format: function (tpl) {
		// 		var formatedTpl = tpl.replace(/\n|\r|\t/gi, '');
		//
		// 		return formatedTpl;
		// 	},
		//
		// 	fillString: function (str, data) {
		// 		var self = this,
		// 		filledString;
		//
		// 		filledString = str.replace(self.varPattern, function (m, cg) {
		// 			return data[cg];
		// 		});
		//
		// 		return filledString;
		// 	}
		// }
	};

}());

if (typeof define === 'function' && define.amd) {
  define(['purr'], function (Purr) {

      return MVC;
  });
}

if (typeof module === 'object') {
  module.exports = MVC;
}
