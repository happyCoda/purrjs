'use strict';

describe('klass.js suite', function () {

  var Interface = require('../../js/interface'),
    Klass = require('../../js/klass'),
    personInterface,
    Person;

  beforeEach(function () {
    personInterface = new Interface(['getName', 'setName']);

    Person = Klass({
      implements: [personInterface],
      getName: function () {},
      setName: function () {}
    });
  });

  it('should create new constructors', function () {

    var john;

    john = new Person();

    expect(typeof Klass).toEqual('function');

    expect(john.getName).toBeDefined();
  });

  it('should know how to use interfaces', function () {

    var john;

    spyOn(Klass, 'ensureImplemented').and.callThrough();

    john = new Person();

    expect(Klass.ensureImplemented).toHaveBeenCalled();
  });
});
