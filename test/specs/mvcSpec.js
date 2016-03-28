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

  it('should create controllers', function () {

    var user = new MVC.model(),
      userView = new MVC.view(),
      userController = new MVC.controller(),
      updates = 'some new data';

    spyOn(user, 'update');

    spyOn(userView, 'render');

    userController.subscribe('change', user, user.update);

    userController.subscribe('update', userView, userView.render);

    userController.publish('change', updates);

    userController.publish('update', updates);

    expect(user.update).toHaveBeenCalled();

    expect(user.update.calls.mostRecent().args[0]).toEqual(updates);

    expect(userView.render).toHaveBeenCalled();

    expect(userView.render.calls.mostRecent().args[0]).toEqual(updates);

  });

  it('should provide communication between all app components', function () {
    var user = new MVC.model({
        update: function (data) {
          this.data = data;
        },
        fetch: function (dispatcher) {
          var data = Math.round(Math.random() * 100) + 'xxx' + Math.round(Math.random() * 33) + 'yyy';

          dispatcher.publish('update', data);
        }
      }),
      userView = new MVC.view({
        onChange: function (dispatcher, data) {
          dispatcher.publish('change', data);
        },
        render: function (data) {
          this.data = data;
        }
      }),
      userController = new MVC.controller();

    spyOn(user, 'update');

    spyOn(userView, 'render');

    userController.subscribe('change', user, user.update);

    userController.subscribe('update', userView, userView.render);

    user.fetch(userController);

    userView.onChange(userController, 'some data');

    expect(user.update).toHaveBeenCalled();

    expect(user.update.calls.mostRecent().args[0]).toEqual('some data');

    expect(userView.render).toHaveBeenCalled();

    expect((/\d+[x]{3}\d+[y]{3}/gi).test(userView.render.calls.mostRecent().args[0])).toBeTruthy();
  });
});
