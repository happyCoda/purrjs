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

  it('should create views', function () {

    var userView = new MVC.view();

    expect(userView.render).toBeDefined();

  });

  it('should create custom views', function () {

    var userView = new MVC.view({
        render: function (data) {
          return data;
        }
      }),
      data = 'some data';

    spyOn(userView, 'render').and.callThrough();

    userView.render(data);

    expect(userView.render.calls.mostRecent().returnValue).toEqual(data);
  });

  xit('should create controllers', function () {

    var user = new MVC.model(),
      userView = new MVC.view(),
      userController = new MVC.controller({
        model: user,
        view: userView
      });

    expect(userController.model).toEqual(user);
    expect(userController.view).toEqual(userView);

  });
});
