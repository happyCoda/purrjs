import purr from '../src/purr';

describe('purr', () => {
  let nums;
  let person;
  let str;
  let users;
  let cities;

  beforeEach(() => {
    nums = [1, 3, 5, 9, 15, 21];
    person = { name: 'Joe', age: 28, occupation: 'janitor' };
    str = 'Quick brown fox jumps over lazy dog';
    users = [
      {
        name: 'Susan',
        role: 'user',
        access: 'r'
      },
      {
        name: 'Tom',
        role: 'user',
        access: 'r'
      },
      {
        name: 'zeke83',
        role: 'admin',
        access: 'rw'
      }
    ];
    cities = {
      'New York': 'USA',
      'Tokyo': 'Japan',
      'Chicago': 'USA',
      'London': 'UK',
      'Yokahama': 'Japan',
      'Lester': 'UK'
    };
  });

  test('should be able to curry methods', () => {
    let sum = function (a, b) {
      return a + b;
    };
    expect(typeof purr.curry(sum)).toEqual('function');
    expect(purr.curry(sum)(2)(1)).toEqual(3);
  });
  test('should be able to compose methods', () => {
    let sum = function (a, b) {
      return a + b;
    };
    let double = function (x) {
      return x * 2;
    };
    expect(typeof purr.compose(sum, double)).toEqual('function');
    expect(purr.compose(sum, double)(3, 5)).toEqual(16);
  });
  test('should be able to compose any number of methods', () => {
    let sum = function (a, b) {
      return a + b;
    };
    let double = function (x) {
      return x * 2;
    };
    let identity = function (y) {
      return y;
    };
    let isEven = function (z) {
      return z % 2 === 0;
    };
    expect(purr.compose(sum, double, identity, isEven)(3, 5)).toEqual(true);
  });
  test('should be able to compose curried methods', () => {
    expect(purr.compose(purr.map((val) => {
      return val + 5;
    }), purr.filter((val) => {
      return val < 10;
    }, false), purr.reduce((acc, next) => {
      return acc + next;
    }, null))(nums)).toEqual(14);
  });
  test('should be able to call uncurried methods', () => {
    expect(purr.reduce([1, 2, 3], (acc, next) => {
      return acc + next;
    }, null)).toEqual(6);
  });
  test('should be able to call dummy methods', () => {
    expect(purr.noop(2)).toEqual(2);
  });
  test('should iterate over each element of a collection', () => {
    let mockFn = jest.fn();

    purr.each(mockFn)(nums);
    expect(mockFn).toHaveBeenCalled();
    expect(mockFn).toHaveBeenCalledWith(1, 0, nums, nums);
  });
  test('should map collections', () => {
    let coll = [1, 2, 3];
    let double = function (val) {
      return val * 2;
    };

    expect(purr.map(double)(coll)).toEqual([2, 4, 6]);
  });
  test('should map elements of any collection', () => {
    let cb = function (val, key) {
      return `$${val}`;
    };

    expect(purr.map(cb)(person)).toEqual({ age: '$28', name: '$Joe', occupation: '$janitor' });
  });
  test('should map even strings', () => {
    let cb = function (val, key, collection) {
      if (val === '_') {
        return '';
      } else if (collection[key - 1] === '_') {
        return val.toUpperCase();
      } else {
        return val;
      }
    };

    expect(purr.map(cb)('foo_bar', )).toEqual('fooBar');
  });
  test('should reduce collections', () => {
    let coll = [1, 2, 3];
    let cb = function (acc, next) {
      return acc + next;
    };
    expect(purr.reduce(cb)(null)(coll)).toEqual(6);
  });
  test('should reduce collections of any type', () => {
    let cb = function (acc, next, key, collection) {
      if (!acc[next]) {
        acc[next] = [];
      }
      acc[next].push(key);
      return acc;
    };
    expect(purr.reduce(cb)({})(cities)).toEqual({ Japan: ['Tokyo', 'Yokahama'], UK: ['London', 'Lester'], USA: ['New York', 'Chicago'] });
  });
  test('should reduce even strings', () => {
    let cb = function (acc, next) {
      return (acc + next).replace(/\s/gi, '');
    };

    expect(purr.reduce(cb, null)(str)).toEqual('Quickbrownfoxjumpsoverlazydog');
  });
  test('should filter elements of a collection', () => {
    let cb = function (val) {
      return val > 5;
    };

    expect(purr.filter(cb)(false)(nums)).toEqual([9, 15, 21]);
  });
  test('should filter elements of any collection', () => {
    let cb = (val, key) => {
      return key === 'name';
    };
    expect(purr.filter(cb)(false)(person)).toEqual({ name: 'Joe' });
  });
  test('should filter even strings', () => {
    let cb = (val, key, collection) => {
      return val !== '_';
    };
    expect(purr.filter(cb)(false)('foo_bar')).toEqual('foobar');
  });
  test('should filter by object passed', () => {
    let iteratee = { role: 'user'};

    expect(purr.filter(iteratee, false)(users)).toEqual([{ access: 'r', name: 'Susan', role: 'user' }, {'access': 'r', 'name': 'Tom', 'role': 'user'}]);
  });
  test('should filter by array passed', () => {
    let iteratee = ['role', 'admin'];

    expect(purr.filter(iteratee)(false)(users)).toEqual([{ access: 'rw', name: 'zeke83', role: 'admin' }]);
  });
  test('should reject elements of a collection', () => {
    let cb = (val) => {
      return val > 5;
    };

    expect(purr.reject(cb)(nums)).toEqual([1, 3, 5]);
  });
  test('should reject elements of any collection', () => {
    let cb = (val, key) => {
      return key === 'age';
    };

    expect(purr.reject(cb)(person)).toEqual({ name: 'Joe', occupation: 'janitor' });
  });
  test('should reject even strings', () => {
    let cb = (val, key, collection) => {
      return val !== '_';
    };

    expect(purr.reject(cb)('foo_bar')).toEqual('_');
  });
  test('should reject by object passed', () => {
    let iteratee = { role: 'user'};

    expect(purr.reject(iteratee)(users)).toEqual([{access: 'rw', name: 'zeke83', role: 'admin'}]);
  });
  test('should reject by array passed', () => {
    let iteratee = ['role', 'admin'];

    expect(purr.reject(iteratee)(users)).toEqual([{ access: 'r', name: 'Susan', role: 'user' }, {'access': 'r', 'name': 'Tom', 'role': 'user'}]);
  });
  test('should check if all element in the collection satisfies condition', () => {
    let cb = (val) => {
      return val > 0;
    };

    expect(purr.all(cb)(nums)).toBeTruthy();
  });
  test('should check if all element in the collection satisfies condition even string', () => {
    let cb = (val) => {
      return val !== 'z';
    };

    expect(purr.all(cb)(str)).toBeFalsy();
  });
  test('should check if all element in the collection satisfies condition in object', () => {
    let iteratee = { access: 'rw' };

    expect(purr.all(iteratee)(users)).toBeFalsy();
  });
  test('should check if all element in the collection satisfies condition in array', () => {
    let iteratee = ['access', 'rw'];

    expect(purr.all(iteratee)(users)).toBeFalsy();
  });
  test('should check if any of the elements in the collection satisfy condition', () => {
    let cb = (val) => {
      return val < 7;
    };

    expect(purr.any(cb)(nums)).toBeTruthy();
  });
  test('should check if any of the elements in the collection satisfy condition even string', () => {
    let cb = function (val) {
      return val !== 'z';
    };

    expect(purr.any(cb)(str)).toEqual(true);
  });
  test('should check if any of the elements in the collection satisfy condition in object', () => {
    let iteratee = { name: 'Tom' };

    expect(purr.any(iteratee)(users)).toEqual(true);
  });
  test('should check if any of the elements in the collection satisfy condition in array', () => {
    let iteratee = ['name', 'Tom'];

    expect(purr.any(iteratee)(users)).toBeTruthy();
  });
  test('should invoke iteratee for the given times', () => {
    let mockFn = jest.fn();

    purr.times(mockFn)(10);
    expect(mockFn).toHaveBeenCalledTimes(10);
  });
  test('should find elements in collection', () => {
    let cb = function (val) {
      return val.name.length > 3;
    };

    expect(purr.find(cb)(users)).toEqual({ access: 'r', name: 'Susan', role: 'user' });
  });
  test('should check if some elements in the collection satisfy condition in object', () => {
    let iteratee = { name: 'Susan' };

    expect(purr.find(iteratee)(users)).toEqual({ access: 'r', name: 'Susan', role: 'user' });
  });
  test('should check if some elements in the collection satisfy condition in array', () => {
    let iteratee = ['name', 'Susan'];

    expect(purr.find(iteratee)(users)).toEqual({ access: 'r', name: 'Susan', role: 'user' });
  });
  test('should find elements only in collections of condition right type', () => {
    let cb = (val) => {
      return val !== 'z';
    };

    expect(() => {
      purr.find(cb)(str);
    }).toThrow();
  });
  test('should detect objects', () => {
    expect(purr.isObject({ a: 1 })).toBeTruthy();
  });
  test('should detect arrays', () => {
    expect(purr.isArray(nums)).toBeTruthy();
  });
  test('should detect functions', () => {
    expect(purr.isFunction(() => {})).toBeTruthy();
  });
  test('should detect boolean', () => {
    expect(purr.isBoolean(true)).toBeTruthy();
  });
  test('should detect numbers', () => {
    expect(purr.isNumber(1)).toBeTruthy();
  });
  test('should detect strings', () => {
    expect(purr.isString('cat')).toBeTruthy();
  });
  test('should detect null', () => {
    expect(purr.isNull(null)).toBeTruthy();
  });
  test('should detect undefined', () => {
    expect(purr.isUndefined(undefined)).toBeTruthy();
  });
  test('should detect symbols', () => {
    expect(purr.isSymbol(Symbol('foo'))).toBeTruthy();
  });
  test('should detect if value has a given type', () => {
    expect(purr.is('foo', 'String')).toBeTruthy();
  });
  test('should detect if value is truthy', () => {
    expect(purr.isTruthy('')).toBeFalsy();
  });
  test(`should detect if '' is empty`, () => {
    expect(purr.isEmpty('')).toBeTruthy();
  });
  test(`should detect if '' is empty`, () => {
    expect(purr.isEmpty('')).toBeTruthy();
  });
  test(`should detect if {} is empty`, () => {
    expect(purr.isEmpty({})).toBeTruthy();
  });
  test(`should detect if [] is empty`, () => {
    expect(purr.isEmpty([])).toBeTruthy();
  });
  test(`should detect if is empty throws on wrong argument`, () => {
    expect(() => {
      purr.isEmpty(2);
    }).toThrow();
  });
  test('should check if a value is in array', () => {
    expect(purr.contains(3)(nums)).toEqual(true);
  });
  test('should check if a key is in object', () => {
    expect(purr.contains('age')(person)).toEqual(true);
  });
  test('should check if a substr is in string', () => {
    expect(purr.contains('dfsdf')(str)).toEqual(false);
  });
  test('should be able to destroy things', () => {
    let data = {
      date: new Date(),
      title: 'Some title',
      sensitiveInfo: '1as24d4f'
    };

    purr.destroy('sensitiveInfo')(data);
    expect(data.sensitiveInfo).toBeUndefined();
  });
  test('should be able to group elements by criteria', () => {
    expect(purr.groupBy('role')(users)).toEqual({
      admin: [
        { access: 'rw', name: 'zeke83', role: 'admin' }
      ],
      user: [
        { access: 'r', name: 'Susan', role: 'user' },
        { access: 'r', name: 'Tom', role: 'user' }
      ]
    });
  });
  test('should be able to order elements by criteria', () => {
    expect(purr.orderBy('role')('dsc')(users)).toEqual([
      { access: 'r', name: 'Susan', role: 'user' },
      { access: 'r', name: 'Tom', role: 'user' },
      { access: 'rw', name: 'zeke83', role: 'admin' }
    ]);
  });
  test('should be able to make arrays unique', () => {
    expect(purr.uniq([1, 2, 3, 2, 1, 5])).toEqual([1, 2, 3, 5]);
  });
  test('should convert values to arrays', () => {
    let arrayLike = { 0: 'Super', 1: 'Duper', 2: 'Thing' };

    expect(purr.toArray(arrayLike)).toEqual(['Super', 'Duper', 'Thing']);
  });
  test('should prevent multiple function calls', (done) => {
    let counter = 0;
    let fn = purr.debounce(1000, true)(() => {
      counter += 1;
    });

    expect.assertions(1);

    fn();
    fn();
    setTimeout(() => {
      expect(counter).toEqual(1);
      done();
    }, 100);
  });
  test('should be able to pluck values from collection of objects', () => {
    expect(purr.pluck('name')(users)).toEqual(['Susan', 'Tom', 'zeke83']);
  });
  test('should be able to pluck values from collection object', () => {
    expect(purr.pluck('age')(person)).toEqual([28]);
  });
  test('should be able to omit object properties', () => {
    let personClone = purr.extend(person)({});

    expect(purr.omit('age')(personClone)).toEqual({ name: 'Joe', occupation: 'janitor' });
  });
  test('should be able to omit object properties with props array', () => {
    let personClone = purr.extend(person)({});

    expect(purr.omit(['age', 'occupation'])(personClone)).toEqual({ name: 'Joe' });
  });
  test('should be able to extend objects deeply', () => {
    let bob = { name: 'Bob' };
    let mike = { params: { hobbies: ['computers', 'girs'] } };

    expect(purr.extend(mike)(bob)).toEqual({ params: { hobbies: ['computers', 'girs'] }, name: 'Bob' });
    mike.params.hobbies.push('cats');
    mike.params.hobbies = 'cats';
    expect(bob).toEqual({ params: { hobbies: ['computers', 'girs'] }, name: 'Bob' });
  });
  test('should clone collection object', () => {
    let obj = { user: { name: 'Bob' } };
    let objClone = purr.clone(obj);

    obj.user.name = 'Ted';
    expect(objClone.user.name).toEqual('Bob');
  });
  test('should clone collection array', () => {
    let arr = [{ user: { name: 'Bob' } }];
    let arrClone = purr.clone(arr);

    arr[0].user.name = 'Ted';
    expect(arrClone[0].user.name).toEqual('Bob');
  });
  test('should add mixins', () => {
    let obj1 = { foo() {} };
    let obj2 = { bar() {} };
    let target = {};

    purr.mixin(obj1)(target, obj2);
    expect(target.foo).toEqual(obj1.foo);
    expect(target.bar).toEqual(obj2.bar);
  });
  test('should be able to get a chunk from an array', () => {
    expect(purr.chunk(2)(0)(nums)).toEqual([1, 3]);
  });
  test('should be able to get a chunk from an array with the given start pos', () => {
    expect(purr.chunk(3, 3)(nums)).toEqual([9, 15, 21]);
  });
  test('should be able to get a chunk from a string with the given start pos', () => {
    expect(purr.chunk(5, 6)(str)).toEqual('brown');
  });
  test('should throw on getting chunk with argumnets of the wrong type', () => {
    expect(() => {
      purr.chunk(3, 4)(nums);
    }).toThrow();
  });
  test('should get size of the collection array', () => {
    expect(purr.size(users)).toEqual(3);
  });
  test('should get size of the collection string', () => {
    expect(purr.size(str)).toEqual(35);
  });
  test('should throw on getting size with argumnets of the wrong type', () => {
    expect(() => {
      purr.size(3);
    }).toThrow();
  });
  test('should traverse object structure with walk', () => {
    let complexObj = {
      boss: {
        name: 'John',
        age: 35,
        subordinates: [
          {
            name: 'Helen',
            age: 26,
            subordinates: [
              {
                name: 'Patrick',
                age: 17
              }
            ]
          }
        ]
      }
    };
    let mockFn = jest.fn();
    
    purr.walk(mockFn)(null)(0)(complexObj);
    expect(mockFn).toHaveBeenCalledTimes(11);
  });
  test('should flat multidimensional arrays', () => {
    let multiArr = ['boss', ['age', 'name', [{ things: 2 }]]];
    // let flatArr = [];

    expect(purr.flatten(multiArr)).toEqual(['boss', 'age', 'name', { things: 2 }]);
    // purr.walk((val, key, parent) => {
    //   if (!purr.isArray(val) && !purr.isObject(parent)) {
    //     flatArr.push(val);
    //   }
    // })(null)(multiArr);
    // expect(flatArr).toEqual(['boss', 'age', 'name', { things: 2 }]);
  });
  test(`should be able to inject it's methods to other objects`, () => {
    let app = { name: 'SuperApp' };

    purr.inject(app, 'each');

    expect(app.each).toEqual(purr.each);
  });
  test('should be able to create namespace', () => {
    let app = { name: 'SuperApp' };

    purr.namespace('foo.bar.baz')(app);

    expect(app.foo.bar.baz).toEqual({});
  });
  test('should be able to ensure interface implemented', () => {
    let app = { name: 'SuperApp', doStuff() {} };

    expect(purr.ensureImplements(['doStuff'])(app)).toBeTruthy();
  });
  test('should be able to ensure interface implemented by string passing', () => {
    let app = { name: 'SuperApp', doStuff() {} };

    expect(purr.ensureImplements('doStuff')(app)).toBeTruthy();
  });
});
