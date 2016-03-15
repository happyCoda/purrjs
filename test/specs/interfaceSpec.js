'use strict';

describe('interface.js suite', function () {

  var Interface = require('../../js/interface'),
    PersonInterface;

  beforeEach(function () {
    PersonInterface = new Interface(['getName', 'setName']);
  });

  it('should check for implementation', function () {

    expect(function () {
      PersonInterface.isImplemented({
        getName: function () {},

        setName: function () {}
      });
    }).not.toThrow();

    expect(function () {
      PersonInterface.isImplemented({

        setName: function () {}
      });
    }).toThrow();

  });
});
