/*
* PurrJS JavaScript library.
* (c) 2013-2016, happyCoda.
* MIT License.
* https://github.com/happyCoda/purrjs
*/

import Core from './modules/core';

function Purr (data) {
  if (!(this instanceof Purr)) {
    return new Purr(data);
  }

  this._fill(data);
}

Core().mixin(Purr.prototype, Core.prototype);

export default Purr;
