import utils from './utils';
import EventBus from './bus';

const bus = new EventBus();

function makeObservable(obj, cb) {
  utils.each(obj, (val, key) => {
    bus.on(key, cb);

    Object.defineProperty(obj, key, {
      get() {
        return val;
      },
      set(newVal) {
        let oldVal = val;

        val = newVal;
        bus.emit(key, {
          oldVal,
          val
        });
      }
    });
  });
}

export default makeObservable;
