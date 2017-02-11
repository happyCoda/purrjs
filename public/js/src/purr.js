/*
* PurrJS JavaScript library.
* (c) 2013-2016, happyCoda.
* MIT License.
* https://github.com/happyCoda/purrjs
*/

import Core from './modules/core';
import utils from './modules/utils';
import makeObservable from './modules/observable';

function Purr (data) {
  if (!(this instanceof Purr)) {
    return new Purr(data);
  }

  this.push(data);
}

utils.mixin(Purr, utils, { makeObservable });
utils.mixin(Purr.prototype, Core.prototype);
Object.defineProperty(Purr.prototype, '_name', {
  value: 'Purr',
  enumerable: false,
  writable: false
});

export default Purr;
