/*
* PurrJS JavaScript library.
* (c) 2013-2016, happyCoda.
* MIT License.
* https://github.com/happyCoda/purrjs
*/

import utils from './utils';
import Stream from './stream';
import EventBus from './bus';

// let Purr = Purr || {};

function Purr () {}
// Purr._pr = Purr.prototype;

// TODO: add opportunity to call constructors without new keyword
Purr.prototype = new Stream ((_pr) => {
  return _pr;
}, Purr.prototype).pipe((_pr) => {
  return Object.create(_pr, {});
}).pipe((_pr) => {
  return utils.mixin(_pr, Stream.prototype, EventBus.prototype);
});


/*
* @param {}
* @param {}
* @return {}
*/


Purr.util = {};
Purr.array = {};
Purr.string = {};
Purr.object = {};

export default Purr;
