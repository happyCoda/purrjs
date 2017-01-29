/*
* PurrJS JavaScript library.
* (c) 2017, happyCoda.
* MIT License.
* https://github.com/happyCoda/purrjs
*/

function Stream(fn, ...args) {
  this._fill(fn, args);
}

Stream.prototype = Object.create(Stream.prototype, {
  _fill: {
    value(fn, args) {
      this.flow = fn.apply(null, args);
    },
    writable: false
  },

  pipe: {
    value(fn) {
      this.flow = fn(this.flow);
      return this;
    },
    writable: false
  },

  flush: {
    value(fn) {
       return this.flow;
    },
    writable: false
  },

  refill: {
    value(fn, ...args) {
      this._fill(fn, args);
    },
    writable: false
  }
});

// class Stream {
//   constructor(fn, ...args) {
//     this._fill(fn, args);
//   }
//
//   pipe(fn) {
//     this.flow = fn(this.flow);
//     return this;
//   }
//
//   flush() {
//     return this.flow;
//   }
//
//   _fill(fn, args) {
//     this.flow = fn.apply(null, args);
//   }
//
//   refill(fn, ...args) {
//     this._fill(fn, args);
//   }
// }

export default Stream;
