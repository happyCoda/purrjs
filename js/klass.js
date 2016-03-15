'use strict';

var Klass = (function () {
  var _klass = function (obj) {
    var F = function () {
      if (this.implements) {

        _klass.ensureImplemented(this, this.implements);
      }
    };

    Object.keys(obj).forEach(function (key) {

      F.prototype[key] = obj[key];
    });

    return F;
  };

  _klass.ensureImplemented = function () {
    var obj = arguments[0],
      interfaces = Array.prototype.slice.call(arguments, 1),
      notImplemented = [];

    interfaces.forEach(function (intr) {
      Object.keys(intr).forEach(function (key) {
        if (!obj[key]) {
          notImplemented.push(key);
        }
      });
    });

    if (notImplemented.length > 0) {
      throw new Error(notImplemented.join(', ') + ' must be implemented!');
    }
  };

  return _klass;
}());


if (typeof define === 'function' && define.amd) {
  define(['purr'], function (Purr) {

      return Klass;
  });
}

if (typeof module === 'object') {
  module.exports = Klass;
}
