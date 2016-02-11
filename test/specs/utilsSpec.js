'use strict';

describe('Testing Utils.js', function () {
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

  it('should implement an each method', function () {

    expect(typeof Utils.each).toEqual('function');

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

  it('should implement an unique method', function () {

    expect(typeof Utils.unique).toEqual('function');

  });

  it('should transform arrays with duplicates into arrays with unique elements', function () {

    expect(Utils.unique([1, 2, 3, 2])).toEqual([1, 2, 3]);

  });

  it('should implement an multitype slice method', function () {

    expect(typeof Utils.slice).toEqual('function');

  });

  it('should transform an argument into an array', function () {
    var arrayLike = {'0': 'foo', '1': 'bar'},
      transformed = Utils.slice(arrayLike);

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
    };

    expect(Utils.inspect(darth)).toEqual('{"name": "Vader", "usePower": "function () {}", "enemies": ["Skywalker", {"name": "Kenobi"}, "Yoda"], "misc": {"side": "dark"}}');
  });
});
