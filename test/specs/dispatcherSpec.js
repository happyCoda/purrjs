'use strict';

describe('dispatcher.js suite', function () {

  var Dispatcher = require('../../js/dispatcher'),
    controller,
    someUIObj;

  beforeEach(function () {

    controller = new Dispatcher();

    someUIObj = {
      data: 'some data',

      update: function (newData) {
        this.data = newData;
      }
    };
  });

  it('should create channels list', function () {

    expect(typeof controller.channels).toEqual('object');
  });

  it('should implement subscribe method', function () {

    controller.subscribe('change', someUIObj, someUIObj.update);

    expect(controller.channels['change']).toBeDefined();
    expect(controller.channels['change'][0].method).toEqual(someUIObj.update);
  });

  it('should implement publish method', function () {

    var updates = 'updated data';

    spyOn(someUIObj, 'update').and.callThrough();

    controller.subscribe('change', someUIObj, someUIObj.update);

    controller.publish('change', updates);

    expect(someUIObj.update).toHaveBeenCalled();
    expect(someUIObj.data).toEqual(updates);
  });
});
