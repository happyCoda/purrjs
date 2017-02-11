/*
* PurrJS JavaScript library.
* (c) 2016-2017, happyCoda.
* MIT License.
* https://github.com/happyCoda/purrjs
*/

import Plumber from './plumber';
import EventBus from './bus';
import Mistake from './mistake';
import CONFIG from './config';

let utils = (function () {

  function _getKind(thing) {
    let toStr = Object.prototype.toString;

    if (thing === undefined) {
      Mistake().throw(CONFIG.LIB_ERRORS.NO_PLUMBER);
    }

    return toStr.call(thing).replace(/\[|\]/g, '').split(' ')[1];
  }

  function _size(something) {
    let somethingType = _getKind.call(this, something);

    if (somethingType === 'String' || somethingType === 'Array') {
      return something.length;
    } else {
      Mistake().throw(CONFIG.LIB_ERRORS.UNSIZEABLE);
    }
  }

  function _legacy(something) {
    return something.constructor ? something.constructor.name : null;
  }

  function _makeArray(arrayLike) {
    let arrayLikeType = _getKind.call(this, arrayLike);

    if (arrayLikeType === 'Array') {
      return arrayLikeType;
    } else if (arrayLikeType === 'Object') {
      return Object.keys(arrayLike).map((key) => {
        return arrayLike[key];
      });
    } else if (arrayLikeType === 'String') {
      return arrayLikeType.split('');
    } else {
      Mistake().throw(CONFIG.LIB_ERRORS.OBJECT_OR_ARRAY_OR_STRING);
    }
  }

  function _each(iterable, callback) {
    let iterableType = _getKind.call(this, iterable);

    if (iterableType === 'Array') {
      iterable.forEach(callback);
    } else if (iterableType === 'Object') {
      Object.keys(iterable).forEach((key) => {
        callback(iterable[key], key);
      });
    } else {
      Mistake().throw(CONFIG.LIB_ERRORS.OBJECT_OR_ARRAY);
    }
  }

  function _map(iterable, callback) {
    let iterableType = _getKind.call(this, iterable);

    if (iterableType === 'Array') {
      return iterable.map(callback);
    } else if (iterableType === 'Object') {
      let iterableMapped = [];

      Object.keys(iterable).forEach((key) => {
        let newVal = callback(iterable[key], key);

        iterableMapped.push(newVal);
      });

      return iterableMapped;
    } else {
      Mistake().throw(CONFIG.LIB_ERRORS.OBJECT_OR_ARRAY);
    }
  }

  function _reduce(iterable, ...args) {
    let iterableType = _getKind.call(this, iterable);

    if (iterableType === 'Array') {
      return iterable.reduce(...args);
    } else if (iterableType === 'Object') {
      // TODO: operates on Array of Object values, keys are missing. refactor this to gain keys
      return _makeArray.call(this, iterable).reduce(...args);
    } else {
      Mistake().throw(CONFIG.LIB_ERRORS.OBJECT_OR_ARRAY);
    }
  }

  function _filter(iterable, ...args) {
    let iterableType = _getKind.call(this, iterable);

    if (iterableType === 'Array') {
      return iterable.filter(...args);
    } else if (iterableType === 'Object') {
      // TODO: same as reduce
      return _makeArray.call(this, iterable).filter(...args);
    } else {
      Mistake().throw(CONFIG.LIB_ERRORS.OBJECT_OR_ARRAY);
    }
  }

  function _contains(box, item) {
    let boxType = _getKind.call(this, box),
      result = false;

    if (boxType === 'Array') {
      if (box.indexOf(item) !== -1) {
        result = true;
      }
    } else if (boxType === 'Object') {
      // TODO: make search in objects deep
      for (let prop in box) {
        if (box[prop] === item) {
          result = true;
          break;
        }
      }
    } else {
      Mistake().throw('Search item must be of type Array or Object, not – ' + boxType);
    }

    return result;
  }

  function _inspect(obj, deeper) {
    let objType = _getKind.call(this, obj),
      stringified;

      if (objType === 'Object') {
        stringified = '{';
      } else if (objType === 'Array') {
        stringified = '[';
      } else {
        return obj.toString();
      }

    function callback(objType, val, prop) {
      let propType = _getKind.call(this, val);

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
    _each.call(this, val, callback.bind(this, objType));
    stringified = stringified.replace(/(,\s)$/, '');
    stringified += stringified.substr(0, 1) === '{' ? '}' : ']';

    if (deeper) {
      stringified += ', ';
    }

    return stringified;
  }

  function _extend(target, source) {
    _each.call(this, source, (val, prop) => {
      target[prop] = val;
    });
  }

  function _mixin(target, ...sources) {
    _each.call(this, sources, (mixin) => {
      _extend.call(this, target, mixin);
    });
  }

  function _expose(global, item, name) {
    global.__exposed = global.__exposed || {};
    global.__exposed[name] = item;
  }

  function _debounce(fn, wait, asap) {
    let timeout;

    return (...args) => {
      function delay() {
        if (!asap) {
          delay.apply(null, args);
        }
        timeout = null;
      }

      if (timeout) {
        clearTimeout(timeout);
      } else if (asap) {
        delay.apply(null, args);
      }

      timeout = setTimeout(delay, wait || 100);
    }
  }

  return Object.defineProperties({}, {
    _name: {
      value: 'Utils',
      enumerable: false,
      writable: false
    },

    take: {
      value(flow) {
        this._plumber = Plumber(flow);

        return this;
      },
      enumerable: true,
      writable: false
    },

    getKind: {
      value(thing) {
        _getKind.call(this, thing);
      },
      enumerable: true,
      writable: false
    },

    size: {
      value(something) {
        _size.call(this, something);
      },
      enumerable: true,
      writable: false
    },

    legacy: {
      value(something) {
        _legacy.call(this, something);
      },
      enumerable: true,
      writable: false
    },

    makeArray: {
      value(arrayLike) {
        return _makeArray.call(this, arrayLike);
      },
      enumerable: true,
      writable: false
    },

    each: {
      value(iterable, callback) {
        _each.call(this, iterable, callback);
      },
      enumerable: true,
      writable: false
    },

    each: {
      value(iterable, callback) {
        _map.call(this, iterable, callback);
      },
      enumerable: true,
      writable: false
    },

    reduce: {
      value(iterable, ...args) {
        return _reduce.call(this, iterable, ...args);
      },
      enumerable: true,
      writable: false
    },

    filter: {
      value(iterable, ...args) {
        return _filter.call(this, iterable, ...args);
      },
      enumerable: true,
      writable: false
    },

    inspect: {
      value(obj, deeper) {
        return _inspect.call(this, obj, deeper);
      },
      enumerable: true,
      writable: false
    },

    unique: {
      value(nonUnique) {
        let i = 0,
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
      enumerable: true,
      writable: false
    },

    contains: {
      value(box, item) {
        // TODO: refactor this method to make it checking for multiple items
        return _contains.call(this, box, item);
      },
      enumerable: true,
      writable: false
    },

    /*
    * Extends one object by another.
    *
    * @param {Object} extendable Object which will be extended.
    * @param {Object} extension Object by which will be do extension.
    * @return {Object} extendable Extended object.
    */
    extend: {
      value(target, source) {
        _extend.call(this, target, source);
      },
      enumerable: true,
      writable: false
    },

    // extendDeep: function (extendable, extension) {
    //
    //   this.each(extension, function (val, prop) {
    //
    //     var propType = this.take(val).type();
    //
    //     if (propType === 'Array') {
    //
    //       extendable[prop] = [];
    //
    //       this.extendDeep(extendable[prop], val);
    //
    //     } else if (propType === 'Object') {
    //
    //       extendable[prop] = {};
    //
    //       this.extendDeep(extendable[prop], val);
    //     } else {
    //
    //       extendable[prop] = val;
    //
    //     }
    //   }, this);
    // },

    /*
    * Extends object by the given functionality. Multiple inheritance.
    *
    * @param {Object} any Any number of arguments with object type.
    * @return {Object} extendable Object extended with mixins.
    */
    mixin: {
      value(target, ...sources) {
        _mixin.call(this, target, ...sources);
      },
      enumerable: true,
      writable: false
    },

    /*
    * Makes any object available in global scope
    *
    * @param {Object} global Any global object to include exposable
    * @param {Any} item Entity for expose
    * @param {String} name The name of the exposed entity
    */
    expose: {
      value(global, item, name) {
        _expose.call(this, global, item, name);
      },
      enumerable: true,
      writable: false
    },

    debounce: {
      value(...args) {
        _debounce.call(this, ...args);
      },
      enumerable: true,
      writable: false
    },

    /*
    * Generates random number
    *
    * @param {Number} min Minimum number boundary.
    * @param {Number} max Maximum number boundary.
    * @return {Number} randNum Random number generated.
    */
    randomNum: {
      value(min, max) {
      	let randNum = Math.random() * max;

      	randNum = Math.round(randNum);

      	if (randNum <= max && randNum >= min) {
      		return randNum;
      	}

      	return this.randomNum(min, max);
      },
      enumerable: true,
      writable: false
    }
  });
}());

export default utils;
