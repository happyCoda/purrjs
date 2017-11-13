/*
* PurrJS JavaScript library.
* (c) 2013-2017, happyCoda.
* MIT License.
* https://github.com/happyCoda/purrjs
*/

// TODO: add methods: where?, whereNot?, reduceRight, now
// TODO: optimize arguments usage (toArray)


let recursionMaxDepth = 9999;

function _checkType(thing) {
  return Object.prototype.toString.call(thing).replace(/\[|\]|object/g, '').trim();
}
function _throwIfNotObjectOrArrayOrString(thing) {
  _throwIfNotOneOfTypes(thing, ['Object', 'Array', 'String']);
}
function _throwIfNotObjectOrArray(thing) {
  _throwIfNotOneOfTypes(thing, ['Object', 'Array']);
}
function _throwIfNotOneOfTypes(thing, types) {
  let thingType = _checkType(thing);

  if (!isOneOfTypes(thing, types)) {
    throw new Error(`this method expects ${types.join(', ')}. ${thingType} given instead.`);
  }
}
function _checkArity(args, arity) {
  return args.length >= arity;
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
function _inspect(collection, deeper) {
  let collectionType = this._checkType(collection);
  let stringified;

  if (collectionType === 'Object') {
    stringified = '{';
  } else if (collectionType === 'Array') {
    stringified = '[';
  } else {
    return collection.toString();
  }

  function callback(collectionType, val, prop) {
    let propType = _getKind.call(this, val);

    if (collectionType === 'Array') {
      if (propType === 'Object' || propType === 'Array') {
        stringified += this.inspect(val, true);
      } else {
        stringified += '"' + val + '", ';
      }
    } else {
      if (propType === 'Object') {
        stringified += '"' + prop + '": ';
        stringified += _inspect(val, true);
      } else if (propType === 'Array') {
        stringified += '"' + prop + '": ';
        stringified += _inspect(val, true);
      } else {
        stringified += '"' + prop + '": "' + val + '", ';
      }
    }
  }
  each(val, callback.bind(this, collectionType));
  stringified = stringified.replace(/(,\s)$/, '');
  stringified += stringified.substr(0, 1) === '{' ? '}' : ']';

  if (deeper) {
    stringified += ', ';
  }

  return stringified;
}

function _setRecursionMaxDepth(value) {
  recursionMaxDepth = value;
}




function isObject(thing) {
  return _checkType(thing) === 'Object';
}
function isArray(thing) {
  return _checkType(thing) === 'Array';
}
function isFunction(thing) {
  return _checkType(thing) === 'Function';
}
function isBoolean(thing) {
  return _checkType(thing) === 'Boolean';
}
function isNumber(thing) {
  return _checkType(thing) === 'Number';
}
function isString(thing) {
  return _checkType(thing) === 'String';
}
function isNull(thing) {
  return _checkType(thing) === 'Null';
}
function isUndefined(thing) {
  return _checkType(thing) === 'Undefined';
}
function isSymbol(thing) {
  return _checkType(thing) === 'Symbol';
}
function is(thing, type) {
  return _checkType(thing) === type;
}
function isOneOfTypes(thing, types) {
  let thingType = _checkType(thing);
  let result = false;

  each(types, (val) => {
    if (val === thingType) {
      result = true;
    }
  });

  return result;
}
function isTruthy(thing) {
  return !isNull(thing) && !isUndefined(thing) && !isEmpty(thing) && thing !== 0 && !isNaN(thing);
}
function isEmpty(thing) {
  _throwIfNotObjectOrArrayOrString(thing);

  let thingType = _checkType(thing);
  let thingTypeLowerCased = thingType.toLowerCase();
  let resultsMap = {
    object() {
      return Object.keys(thing).length === 0;
    },
    array() {
      return thing.length === 0;
    },
    string() {
      return thing === '';
    }
  };

  return resultsMap[thingTypeLowerCased]();
}





function curry(func, arity = 2, context = null) {
  return function (...first) {
    if (!_checkArity(first, arity)) {
      return function (...second) {
        let args = second.concat(first);
        if (!_checkArity(args, arity)) {
          return function (...third) {
            let args = third.concat(first, second);
            if (!_checkArity(args, arity)) {
              return function (...forth) {
                return func.apply(context, forth.concat(first, second, third));
              };
            } else {
              return func.apply(context, args);
            }
          };
        } else {
          return func.apply(context, args);
        }

      };
    }
    return func.apply(context, first);
  };
}

function compose(...args) {
  return (...rest) => {
    return reduce(args, (acc, next) => {
      let currentResult = isFunction(acc) ? acc(...rest) : acc;

      return next(currentResult);
    });
  };
}

function noop(thing) {
  return thing;
}

function each(collection, func) {
  let isObj = isObject(collection);
  let collectionType = _checkType(collection);
  let collectionTypeLowerCased = collectionType.toLowerCase();
  let collectionsMap = {
    object() {
      return Object.keys(collection);
    },
    array() {
      return collection;
    },
    string() {
      return collection.split('');
    }
  };

  if (!collectionsMap[collectionTypeLowerCased]) {
    throw new Error(`this method expects Array, Object or String. ${collectionType} given instead.`);
  }

  let coll = collectionsMap[collectionTypeLowerCased]();
  let i = 0;
  let len = coll.length;

  for (; i < len; i += 1) {
    let current = coll[i];
    let val = isObj ? collection[current] : current;
    let key = isObj ? current : i;
    func(val, key, collection, coll);
  }
}

function map(collection, func) {
  _throwIfNotObjectOrArrayOrString(collection);

  let isObj = isObject(collection);
  let collectionMapped = isObj ? {} : [];

  each(collection, (val, key) => {
    let transformed = func(val, key, collection);
    isObj ? collectionMapped[key] = transformed : collectionMapped.push(transformed);
  });

  if (isString(collection)) {
    collectionMapped = collectionMapped.join('');
  }

  return collectionMapped;
}

function reduce(collection, func, acc) {
  _throwIfNotObjectOrArrayOrString(collection);

  let isObj = isObject(collection);
  let idx = 0;

  each(collection, (val, key, collection, coll) => {
    let next;

    if (!acc) {
      acc = val;
      idx += 1;
    }

    next = isObj ? collection[coll[idx]] : collection[idx];

    if (next) {
      acc = func(acc, next, key, collection);
      idx += 1;
    }
  });

  return acc;
}

function filter(collection, func, reverse = false) {
  _throwIfNotObjectOrArrayOrString(collection);
  _throwIfNotOneOfTypes(func, ['Function', 'Object', 'Array', 'String']);

  let result;
  let action;
  let isObj = isObject(collection);

  if (isObj) {
    result = {};
    action = function (to, from, key) {
      to[key] = from[key];
    };
  } else {
    result = [];
    action = function (to, what) {
      to.push(what);
    };
  }

  each(collection, (val, key) => {
    let funcResult = isFunction(func) ? func(val, key, collection) : (() => {
      let isObj = isObject(func);
      let funcKey = isObj ? Object.keys(func)[0] : func[0];

      return isObj ? func[funcKey] === val[funcKey] : func[1] === val[funcKey];
    })();
    let condition = reverse ? !funcResult : funcResult;

    if (condition) {
      isObj ? action(result, collection, key) : action(result, val);
    }
  });

  if (isString(collection)) {
    result = result.join('');
  }

  return result;
}

function reject(collection, func) {
  return filter(collection, func, true);
}

function all(collection, func) {
  let filtered = filter(collection, func);

  return filtered.length === collection.length;
}

function any(collection, func) {
  let filtered = filter(collection, func);

  return filtered.length > 0;
}

function times(num, func) {
  _throwIfNotOneOfTypes(num, ['Number']);
  _throwIfNotOneOfTypes(func, ['Function']);
  each(new Array(num), func);
}

function find(collection, func) {
  _throwIfNotObjectOrArray(collection);
  return filter(collection, func)[0];
}

function contains(collection, valOrKey) {
  _throwIfNotObjectOrArrayOrString(collection);

  let collectionTypeLowerCased = _checkType(collection).toLowerCase();
  let resultsMap = {
    object() {
      return valOrKey in collection;
    },
    array: () => {
      let filtered = filter(collection, (item, key) => {
        return item === valOrKey;
      });

      return filtered.length > 0 ? true : false;
    },
    string() {
      return collection.includes(valOrKey);
    }
  };

  let result = resultsMap[collectionTypeLowerCased]();

  return resultsMap[collectionTypeLowerCased]();
}

function destroy(collection, key) {
  _throwIfNotOneOfTypes(collection, ['Object']);
  _throwIfNotOneOfTypes(key, ['String']);
  delete collection[key];
  return !collection[key] ? true : false;
}

function groupBy(collection, criteria) {
  _throwIfNotObjectOrArrayOrString(collection);

  let result = reduce(collection, (acc, next) => {
    let criteriaKey = next[criteria];

    if (criteriaKey) {
      if (!acc[criteriaKey]) {
        acc[criteriaKey] = [];
      }

      acc[criteriaKey].push(next);
    }

    return acc;
  }, {});

  return result;
}

function orderBy(collection, criteria, direction) {
  _throwIfNotOneOfTypes(collection, ['Array']);

  let result = collection.sort((a, b) => {
    if (a[criteria] >= b[criteria]) {
      return direction === 'asc' ? 1 : -1;
    }

    return direction === 'asc' ? -1 : 1;
  });

  return result;
}

function uniq(collection) {
  _throwIfNotOneOfTypes(collection, ['Array']);

  let result = reduce(collection, (acc, next) => {
    if (!contains(acc, next)) {
      acc.push(next);
    }
    return acc;
  }, []);

  return result;
}

function toArray(arrayLike) {
  let result = Array.prototype.slice.call(arrayLike);

  if (result.length === 0 && isObject(arrayLike)) {
    result = reduce(arrayLike, (acc, next) => {
      acc.push(next);
      return acc;
    }, []);
  }

  return result;
}

function debounce(fn, wait = 200, asap = false) {
  let timeout;

  return function (...args) {
    let context = this;
    let defer = function () {
      timeout = null;

      if (!asap) {
        fn.apply(context, args);
      }
    };
    let callNow = asap && !timeout;

    clearTimeout(timeout);
    timeout = setTimeout(defer, wait);

    if (callNow) {
      fn.apply(context, args);
    }
  };
}

function pluck(collection, key) {
  _throwIfNotOneOfTypes(collection, ['Array', 'Object']);

  let result;

  if (isArray(collection)) {
    result = map(collection, (val) => {
      return val[key];
    });
  } else {
    result = filter(collection, (val, valKey) => {
      return valKey === key;
    });
    result = [result[key]];
  }

  return result;
}

function omit(obj, key) {
  _throwIfNotOneOfTypes(key, ['Array', 'String']);

  if (isArray(key)) {
    each(key, (val) => {
      if (obj.hasOwnProperty(val)) {
        delete obj[val];
      }
    });
  } else {
    delete obj[key];
  }

  return obj;
}

function extend(collection, source) {
  each(source, (val, key) => {
    let propType = _checkType(val);

    if (propType === 'Array') {
      collection[key] = [];
      extend(collection[key], val);
    } else if (propType === 'Object') {
      collection[key] = {};
      extend(collection[key], val);
    } else {
      collection[key] = val;
    }
  });

  return collection;
}

function clone(collection) {
  _throwIfNotOneOfTypes(collection, ['Array', 'Object']);

  let clone;

  if (isArray(collection)) {
    clone = [];
  } else {
    clone = {};
  }

  return extend(clone, collection);
}

function mixin(collection, ...sources) {
  let args = toArray(arguments);

  each(args, (val, key) => {
    _throwIfNotOneOfTypes(val, ['Object']);

    if (key > 0) {
      extend(collection, val);
    }
  });

  return collection;
}

function chunk(collection, size, start = 0) {
  _throwIfNotOneOfTypes(collection, ['Array', 'String']);

  let end = start + size;

  if (end > collection.length) {
    throw new Error('Chunk is out of range');
  }

  return start ? collection.slice(start, end) : collection.slice(0, end);
}

function size(collection) {
  _throwIfNotOneOfTypes(collection, ['Array', 'String']);
  return collection.length;
}

function walk(collection, func, parent = null, depth = 0) {
  if (depth > recursionMaxDepth) {
    console.warn(`Maximum recusion call depth is set to ${recursionMaxDepth}, yours is ${depth}. You can reset it via purr._setRecursionMaxDepth(value)`);
    return false;
  }
  _throwIfNotOneOfTypes(collection, ['Array', 'Object']);
  each(collection, (val, key) => {
    if (isOneOfTypes(val, ['Array', 'Object'])) {
      walk(val, func, collection, depth + 1);
    }

    func(val, key, collection);
  });
}

function flatten(collection) {
  _throwIfNotOneOfTypes(collection, ['Array']);

  let flatArr = [];

  walk(collection, (val, key, parent) => {
    if (!isArray(val) && !isObject(parent)) {
      flatArr.push(val);
    }
  }, null, 0);

  return flatArr;
}

function inject(obj, stuff) {
  _throwIfNotOneOfTypes(stuff, ['Array', 'String']);

  if (isArray(stuff)) {
    each(stuff, function (val) {
      mixin(obj, { [val]: this[val] });
    });
  } else {
    mixin(obj, { [stuff]: this[stuff] });
  }

  return obj;
}

function namespace(parent = {}, nsstring) {
  let names = nsstring.split('.');
  let current = parent;

  each(names, (name) => {
    current[name] = {};
    current = current[name];
  });

  return parent;
}

function ensureImplements(obj, methods) {
  _throwIfNotOneOfTypes(obj, ['Object']);
  _throwIfNotOneOfTypes(methods, ['Array', 'String']);

  if (isArray(methods)) {
    return all(methods, (name) => {
      return name in obj;
    });
  }

  return methods in obj;
}

/*
* Generates random number
*
* @param {Number} min Minimum number boundary.
* @param {Number} max Maximum number boundary.
* @return {Number} randNum Random number generated.
*/
function randomNum(min, max) {
  let randNum = Math.random() * ((min + max) / 2);

  randNum = Math.round(randNum);

  if (randNum <= max && randNum >= min) {
    return randNum;
  }

  return this.randomNum(min, max);
}

let purr = {};

purr.curry = curry;
purr.compose = compose;
purr.noop = curry(noop, 1);
purr.each = curry(each);
purr.map = curry(map);
purr.reduce = curry(reduce, 3);
purr.filter = curry(filter, 3);
purr.reject = curry(reject);
purr.all = curry(all);
purr.any = curry(any);
purr.times = curry(times);
purr.find = curry(find);
purr.isObject = curry(isObject, 1);
purr.isArray = curry(isArray, 1);
purr.isFunction = curry(isFunction, 1);
purr.isBoolean = curry(isBoolean, 1);
purr.isNumber = curry(isNumber, 1);
purr.isString = curry(isString, 1);
purr.isNull = curry(isNull, 1);
purr.isUndefined = curry(isUndefined, 1);
purr.isSymbol = curry(isSymbol, 1);
purr.is = curry(is, 1);
purr.isOneOfTypes = curry(isOneOfTypes, 1);
purr.isTruthy = curry(isTruthy, 1);
purr.isEmpty = curry(isEmpty, 1);
purr.contains = curry(contains);
purr.destroy = curry(destroy);
purr.groupBy = curry(groupBy);
purr.orderBy = curry(orderBy, 3);
purr.uniq = curry(uniq, 1);
purr.toArray = curry(toArray, 1);
purr.debounce = curry(debounce, 3);
purr.pluck = curry(pluck);
purr.omit = curry(omit);
purr.extend = curry(extend);
purr.clone = curry(clone, 1);
purr.mixin = curry(mixin);
purr.chunk = curry(chunk, 3);
purr.size = curry(size, 1);
purr.walk = curry(walk, 4);
purr.flatten = curry(flatten, 1);
purr.inject = curry(inject, 2, purr);
purr.ensureImplements = curry(ensureImplements);
purr.namespace = curry(namespace);
purr.randomNum = curry(randomNum);
purr._checkType = _checkType;
purr._throwIfNotObjectOrArrayOrString = _throwIfNotObjectOrArrayOrString;
purr._throwIfNotObjectOrArray = _throwIfNotObjectOrArray;
purr._throwIfNotOneOfTypes = _throwIfNotOneOfTypes;
purr._expose = _expose;
purr._inspect = _inspect;
purr._setRecursionMaxDepth = _setRecursionMaxDepth;

export default purr;
