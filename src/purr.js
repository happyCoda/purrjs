/*
* PurrJS JavaScript library.
* (c) 2013-2017, happyCoda.
* MIT License.
* https://github.com/happyCoda/purrjs
*/

// TODO: transform into module pattern, do separate private methods for and incapsulate them into public ones
// TODO: replace chaining with composition
// TODO: add methods: curry, where?, whereNot?, reduceRight, noop, now
// TODO: replace extendDeep with extend and probably merge it with mixin?

let purr = {
  each(collection, func) {
    func = (arguments.length < 2 && this._value) ? collection : func;
    collection = (arguments.length < 2 && this._value) ? this._value : collection;

    let isObject = this.isObject(collection);
    let collectionType = this._checkType(collection);
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
      let val = isObject ? collection[current] : current;
      let key = isObject ? current : i;
      func(val, key, collection, coll);
    }

    if (this._isChained) {
      return this;
    }
  },
  map(collection, func) {
    func = (arguments.length < 2 && this._value) ? collection : func;
    collection = (arguments.length < 2 && this._value) ? this._value : collection;
    this._throwIfNotObjectOrArrayOrString(collection);

    let isObject = !this._isArrayOrString(collection);
    let collectionMapped = isObject ? {} : [];

    this.each(collection, (val, key) => {
      let transformed = func(val, key, collection);
      isObject ? collectionMapped[key] = transformed : collectionMapped.push(transformed);
    });

    if (this.isString(collection)) {
      collectionMapped = collectionMapped.join('');
    }

    return this._isChained ? (this._value = collectionMapped) && this : collectionMapped;
  },
  reduce(collection, func, acc) {
    acc = (this._value && this._value !== collection) ? func : acc;
    func = (this._value && this._value !== collection) ? collection : func;
    collection = (this._value && this._value !== collection) ? this._value : collection;
    this._throwIfNotObjectOrArrayOrString(collection);

    let isObject = !this._isArrayOrString(collection);
    let idx = 0;

    this.each(collection, (val, key, collection, coll) => {
      let next;

      if (!acc) {
        acc = val;
        idx += 1;
      }

      next = isObject ? collection[coll[idx]] : collection[idx];

      if (next) {
        acc = func(acc, next, key, collection);
        idx += 1;
      }
    });

    return this._isChained ? (this._value = acc) && this : acc;
  },
  filter(collection, func, reverse = false) {
    reverse = ((arguments.length < 2 || this.isBoolean(func)) && this._value) ? func : reverse;
    func = ((arguments.length < 2 || this.isBoolean(func)) && this._value) ? collection : func;
    collection = ((arguments.length < 2 || this.isBoolean(func)) && this._value) ? this._value : collection;
    this._throwIfNotObjectOrArrayOrString(collection);
    this._throwIfNotOneOfTypes(func, ['Function', 'Object', 'Array', 'String']);

    let result;
    let action;
    let isObject = !this._isArrayOrString(collection);

    if (isObject) {
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

    this.each(collection, (val, key) => {
      let funcResult = this.isFunction(func) ? func(val, key, collection) : (() => {
        let isObject = this.isObject(func);
        let funcKey = isObject ? Object.keys(func)[0] : func[0];

        return isObject ? func[funcKey] === val[funcKey] : func[1] === val[funcKey];
      })();
      let condition = reverse ? !funcResult : funcResult;

      if (condition) {
        isObject ? action(result, collection, key) : action(result, val);
      }
    });

    if (this.isString(collection)) {
      result = result.join('');
    }

    return this._isChained ? (this._value = result) && this : result;
  },
  reject(collection, func) {
    func = (arguments.length < 2 && this._value) ? collection : func;
    collection = (arguments.length < 2 && this._value) ? this._value : collection;

    let result = this.filter(collection, func, true);

    return this._isChained ? (this._value = result._value) && this : result;
  },
  all(collection, func) {
    func = (arguments.length < 2 && this._value) ? collection : func;
    collection = (arguments.length < 2 && this._value) ? this._value : collection;

    let filtered = this.filter(collection, func);

    filtered = this._isChained ? filtered._value : filtered;

    let result = filtered.length === collection.length;

    return this._isChained ? (this._value = result) && this : result;
  },
  any(collection, func) {
    func = (arguments.length < 2 && this._value) ? collection : func;
    collection = (arguments.length < 2 && this._value) ? this._value : collection;

    let filtered = this.filter(collection, func);

    filtered = this._isChained ? filtered._value : filtered;

    let result = filtered.length > 0;

    return this._isChained ? (this._value = result) && this : result;
  },
  times(num, func) {
    func = (arguments.length < 2 && this._value) ? num : func;
    num = (arguments.length < 2 && this._value) ? this._value : num;
    this._throwIfNotOneOfTypes(num, ['Number']);
    this._throwIfNotOneOfTypes(func, ['Function']);

    this.each(new Array(num), func);

    if (this._isChained) {
      return this;
    }
  },
  find(collection, func) {
    func = (arguments.length < 2 && this._value) ? collection : func;
    collection = (arguments.length < 2 && this._value) ? this._value : collection;
    this._throwIfNotObjectOrArray(collection);

    let filtered = this.filter(collection, func);

    filtered = this._isChained ? filtered._value : filtered;

    let result = filtered[0];

    return this._isChained ? (this._value = result) && this : result;
  },
  isObject(thing) {
    return this._checkType(thing) === 'Object';
  },
  isArray(thing) {
    return this._checkType(thing) === 'Array';
  },
  isFunction(thing) {
    return this._checkType(thing) === 'Function';
  },
  isBoolean(thing) {
    return this._checkType(thing) === 'Boolean';
  },
  isNumber(thing) {
    return this._checkType(thing) === 'Number';
  },
  isString(thing) {
    return this._checkType(thing) === 'String';
  },
  isNull(thing) {
    return this._checkType(thing) === 'Null';
  },
  isUndefined(thing) {
    return this._checkType(thing) === 'Undefined';
  },
  isSymbol(thing) {
    return this._checkType(thing) === 'Symbol';
  },
  is(thing, type) {
    return this._checkType(thing) === type;
  },
  isOneOfTypes(thing, types) {
    let thingType = this._checkType(thing);
    let result = false;

    this.each(types, (val) => {
      if (val === thingType) {
        result = true;
      }
    });

    return result;
  },
  isTruthy(thing) {
    return !this.isNull(thing) && !this.isUndefined(thing) && !this.isEmpty(thing) && thing !== 0 && !isNaN(thing);
  },
  isEmpty(thing) {
    this._throwIfNotObjectOrArrayOrString(thing);

    let thingType = this._checkType(thing);
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
  },
  contains(collection, valOrKey) {
    valOrKey = (arguments.length < 2 && this._value) ? collection : valOrKey;
    collection = (arguments.length < 2 && this._value) ? this._value : collection;
    this._throwIfNotObjectOrArrayOrString(collection);

    let collectionTypeLowerCased = this._checkType(collection).toLowerCase();
    let resultsMap = {
      object() {
        return valOrKey in collection;
      },
      array: () => {
        let filtered = this.filter(collection, (item, key) => {
          return item === valOrKey;
        });

        filtered = this._isChained ? filtered._value : filtered;
        return filtered.length > 0 ? true : false;
      },
      string() {
        return collection.includes(valOrKey);
      }
    };

    let result = resultsMap[collectionTypeLowerCased]();

    return this._isChained ? (this._value = result) && this : result;
  },
  destroy(collection, key) {
    key = (arguments.length < 2 && this._value) ? collection : key;
    collection = (arguments.length < 2 && this._value) ? this._value : collection;
    this._throwIfNotOneOfTypes(collection, ['Object']);
    this._throwIfNotOneOfTypes(key, ['String']);
    delete collection[key];

    let result = !collection[key] ? true : false;

    if (collection === this) {
      return result;
    }

    return this._isChained ? (this._value = result) && this : result;
  },
  chain(value) {
    this._isChained = true;
    this._value = value;
    return this;
  },
  value() {
    let val = this._value;

    this.destroy(this, '_value');
    this.destroy(this, '_isChained');
    return val;
  },
  groupBy(collection, criteria) {
    criteria = (arguments.length < 2 && this._value) ? collection : criteria;
    collection = (arguments.length < 2 && this._value) ? this._value : collection;
    this._throwIfNotObjectOrArrayOrString(collection);

    let result = this.reduce(collection, (acc, next) => {
      let criteriaKey = next[criteria];

      if (criteriaKey) {
        if (!acc[criteriaKey]) {
          acc[criteriaKey] = [];
        }

        acc[criteriaKey].push(next);
      }

      return acc;
    }, {});

    return this._isChained ? (this._value = result._value) && this : result;
  },
  uniq(collection) {
    collection = (arguments.length < 1 && this._value) ? this._value : collection;
    this._throwIfNotOneOfTypes(collection, ['Array']);

    let result = this.reduce(collection, (acc, next) => {
      if (!this.contains(acc, next)) {
        acc.push(next);
      }
      return acc;
    }, []);

    return this._isChained ? (this._value = result._value) && this : result;
  },
  toArray(arrayLike) {
    arrayLike = (arguments.length < 1 && this._value) ? this._value : arrayLike;

    let result = Array.prototype.slice.call(arrayLike);

    if (result.length === 0 && this.isObject(arrayLike)) {
      result = this.reduce(arrayLike, (acc, next) => {
        acc.push(next);
        return acc;
      }, []);
      result = this._isChained ? result._value : result;
    }

    return this._isChained ? (this._value = result) && this : result;
  },
  debounce(fn, wait = 200, asap = false) {
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
  },
  pluck(collection, key) {
    key = (arguments.length < 2 && this._value) ? collection : key;
    collection = (arguments.length < 2 && this._value) ? this._value : collection;
    this._throwIfNotOneOfTypes(collection, ['Array', 'Object']);

    let result;

    if (this.isArray(collection)) {
      result = this.map(collection, (val) => {
        return val[key];
      });
      result = this._isChained ? result._value : result;
    } else {
      result = this.filter(collection, (val, valKey) => {
        return valKey === key;
      });
      result = this._isChained ? result._value : result;
      result = [result[key]];
    }

    return this._isChained ? (this._value = result) && this : result;
  },
  extendDeep(collection, source) {
    source = (arguments.length < 2 && this._value) ? collection : source;
    collection = (arguments.length < 2 && this._value) ? this._value : collection;

    this.each(source, (val, key) => {
      let propType = this._checkType(val);

      if (propType === 'Array') {
        collection[key] = [];
        this.extendDeep(collection[key], val);
      } else if (propType === 'Object') {
        collection[key] = {};
        this.extendDeep(collection[key], val);
      } else {
        collection[key] = val;
      }
    });

    return this._isChained ? (this._value = collection) && this : collection;
  },
  clone(collection) {
    collection = (arguments.length < 1 && this._value) ? this._value : collection;
    this._throwIfNotOneOfTypes(collection, ['Array', 'Object']);

    let clone;

    if (this.isArray(collection)) {
      clone = [];
    } else {
      clone = {};
    }

    return this.extendDeep(clone, collection);
  },
  mixin(collection, ...sources) {
    let args = this.toArray(arguments);

    collection = (arguments.length < 2 && this._value) ? this._value : collection;
    this.each(args, (val, key) => {
      this._throwIfNotOneOfTypes(val, ['Object']);

      if (key > 0) {
        this.extendDeep(collection, val);
      }
    });

    return this._isChained ? (this._value = collection) && this : collection;
  },
  omit(obj, key) {
    key = (arguments.length < 2 && this._value) ? obj : key;
    obj = (arguments.length < 2 && this._value) ? this._value : obj;
    this._throwIfNotOneOfTypes(key, ['Array', 'String']);

    if (this.isArray(key)) {
      this.each(key, (val) => {
        if (obj.hasOwnProperty(val)) {
          delete obj[val];
        }
      });
    } else {
      delete obj[key];
    }

    return this._isChained ? (this._value = obj) && this : obj;
  },
  chunk(collection, size, start = 0) {
    start = (this.isNumber(collection) && this._value) ? size : start;
    size = (this.isNumber(collection) && this._value) ? collection : size;
    collection = (this.isNumber(collection) && this._value) ? this._value : collection;
    this._throwIfNotOneOfTypes(collection, ['Array', 'String']);

    let end = start + size;

    if (end > collection.length) {
      throw new Error('Chunk is out of range');
    }

    let result = start ? collection.slice(start, end) : collection.slice(0, end);

    return this._isChained ? (this._value = result) && this : result;
  },
  size(collection) {
    collection = (arguments.length < 1 && this._value) ? this._value : collection;
    this._throwIfNotOneOfTypes(collection, ['Array', 'String']);

    let result = collection.length;

    return this._isChained ? (this._value = result) && this : result;
  },
  walk(collection, func) {

    this.each(collection, (val, key) => {
      if (this.isObject(val) || this.isArray(val)) {
        this.walk(val, func);
      }
      func(val, key, collection);
    });
  },
  inject(obj, stuff) {
    stuff = (arguments.length < 2 && this._value) ? obj : stuff;
    obj = (arguments.length < 2 && this._value) ? this._value : obj;
    this._throwIfNotOneOfTypes(stuff, ['Array', 'String']);

    if (this.isArray(stuff)) {
      this.each(stuff, (val) => {
        this.mixin(obj, { [val]: this[val] });
      });
    } else {
      this.mixin(obj, { [stuff]: this[stuff] });
    }

    return this._isChained ? (this._value = obj) && this : obj;
  },
  implements(obj, methods) {
    this._throwIfNotOneOfTypes(obj, ['Object']);
    this._throwIfNotOneOfTypes(methods, ['Array', 'String']);

    if (this.isArray(methods)) {
      return this.all(methods, (name) => {
        return name in obj;
      });
    }

    return methods in obj;
  },
  namespace(parent = {}, nsstring) {
    let names = nsstring.split('.');
    let current = parent;

    this.each(names, (name) => {
      current[name] = {};
      current = current[name];
    });

    return parent;
  },
  /*
  * Generates random number
  *
  * @param {Number} min Minimum number boundary.
  * @param {Number} max Maximum number boundary.
  * @return {Number} randNum Random number generated.
  */
  randomNum(min, max) {
    let randNum = Math.random() * max;

    randNum = Math.round(randNum);

    if (randNum <= max && randNum >= min) {
      return randNum;
    }

    return this.randomNum(min, max);
  },
  /*
  * Makes any object available in global scope
  *
  * @param {Object} global Any global object to include exposable
  * @param {Any} item Entity for expose
  * @param {String} name The name of the exposed entity
  */
  _expose(global, item, name) {
    global.__exposed = global.__exposed || {};
    global.__exposed[name] = item;
  },
  _checkType(thing) {
    return Object.prototype.toString.call(thing).replace(/\[|\]|object/g, '').trim();
  },
  _isArrayOrString(thing) {
    let thingType = this._checkType(thing);

    return thingType === 'Array' || thingType === 'String';
  },
  _throwIfNotObjectOrArrayOrString(thing) {
    this._throwIfNotOneOfTypes(thing, ['Object', 'Array', 'String']);
  },
  _throwIfNotObjectOrArray(thing) {
    this._throwIfNotOneOfTypes(thing, ['Object', 'Array']);
  },
  _throwIfNotOneOfTypes(thing, types) {
    let thingType = this._checkType(thing);

    if (!this.isOneOfTypes(thing, types)) {
      throw new Error(`this method expects ${types.join(', ')}. ${thingType} given instead.`);
    }
  },
  _inspect(collection, deeper) {
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
          stringified += this.inspect(val, true);
        } else if (propType === 'Array') {
          stringified += '"' + prop + '": ';
          stringified += this.inspect(val, true);
        } else {
          stringified += '"' + prop + '": "' + val + '", ';
        }
      }
    }
    this.each(val, callback.bind(this, collectionType));
    stringified = stringified.replace(/(,\s)$/, '');
    stringified += stringified.substr(0, 1) === '{' ? '}' : ']';

    if (deeper) {
      stringified += ', ';
    }

    return stringified;
  }
};

export default purr;
