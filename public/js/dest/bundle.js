(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _purr = require('./purr');

var _purr2 = _interopRequireDefault(_purr);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log((0, _purr2.default)('hello').pipe(function (data) {
  return data.toUpperCase();
}).flush());

(0, _purr2.default)().emit('ololo', 'yuck!');

},{"./purr":8}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mistake = require('./mistake');

var _mistake2 = _interopRequireDefault(_mistake);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function EventBus() {
  if (!(this instanceof EventBus)) {
    return new EventBus();
  }
  this.lnrs = {};
} /*
  * PurrJS JavaScript library.
  * (c) 2017, happyCoda.
  * MIT License.
  * https://github.com/happyCoda/purrjs
  */

EventBus.prototype = Object.create(EventBus.prototype, {
  on: {
    value: function value(evt, lnr) {
      if (!this.lnrs) {
        this.lnrs = {};
      }
      if (!this.lnrs[evt]) {
        this.lnrs[evt] = [];
      }

      this.lnrs[evt].push(lnr);
    },

    enumerable: true,
    writable: false
  },

  off: {
    value: function value(evt, lnr) {
      if (!this.lnrs) {
        this.lnrs = {};
      }
      if (!this.lnrs[evt]) {
        return (0, _mistake2.default)().warn('There is no ' + evt + ' event');
      }

      this.lnrs[evt] = this.lnrs[evt].filter(function (item) {
        return item !== lnr;
      });
    },

    enumerable: true,
    writable: false
  },

  emit: {
    value: function value(evt, data) {
      if (!this.lnrs) {
        this.lnrs = {};
      }
      if (!this.lnrs[evt]) {
        return (0, _mistake2.default)().warn('There is no listeners for ' + evt + ' event');
      }
      this.lnrs[evt].forEach(function (lnr) {
        lnr(data);
      });
    },

    enumerable: true,
    writable: false
  }
});

exports.default = EventBus;

},{"./mistake":5}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/*
* PurrJS JavaScript library.
* (c) 2017, happyCoda.
* MIT License.
* https://github.com/happyCoda/purrjs
*/

var CONFIG = {
  LIB_ERRORS: {
    NO_STREAM: 'There is no stream to work with, try to create one first',
    UNSIZEABLE: 'You are trying to get size of something than does not have one',
    OBJECT_OR_ARRAY: 'Input must be an Object, Array',
    OBJECT_OR_ARRAY_OR_STRING: 'Input must be an Object, Array or a String'
  }
};

exports.default = CONFIG;

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

var _stream = require('./stream');

var _stream2 = _interopRequireDefault(_stream);

var _bus = require('./bus');

var _bus2 = _interopRequireDefault(_bus);

var _mistake = require('./mistake');

var _mistake2 = _interopRequireDefault(_mistake);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
* PurrJS JavaScript library.
* (c) 2017, happyCoda.
* MIT License.
* https://github.com/happyCoda/purrjs
*/

function Core() {
  if (!(this instanceof Core)) {
    return new Core();
  }
}

Core.prototype = (0, _stream2.default)(Core.prototype).pipe(function (_pr) {
  return Object.create(_pr, {
    /*
    * Creates new namespace
    *
    * @param {String} nsstring String representation of the desired namespace.
    * @return {Object} this Returning created namespace object.
    */
    namespace: {
      value: function value(nsstring) {
        var names = nsstring.split('.'),
            parent = {},
            current = parent;

        names.forEach(function (name) {
          current[name] = {};
          current = current[name];
        });

        return parent;
      },

      enumerable: true,
      writable: false
    },

    checkConditions: {
      value: function value(accumulator, nextCondition) {
        var isAccumulatorFunction = this.getKind(accumulator) === 'Function',
            isNextConditionFunction = this.getKind(nextCondition) === 'Function';

        return {
          conditionX: isAccumulatorFunction ? accumulator() : accumulator,
          conditionY: isNextConditionFunction ? nextCondition() : nextCondition
        };
      },

      enumerable: true,
      writable: false
    },

    whenAll: {
      value: function value(conditionList, then) {
        var _this = this;

        var res = void 0;

        res = this.reduce(conditionList, function () {
          var ckecked = _this.checkConditions.apply(_this, arguments);

          return ckecked.conditionX && ckecked.conditionY;
        });

        if (res) {
          then();
        }
      },

      enumerable: true,
      writable: false
    },

    whenAny: {
      value: function value(conditionList, then) {
        var _this2 = this;

        var res = void 0;

        res = this.reduce(conditionList, function () {
          var ckecked = _this2.checkConditions.apply(_this2, arguments);

          return ckecked.conditionX || ckecked.conditionY;
        });

        if (res) {
          then();
        }
      },

      enumerable: true,
      writable: false
    },

    whenNone: {
      value: function value(conditionList, then) {
        var _this3 = this;

        var res = void 0;

        res = this.reduce(conditionList, function () {
          var ckecked = _this3.checkConditions.apply(_this3, arguments);

          return !ckecked.conditionX && !ckecked.conditionY;
        });

        if (res) {
          then();
        }
      },

      enumerable: true,
      writable: false
    }
  });
}).pipe(function (_pr) {
  _utils2.default.mixin(_pr, _utils2.default, _stream2.default.prototype, _bus2.default.prototype, _mistake2.default.prototype);
  return _pr;
}).flush();

