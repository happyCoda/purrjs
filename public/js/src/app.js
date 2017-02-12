import Purr from './purr';

console.log(Purr('hello!').pipe((data) => data.toUpperCase()).flush());

Purr.log('foobar', {
  background: 'green',
  color: 'white',
  display: 'block'
});
