/*
* PurrJS JavaScript library.
* (c) 2017, happyCoda.
* MIT License.
* https://github.com/happyCoda/purrjs
*/

import Mistake from './mistake';

function EventBus() {
  if (!(this instanceof EventBus)) {
    return new EventBus();
  }
  this.lnrs = {};
}

EventBus.prototype = Object.create(EventBus.prototype, {
  on: {
    value(evt, lnr) {
      if (!this.lnrs) {
        this.lnrs = {};
      }
      if (!this.lnrs[evt]) {
        this.lnrs[evt] = [];
      }

      this.lnrs[evt].push(lnr);
    },
    enumerable: true,
    writable: false
  },

  off: {
    value(evt, lnr) {
      if (!this.lnrs) {
        this.lnrs = {};
      }
      if (!this.lnrs[evt]) {
        return Mistake().warn(`There is no ${evt} event`);
      }

      this.lnrs[evt] = this.lnrs[evt].filter((item) => {
        return item !== lnr;
      });
    },
    enumerable: true,
    writable: false
  },

  emit: {
    value(evt, data) {
      if (!this.lnrs) {
        this.lnrs = {};
      }
      if (!this.lnrs[evt]) {
        return Mistake().warn(`There is no listeners for ${evt} event`);
      }
      this.lnrs[evt].forEach((lnr) => {
        lnr(data);
      });
    },
    enumerable: true,
    writable: false
  }
});

export default EventBus;
