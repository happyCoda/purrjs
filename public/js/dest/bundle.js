(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _purr = require('./modules/purr');

var _purr2 = _interopRequireDefault(_purr);

var _bus = require('./modules/bus');

var _bus2 = _interopRequireDefault(_bus);

var _mistake = require('./modules/mistake');

var _mistake2 = _interopRequireDefault(_mistake);

var _stream = require('./modules/stream');

var _stream2 = _interopRequireDefault(_stream);

var _utils = require('./modules/utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// let bus = new EventBus(),
//   mistake = new Mistake();
//
// bus.on('clak', (data) => {
//   console.log(`clak ${data}`);
// });
//
// bus.emit('clak', 'hello!');
//
// mistake
//   .try(() => {
//     mistake.throw('Gotcha!');
//   })
//   .try(() => {
//     mistake.throw('Another one');
//   })
//   .catch(console.warn);
//
// let codeText = new Stream((...args) => {
//     return document.querySelector(args);
//   }, '.copy')
//   .pipe((el) => {
//     return el.textContent;
//   })
//   .flush();
//
// console.log(codeText);
//
//
// function trimRawStr(rawStr) {
//   return rawStr.trim();
// }
//
// function replaceNewLines(str) {
//   return str.replace('\n', '');
// }
//
// function encodeSpecialChars(str) {
//   return encodeURI(str);
// }
//
// let raw = ' http://wikipedia.org/The\n Great Britain' ;
//
// let clean = new Stream(trimRawStr, raw)
//   .pipe(replaceNewLines)
//   .pipe(encodeSpecialChars)
//   .flush();
//
// console.log(clean);

// new Stream((...list) => {
//   return list.reverse();
// }, 1, 2, 3).pipe((reversed) => {
//   console.log(reversed);
//   return reversed.slice(0, 2);
// }).pipe((sliced) => {
//   console.log(sliced);
//   return sliced.join('#');
// }).pipe((joined) => {
//   console.log(joined);
//   return null;
// });

var o = {
  name: 'Bob',
  rank: 'colonel',
  subordinates: {
    sarge: {
      name: 'Mike',
      rank: 'sergeant'
    }
  },
  wars: ['WWI', 'WWII', 'Vietnam'],
  getName: function getName() {
    console.log(this.name);
  }
};

function fn1() {
  return 2 < 1;
}

function fn2() {
  return 'foo' !== null;
}

function fn3() {
  return false;
}

_utils2.default.mixin(o, { lastName: 'Smith' }, { getLastName: function getLastName() {
    return undefined.lastName;
  } });

console.log(o);

},{"./modules/bus":2,"./modules/mistake":4,"./modules/purr":5,"./modules/stream":6,"./modules/utils":7}],2:[function(require,module,exports){
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

function EventBus() {
  this.lnrs = {};
}

EventBus.prototype = Object.create(EventBus.prototype, {
  on: {
    value: function value(evt, lnr) {
      if (!this.lnrs[evt]) {
        this.lnrs[evt] = [];
      }

      this.lnrs[evt].push(lnr);
    },

    writable: false
  },

  off: {
    value: function value(evt, lnr) {
      if (!this.lnrs[evt]) {
        console.warn("There is no " + evt + " event");
      }

      this.lnrs[evt] = this.lnrs[evt].filter(function (item) {
        return item !== lnr;
      });
    },

    writable: false
  },

  emit: {
    value: function value(evt, data) {
      if (!this.lnrs[evt]) {
        console.warn("There is no listeners for " + evt + " event");
      }
      this.lnrs[evt].forEach(function (lnr) {
        lnr(data);
      });
    },

    writable: false
  }
});

// class EventBus {
//   constructor() {
//     this.lnrs = {};
//   }
//
//   on(evt, lnr) {
//     if (!this.lnrs[evt]) {
//       this.lnrs[evt] = [];
//     }
//
//     this.lnrs[evt].push(lnr);
//   }
//
//   off(evt, lnr) {
//     if (!this.lnrs[evt]) {
//       console.warn(`There is no ${evt} event`);
//     }
//
//     this.lnrs[evt] = this.lnrs[evt].filter((item) => {
//       return item !== lnr;
//     });
//   }
//
//   emit(evt, data) {
//     if (!this.lnrs[evt]) {
//       console.warn(`There is no listeners for ${evt} event`);
//     }
//     this.lnrs[evt].forEach((lnr) => {
//       lnr(data);
//     });
//   }
// }

exports.default = EventBus;

},{}],3:[function(require,module,exports){
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

var _bus = require('./bus');

var _bus2 = _interopRequireDefault(_bus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Mistake() {
  this.bus = new _bus2.default();
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

    writable: false
  },

  catch: {
    value: function value(fn) {
      this.bus.on('mistake', fn);

      return this;
    },

    writable: false
  }
});

// class Mistake {
//   constructor() {
//     this.bus = new EventBus();
//   }
//
//   throw(msg) {
//     throw new Error(msg);
//   }
//
//   try(fn, ...args) {
//     try {
//       fn.apply(null, args);
//     } catch (err) {
//       setTimeout(() => {
//         this.bus.emit('mistake', err);
//       }, 100);
//     }
//
//     return this;
//   }
//
//   catch(fn) {
//     this.bus.on('mistake', fn);
//
//     return this;
//   }
// }

exports.default = Mistake;

},{"./bus":2}],5:[function(require,module,exports){
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /*
                                                                                                                                                          * PurrJS JavaScript library.
                                                                                                                                                          * (c) 2013-2016, happyCoda.
                                                                                                                                                          * MIT License.
                                                                                                                                                          * https://github.com/happyCoda/purrjs
                                                                                                                                                          */

// let Purr = Purr || {};

var Purr = function Purr() {
  _classCallCheck(this, Purr);
};

/*
* @param {}
* @param {}
* @return {}
*/

Purr.util = {};
Purr.array = {};
Purr.string = {};
Purr.object = {};

exports.default = Purr;

},{"./bus":2,"./stream":6,"./utils":7}],6:[function(require,module,exports){
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

function Stream(fn) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  this._fill(fn, args);
}

Stream.prototype = Object.create(Stream.prototype, {
  _fill: {
    value: function value(fn, args) {
      this.flow = fn.apply(null, args);
    },

    writable: false
  },

  pipe: {
    value: function value(fn) {
      this.flow = fn(this.flow);
      return this;
    },

    writable: false
  },

  flush: {
    value: function value(fn) {
      return this.flow;
    },

    writable: false
  },

  refill: {
    value: function value(fn) {
      for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      this._fill(fn, args);
    },

    writable: false
  }
});

// class Stream {
//   constructor(fn, ...args) {
//     this._fill(fn, args);
//   }
//
//   pipe(fn) {
//     this.flow = fn(this.flow);
//     return this;
//   }
//
//   flush() {
//     return this.flow;
//   }
//
//   _fill(fn, args) {
//     this.flow = fn.apply(null, args);
//   }
//
//   refill(fn, ...args) {
//     this._fill(fn, args);
//   }
// }

exports.default = Stream;

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stream = require('./stream');

var _stream2 = _interopRequireDefault(_stream);

var _mistake = require('./mistake');

var _mistake2 = _interopRequireDefault(_mistake);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Utils = function () {

  function _makeArray() {
    var arrayLike = this._stream.flush(),
        arrayLikeType = this.type();

    if (arrayLikeType === 'Array') {
      return arrayLikeType;
    } else if (arrayLikeType === 'Object') {
      return Object.keys(arrayLike).map(function (key) {
        return arrayLike[key];
      });
    } else if (arrayLikeType === 'String') {
      return arrayLikeType.split('');
    } else {
      new _mistake2.default().throw(_config2.default.LIB_ERRORS.OBJECT_OR_ARRAY_OR_STRING);
    }
  }

  function _each(callback) {
    var iterable = this._stream.flush(),
        iterableType = this.type();

    if (iterableType === 'Array') {
      iterable.forEach(callback);
    } else if (iterableType === 'Object') {
      Object.keys(iterable).forEach(function (key) {
        callback(iterable[key], key);
      });
    } else {
      new _mistake2.default().throw(_config2.default.LIB_ERRORS.OBJECT_OR_ARRAY);
    }
  }

  function _reduce() {
    var iterable = this._stream.flush(),
        iterableType = this.type();

    if (iterableType === 'Array') {
      return iterable.reduce.apply(iterable, arguments);
    } else if (iterableType === 'Object') {
      var _makeArray$call;

      // TODO: operates on Array of Object values, keys are missing. refactor this to gain keys
      return (_makeArray$call = _makeArray.call(this)).reduce.apply(_makeArray$call, arguments);
    } else {
      new _mistake2.default().throw(_config2.default.LIB_ERRORS.OBJECT_OR_ARRAY);
    }
  }

  function _filter() {
    var iterable = this._stream.flush(),
        iterableType = this.type();

    if (iterableType === 'Array') {
      return iterable.filter.apply(iterable, arguments);
    } else if (iterableType === 'Object') {
      var _makeArray$call2;

      // TODO: same as reduce
      return (_makeArray$call2 = _makeArray.call(this)).filter.apply(_makeArray$call2, arguments);
    } else {
      new _mistake2.default().throw(_config2.default.LIB_ERRORS.OBJECT_OR_ARRAY);
    }
  }

  function _checkConditions(accumulator, nextCondition) {
    var isAccumulatorFunction = this.take(accumulator).type() === 'Function',
        isNextConditionFunction = this.take(nextCondition).type() === 'Function';

    return {
      conditionX: isAccumulatorFunction ? accumulator() : accumulator,
      conditionY: isNextConditionFunction ? nextCondition() : nextCondition
    };
  }

  function _whenAll(then) {
    var _this = this;

    var conditionList = this._stream.flush(),
        res = undefined;

    res = _reduce.call(this, function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var ckecked = _checkConditions.call.apply(_checkConditions, [_this].concat(args));

      return ckecked.conditionX && ckecked.conditionY;
    });

    if (res) {
      then();
    }
  }

  function _whenAny(then) {
    var _this2 = this;

    var conditionList = this._stream.flush(),
        res = undefined;

    res = _reduce.call(this, function () {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      var ckecked = _checkConditions.call.apply(_checkConditions, [_this2].concat(args));

      return ckecked.conditionX || ckecked.conditionY;
    });

    if (res) {
      then();
    }
  }

  function _whenNone(then) {
    var _this3 = this;

    var conditionList = this._stream.flush(),
        res = undefined;

    res = _reduce.call(this, function () {
      for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      var ckecked = _checkConditions.call.apply(_checkConditions, [_this3].concat(args));

      return !ckecked.conditionX && !ckecked.conditionY;
    });

    if (res) {
      then();
    }
  }

  function _contains(item) {
    var box = this._stream.flush(),
        boxType = this.type(),
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
      new _mistake2.default().throw('Search item must be of type Array or Object, not – ' + boxType);
    }

    return result;
  }

  function _inspect(deeper) {
    var obj = this._stream.flush(),
        objType = this.take(obj).type();
    stringified;

    if (objType === 'Object') {
      stringified = '{';
    } else if (objType === 'Array') {
      stringified = '[';
    } else {
      return obj.toString();
    }

    function callback(objType, val, prop) {
      var propType = this.take(val).type();

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
    _each.call(this, function (val, prop) {
      target[prop] = val;
    });
  }

  function _mixin(target) {
    var _this4 = this;

    _each.call(this, function (mixin) {
      _this4.take(mixin);
      _extend.call(_this4, target);
    }, this);
  }

  function _expose(item, name) {
    var global = this._stream.fluch();

    global.__exposed = global.__exposed || {};
    global.__exposed[name] = item;
  }

  return {
    name: 'Utils',

    take: function take(flow) {
      this._stream = new _stream2.default(function (flow) {
        return flow;
      }, flow);

      return this;
    },
    type: function type() {
      var toStr = Object.prototype.toString,
          something = this._stream && this._stream.flush();

      if (something === undefined) {
        new _mistake2.default().throw(_config2.default.LIB_ERRORS.NO_STREAM);
      }

      return toStr.call(something).replace(/\[|\]/g, '').split(' ')[1];
    },
    size: function size() {
      var somethingType = this.type(),
          something = this._stream.flush();

      if (somethingType === 'String' || somethingType === 'Array') {
        return something.length;
      } else {
        new _mistake2.default().throw(_config2.default.LIB_ERRORS.UNSIZEABLE);
      }
    },
    legacy: function legacy() {
      var something = this._stream.flush();

      return something.constructor ? something.constructor.name : null;
    },
    makeArray: function makeArray(arrayLike) {
      this.take(arrayLike);
      return _makeArray.call(this);
    },
    each: function each(iterable, callback, context, usePrototype) {
      this.take(iterable);
      _each.call(this, callback);
    },
    reduce: function reduce(iterable) {
      this.take(iterable);

      for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        args[_key4 - 1] = arguments[_key4];
      }

      return _reduce.call.apply(_reduce, [this].concat(args));
    },
    filter: function filter(iterable) {
      this.take(iterable);

      for (var _len5 = arguments.length, args = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
        args[_key5 - 1] = arguments[_key5];
      }

      return _filter.call.apply(_filter, [this].concat(args));
    },
    whenAll: function whenAll(conditionList, then) {
      this.take(conditionList);
      _whenAll.call(this, then);
    },
    whenAny: function whenAny(conditionList, then) {
      this.take(conditionList);
      _whenAny.call(this, then);
    },
    whenNone: function whenNone(conditionList, then) {
      this.take(conditionList);
      _whenNone.call(this, then);
    },
    inspect: function inspect(obj, deeper) {
      this.take(obj);
      _inspect.call(this, deeper);
    },
    unique: function unique(nonUnique) {
      var i = 0,
          j = undefined,
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
    contains: function contains(box, item) {
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
    extend: function extend(target, source) {
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
    mixin: function mixin(target) {
      for (var _len6 = arguments.length, args = Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
        args[_key6 - 1] = arguments[_key6];
      }

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
    expose: function expose(global, item, name) {
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
    randomNum: function randomNum(min, max) {

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
    namespace: function namespace(nsstring) {
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
}(); /*
     * UtilsJS JavaScript library.
     * (c) 2016-2017, happyCoda.
     * MIT License.
     * https://github.com/happyCoda/purrjs
     */

exports.default = Utils;

},{"./config":3,"./mistake":4,"./stream":6}]},{},[1]);
