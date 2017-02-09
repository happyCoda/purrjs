import utils from './utils';

function makeObservable(obj) {

  utils.each(obj, (val, key) => {
    Object.defineProperty(obj, key, {
      get() {
        return val;
      },
      set(newVal) {
        let oldVal = val;

        val = newVal;
        console.log(`Object's property ${key} value has changed from ${oldVal} to ${newVal}`);
      }
    });
  });
}

export { makeObservable };
