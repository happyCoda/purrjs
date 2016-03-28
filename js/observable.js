/*
* PurrJS JavaScript library.
* (c) 2016, happyCoda.
* MIT License.
* https://github.com/happyCoda/purrjs
*/

'use strict';

var Utils = require('./utils'),
	Interface = require('./interface'),
	Klass = require('./klass'),
	Observable;

Observable = (function () {

  var _observable,
		observableInterface = new Interface(['add', 'remove', 'notify']),
		_params = {
			implements: [observableInterface],

			initialize: function () {
				this.observers = [];
			},

			add: function (observer) {
				this.observers.push(observer);
			},

			remove: function (observerToRemove) {
				this.observers = this.observers.filter(function (observer) {
					return observer !== observerToRemove;
				});
			},

			notify: function (message) {
				this.observers.forEach(function (observer) {
					observer.recieve(message);
				});
			}
		};

	_observable = Klass(_params);

  return _observable;

}());

if (typeof define === 'function' && define.amd) {
  define(['purr'], function (Purr) {

      return Observable;
  });
}

if (typeof module === 'object') {
  module.exports = Observable;
}
