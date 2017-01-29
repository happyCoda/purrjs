/*
* PurrJS JavaScript library.
* (c) 2017, happyCoda.
* MIT License.
* https://github.com/happyCoda/purrjs
*/

function EventBus() {
  this.lnrs = {};
}

EventBus.prototype = Object.create(EventBus.prototype, {
  on: {
    value(evt, lnr) {
      if (!this.lnrs[evt]) {
        this.lnrs[evt] = [];
      }

      this.lnrs[evt].push(lnr);
    },
    writable: false
  },

  off: {
    value(evt, lnr) {
      if (!this.lnrs[evt]) {
        console.warn(`There is no ${evt} event`);
      }

      this.lnrs[evt] = this.lnrs[evt].filter((item) => {
        return item !== lnr;
      });
    },
    writable: false
  },

  emit: {
    value(evt, data) {
      if (!this.lnrs[evt]) {
        console.warn(`There is no listeners for ${evt} event`);
      }
      this.lnrs[evt].forEach((lnr) => {
        lnr(data);
      });
    },
    writable: false
  }
});

// class EventBus {
//   constructor() {
//     this.lnrs = {};
//   }
//
//   on(evt, lnr) {
//     if (!this.lnrs[evt]) {
//       this.lnrs[evt] = [];
//     }
//
//     this.lnrs[evt].push(lnr);
//   }
//
//   off(evt, lnr) {
//     if (!this.lnrs[evt]) {
//       console.warn(`There is no ${evt} event`);
//     }
//
//     this.lnrs[evt] = this.lnrs[evt].filter((item) => {
//       return item !== lnr;
//     });
//   }
//
//   emit(evt, data) {
//     if (!this.lnrs[evt]) {
//       console.warn(`There is no listeners for ${evt} event`);
//     }
//     this.lnrs[evt].forEach((lnr) => {
//       lnr(data);
//     });
//   }
// }

export default EventBus;
