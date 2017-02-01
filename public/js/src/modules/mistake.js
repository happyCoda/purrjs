/*
* PurrJS JavaScript library.
* (c) 2017, happyCoda.
* MIT License.
* https://github.com/happyCoda/purrjs
*/

import EventBus from './bus';

function Mistake() {
  if (!(this instanceof Mistake)) {
    return new Mistake();
  }
  this.bus = EventBus();
}

Mistake.prototype = Object.create(Mistake.prototype, {
  throw: {
    value(msg) {
      throw new Error(msg);
    },
    enumerable: true,
    writable: false
  },

  warn: {
    value(msg) {
      console.warn(msg);
    },
    enumerable: true,
    writable: false
  },

  try: {
    value(fn, ...args) {
      try {
        fn.apply(null, args);
      } catch (err) {
        setTimeout(() => {
          this.bus.emit('mistake', err);
        }, 100);
      }

      return this;
    },
    enumerable: true,
    writable: false
  },

  catch: {
    value(fn) {
      this.bus.on('mistake', fn);

      return this;
    },
    enumerable: true,
    writable: false
  }
});

export default Mistake;
