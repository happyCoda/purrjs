/*
* PurrJS JavaScript library.
* (c) 2017, happyCoda.
* MIT License.
* https://github.com/happyCoda/purrjs
*/

function Stream(data) {
  if (!(this instanceof Stream)) {
    return new Stream(data);
  }
  this._fill(data);
}

Stream.prototype = Object.create(Stream.prototype, {
  _fill: {
    value(data) {
      this.flow = data;
      return this;
    },
    enumerable: true,
    writable: false
  },

  pipe: {
    value(fn) {
      this.flow = fn(this.flow);
      return this;
    },
    enumerable: true,
    writable: false
  },

  flush: {
    value() {
       return this.flow;
    },
    enumerable: true,
    writable: false
  },

  refill: {
    value(data) {
      return this._fill(data);
    },
    enumerable: true,
    writable: false
  }
});

export default Stream;
