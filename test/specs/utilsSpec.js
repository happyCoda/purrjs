'use strict';

describe('Testing Utils.js', function () {
  it('should be an object', function () {

    expect(typeof Utils).toBe('object');
  });

  it('should have a getType method', function () {

    expect(typeof Utils.getType).toBe('function');

  });

  it('should define correct type of the passed argument', function () {

    expect(Utils.getType([])).toBe('Array');

  });

  it('should define each method', function () {

    expect(typeof Utils.each).toBe('function');

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

  it('should have an unique method', function () {

    expect(typeof Utils.unique).toBe('function');

  });

  it('should transform arrays with duplicates into arrays with unique elements', function () {

    expect(Utils.unique([1, 2, 3, 2])).toEqual([1, 2, 3]);

  });
});
