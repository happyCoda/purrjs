'use strict';

var Utils = require('./utils'),
  Interface = require('./interface'),
  Klass;

Klass = (function () {
  /*
  * @param {Object} obj Params object with klass properties, interfaces and parent classes.
  * @return {function} F The new klass constructor.
  */
  var _klass = function (obj) {
    var F,
      extensions,
      _proto;

    F = function () {
      var args = Utils.callToSlice(arguments),
        initialize = obj.initialize,
        interfaces = obj.implements;

      if (initialize) {
        initialize.apply(this, args);
      }

      if (interfaces) {

        interfaces.forEach(function (intr, idx) {

          intr.ensureImplemented(this);

        }, this);
      }
    };

    extensions = obj.extends;

    _proto = F.prototype;

    if (extensions) {
      extensions.forEach(function (extension) {
          var extensionProto = extension.prototype;

          Utils.extend(_proto, extensionProto);
      });
    }

    Utils.each(obj, function (val, key) {
      var temp;

      if (key !== 'implements' && key !== 'extends') {

        if (typeof _proto[key] === 'function') {

          temp = _proto[key];

          _proto[key] = function () {
            var args = Array.prototype.slice.call(arguments);

            args.unshift(temp.bind(this));

            val.apply(this, args);
          };

        } else {

          _proto[key] = val;
        }

      }
    }, null);

    return F;
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
