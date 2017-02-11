/*
* PurrJS JavaScript library.
* (c) 2017, happyCoda.
* MIT License.
* https://github.com/happyCoda/purrjs
*/

function Plumber(data) {
  if (!(this instanceof Plumber)) {
    return new Plumber(data);
  }
  this.push(data);
}

Plumber.prototype = Object.create(Plumber.prototype, {
  _name: {
    value: 'Plumber',
    enumerable: false,
    writable: false
  },
  push: {
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
  }
});

export default Plumber;
