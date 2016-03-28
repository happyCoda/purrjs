'use strict';

describe('observable.js suite', function () {

    var Observable = require('../../js/observable'),
      Observer = require('../../js/observer'),
      obs,
      watcher;

    beforeEach(function () {
      obs = new Observable();

      watcher = new Observer({
        recieve: function (message) {
          console.log(message);
        }
      });
    });

    it('should create an observable instance', function () {

      expect(typeof obs).toEqual('object');
      expect(obs.observers).toBeDefined();
    });

    it('should implement add method', function () {

      expect(obs.add).toBeDefined();

      watcher.observe(obs);

      expect(obs.observers.length).toEqual(1);
    });

    it('should implement remove method', function () {

      expect(obs.remove).toBeDefined();

      watcher.unObserve(obs);

      expect(obs.observers.length).toEqual(0);
    });

    it('should implement notify method', function () {

      expect(obs.notify).toBeDefined();

      watcher.observe(obs);

      spyOn(watcher, 'recieve').and.callThrough();

      obs.notify('Attention!');

      expect(watcher.recieve).toHaveBeenCalled();
    });
});
