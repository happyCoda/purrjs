'use strict';

var Utils = require('../../js/utils');

describe('utils.js suite', function () {

  it('should be an object', function () {

    expect(typeof Utils).toEqual('object');
  });

  it('should define correct type of the passed argument', function () {

    expect(Utils.getType([])).toEqual('Array');
    expect(Utils.getType({})).toEqual('Object');
    expect(Utils.getType(function () {})).toEqual('Function');
    expect(Utils.getType(null)).toEqual('Null');
    expect(Utils.getType(2)).toEqual('Number');
    expect(Utils.getType(new Date())).toEqual('Date');
    expect(Utils.getType(new Error())).toEqual('Error');

  });

  it('should iterate through an object', function () {
    var barInFoo = false;

    Utils.each({foo: 'bar'}, function (item) {
      if (item === 'bar') {
        barInFoo = true;
      }
    });

    expect(barInFoo).toBeTruthy();

  });

  it('should handle inapropriate types of arguments', function () {

    expect(Utils.each.bind(Utils, ('inapropriate'))).toThrow();

  });

  it('should be able to work with prototype chain', function () {
    var doStuff = false,
      TestCase = function () {
        this.buzz = 'word';
      };

    TestCase.prototype.doStuff = function () {};

    Utils.each(new TestCase(), function (item, key) {
      if (key === 'doStuff') {
        doStuff = true;
      }
    }, null, true);

    expect(doStuff).toBeTruthy();

  });

  it('should transform arrays with duplicates into arrays with unique elements', function () {

    expect(Utils.unique([1, 2, 3, 2])).toEqual([1, 2, 3]);

  });

  it('should implement a count method', function () {

    expect(Utils.count([2, 4, 6, 2, 5, 2], 2)).toEqual(3);

  });

  it('should implement an intersect method', function () {

    expect(Utils.intersect([2, 3, 4, 5, 6], [7, 9, 6, 3, 1])).toEqual([3, 6]);

  });

  it('should implement a diff method', function () {

    var setA = ['cat', 'dog', 'fish'],
      setB = ['cheese', 'tomato', 'fish'],
      expected = ['cat', 'dog'];

    expect(Utils.diff(setA, setB)).toEqual(expected);

  });

  it('should implement an contains method', function () {
    var tools = ['Babel', 'Grunt.js', 'Jasmine'];

    expect(Utils.contains(tools, 'Gulp.js')).toBeFalsy();
  });

  it('should transform an argument into an array', function () {
    var arrayLike = {'0': 'foo', '1': 'bar'},
      transformed = Utils.callToSlice(arrayLike);

    expect(Utils.getType(transformed)).toEqual('Array');

  });

  it('should implement an extend method', function () {
    var simpleObj = {
        name: 'Conan'
      },
      largeObj = {
        age: 23,
        klass: 'barbarian'
      };

    expect(Utils.extend(simpleObj, largeObj).klass).toEqual('barbarian');
  });

  it('should implement an extendDeep method', function () {
    var original = {
        name: 'Darth',
        inventory: {
          armour: 'helmet',
          weapon: 'lightsabre'
        }
      },
      copy = {};

      Utils.extendDeep(copy, original);

      copy.inventory.clothes = 'black cloak';

    expect(original.inventory.clothes).toBe(undefined);
  });

  it('should implement a mixin method', function () {
    var simpleObj = {
        name: 'Conan'
      },
      largeObj = {
        age: 23,
        klass: 'barbarian'
      },
      superObj = {
        skills: {
          'attack': 32,
          'defence': 24,
          'wisdom': 7
        },
        weapon: 'two-handed sword'
      };

    expect(Utils.mixin(simpleObj, largeObj, superObj).weapon).toEqual('two-handed sword');
  });

  it('should implement an inspect method', function () {
    var darth = {
      name: 'Vader',
      usePower: function () {},
      enemies: ['Skywalker', {name: 'Kenobi'}, 'Yoda'],
      misc: {
        side: 'dark'
      }
    },
    expected = '{"name": "Vader", "usePower": "function () {}", ';

    expected += '"enemies": ["Skywalker", {"name": "Kenobi"}, "Yoda"], ';

    expected += '"misc": {"side": "dark"}}';

    expect(Utils.inspect(darth)).toEqual(expected);
  });

  it('should implement random number generation', function () {

    var inBetween = Utils.randomNum(10, 49);

    expect(inBetween).not.toBeLessThan(10);
    expect(inBetween).not.toBeGreaterThan(49);
  });

  it('should create namespaces', function () {

    var ns = Utils.namespace('foo.bar.baz');

    expect(typeof ns).toEqual('object');
    expect(typeof ns.foo.bar.baz).toEqual('object');
  });
});
