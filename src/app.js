import purr from './purr';

// console.log(Purr('hello').pipe((data) => data.toUpperCase()).flush());

let person = { name: 'John' };

console.log(purr.pluck(person, 'name'));
