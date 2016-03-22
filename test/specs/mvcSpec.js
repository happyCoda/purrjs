'use strict';

describe('mvc.js suite', function () {
  var Interface = require('../../js/interface'),
    Utils = require('../../js/utils'),
    Klass = require('../../js/klass'),
    MVC = require('../../js/mvc');

  it('should create models', function () {

    var user = new MVC.model();

    expect(user.add).toBeDefined();
    expect(user.get).toBeDefined();
    expect(user.update).toBeDefined();
    expect(user.remove).toBeDefined();
  });

  it('should create custom models', function () {

    var user = new MVC.model({
        add: function (data) {
          return data;
        }
      }),
      data = 'some data';

    spyOn(user, 'add').and.callThrough();

    user.add(data);

    expect(user.add.calls.mostRecent().returnValue).toEqual(data);
  });
});
