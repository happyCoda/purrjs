import Purr from './modules/purr';
import EventBus from './modules/bus';
import Mistake from './modules/mistake';
import Stream from './modules/stream';
import utils from './modules/utils';

// let bus = new EventBus(),
//   mistake = new Mistake();
//
// bus.on('clak', (data) => {
//   console.log(`clak ${data}`);
// });
//
// bus.emit('clak', 'hello!');
//
// mistake
//   .try(() => {
//     mistake.throw('Gotcha!');
//   })
//   .try(() => {
//     mistake.throw('Another one');
//   })
//   .catch(console.warn);
//
// let codeText = new Stream((...args) => {
//     return document.querySelector(args);
//   }, '.copy')
//   .pipe((el) => {
//     return el.textContent;
//   })
//   .flush();
//
// console.log(codeText);
//
//
// function trimRawStr(rawStr) {
//   return rawStr.trim();
// }
//
// function replaceNewLines(str) {
//   return str.replace('\n', '');
// }
//
// function encodeSpecialChars(str) {
//   return encodeURI(str);
// }
//
// let raw = ' http://wikipedia.org/The\n Great Britain' ;
//
// let clean = new Stream(trimRawStr, raw)
//   .pipe(replaceNewLines)
//   .pipe(encodeSpecialChars)
//   .flush();
//
// console.log(clean);

// new Stream((...list) => {
//   return list.reverse();
// }, 1, 2, 3).pipe((reversed) => {
//   console.log(reversed);
//   return reversed.slice(0, 2);
// }).pipe((sliced) => {
//   console.log(sliced);
//   return sliced.join('#');
// }).pipe((joined) => {
//   console.log(joined);
//   return null;
// });

let o = {
  name: 'Bob',
  rank: 'colonel',
  subordinates: {
    sarge: {
      name: 'Mike',
      rank: 'sergeant'
    }
  },
  wars: ['WWI', 'WWII', 'Vietnam'],
  getName() {
    console.log(this.name);
  }
};

function fn1() {
  return 2 < 1;
}

function fn2() {
  return 'foo' !== null;
}

function fn3() {
  return false;
}

utils.mixin(o, {lastName: 'Smith'}, {getLastName: () => {return this.lastName;}});

console.log(o);
