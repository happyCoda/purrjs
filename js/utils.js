'use strict';

var Utils = {
  name: 'Utils',

  getType: function (something) {
    var toStr = Object.prototype.toString;

    return toStr.call(something).replace(/\[|\]/g, '').split(' ')[1];
  },

  each: function (iterable, callback, context) {
    var iterableType = this.getType(iterable);

    if (iterableType === 'Array') {

      iterable.forEach(callback, context);

    } else if (iterableType === 'Object') {
      Object.keys(iterable).forEach(function (key) {
        callback(iterable[key], key, context);
      });
    } else {
      throw new Error('Argument must be an Object or an Array');
    }
  },

  unique: function (raw) {
    var i = 0,
      j,
      len = raw.length,
      unique = [];


      for (; i < len; i += 1) {
        for (j = 0; j <= i; j += 1) {
          if (unique[j] === raw[i]) {
            break;
          } else if (j === i) {
            unique.push(raw[i]);
          }
        }
      }

    return unique;
  },

  slice: function (arrayLike) {
    
    return Array.prototype.slice.call(arrayLike);
  },

  extend: function (extendable, extension) {
    this.each(extension, function (val, prop) {
      extendable[prop] = val;
    });

    return extendable;
  },

  mixin: function (extendable) {
    var mixins = Array.prototype.slice.call(arguments);

    this.each(mixins, function (mixin) {
      this.extend(extendable, mixin);
    }, this);

    return extendable;
  }
};

if (typeof define === 'function' && define.amd) {
  define(['purr'], function (Purr) {

      return Utils;
  });
}

if (typeof module === 'object') {
  module.exports = Utils;
}