exports.default = Core;

},{"./bus":2,"./mistake":5,"./stream":6,"./utils":7}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bus = require('./bus');

var _bus2 = _interopRequireDefault(_bus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Mistake() {
  if (!(this instanceof Mistake)) {
    return new Mistake();
  }
  this.bus = (0, _bus2.default)();
} /*
  * PurrJS JavaScript library.
  * (c) 2017, happyCoda.
  * MIT License.
  * https://github.com/happyCoda/purrjs
  */

Mistake.prototype = Object.create(Mistake.prototype, {
  throw: {
    value: function value(msg) {
      throw new Error(msg);
    },

    enumerable: true,
    writable: false
  },

  warn: {
    value: function value(msg) {
      console.warn(msg);
    },

    enumerable: true,
    writable: false
  },

  try: {
    value: function value(fn) {
      var _this = this;

      try {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        fn.apply(null, args);
      } catch (err) {
        setTimeout(function () {
          _this.bus.emit('mistake', err);
        }, 100);
      }

      return this;
    },

    enumerable: true,
    writable: false
  },

  catch: {
    value: function value(fn) {
      this.bus.on('mistake', fn);

      return this;
    },

    enumerable: true,
    writable: false
  }
});

exports.default = Mistake;

},{"./bus":2}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/*
* PurrJS JavaScript library.
* (c) 2017, happyCoda.
* MIT License.
* https://github.com/happyCoda/purrjs
*/

function Stream(data) {
  if (!(this instanceof Stream)) {
    return new Stream(data);
  }
  this._fill(data);
}

Stream.prototype = Object.create(Stream.prototype, {
  _fill: {
    value: function value(data) {
      this.flow = data;
      return this;
    },

    enumerable: true,
    writable: false
  },

  pipe: {
    value: function value(fn) {
      this.flow = fn(this.flow);
      return this;
    },

    enumerable: true,
    writable: false
  },

  flush: {
    value: function value() {
      return this.flow;
    },

    enumerable: true,
    writable: false
  },

  refill: {
    value: function value(data) {
      return this._fill(data);
    },

    enumerable: true,
    writable: false
  }
});

exports.default = Stream;

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stream = require('./stream');

var _stream2 = _interopRequireDefault(_stream);

var _bus = require('./bus');

var _bus2 = _interopRequireDefault(_bus);

var _mistake = require('./mistake');

var _mistake2 = _interopRequireDefault(_mistake);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
* PurrJS JavaScript library.
* (c) 2016-2017, happyCoda.
* MIT License.
* https://github.com/happyCoda/purrjs
*/

