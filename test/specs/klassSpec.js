'use strict';

describe('klass.js suite', function () {

  var Interface = require('../../js/interface'),
    Klass = require('../../js/klass'),
    personInterface,
    Person,
    john;

  beforeEach(function () {
    personInterface = new Interface(['getName', 'setName']);

    Person = Klass({
      implements: [personInterface],
      getName: function () {},
      setName: function () {}
    });
  });

  it('should create new constructors', function () {

    john = new Person();

    expect(typeof Klass).toEqual('function');

    expect(john.getName).toBeDefined();
  });

  it('should know how to use interfaces', function () {

    spyOn(personInterface, 'ensureImplemented');

    john = new Person();

    expect(personInterface.ensureImplemented).toHaveBeenCalled();
    expect(personInterface.ensureImplemented).not.toThrow();
  });

  it('should implement multiple interfaces', function () {

    var betterPersonInterface = new Interface(['getAge', 'sayHello']),
      BetterPerson = Klass({
        implements: [personInterface, betterPersonInterface],
        getName: function () {},
        setName: function () {},
        sayHello: function () {}
      }),
      jamesBond;

    spyOn(personInterface, 'ensureImplemented');

    jamesBond = spyOn(betterPersonInterface, 'ensureImplemented').and.callFake(function () {});

    john = new BetterPerson();

    expect(personInterface.ensureImplemented).toHaveBeenCalled();
    expect(betterPersonInterface.ensureImplemented).toHaveBeenCalled();
    expect(function () {
      jamesBond.and.callThrough();
      betterPersonInterface.ensureImplemented(john);
    }).toThrow();
  });

  it('should extend other klasses', function () {
    var Hero = Klass({
      extends: [Person],
      fly: function () {}
    }),
    superman = new Hero();

    expect(superman.getName).toBeDefined();
  });

  it('should be able to call superklass methods', function () {
    var Hero, superman;

    spyOn(Person.prototype, 'getName').and.callThrough();

    Hero = Klass({
      extends: [Person],
      fly: function () {},
      getName: function (_super) {

        _super();
      }
    });

    superman = new Hero();

    superman.getName();

    expect(Person.prototype.getName).toHaveBeenCalled();
  });
});
