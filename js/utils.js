/*
* UtilsJS JavaScript library.
* (c) 2016, happyCoda.
* MIT License.
* https://github.com/happyCoda/purrjs
*/

'use strict';

var Utils = (function () {
  return {
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

    unique: function (nonUnique) {
      var i = 0,
        j,
        len = nonUnique.length,
        unique = [];


        for (; i < len; i += 1) {
          for (j = 0; j <= i; j += 1) {
            if (unique[j] === nonUnique[i]) {
              break;
            } else if (j === i) {
              unique.push(nonUnique[i]);
            }
          }
        }

      return unique;
    },

    count: function (haystack, item) {
    	var len = haystack.length,
    	duplicates,
    	count;

      duplicates = haystack.filter(function (needle) {
        return needle === item;
      });

    	count = duplicates.length;

    	return count;
    },

    /*
    * Searches an intersection between two arrays.
    *
    * @param {Array} setA A first array to search.
    * @param {Array} setB A second array to search.
    *
    * @return {Array} intersections An array with intersections.
    */
    intersect: function (setA, setB) {
    	var lenSetA = setA.length,
    	lenSetB = setB.length,
      i = 0,
      j,
      current,
    	intersections = [];

    	for (; i < lenSetA; i += 1) {
    		for (j = 0; j < lenSetB; j += 1) {
          current = setB[j];
    			if (setA[i] === current) {
    				if (intersections.indexOf(current) === -1) {
    					intersections.push(current);
    				}

    			}
    		}
    	}

    	return intersections;

    },

    diff: function (setA, setB) {
    	var lenSetA = setA.length,
    	lenSetB = setB.length,
      i = 0,
      j,
      current,
    	difference = [];

      for (; i < lenSetA; i += 1) {
        current = setA[i];
        if (setB.indexOf(current) === -1) {
          difference.push(current);
        }
    	}

    	return difference;
    },

    contains: function (box, item) {
      var boxType = this.getType(box),
        itemType,
        result = false;
      // TODO: make this method search in objects
      if (boxType === 'Array') {
        if (box.indexOf(item) !== -1) {
          result = true;
        }
      } else {
        throw new Error('Search item must be type of an Array, not – ' + boxType);
      }

      return result;
    },

    callToSlice: function (arrayLike) {

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
      var mixins = this.callToSlice(arguments);

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
    },

    /*
    * Makes any object available in global scope
    *
    * @param {Object} global Any global object to include exposable
    * @param {any} item Entity for expose
    * @param {string} name The name of the exposed entity
    */
    expose: function (global, item, name) {
    	global.exposed = global.exposed || {};

    	global.exposed[name] = item;
    }
  };
})();

if (typeof define === 'function' && define.amd) {
  define(['purr'], function (Purr) {

      return Utils;
  });
}

if (typeof module === 'object') {
  module.exports = Utils;
}