var Utils = function () {

  // let _bus = EventBus();

  function _getKind(thing) {
    var toStr = Object.prototype.toString;

    if (thing === undefined) {
      (0, _mistake2.default)().throw(_config2.default.LIB_ERRORS.NO_STREAM);
    }

    return toStr.call(thing).replace(/\[|\]/g, '').split(' ')[1];
  }

  function _size(something) {
    var somethingType = _getKind.call(this, something);

    if (somethingType === 'String' || somethingType === 'Array') {
      return something.length;
    } else {
      (0, _mistake2.default)().throw(_config2.default.LIB_ERRORS.UNSIZEABLE);
    }
  }

  function _legacy(something) {
    return something.constructor ? something.constructor.name : null;
  }

  function _makeArray(arrayLike) {
    var arrayLikeType = _getKind.call(this, arrayLike);

    if (arrayLikeType === 'Array') {
      return arrayLikeType;
    } else if (arrayLikeType === 'Object') {
      return Object.keys(arrayLike).map(function (key) {
        return arrayLike[key];
      });
    } else if (arrayLikeType === 'String') {
      return arrayLikeType.split('');
    } else {
      (0, _mistake2.default)().throw(_config2.default.LIB_ERRORS.OBJECT_OR_ARRAY_OR_STRING);
    }
  }

  function _each(iterable, callback) {
    var iterableType = _getKind.call(this, iterable);

    if (iterableType === 'Array') {
      iterable.forEach(callback);
    } else if (iterableType === 'Object') {
      Object.keys(iterable).forEach(function (key) {
        callback(iterable[key], key);
      });
    } else {
      (0, _mistake2.default)().throw(_config2.default.LIB_ERRORS.OBJECT_OR_ARRAY);
    }
  }

  function _reduce(iterable) {
    var iterableType = _getKind.call(this, iterable);

    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    if (iterableType === 'Array') {
      return iterable.reduce.apply(iterable, args);
    } else if (iterableType === 'Object') {
      var _makeArray$call;

      // TODO: operates on Array of Object values, keys are missing. refactor this to gain keys
      return (_makeArray$call = _makeArray.call(this, iterable)).reduce.apply(_makeArray$call, args);
    } else {
      (0, _mistake2.default)().throw(_config2.default.LIB_ERRORS.OBJECT_OR_ARRAY);
    }
  }

  function _filter(iterable) {
    var iterableType = _getKind.call(this, iterable);

    for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    if (iterableType === 'Array') {
      return iterable.filter.apply(iterable, args);
    } else if (iterableType === 'Object') {
      var _makeArray$call2;

      // TODO: same as reduce
      return (_makeArray$call2 = _makeArray.call(this, iterable)).filter.apply(_makeArray$call2, args);
    } else {
      (0, _mistake2.default)().throw(_config2.default.LIB_ERRORS.OBJECT_OR_ARRAY);
    }
  }

  function _contains(box, item) {
    var boxType = _getKind.call(this, box),
        result = false;

    if (boxType === 'Array') {
      if (box.indexOf(item) !== -1) {
        result = true;
      }
    } else if (boxType === 'Object') {
      // TODO: make search in objects deep
      for (var prop in box) {
        if (box[prop] === item) {
          result = true;
          break;
        }
      }
    } else {
      (0, _mistake2.default)().throw('Search item must be of type Array or Object, not – ' + boxType);
    }

    return result;
  }

  function _inspect(obj, deeper) {
    var objType = _getKind.call(this, obj),
        stringified = void 0;

    if (objType === 'Object') {
      stringified = '{';
    } else if (objType === 'Array') {
      stringified = '[';
    } else {
      return obj.toString();
    }

    function callback(objType, val, prop) {
      var propType = _getKind.call(this, val);

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
    _each.call(this, source, function (val, prop) {
      target[prop] = val;
    });
  }

  function _mixin(target) {
    var _this = this;

    for (var _len3 = arguments.length, sources = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      sources[_key3 - 1] = arguments[_key3];
    }

    _each.call(this, sources, function (mixin) {
      _extend.call(_this, target, mixin);
    });
  }

  function _expose(global, item, name) {
    global.__exposed = global.__exposed || {};
    global.__exposed[name] = item;
  }

  return Object.defineProperties({}, {
    name: {
      value: 'Utils',
      enumerable: true,
      writable: false
    },

    take: {
      value: function value(flow) {
        this._stream = (0, _stream2.default)(flow);

        return this;
      },

      enumerable: true,
      writable: false
    },

    getKind: {
      value: function value(thing) {
        _getKind.call(this, thing);
      },

      enumerable: true,
      writable: false
    },

    size: {
      value: function value(something) {
        _size.call(this, something);
      },

      enumerable: true,
      writable: false
    },

    legacy: {
      value: function value(something) {
        _legacy.call(this, something);
      },

      enumerable: true,
      writable: false
    },

    makeArray: {
      value: function value(arrayLike) {
        return _makeArray.call(this, arrayLike);
      },

      enumerable: true,
      writable: false
    },

    each: {
      value: function value(iterable, callback) {
        _each.call(this, iterable, callback);
      },

      enumerable: true,
      writable: false
    },

    reduce: {
      value: function value(iterable) {
        for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
          args[_key4 - 1] = arguments[_key4];
        }

        return _reduce.call.apply(_reduce, [this, iterable].concat(args));
      },

      enumerable: true,
      writable: false
    },

    filter: {
      value: function value(iterable) {
        for (var _len5 = arguments.length, args = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
          args[_key5 - 1] = arguments[_key5];
        }

        return _filter.call.apply(_filter, [this, iterable].concat(args));
      },

      enumerable: true,
      writable: false
    },

    inspect: {
      value: function value(obj, deeper) {
        return _inspect.call(this, obj, deeper);
      },

      enumerable: true,
      writable: false
    },

    unique: {
      value: function value(nonUnique) {
        var i = 0,
            j = void 0,
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
      value: function value(box, item) {
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
      value: function value(target, source) {
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
      value: function value(target) {
        for (var _len6 = arguments.length, sources = Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
          sources[_key6 - 1] = arguments[_key6];
        }

        _mixin.call.apply(_mixin, [this, target].concat(sources));
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
      value: function value(global, item, name) {
        _expose.call(this, global, item, name);
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
      value: function value(min, max) {
        var randNum = Math.random() * max;

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
}();

exports.default = Utils;

},{"./bus":2,"./config":3,"./mistake":5,"./stream":6}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _core = require('./modules/core');

var _core2 = _interopRequireDefault(_core);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Purr(data) {
  if (!(this instanceof Purr)) {
    return new Purr(data);
  }

  this._fill(data);
} /*
  * PurrJS JavaScript library.
  * (c) 2013-2016, happyCoda.
  * MIT License.
  * https://github.com/happyCoda/purrjs
  */

(0, _core2.default)().mixin(Purr.prototype, _core2.default.prototype);

exports.default = Purr;

},{"./modules/core":4}]},{},[1]);
