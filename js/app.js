'use strict';
var stringWithWildcards = 'Hello, mr. %s! You are %d now!',
nameToFormat = 'Smith',
age = 30,
Purr = Purr || {
  string: {
    format: function () {}
  }
};
Purr.string.format(stringWithWildcards, nameToFormat, age);
