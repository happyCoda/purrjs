import purr from '../src/purr';

describe('purr', () => {
  let nums = [1, 3, 5, 9, 15, 21];
  let person = { name: 'Joe', age: 28, occupation: 'janitor' };
  let str = 'Quick brown fox jumps over lazy dog';
  let users = [
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
  let cities = {
    'New York': 'USA',
    'Tokyo': 'Japan',
    'Chicago': 'USA',
    'London': 'UK',
    'Yokahama': 'Japan',
    'Lester': 'UK'
  };

  test('should iterate over each element of a collection', () => {
    let mockFn = jest.fn();

    utils.each(nums, mockFn);
    expect(mockFn).toHaveBeenCalled();
    expect(mockFn).toHaveBeenCalledWith(1, 0, nums, nums);
  });
  test('should map collections', () => {
    expect(utils.map([1, 2, 3], (val) => {
      return val * 2;
    })).toEqual([2, 4, 6]);
  });
  test('should map elements of any collection', () => {
    expect(utils.map(person, (val, key) => {
      return `$${val}`;
    })).toEqual({ age: '$28', name: '$Joe', occupation: '$janitor' });
  });
  test('should map even strings', () => {
    expect(utils.map('foo_bar', (val, key, collection) => {
      if (val === '_') {
        return '';
      } else if (collection[key - 1] === '_') {
        return val.toUpperCase();
      } else {
        return val;
      }
    })).toEqual('fooBar');
  });
  test('should reduce collections', () => {
    expect(utils.reduce([1, 2, 3], (acc, next) => {
      return acc + next;
    })).toEqual(6);
  });
  test('should reduce collections of any type', () => {
    expect(utils.reduce(cities, (acc, next, key, collection) => {
      if (!acc[next]) {
        acc[next] = [];
      }
      acc[next].push(key);
      return acc;
    }, {})).toEqual({ Japan: ['Tokyo', 'Yokahama'], UK: ['London', 'Lester'], USA: ['New York', 'Chicago'] });
  });
  test('should reduce even strings', () => {
    expect(utils.reduce(str, (acc, next) => {
      return (acc + next).replace(/\s/gi, '');
    })).toEqual('Quickbrownfoxjumpsoverlazydog');
  });
  test('should filter elements of a collection', () => {
    expect(utils.filter(nums, (val) => {
      return val > 5;
    })).toEqual([9, 15, 21]);
  });
  test('should filter elements of any collection', () => {
    expect(utils.filter(person, (val, key) => {
      return key === 'name';
    })).toEqual({ name: 'Joe' });
  });
  test('should filter even strings', () => {
    expect(utils.filter('foo_bar', (val, key, collection) => {
      return val !== '_';
    })).toEqual('foobar');
  });
  test('should filter by object passed', () => {
    expect(utils.filter(users, { role: 'user'})).toEqual([{ access: 'r', name: 'Susan', role: 'user' }, {'access': 'r', 'name': 'Tom', 'role': 'user'}]);
  });
  test('should filter by array passed', () => {
    expect(utils.filter(users, ['role', 'admin'])).toEqual([{ access: 'rw', name: 'zeke83', role: 'admin' }]);
  });
  test('should reject elements of a collection', () => {
    expect(utils.reject(nums, (val) => {
      return val > 5;
    })).toEqual([1, 3, 5]);
  });
  test('should reject elements of any collection', () => {
    expect(utils.reject(person, (val, key) => {
      return key === 'age';
    })).toEqual({ name: 'Joe', occupation: 'janitor' });
  });
  test('should reject even strings', () => {
    expect(utils.reject('foo_bar', (val, key, collection) => {
      return val !== '_';
    })).toEqual('_');
  });
  test('should reject by object passed', () => {
    expect(utils.reject(users, { role: 'user'})).toEqual([{access: 'rw', name: 'zeke83', role: 'admin'}]);
  });
  test('should reject by array passed', () => {
    expect(utils.reject(users, ['role', 'admin'])).toEqual([{ access: 'r', name: 'Susan', role: 'user' }, {'access': 'r', 'name': 'Tom', 'role': 'user'}]);
  });
  test('should check if all element in the collection satisfies condition', () => {
    expect(utils.all(nums, (val) => {
      return val > 0;
    })).toBeTruthy();
  });
  test('should check if all element in the collection satisfies condition even string', () => {
    expect(utils.all(str, (val) => {
      return val !== 'z';
    })).toBeFalsy();
  });
  test('should check if all element in the collection satisfies condition in object', () => {
    expect(utils.all(users, { access: 'rw' })).toBeFalsy();
  });
  test('should check if all element in the collection satisfies condition in array', () => {
    expect(utils.all(users, ['access', 'rw'])).toBeFalsy();
  });
  test('should check if any of the elements in the collection satisfy condition', () => {
    expect(utils.any(nums, (val) => {
      return val < 7;
    })).toBeTruthy();
  });
  test('should check if any of the elements in the collection satisfy condition even string', () => {
    expect(utils.any(str, (val) => {
      return val !== 'z';
    })).toBeTruthy();
  });
  test('should check if any of the elements in the collection satisfy condition in object', () => {
    expect(utils.any(users, { name: 'Tom' })).toBeTruthy();
  });
  test('should check if any of the elements in the collection satisfy condition in array', () => {
    expect(utils.any(users, ['name', 'Tom'])).toBeTruthy();
  });
  test('should invoke iteratee for the given times', () => {
    let mockFn = jest.fn();

    utils.times(10, mockFn);
    expect(mockFn).toHaveBeenCalledTimes(10);
  });
  test('should find elements in collection', () => {
    expect(utils.find(users, (val) => {
      return val.name.length > 3;
    })).toEqual({ access: 'r', name: 'Susan', role: 'user' });
  });
  test('should check if some elements in the collection satisfy condition in object', () => {
    expect(utils.find(users, { name: 'Susan' })).toEqual({ access: 'r', name: 'Susan', role: 'user' });
  });
  test('should check if some elements in the collection satisfy condition in array', () => {
    expect(utils.find(users, ['name', 'Susan'])).toEqual({ access: 'r', name: 'Susan', role: 'user' });
  });
  test('should find elements only in collections of condition right type', () => {
    expect(() => {
      utils.find(str, (val) => {
        return val !== 'z';
      });
    }).toThrow();
  });
  test('should detect objects', () => {
    expect(utils.isObject({ a: 1 })).toBeTruthy();
  });
  test('should detect arrays', () => {
    expect(utils.isArray(nums)).toBeTruthy();
  });
  test('should detect functions', () => {
    expect(utils.isFunction(() => {})).toBeTruthy();
  });
  test('should detect boolean', () => {
    expect(utils.isBoolean(true)).toBeTruthy();
  });
  test('should detect numbers', () => {
    expect(utils.isNumber(1)).toBeTruthy();
  });
  test('should detect strings', () => {
    expect(utils.isString('cat')).toBeTruthy();
  });
  test('should detect null', () => {
    expect(utils.isNull(null)).toBeTruthy();
  });
  test('should detect undefined', () => {
    expect(utils.isUndefined(undefined)).toBeTruthy();
  });
  test('should detect symbols', () => {
    expect(utils.isSymbol(Symbol('foo'))).toBeTruthy();
  });
  test('should detect if value has a given type', () => {
    expect(utils.is('foo', 'String')).toBeTruthy();
  });
  test('should detect if value is truthy', () => {
    expect(utils.isTruthy('')).toBeFalsy();
  });
  test(`should detect if '' is empty`, () => {
    expect(utils.isEmpty('')).toBeTruthy();
  });
  test(`should detect if '' is empty`, () => {
    expect(utils.isEmpty('')).toBeTruthy();
  });
  test(`should detect if {} is empty`, () => {
    expect(utils.isEmpty({})).toBeTruthy();
  });
  test(`should detect if [] is empty`, () => {
    expect(utils.isEmpty([])).toBeTruthy();
  });
  test(`should detect if is empty throws on wrong argument`, () => {
    expect(() => {
      utils.isEmpty(2);
    }).toThrow();
  });
  test('should check if a value is in array', () => {
    expect(utils.contains(nums, 3)).toBeTruthy();
  });
  test('should check if a key is in object', () => {
    expect(utils.contains(person, 'age')).toBeTruthy();
  });
  test('should check if a substr is in string', () => {
    expect(utils.contains(str, 'dfsdf')).toBeFalsy();
  });
  test('should be able to destroy things', () => {
    let data = {
      date: new Date(),
      title: 'Some title',
      sensitiveInfo: '1as24d4f'
    };

    utils.destroy(data, 'sensitiveInfo');
    expect(data.sensitiveInfo).toBeUndefined();
  });
  test('should be able to chain methods', () => {
    expect(utils.chain(users).filter({ role: 'user' }).reject({ name: 'Susan' }).value()).toEqual([
      {
        access: 'r', name: 'Tom', role: 'user'
      }
    ]);
  });
  test('should be able to group elements by criteria', () => {
    expect(utils.groupBy(users, 'role')).toEqual({
      admin: [
        { access: 'rw', name: 'zeke83', role: 'admin' }
      ],
      user: [
        { access: 'r', name: 'Susan', role: 'user' },
        { access: 'r', name: 'Tom', role: 'user' }
      ]
    });
  });
  test('should be able to make arrays unique', () => {
    expect(utils.uniq([1, 2, 3, 2, 1, 5])).toEqual([1, 2, 3, 5]);
  });
  test('should convert values to arrays', () => {
    let arrayLike = { 0: 'Super', 1: 'Duper', 2: 'Thing' };

    expect(utils.toArray(arrayLike)).toEqual(['Super', 'Duper', 'Thing']);
  });
  test('should prevent multiple function calls', (done) => {
    let counter = 0;
    let fn = utils.debounce(() => {
      counter += 1;
    }, 1000, true);

    expect.assertions(1);

    fn();
    fn();
    setTimeout(() => {
      expect(counter).toEqual(1);
      done();
    }, 100);
  });
  test('should be able to pluck values from collection of objects', () => {
    expect(utils.pluck(users, 'name')).toEqual(['Susan', 'Tom', 'zeke83']);
  });
  test('should be able to pluck values from collection object', () => {
    expect(utils.pluck(person, 'age')).toEqual([28]);
  });
  test('should be able to extend objects deeply', () => {
    let bob = { name: 'Bob' };
    let mike = { params: { hobbies: ['computers', 'girs'] } };

    expect(utils.extendDeep(bob, mike)).toEqual({ params: { hobbies: ['computers', 'girs'] }, name: 'Bob' });
    mike.params.hobbies.push('cats');
    mike.params.hobbies = 'cats';
    expect(bob).toEqual({ params: { hobbies: ['computers', 'girs'] }, name: 'Bob' });
  });
  test('should be able to omit object properties', () => {
    let personClone = utils.extendDeep({}, person);

    expect(utils.omit(personClone, 'age')).toEqual({ name: 'Joe', occupation: 'janitor' });
  });
  test('should be able to omit object properties with props array', () => {
    let personClone = utils.extendDeep({}, person);

    expect(utils.omit(personClone, ['age', 'occupation'])).toEqual({ name: 'Joe' });
  });
  test('should clone collection object', () => {
    let obj = { user: { name: 'Bob' } };
    let objClone = utils.clone(obj);

    obj.user.name = 'Ted';
    expect(objClone.user.name).toEqual('Bob');
  });
  test('should clone collection array', () => {
    let arr = [{ user: { name: 'Bob' } }];
    let arrClone = utils.clone(arr);

    arr[0].user.name = 'Ted';
    expect(arrClone[0].user.name).toEqual('Bob');
  });
  test('should add mixins', () => {
    let obj1 = { foo() {} };
    let obj2 = { bar() {} };
    let target = {};

    utils.mixin(target, obj1, obj2);

    expect(target.foo).toEqual(obj1.foo);
    expect(target.bar).toEqual(obj2.bar);
  });
  test('should be able to get a chunk from an array', () => {
    expect(utils.chunk(nums, 2)).toEqual([1, 3]);
  });
  test('should be able to get a chunk from an array with the given start pos', () => {
    expect(utils.chunk(nums, 3, 3)).toEqual([9, 15, 21]);
  });
  test('should be able to get a chunk from a string with the given start pos', () => {
    expect(utils.chunk(str, 5, 6)).toEqual('brown');
  });
  test('should throw on getting chunk with argumnets of the wrong type', () => {
    expect(() => {
      utils.chunk(nums, 3, 4);
    }).toThrow();
  });
  test('should get size of the collection array', () => {
    expect(utils.size(users)).toEqual(3);
  });
  test('should get size of the collection string', () => {
    expect(utils.size(str)).toEqual(35);
  });
  test('should throw on getting size with argumnets of the wrong type', () => {
    expect(() => {
      utils.size(3);
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

    utils.walk(complexObj, mockFn);
    expect(mockFn).toHaveBeenCalledTimes(11);
  });
  test(`should be able to inject it's methods to other objects`, () => {
    let app = { name: 'SuperApp' };

    utils.inject(app, 'each');

    expect(app.each).toEqual(utils.each);
  });
  test('should be able to create namespace', () => {
    let app = { name: 'SuperApp' };

    utils.namespace(app, 'foo.bar.baz');

    expect(app.foo.bar.baz).toEqual({});
  });
  test('should be able to ensure interface implemented', () => {
    let app = { name: 'SuperApp', doStuff() {} };

    expect(utils.implements(app, ['doStuff'])).toBeTruthy();
  });
  test('should be able to ensure interface implemented by string passing', () => {
    let app = { name: 'SuperApp', doStuff() {} };

    expect(utils.implements(app, 'doStuff')).toBeTruthy();
  });
});
