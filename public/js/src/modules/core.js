/*
* PurrJS JavaScript library.
* (c) 2017, happyCoda.
* MIT License.
* https://github.com/happyCoda/purrjs
*/

import Plumber from './plumber';
import EventBus from './bus';
import Mistake from './mistake';
import utils from './utils';


function Core () {
  if (!(this instanceof Core)) {
    return new Core();
  }
}

Core.prototype = Plumber(Core.prototype).pipe((_pr) => {
    return Object.create(_pr, {
      _name: {
        value: 'Core',
        enumerable: false,
        writable: false
      },
      /*
      * Creates new namespace
      *
      * @param {String} nsstring String representation of the desired namespace.
      * @return {Object} this Returning created namespace object.
      */
      namespace: {
        value(nsstring) {
        	var names = nsstring.split('.'),
        	 parent = {},
           current = parent;

          names.forEach((name) => {
            current[name] = {};
            current = current[name];
          });

        	return parent;
        },
        enumerable: true,
        writable: false
      },

      checkConditions: {
        value(accumulator, nextCondition) {
          let isAccumulatorFunction = this.getKind(accumulator) === 'Function',
            isNextConditionFunction = this.getKind(nextCondition) === 'Function';

            return {
              conditionX: isAccumulatorFunction ? accumulator() : accumulator,
              conditionY: isNextConditionFunction ? nextCondition() : nextCondition
            };
        },
        enumerable: true,
        writable: false
      },

      whenAll: {
        value(conditionList, then) {
          let res;

          res = this.reduce(conditionList, (...args) => {
            let ckecked = this.checkConditions(...args);

            return ckecked.conditionX && ckecked.conditionY;
          });

          if (res) {
            then();
          }
        },
        enumerable: true,
        writable: false
      },

      whenAny: {
        value(conditionList, then) {
          let res;

          res = this.reduce(conditionList, (...args) => {
            let ckecked = this.checkConditions(...args);

            return ckecked.conditionX || ckecked.conditionY;
          });

          if (res) {
            then();
          }
        },
        enumerable: true,
        writable: false
      },

      whenNone: {
        value(conditionList, then) {
          let res;

          res = this.reduce(conditionList, (...args) => {
            let ckecked = this.checkConditions(...args);

            return !ckecked.conditionX && !ckecked.conditionY;
          });

          if (res) {
            then();
          }
        },
        enumerable: true,
        writable: false
      },

      fetch: {
        value(moduleName) {
          return require(`./${moduleName}`);
        },
        enumerable: true,
        writable: false
      }
    });
  }).pipe((_pr) => {
    utils.mixin(_pr, Plumber.prototype, EventBus.prototype, Mistake.prototype);
    return _pr;
  }).flush();

export default Core;
