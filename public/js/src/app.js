import Purr from './purr';

console.log(Purr('hello!').pipe((data) => data.toUpperCase()).flush());
