'use strict';

var Interface = (function () {
  function _interface(members) {
    this.members = members;
  }

  _interface.prototype.isImplemented = function (obj) {

    this.members.forEach(function (key) {
      if (typeof obj[key] === 'undefined') {
        throw new Error(key + ' member must be implemented!');
      }
    });
  };

  return _interface;

}());

if (typeof define === 'function' && define.amd) {
  define(['purr'], function (Purr) {

      return Interface;
  });
}

if (typeof module === 'object') {
  module.exports = Interface;
}
