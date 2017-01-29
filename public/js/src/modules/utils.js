/*
* UtilsJS JavaScript library.
* (c) 2016-2017, happyCoda.
* MIT License.
* https://github.com/happyCoda/purrjs
*/

import Stream from './stream';
import Mistake from './mistake';
import CONFIG from './config';

let Utils = (function () {

  function _makeArray() {
    let arrayLike = this._stream.flush(),
      arrayLikeType = this.type();

    if (arrayLikeType === 'Array') {
      return arrayLikeType;
    } else if (arrayLikeType === 'Object') {
      return Object.keys(arrayLike).map((key) => {
        return arrayLike[key];
      });
    } else if (arrayLikeType === 'String') {
      return arrayLikeType.split('');
    } else {
      (new Mistake()).throw(CONFIG.LIB_ERRORS.OBJECT_OR_ARRAY_OR_STRING);
    }
  }

  function _each(callback) {
    let iterable = this._stream.flush(),
      iterableType = this.type();

    if (iterableType === 'Array') {
      iterable.forEach(callback);
    } else if (iterableType === 'Object') {
      Object.keys(iterable).forEach((key) => {
        callback(iterable[key], key);
      });
    } else {
      (new Mistake()).throw(CONFIG.LIB_ERRORS.OBJECT_OR_ARRAY);
    }
  }

  function _reduce(...args) {
    let iterable = this._stream.flush(),
      iterableType = this.type();

    if (iterableType === 'Array') {
      return iterable.reduce(...args);
    } else if (iterableType === 'Object') {
      // TODO: operates on Array of Object values, keys are missing. refactor this to gain keys
      return _makeArray.call(this).reduce(...args);
    } else {
      (new Mistake()).throw(CONFIG.LIB_ERRORS.OBJECT_OR_ARRAY);
    }
  }

  function _filter(...args) {
    let iterable = this._stream.flush(),
      iterableType = this.type();

    if (iterableType === 'Array') {
      return iterable.filter(...args);
    } else if (iterableType === 'Object') {
      // TODO: same as reduce
      return _makeArray.call(this).filter(...args);
    } else {
      (new Mistake()).throw(CONFIG.LIB_ERRORS.OBJECT_OR_ARRAY);
    }
  }

  function _checkConditions(accumulator, nextCondition) {
    let isAccumulatorFunction = this.take(accumulator).type() === 'Function',
      isNextConditionFunction = this.take(nextCondition).type() === 'Function';

      return {
        conditionX: isAccumulatorFunction ? accumulator() : accumulator,
        conditionY: isNextConditionFunction ? nextCondition() : nextCondition
      };
  }

  function _whenAll(then) {
    let conditionList = this._stream.flush(),
      res;

    res = _reduce.call(this, (...args) => {
      let ckecked = _checkConditions.call(this, ...args);

      return ckecked.conditionX && ckecked.conditionY;
    });

    if (res) {
      then();
    }
  }

  function _whenAny(then) {
    let conditionList = this._stream.flush(),
      res;

    res = _reduce.call(this, (...args) => {
      let ckecked = _checkConditions.call(this, ...args);

      return ckecked.conditionX || ckecked.conditionY;
    });

    if (res) {
      then();
    }
  }

  function _whenNone(then) {
    let conditionList = this._stream.flush(),
      res;

    res = _reduce.call(this, (...args) => {
      let ckecked = _checkConditions.call(this, ...args);

      return !ckecked.conditionX && !ckecked.conditionY;
    });

    if (res) {
      then();
    }
  }

  function _contains(item) {
    let box = this._stream.flush(),
      boxType = this.type(),
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
      (new Mistake()).throw('Search item must be of type Array or Object, not – ' + boxType);
    }

    return result;
  }

  function _inspect(deeper) {
    let obj = this._stream.flush(),
      objType = this.take(obj).type()
      stringified;

      if (objType === 'Object') {
        stringified = '{';
      } else if (objType === 'Array') {
        stringified = '[';
      } else {
        return obj.toString();
      }

    function callback(objType, val, prop) {
      let propType = this.take(val).type();

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

  function _extend(target) {
    _each.call(this, (val, prop) => {
      target[prop] = val;
    });
  }

  function _mixin(target) {
    _each.call(this, (mixin) => {
      this.take(mixin);
      _extend.call(this, target);
    }, this);
  }

  function _expose(item, name) {
    let global = this._stream.fluch();

    global.__exposed = global.__exposed || {};
    global.__exposed[name] = item;
  }

  return {
    name: 'Utils',

    take(flow) {
      this._stream = new Stream((flow) => {
        return flow;
      }, flow);

      return this;
    },

    type() {
      let toStr = Object.prototype.toString,
        something = this._stream && this._stream.flush();

      if (something === undefined) {
        (new Mistake()).throw(CONFIG.LIB_ERRORS.NO_STREAM);
      }

      return toStr.call(something).replace(/\[|\]/g, '').split(' ')[1];
    },

    size() {
      let somethingType = this.type(),
        something = this._stream.flush();

      if (somethingType === 'String' || somethingType === 'Array') {
        return something.length;
      } else {
        (new Mistake()).throw(CONFIG.LIB_ERRORS.UNSIZEABLE);
      }
    },

    legacy() {
      let something = this._stream.flush();

      return something.constructor ? something.constructor.name : null;
    },

    makeArray(arrayLike) {
      this.take(arrayLike);
      return _makeArray.call(this);
    },

    each(iterable, callback, context, usePrototype) {
      this.take(iterable);
      _each.call(this, callback);
    },

    reduce(iterable, ...args) {
      this.take(iterable);

      return _reduce.call(this, ...args);
    },

    filter(iterable, ...args) {
      this.take(iterable);

      return _filter.call(this, ...args);
    },

    whenAll(conditionList, then) {
      this.take(conditionList);
      _whenAll.call(this, then);
    },

    whenAny(conditionList, then) {
      this.take(conditionList);
      _whenAny.call(this, then);
    },

    whenNone(conditionList, then) {
      this.take(conditionList);
      _whenNone.call(this, then);
    },

    inspect(obj, deeper) {
      this.take(obj);
      _inspect.call(this, deeper);
    },

    unique(nonUnique) {
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

    contains(box, item) {
      this.take(box);
      // TODO: refactor this method to make it checking for multiple items
      return _contains.call(this, item);
    },

    /*
    * Extends one object by another.
    *
    * @param {Object} extendable Object which will be extended.
    * @param {Object} extension Object by which will be do extension.
    * @return {Object} extendable Extended object.
    */
    extend(target, source) {
      this.take(source);
      _extend.call(this, target);
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
    mixin(target, ...args) {
      this.take(args);
      _mixin.call(this, target);
    },

    /*
    * Makes any object available in global scope
    *
    * @param {Object} global Any global object to include exposable
    * @param {Any} item Entity for expose
    * @param {String} name The name of the exposed entity
    */
    expose(global, item, name) {
      this.take(global);
      _expose.call(this, item, name);
    },

    /*
    * Generates random number
    *
    * @param {Number} min Minimum number boundary.
    * @param {Number} max Maximum number boundary.
    * @return {Number} randNum Random number generated.
    */
    randomNum: function (min, max) {

    	var randNum = Math.random() * max;

    	randNum = Math.round(randNum);

    	if (randNum <= max && randNum >= min) {
    		return randNum;
    	}

    	return this.randomNum(min, max);
    },

    /*
    * Creates new namespace
    *
    * @param {String} nsstring String representation of the desired namespace.
    * @return {Object} this Returning created namespace object.
    */
    namespace: function (nsstring) {
    	var names = nsstring.split('.'),
    	 parent = {},
       current = parent;

      names.forEach(function (name) {
        current[name] = {};
        current = current[name];
      });

    	return parent;
    }
  };
}());

export default Utils;
