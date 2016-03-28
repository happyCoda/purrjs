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
	Observer;

Observer = (function () {

    var _observer,
      _observerInterface = new Interface(['observe', 'unObserve', 'recieve']),
      _params = {
        implements: [_observerInterface],

        initialize: function (params) {
          if (params) {
            Utils.extend(this.constructor.prototype, params);
          }
        },

        observe: function (subject) {
          this.subject = subject;
          this.subject.add(this);
        },

        unObserve: function (subject) {
          this.subject = subject;
          this.subject.remove(this);
        },

        recieve: function (message) {}
      };

    _observer = Klass(_params);

  return _observer;

}());

if (typeof define === 'function' && define.amd) {
  define(['purr'], function (Purr) {

      return Observer;
  });
}

if (typeof module === 'object') {
  module.exports = Observer;
}
