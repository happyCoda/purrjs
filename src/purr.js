/*
* PurrJS JavaScript library.
* (c) 2013-2017, happyCoda.
* MIT License.
* https://github.com/happyCoda/purrjs
*/

let recursionMaxDepth = 6000;
/**
* Checks entity's type
*
* @param {Any} thing Entity to check type for
* @return {Boolean} true or false
*/
function _checkType(thing) {
  return Object.prototype.toString.call(thing).replace(/\[|\]|object/g, '').trim();
}
/**
* Throws if entity is not Object, Array or String. Wrapper method over _throwIfNotOneOfTypes
*
* @param {Any} thing Entity to check type for
*/
function _throwIfNotObjectOrArrayOrString(thing) {
  _throwIfNotOneOfTypes(thing, ['Object', 'Array', 'String']);
}
/**
* Throws if entity is not Object or Array. Wrapper method over _throwIfNotOneOfTypes
*
* @param {Any} thing Entity to check type for
*/
function _throwIfNotObjectOrArray(thing) {
  _throwIfNotOneOfTypes(thing, ['Object', 'Array']);
}
/**
* Throws if entity is not of one of types provided
*
* @param {Any} thing Entity to check type for
* @param {Array} types Array of types to check against
*/
function _throwIfNotOneOfTypes(thing, types) {
  let thingType = _checkType(thing);

  if (!isOneOfTypes(thing, types)) {
    _throwWrongType(types.join(', '), thingType);
  }
}
/**
* Throws exception with given explanations
*
* @param {String} expected Expected type(s)
* @param {String} given Type provided
*/
function _throwWrongType(expected, given) {
  throw new Error(`this method expects ${expected}. ${given} given instead.`);
}
/**
* Checks if args given fits arity provided
*
* @param {Array} args Arguments array
* @param {Number} arity Arity of a function
* @return {Boolean} true or false
*/
function _checkArity(args, arity) {
  return args.length >= arity;
}
/**
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
/**
* Inspects objects
*
* @param {Object} collection Can be array or object
* @param {Boolean} deeper Wether we need trailing coma
* @return {String} stringified Stringified collection representation
*/
function _inspect(collection, deeper) {
  let collectionType = _checkType(collection);
  let stringified;

  if (collectionType === 'Object') {
    stringified = '{';
  } else if (collectionType === 'Array') {
    stringified = '[';
  } else {
    return collection.toString();
  }

  function callback(collectionType) {
    return function (val, prop) {
      let propType = _checkType(val);

      if (collectionType === 'Array') {
        if (propType === 'Object' || propType === 'Array') {
          stringified += _inspect(val, true);
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
    };
  }
  each(val, callback(collectionType));
  stringified = stringified.replace(/(,\s)$/, '');
  stringified += stringified.substr(0, 1) === '{' ? '}' : ']';

  if (deeper) {
    stringified += ', ';
  }

  return stringified;
}
/**
* Sets maximum recursion depth (useful for walk method)
*
* @param {Number} value New recursion depth
*/
function _setRecursionMaxDepth(value) {
  recursionMaxDepth = value;
}



/**
* Checks if entity is an Object
*
* @param {Any} thing Entity to check type for
* @return {Boolean} true or false
*/
function isObject(thing) {
  return _checkType(thing) === 'Object';
}
/**
* Checks if entity is an Array
*
* @param {Any} thing Entity to check type for
* @return {Boolean} true or false
*/
function isArray(thing) {
  return _checkType(thing) === 'Array';
}
/**
* Checks if entity is an Function
*
* @param {Any} thing Entity to check type for
* @return {Boolean} true or false
*/
function isFunction(thing) {
  return _checkType(thing) === 'Function';
}
/**
* Checks if entity is an Boolean
*
* @param {Any} thing Entity to check type for
* @return {Boolean} true or false
*/
function isBoolean(thing) {
  return _checkType(thing) === 'Boolean';
}
/**
* Checks if entity is an Number
*
* @param {Any} thing Entity to check type for
* @return {Boolean} true or false
*/
function isNumber(thing) {
  return _checkType(thing) === 'Number';
}
/**
* Checks if entity is an String
*
* @param {Any} thing Entity to check type for
* @return {Boolean} true or false
*/
function isString(thing) {
  return _checkType(thing) === 'String';
}
/**
* Checks if entity is an Null
*
* @param {Any} thing Entity to check type for
* @return {Boolean} true or false
*/
function isNull(thing) {
  return _checkType(thing) === 'Null';
}
/**
* Checks if entity is an Undefined
*
* @param {Any} thing Entity to check type for
* @return {Boolean} true or false
*/
function isUndefined(thing) {
  return _checkType(thing) === 'Undefined';
}
/**
* Checks if entity is an Symbol
*
* @param {Any} thing Entity to check type for
* @return {Boolean} true or false
*/
function isSymbol(thing) {
  return _checkType(thing) === 'Symbol';
}
/**
* Checks if entity has a given type
*
* @param {Any} thing Entity to check type for
* @param {String} type Entity's type to check against
* @return {Boolean} true or false
*/
function is(thing, type) {
  return _checkType(thing) === type;
}
/**
* Checks if entity has one of the given types
*
* @param {Any} thing Entity to check type for
* @param {Array} types Entity's types to check against
* @return {Boolean} true or false
*/
function isOneOfTypes(thing, types) {
  let thingType = _checkType(thing);
  let result = false;

  for (let type of types) {
    if (type === thingType) {
      result = true;
      break;
    }
  }
  return result;
}
/**
* Checks if entity has a truthy value
*
* @param {Any} thing Entity to check
* @return {Boolean} true or false
*/
function isTruthy(thing) {
  return !isNull(thing) && !isUndefined(thing) && !isEmpty(thing) && thing !== 0 && !isNaN(thing);
}
/**
* Checks if entity has an empty value ('', [], {})
*
* @param {Any} thing Entity to check
* @return {Boolean} true or false
*/
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
/**
* Performs function currying
*
* @param {Function} func Function to curry
* @param {Number} arity Number of arguments curried function expected
* @param {Object} context Context to apply curried function on
* @return {Function|Any} Returns curried function
*/
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
/**
* Composed functions
*
* @param {...*} args Functions to compose
* @return {Function} Curried function
*/
function compose(...args) {
  return (...rest) => {
    return reduce(args, (acc, next) => {
      let currentResult = isFunction(acc) ? acc(...rest) : acc;

      return next(currentResult);
    });
  };
}
/**
* Function placeholder in case you need some callback. Simply returns given value
*
* @param {Any} thing Some argument
* @return {Any} thing Some argument
*/
function noop(thing) {
  return thing;
}
/**
* Iterates over collection and calls callback on every iteration
*
* @param {Arrray|Object|String} collection Collection to iterate over
* @param {Function} func Callback function to to call
*/
function each(collection, func) {
  _throwIfNotObjectOrArrayOrString(collection);
  _throwIfNotOneOfTypes(func, ['Function']);

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
/**
* Iterates over collection and calls callback on every iteration
*
* @param {Arrray|Object|String} collection Collection to iterate over
* @param {Function} func Callback function to call
* @return {Arrray|Object|String} collectionMapped New mapped collection
*/
function map(collection, func) {
  _throwIfNotObjectOrArrayOrString(collection);
  _throwIfNotOneOfTypes(func, ['Function']);

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
/**
* Reduces collection to single value
*
* @param {Arrray|Object|String} collection Collection to reduce
* @param {Function} func Callback function to call
* @param {Any} acc Some initial accumulator value
* @return {Any} acc Reduced value
*/
function reduce(collection, func, acc) {
  _throwIfNotObjectOrArrayOrString(collection);
  _throwIfNotOneOfTypes(func, ['Function']);

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
/**
* Filter collection by criteria
*
* @param {Arrray|Object|String} collection Collection to filter
* @param {Function|Array|Object} func Callback function to call
* @param {Boolean} reverse Determines whether filter should invert condition
* @return {Arrray|Object|String} result Filtered collection
*/
function filter(collection, func, reverse = false) {
  _throwIfNotObjectOrArrayOrString(collection);
  _throwIfNotOneOfTypes(func, ['Function', 'Object', 'Array']);

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
/**
* Reject collection's items by criteria
*
* @param {Arrray|Object|String} collection Collection to reject
* @param {Function|Array|Object} func Callback function to call
* @return {Arrray|Object|String} Rejected collection
*/
function reject(collection, func) {
  _throwIfNotObjectOrArrayOrString(collection);
  _throwIfNotOneOfTypes(func, ['Function', 'Array', 'Object']);

  return filter(collection, func, true);
}
/**
* Checks if all collection's items fit criteria
*
* @param {Arrray|Object|String} collection Collection to check
* @param {Function} func Callback function to call
* @return {Arrray|Object|String} Checked collection
*/
function all(collection, func) {
  _throwIfNotObjectOrArrayOrString(collection);
  _throwIfNotOneOfTypes(func, ['Function', 'Array', 'Object']);

  let filtered = filter(collection, func);

  return filtered.length === collection.length;
}
/**
* Checks if any collection's items fit criteria
*
* @param {Arrray|Object|String} collection Collection to check
* @param {Function} func Callback function to call
* @return {Arrray|Object|String} Checked collection
*/
function any(collection, func) {
  _throwIfNotObjectOrArrayOrString(collection);
  _throwIfNotOneOfTypes(func, ['Function', 'Array', 'Object']);

  let filtered = filter(collection, func);

  return filtered.length > 0;
}
/**
* Calls the function a specified number of times
*
* @param {Number} num Number of times to call the function
* @param {Function} func Callback function to call
*/
function times(num, func) {
  _throwIfNotOneOfTypes(num, ['Number']);
  _throwIfNotOneOfTypes(func, ['Function']);
  each(new Array(num), func);
}
/**
* Searches element in collection
*
* @param {Arrray|Object|String} collection Collection to check
* @param {Function|Array|Object} func Iteratee for checking
* @return {Arrray|Object|Undefined} Value found or undefined
*/
function find(collection, func) {
  _throwIfNotObjectOrArray(collection);
  _throwIfNotOneOfTypes(func, ['Function', 'Array', 'Object']);
  return filter(collection, func)[0];
}
/**
* Checks if element is in collection
*
* @param {Arrray|Object|String} collection Collection to check
* @param {Number|String} valOrKey Value for checking
* @return {Boolean} true or false
*/
function contains(collection, valOrKey) {
  _throwIfNotObjectOrArrayOrString(collection);
  _throwIfNotOneOfTypes(valOrKey, ['Number', 'String']);

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
/**
* Deletes property from collection
*
* @param {Arrray|Object|String} collection Collection to operate
* @param {String} key Property to delete
* @return {Boolean} true or false
*/
function destroy(collection, key) {
  _throwIfNotOneOfTypes(collection, ['Object']);
  _throwIfNotOneOfTypes(key, ['String']);
  delete collection[key];
  return !collection[key] ? true : false;
}
/**
* Group collection's elements by given criteria
*
* @param {Object} collection Collection to operate
* @param {String} criteria Property to order collection by
* @return {Object} result Groupped collection
*/
function groupBy(collection, criteria) {
  _throwIfNotOneOfTypes(collection, ['Array', 'Object']);
  _throwIfNotOneOfTypes(criteria, ['String']);

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
/**
* Order collection's elements by given criteria and direction
*
* @param {Array} collection Collection to operate
* @param {String} criteria Property to order collection by
* @param {String} direction Ascendant or Descendant
* @return {Array} result Ordered collection
*/
function orderBy(collection, criteria, direction) {
  _throwIfNotOneOfTypes(collection, ['Array']);
  _throwIfNotOneOfTypes(criteria, ['String']);
  _throwIfNotOneOfTypes(direction, ['String']);

  let result = collection.sort((a, b) => {
    if (a[criteria] >= b[criteria]) {
      return direction === 'asc' ? 1 : -1;
    }

    return direction === 'asc' ? -1 : 1;
  });

  return result;
}
/**
* Drops all collection's duplicates
*
* @param {Array} collection Collection to operate
* @return {Object} result Unique collection
*/
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
/**
* Converts array like structures to array
*
* @param {Object} arrayLike Array like to convert
* @return {Array} result Converted value
*/
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
/**
* Creates debounced version of the function given
*
* @param {Function} fn The function to debounce
* @param {Number} wait Timeout value
* @param {Boolean} asap Whether function shuld be called immediately
* @return {Function} Debounced function
*/
function debounce(fn, wait = 200, asap = false) {
  _throwIfNotOneOfTypes(fn, ['Function']);
  _throwIfNotOneOfTypes(wait, ['Number']);
  _throwIfNotOneOfTypes(asap, ['Boolean']);

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
/**
* Creates new collection from the old one by the given key
*
* @param {Array|Object} collection The collection to pluck
* @param {String} key The key to pluck collection by
* @return {Array} result New collection of plucked values
*/
function pluck(collection, key) {
  _throwIfNotOneOfTypes(collection, ['Array', 'Object']);
  _throwIfNotOneOfTypes(key, ['String']);

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
/**
* Drops values from collection
*
* @param {Object} collection The collection to omit
* @param {String} key The property to delete
* @return {Object} obj Mutated collection
*/
function omit(obj, key) {
  _throwIfNotOneOfTypes(obj, ['Object']);
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
/**
* Extends collection
*
* @param {Object} collection The collection to extend
* @param {Object} source The extension source
* @return {Object} collection Extended collection
*/
function extend(collection, source) {
  _throwIfNotOneOfTypes(collection, ['Array', 'Object']);
  _throwIfNotOneOfTypes(source, ['Array', 'Object']);

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
/**
* Clones collection
*
* @param {Object} collection The collection to clone
* @return {Object} clone Clone of the collection
*/
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
/**
* Ads mixin's props to the collection
*
* @param {Object} collection The collection to mutate
* @param {...*} sources The mixin sources
* @return {Object} collection Mutated collection
*/
function mixin(collection, ...sources) {
  _throwIfNotOneOfTypes(collection, ['Array', 'Object']);

  let args = toArray(arguments);

  each(args, (val, key) => {
    _throwIfNotOneOfTypes(val, ['Object']);

    if (key > 0) {
      extend(collection, val);
    }
  });

  return collection;
}
/**
* Gets collection chunk
*
* @param {Array|String} collection The collection to operate
* @param {Number} size Chunk size
* @param {Number} start Chunk start position
* @return {Object} Collection chunk
*/
function chunk(collection, size, start = 0) {
  _throwIfNotOneOfTypes(collection, ['Array', 'String']);

  let end = start + size;

  if (end > collection.length) {
    throw new Error('Chunk is out of range');
  }

  return start ? collection.slice(start, end) : collection.slice(0, end);
}
/**
* Calculates collection size
*
* @param {Array|String} collection The collection to operate
* @return {Number} Collection size
*/
function size(collection) {
  _throwIfNotOneOfTypes(collection, ['Array', 'String']);
  return collection.length;
}
/**
* Walks collection recursively
*
* @param {Array|Object} collection The collection to operate
* @param {Function} func Callback to call
* @param {Array|Object} parent Parent entity
* @param {Number} depth Walk's depth
*/
function walk(collection, func, parent = null, depth = 0) {
  if (depth > recursionMaxDepth) {
    console.warn(`Maximum recusion call depth is set to ${recursionMaxDepth}, yours is ${depth}. You can reset it via purr._setRecursionMaxDepth(value)`);
    return false;
  }
  _throwIfNotOneOfTypes(collection, ['Array', 'Object']);
  _throwIfNotOneOfTypes(func, ['Function']);
  each(collection, (val, key) => {
    if (isOneOfTypes(val, ['Array', 'Object'])) {
      walk(val, func, collection, depth + 1);
    }

    func(val, key, collection);
  });
}
/**
* Makes multidimensional arrays flat
*
* @param {Array} collection The Array to flat
* @param {Array} flatArr New flattened array
*/
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
/**
* Injects logic from purr to given object
*
* @param {Object} obj Object to inject logic
* @param {Array|String} stuff Properties to inject
* @return {Object} obj Mutated object
*/
function inject(obj, stuff) {
  _throwIfNotOneOfTypes(obj, ['Object']);
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
/**
* Creates namespace on the given object or new object
*
* @param {Object} parent Object create namespace
* @param {String} nsstring String representation of namespace
* @return {Object} parent Mutated object
*/
function namespace(parent = {}, nsstring) {
  let names = nsstring.split('.');
  let current = parent;

  each(names, (name) => {
    current[name] = {};
    current = current[name];
  });

  return parent;
}
/**
* Ensures than object implements given interface
*
* @param {Object} obj Object to operate
* @param {Array|String} methods Interface to implement
* @return {Boolean} true or false
*/
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
/**
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
purr._expose = _expose;
purr._inspect = _inspect;
purr._setRecursionMaxDepth = _setRecursionMaxDepth;

export default purr;
