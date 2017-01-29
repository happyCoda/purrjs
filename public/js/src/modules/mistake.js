/*
* PurrJS JavaScript library.
* (c) 2017, happyCoda.
* MIT License.
* https://github.com/happyCoda/purrjs
*/

import EventBus from './bus';

function Mistake() {
  this.bus = new EventBus();
}

Mistake.prototype = Object.create(Mistake.prototype, {
  throw: {
    value(msg) {
      throw new Error(msg);
    },
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
    writable: false
  },

  catch: {
    value(fn) {
      this.bus.on('mistake', fn);

      return this;
    },
    writable: false
  }
});

// class Mistake {
//   constructor() {
//     this.bus = new EventBus();
//   }
//
//   throw(msg) {
//     throw new Error(msg);
//   }
//
//   try(fn, ...args) {
//     try {
//       fn.apply(null, args);
//     } catch (err) {
//       setTimeout(() => {
//         this.bus.emit('mistake', err);
//       }, 100);
//     }
//
//     return this;
//   }
//
//   catch(fn) {
//     this.bus.on('mistake', fn);
//
//     return this;
//   }
// }

export default Mistake;
