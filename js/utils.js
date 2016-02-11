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
        callback.call(context, iterable[key], key);
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

  extendDeep: function (extendable, extension) {

    this.each(extension, function (val, prop) {

      var propType = this.getType(val);

      if (propType === 'Array') {

        extendable[prop] = [];

        this.extendDeep(extendable[prop], val);

      } else if (propType === 'Object') {

        extendable[prop] = {};

        this.extendDeep(extendable[prop], val);
      } else {

        extendable[prop] = val;

      }
    }, this);
  },

  mixin: function (extendable) {
    var mixins = this.slice(arguments);

    this.each(mixins, function (mixin) {
      this.extend(extendable, mixin);
    }, this);

    return extendable;
  },

  inspect: function (obj, deeper) {
    var stringified,
      objType = this.getType(obj);

      if (objType === 'Object') {
        stringified = '{';
      } else if (objType === 'Array') {
        stringified = '[';
      } else {
        return obj.toString();
      }

    function callback(objType, val, prop) {
      var propType = this.getType(val);

      if (objType === 'Array') {

        if (propType === 'Object' || propType === 'Array') {
          stringified += this.inspect(val, true);
        } else {
          stringified += '"' + val + '", ';
        }
      } else {
        if (propType === 'Object') {
          stringified += '"' + prop + '": ';
          stringified += this.inspect(val, true);
        } else if (propType === 'Array') {
          stringified += '"' + prop + '": ';
          stringified += this.inspect(val, true);
        } else {
          stringified += '"' + prop + '": "' + val + '", ';
        }
      }

    }

    this.each(obj, callback.bind(this, objType), this);

    stringified = stringified.replace(/(,\s)$/, '');

    stringified += stringified.substr(0, 1) === '{' ? '}' : ']';

    if (deeper) {
      stringified += ', ';
    }

    return stringified;
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
