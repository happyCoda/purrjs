'use strict';

var Utils = require('./utils'),
  Interface = require('./interface'),
  Klass = require('./klass'),
  Dispatcher;

Dispatcher = (function () {

  var _dispatcher,
		_dispatcherInterface = new Interface(['subscribe', 'publish']),
		_params = {
			implements: [_dispatcherInterface],

			initialize: function () {
				this.channels = {};
			},

			subscribe: function (channel, context, method) {

        if (!this.channels[channel]) {
          this.channels[channel] = [];
        }

				this.channels[channel].push({
          context: context,
          method: method
        });
			},

			publish: function (channel) {
        var args = Utils.callToSlice(arguments, 1);

				this.channels[channel].forEach(function (subscriber) {
					subscriber.method.apply(subscriber.context, args);
				});
			}
		};

    _dispatcher = Klass(_params);

    return _dispatcher;
}());


if (typeof define === 'function' && define.amd) {
  define(['purr'], function (Purr) {

      return Dispatcher;
  });
}

if (typeof module === 'object') {

  module.exports = Dispatcher;
}
