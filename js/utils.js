'use strict';

var Utils = {
  name: 'Utils',

  getType: function (something) {
    var toStr = Object.prototype.toString;

    return toStr.call(something).replace(/\[|\]/g, '').split(' ')[1];
  },

  each: function (iterable, callback) {
    var iterableType = this.getType(iterable);

    if (iterableType === 'Array') {

      iterable.forEach(callback);

    } else if (iterableType === 'Object') {
      Object.keys(iterable).forEach(function (key) {
        callback(iterable[key], key);
      });
    } else {
      throw new Error('Argument must be an Object or an Array');
    }
  },

  unique: function (raw) {}
};

if (typeof define === 'function' && define.amd) {
  define(['purr'], function (Purr) {

      return Utils;
  });
}

if (typeof module === 'object') {
  module.exports = Utils;
}
