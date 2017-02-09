import Purr from './purr';
import { makeObservable } from './modules/observable';

// console.log(Purr('hello').pipe((data) => data.toUpperCase()).flush());

let person = {name: 'John'};

console.log(person.name);

Purr().makeObservable(person, ({oldVal, val}) => {
  console.log(`Object chanded it's value from ${oldVal} to ${val}`);
});

person.name = 'Bob';

console.log(person.name);