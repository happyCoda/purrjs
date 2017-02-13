import Purr from './purr';

console.log(Purr('hello!').pipe((data) => data.toUpperCase()).flush());

Purr.log('foobar!', {
  background: 'green',
  color: 'white',
  display: 'block'
});

function repeatify(str, num) {
  let res = '';

  Purr.repeat(() => {
    res += str;
  }, 5);

  return res;
}

console.log(repeatify('foo', 5));
