'use strict';

var Interface = require('./interface'),
  Klass;

Klass = (function () {
  var _klass = function (obj) {
    var F;

    F = function () {
      var interfaces = obj.implements,
        extensions = obj.extends;

      if (extensions) {
        _klass.extend(this, extensions);
      }

      if (interfaces) {

        interfaces.forEach(function (intr, idx) {

          intr.ensureImplemented(this);

        }, this);
      }
    };



    Object.keys(obj).forEach(function (key) {
      if (key !== 'implements') {
        F.prototype[key] = obj[key];
      }
    });

    return F;
  };

  // _klass.ensureImplemented = function (obj, interfaces) {
  //   var notImplemented = [];
  //
  //   interfaces.forEach(function (intr) {
  //     intr.members.forEach(function (member) {
  //       if (!obj[member]) {
  //         notImplemented.push(member);
  //       }
  //     });
  //   });
  //
  //
  //   if (notImplemented.length > 0) {
  //
  //     throw new Error(notImplemented.join(', ') + ' must be implemented!');
  //
  //   }
  // };

  _klass.extend = function (obj, extensions) {

    extensions.forEach(function (extension) {
        var objProto = obj.constructor.prototype,
          extensionProto = extension.prototype;

          Object.keys(extensionProto).forEach(function (key) {

            if (!objProto[key]) {
              objProto[key] = extensionProto[key];
            } else {
                if (typeof objProto[key] === 'function') {
                  objProto[key] = objProto[key].bind(obj, extensionProto[key]);
                }
            }

          });

          extension.call(obj);
      });

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
