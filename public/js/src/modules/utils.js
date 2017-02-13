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

  /*
  * Checks if first argument equals to second.
  *
  * @param {Any} thing first argument you want to compare.
  * @param {Any} other second argument you want to compare.
  * @return {Boolean} return comparison result.
  */
  function _is(thing, other) {
    return thing === other;
  }

  function _size(something) {
    let somethingType = _getKind.call(this, something);

    if (somethingType === 'String' || somethingType === 'Array') {
      return something.length;
    } else {
      Mistake().throw(CONFIG.LIB_ERRORS.UNSIZEABLE);
    }
  }

  function _getConstructorName(something) {
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

  /*
  * Returns the last item of the given array.
  *
  * @param {Array} arr Array to get tail of.
  * @return {Any} last item of the provided array.
  */
  function _tail(arr) {
    let arrLength = arr.length;

    if (arrLength > 1) {
      return arr[arrLength - 1];
    } else {
      return arr[0];
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
    } else if (boxType === 'String') {
      result = boxType.indexOf(item) === -1;
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
  /*
  * Extends one object by another.
  *
  * @param {Object} extendable Object which will be extended.
  * @param {Object} extension Object by which will be do extension.
  * @return {Object} extendable Extended object.
  */
  function _extend(target, source) {
    _each.call(this, source, (val, prop) => {
      target[prop] = val;
    });
  }
  /*
  * Allows target object to borrow functionality from source objects. Multiple inheritance.
  *
  * @param {Object} any Any number of arguments with object type.
  * @return {Object} extendable Object extended with mixins.
  */
  function _mixin(target, ...sources) {
    _each.call(this, sources, (mixin) => {
      _extend.call(this, target, mixin);
    });
  }
  /*
  * Makes any object available in global scope
  *
  * @param {Object} global Any global object to include exposable
  * @param {Any} item Entity for expose
  * @param {String} name The name of the exposed entity
  */
  function _expose(global, item, name) {
    global.__exposed = global.__exposed || {};
    global.__exposed[name] = item;
  }

  function _debounce(fn, wait, asap) {
    let timeout;

    return (...args) => {
      function delay() {
        if (!asap) {
          delay(...args);
        }
        timeout = null;
      }

      if (timeout) {
        clearTimeout(timeout);
      } else if (asap) {
        delay(...args);
      }

      timeout = setTimeout(delay, wait || 100);
    }
  }

  /*
  * Creates provided number of calls of a given function
  *
  * @param {Function} fn Function to call.
  * @param {Number} repeatsNum Number of repeats.
  */
  function _repeat(fn, repeatsNum) {
    for (let i = 0; i < repeatsNum; i += 1) {
      fn();
    }
  }

  /*
  * Generates random number
  *
  * @param {Number} min Minimum number boundary.
  * @param {Number} max Maximum number boundary.
  * @return {Number} randNum Random number generated.
  */
  function _randomNum(min, max) {
    let randNum = Math.random() * max;

    randNum = Math.round(randNum);

    if (randNum <= max && randNum >= min) {
      return randNum;
    }

    return this.randomNum(min, max);
  }

  return Object.defineProperties({}, {
    _name: {
      value: 'Utils',
      enumerable: false,
      writable: false
    },

    getKind: {
      value(thing) {
        return _getKind.call(this, thing);
      },
      enumerable: true,
      writable: false
    },

    is: {
      value(thing, other) {
        return _is.call(this, thing, other);
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

    getConstructorName: {
      value(something) {
        _getConstructorName.call(this, something);
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

    tail: {
      value(arr) {
        return _tail.call(this, arr);
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

    contains: {
      value(box, item) {
        return _contains.call(this, box, item);
      },
      enumerable: true,
      writable: false
    },
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

    mixin: {
      value(target, ...sources) {
        _mixin.call(this, target, ...sources);
      },
      enumerable: true,
      writable: false
    },

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

    repeat: {
      value(fn, repeatsNum) {
        _repeat.call(this, fn, repeatsNum);
      },
      enumerable: true,
      writable: false
    },

    randomNum: {
      value(min, max) {
      	return _randomNum.call(this, min, max);
      },
      enumerable: true,
      writable: false
    },

    log: {
      value(...args) {
        if (args.length > 1) {
          let styles = _tail.call(this, args),
            stylesStr = Plumber(styles)
              .pipe(JSON.stringify)
              .pipe((jsonStr) => {
                return jsonStr.split(',').join(';').replace(/(\{|\}|")+/gi, '');
              })
              .flush();

          console.log(`%c${args[0]}`, stylesStr);

          //TODO: rewrite this method to work with multiple inputs
          // if (_is.call(this, _getKind.call(this, styles), 'Object')) {
          //   let el = document.createElement('div'),
          //     computedStyle = getComputedStyle(el),
          //     styleProps = Object.keys(styles).filter((key) => {
          //       return key in computedStyle;
          //     });
          //
          //   if (styleProps.length > 0) {
          //     let stylesStr = Plumber(styles)
          //       .pipe(JSON.stringify)
          //       .pipe((jsonStr) => {
          //         return jsonStr.split(',').join(';').replace(/(\{|\}|")+/gi, '');
          //       })
          //       .flush();
          //
          //     console.log(`%c${args[0]}`, stylesStr);
          //   } else {
          //     console.log(...args);
          //   }
          // } else {
          //   console.log(...args);
          // }
        } else {
          console.log(...args);
        }
      },
      enumerable: true,
      writable: false
    }
  });
}());

export default utils;
