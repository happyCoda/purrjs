import Purr from './purr';
import { makeObservable } from './modules/observable';

// console.log(Purr('hello').pipe((data) => data.toUpperCase()).flush());

let person = {name: 'John'};

console.log(person.name);

makeObservable(person);

person.name = 'Bob';

console.log(person.name);
