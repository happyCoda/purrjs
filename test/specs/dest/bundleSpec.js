(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var Utils = require('./utils'),
  Interface = require('./interface'),
  Klass = require('./klass'),
  Dispatcher;

Dispatcher = (function () {

  var _dispatcher,
		_dispatcherInterface = new Interface(['subscribe', 'publish']),
		_params = {
			implements: [_dispatcherInterface],

			initialize: function () {
				this.channels = {};
			},

			subscribe: function (channel, context, method) {

        if (!this.channels[channel]) {
          this.channels[channel] = [];
        }

				this.channels[channel].push({
          context: context,
          method: method
        });
			},

			publish: function (channel) {
        var args = Utils.callToSlice(arguments, 1);

				this.channels[channel].forEach(function (subscriber) {
					subscriber.method.apply(subscriber.context, args);
				});
			}
		};

    _dispatcher = Klass(_params);

    return _dispatcher;
}());


if (typeof define === 'function' && define.amd) {
  define(['purr'], function (Purr) {

      return Dispatcher;
  });
}

if (typeof module === 'object') {

  module.exports = Dispatcher;
}

},{"./interface":2,"./klass":3,"./utils":7}],2:[function(require,module,exports){
'use strict';

var Interface = (function () {
  function _interface(members) {
    this.members = members;
  }

  _interface.prototype.ensureImplemented = function (obj) {

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

},{}],3:[function(require,module,exports){
'use strict';

var Utils = require('./utils'),
  Interface = require('./interface'),
  Klass;

Klass = (function () {
  /*
  * @param {Object} obj Params object with klass properties, interfaces and parent classes.
  * @return {function} F The new klass constructor.
  */
  var _klass = function (obj) {
    var F,
      extensions,
      _proto;

    F = function () {
      var args = Utils.callToSlice(arguments),
        initialize = this.initialize,
        interfaces = obj.implements;

      if (initialize) {
        initialize.apply(this, args);
      }

      if (interfaces) {

        interfaces.forEach(function (intr, idx) {

          intr.ensureImplemented(this);

        }, this);
      }
    };

    extensions = obj.extends;

    _proto = F.prototype;

    if (extensions) {
      extensions.forEach(function (extension) {
          var extensionProto = extension.prototype;

          Utils.extend(_proto, extensionProto);
      });
    }

    Utils.each(obj, function (val, key) {
      var temp;

      if (key !== 'implements' && key !== 'extends') {

        if (typeof _proto[key] === 'function') {

          temp = _proto[key];

          _proto[key] = function () {
            var args = Array.prototype.slice.call(arguments);

            args.unshift(temp.bind(this));

            val.apply(this, args);
          };

        } else {

          _proto[key] = val;
        }

      }
    }, null);

    return F;
  };

  return _klass;
}());


if (typeof define === 'function' && define.amd) {
  define(['purr'], function (Purr) {

      return Klass;
  });
}

if (typeof module === 'object') {
  module.exports = Klass;
}

},{"./interface":2,"./utils":7}],4:[function(require,module,exports){
/*
* PurrJS JavaScript library.
* (c) 2013, happyCoda.
* MIT License.
* https://github.com/happyCoda/purrjs
*/

'use strict';

var Utils = require('./utils'),
	Interface = require('./interface'),
	Klass = require('./klass'),
	Dispatcher = require('./dispatcher'),
	MVC;

MVC = (function () {

	return {

		model: function (params) {
			var _modelInterface = new Interface(['add', 'get', 'update', 'remove']),
				_model,
				_params = {
					implements: [_modelInterface],
					add: function () {},
					get: function () {},
					update: function () {},
					remove: function () {}
				};

			if (params) {
				Utils.extend(_params, params);
			}

			_model = Klass(_params);

			return new _model();
		},

		view: function (params) {
			var _viewInterface = new Interface(['render']),
				_view,
				_params = {
					implements: [_viewInterface],
					render: function () {}
				};

				if (params) {
					Utils.extend(_params, params);
				}

				_view = Klass(_params);

				return new _view();
		},

		controller: function (params) {
			var _controllerInterface = new Interface(['subscribe', 'publish']),
				_controller,
				_params = {
					implements: [_controllerInterface],

					extends: [Dispatcher],

					initialize: function (_super) {
						_super();
					}
				};

				if (params) {
					Utils.extend(_params, params);
				}

				_controller = Klass(_params);

				return new _controller();
		},

		// controller.prototype.init: function (params) {
		// 	var self = this;
		//
		// 	self.model = params.model;
		// 	self.view = params.view;
		//
		// 	self.evtHub = eventHub();
		//
		// 	self.eventHub.subscribe('modelChange', self.view.listen);
		// 	self.eventHub.subscribe('viewChange', self.model.listen);
		// },

		// eventHub: function () {
		// 	if (!(this instanceof eventHub)) {
		// 		return new eventHub();
		// 	}
		//
		// 	this.subscribers = {};
		//
		// },
		//
		// eventHub.prototype.subscribe: function (event, subscriber) {
		// 	var self = this;
		//
		// 	self.subscribers[event] = [];
		// 	self.subscribers[event].push(subscriber);
		// },
		//
		// eventHub.prototype.fire: function (event, message) {
		// 	var self = this;
		//
		// 	self.subscribers[event].forEach(function (subscriber, idx) {
		// 		subscriber(message);
		// 	});
		// },
		//
		// eventHub.prototype.unsubscribe: function (event, subscriber) {
		// 	var self = this;
		//
		// 	array.remove(self.subscribers[event], subscriber);
		// },
		//
		//
		//
		//
		// tpl = {
		//
		// 	loopPattern: /\{for\s\$(\w*)\sin\s\$(\w*)\}(.*)\{endfor\}/gi,
		//
		// 	varPattern: /\{\{\$(\w*)\}\}/gi,
		//
		// 	parse: function (tpl, data) {
		//
		// 		var self = this,
		// 		formatedTpl = self.format(tpl),
		// 		root,
		// 		loopBody,
		// 		filledLoop = '',
		// 		res;
		//
		// 		res = formatedTpl.replace(self.loopPattern, function (m, cg1, cg2, cg3) {
		// 			loopBody = cg3;
		//
		// 			data.forEach(function (item) {
		// 				filledLoop += self.fillString(loopBody, item);
		// 			});
		//
		// 			return filledLoop;
		// 		});
		//
		// 		return res;
		// 	},
		//
		// 	format: function (tpl) {
		// 		var formatedTpl = tpl.replace(/\n|\r|\t/gi, '');
		//
		// 		return formatedTpl;
		// 	},
		//
		// 	fillString: function (str, data) {
		// 		var self = this,
		// 		filledString;
		//
		// 		filledString = str.replace(self.varPattern, function (m, cg) {
		// 			return data[cg];
		// 		});
		//
		// 		return filledString;
		// 	}
		// }
	};

}());

if (typeof define === 'function' && define.amd) {
  define(['purr'], function (Purr) {

      return MVC;
  });
}

if (typeof module === 'object') {
  module.exports = MVC;
}

},{"./dispatcher":1,"./interface":2,"./klass":3,"./utils":7}],5:[function(require,module,exports){
/*
* PurrJS JavaScript library.
* (c) 2016, happyCoda.
* MIT License.
* https://github.com/happyCoda/purrjs
*/

'use strict';

var Utils = require('./utils'),
	Interface = require('./interface'),
	Klass = require('./klass'),
	Observable;

Observable = (function () {

  var _observable,
		_observableInterface = new Interface(['add', 'remove', 'notify']),
		_params = {
			implements: [_observableInterface],

			initialize: function () {
				this.observers = [];
			},

			add: function (observer) {
				this.observers.push(observer);
			},

			remove: function (observerToRemove) {
				this.observers = this.observers.filter(function (observer) {
					return observer !== observerToRemove;
				});
			},

			notify: function (message) {
				this.observers.forEach(function (observer) {
					observer.recieve(message);
				});
			}
		};

	_observable = Klass(_params);

  return _observable;

}());

if (typeof define === 'function' && define.amd) {
  define(['purr'], function (Purr) {

      return Observable;
  });
}

if (typeof module === 'object') {
  module.exports = Observable;
}

},{"./interface":2,"./klass":3,"./utils":7}],6:[function(require,module,exports){
/*
* PurrJS JavaScript library.
* (c) 2016, happyCoda.
* MIT License.
* https://github.com/happyCoda/purrjs
*/

'use strict';

var Utils = require('./utils'),
	Interface = require('./interface'),
	Klass = require('./klass'),
	Observer;

Observer = (function () {

    var _observer,
      _observerInterface = new Interface(['observe', 'unObserve', 'recieve']),
      _params = {
        implements: [_observerInterface],

        initialize: function (params) {
          if (params) {
            Utils.extend(this.constructor.prototype, params);
          }
        },

        observe: function (subject) {
          this.subject = subject;
          this.subject.add(this);
        },

        unObserve: function (subject) {
          this.subject = subject;
          this.subject.remove(this);
        },

        recieve: function (message) {}
      };

    _observer = Klass(_params);

  return _observer;

}());

if (typeof define === 'function' && define.amd) {
  define(['purr'], function (Purr) {

      return Observer;
  });
}

if (typeof module === 'object') {
  module.exports = Observer;
}

},{"./interface":2,"./klass":3,"./utils":7}],7:[function(require,module,exports){
/*
* UtilsJS JavaScript library.
* (c) 2016, happyCoda.
* MIT License.
* https://github.com/happyCoda/purrjs
*/

'use strict';

var Utils = (function () {

  return {
    name: 'Utils',

    getType: function (something) {
      var toStr = Object.prototype.toString;

      return toStr.call(something).replace(/\[|\]/g, '').split(' ')[1];
    },

    each: function (iterable, callback, context, usePrototype) {
      var iterableType = this.getType(iterable),
        prop;

      if (iterableType === 'Array') {

        iterable.forEach(callback, context);

      } else if (iterableType === 'Object') {

        if (usePrototype) {

          for (prop in iterable) {

            callback.call(context, iterable[prop], prop);
          }
        } else {

          Object.keys(iterable).forEach(function (key) {
            callback.call(context, iterable[key], key);
          });
        }
      } else {

        throw new Error('Argument must be an Object or an Array');
      }
    },

    unique: function (nonUnique) {
      var i = 0,
        j,
        len = nonUnique.length,
        unique = [];


        for (; i < len; i += 1) {
          for (j = 0; j <= i; j += 1) {
            if (unique[j] === nonUnique[i]) {
              break;
            } else if (j === i) {
              unique.push(nonUnique[i]);
            }
          }
        }

      return unique;
    },

    count: function (haystack, item) {
    	var len = haystack.length,
    	duplicates,
    	count;

      duplicates = haystack.filter(function (needle) {
        return needle === item;
      });

    	count = duplicates.length;

    	return count;
    },

    /*
    * Searches an intersection between two arrays.
    *
    * @param {Array} setA A first array to search.
    * @param {Array} setB A second array to search.
    *
    * @return {Array} intersections An array with intersections.
    */
    intersect: function (setA, setB) {
    	var lenSetA = setA.length,
    	lenSetB = setB.length,
      i = 0,
      j,
      current,
    	intersections = [];

    	for (; i < lenSetA; i += 1) {
    		for (j = 0; j < lenSetB; j += 1) {
          current = setB[j];
    			if (setA[i] === current) {
    				if (intersections.indexOf(current) === -1) {
    					intersections.push(current);
    				}

    			}
    		}
    	}

    	return intersections;

    },

    diff: function (setA, setB) {

    	var lenSetA = setA.length,
      	lenSetB = setB.length,
        i = 0,
        j,
        current,
      	difference = [];

      for (; i < lenSetA; i += 1) {
        current = setA[i];
        if (setB.indexOf(current) === -1) {
          difference.push(current);
        }
    	}

    	return difference;
    },

    contains: function (box, item) {

      var boxType = this.getType(box),
        itemType,
        result = false;
      // TODO: make this method search in objects
      if (boxType === 'Array') {
        if (box.indexOf(item) !== -1) {
          result = true;
        }
      } else {
        throw new Error('Search item must be type of an Array, not – ' + boxType);
      }

      return result;
    },

    callToSlice: function (arrayLike) {
      var slice = Array.prototype.slice,
        params = slice.call(arguments, 1),
        arrayNormalized;

      if (params.length > 0) {

        arrayNormalized = slice.apply(arrayLike, params);
      } else {

        arrayNormalized = slice.call(arrayLike);
      }

      return arrayNormalized;
    },

    /*
    * Extends one object by another.
    *
    * @param {Object} extendable Object which will be extended.
    * @param {Object} extension Object by which will be do extension.
    * @return {Object} extendable Extended object.
    */
    extend: function (extendable, extension, usePrototype) {

      this.each(extension, function (val, prop) {
        extendable[prop] = val;
      }, null, usePrototype);

      return extendable;
    },

    extendDeep: function (extendable, extension) {

      this.each(extension, function (val, prop) {

        var propType = this.getType(val);

        if (propType === 'Array') {

          extendable[prop] = [];

          this.extendDeep(extendable[prop], val);

        } else if (propType === 'Object') {

          extendable[prop] = {};

          this.extendDeep(extendable[prop], val);
        } else {

          extendable[prop] = val;

        }
      }, this);
    },

    /*
    * Extends object by the given functionality. Multiple inheritance.
    *
    * @param {Object} any Any number of arguments with object type.
    * @return {Object} extendable Object extended with mixins.
    */
    mixin: function () {

      var args = this.callToSlice(arguments),
        extendable = args.shift();

      this.each(args, function (mixin) {
        this.extend(extendable, mixin);
      }, this);

      return extendable;
    },

    inspect: function (obj, deeper) {

      var stringified,
        objType = this.getType(obj);

        if (objType === 'Object') {
          stringified = '{';
        } else if (objType === 'Array') {
          stringified = '[';
        } else {
          return obj.toString();
        }

      function callback(objType, val, prop) {
        var propType = this.getType(val);

        if (objType === 'Array') {

          if (propType === 'Object' || propType === 'Array') {
            stringified += this.inspect(val, true);
          } else {
            stringified += '"' + val + '", ';
          }
        } else {
          if (propType === 'Object') {
            stringified += '"' + prop + '": ';
            stringified += this.inspect(val, true);
          } else if (propType === 'Array') {
            stringified += '"' + prop + '": ';
            stringified += this.inspect(val, true);
          } else {
            stringified += '"' + prop + '": "' + val + '", ';
          }
        }

      }

      this.each(obj, callback.bind(this, objType), this);

      stringified = stringified.replace(/(,\s)$/, '');

      stringified += stringified.substr(0, 1) === '{' ? '}' : ']';

      if (deeper) {
        stringified += ', ';
      }

      return stringified;
    },

    /*
    * Makes any object available in global scope
    *
    * @param {Object} global Any global object to include exposable
    * @param {Any} item Entity for expose
    * @param {String} name The name of the exposed entity
    */
    expose: function (global, item, name) {
    	global.exposed = global.exposed || {};

    	global.exposed[name] = item;
    },

    /*
    * @param {Number} min Minimum number boundary.
    * @param {Number} max Maximum number boundary.
    * @return {Number} randNum Random number generated.
    */
    randomNum: function (min, max) {

    	var randNum = Math.random() * max;

    	randNum = Math.round(randNum);

    	if (randNum <= max && randNum >= min) {

    		return randNum;

    	}

    	return this.randomNum(min, max);
    },

    /*
    * @param {String} nsstring String representation of the desired namespace.
    * @return {Object} this Returning created namespace object.
    */
    namespace: function (nsstring) {
    	var names = nsstring.split('.'),
    	 parent = {},
       current = parent;

      names.forEach(function (name) {
        current[name] = {};
        current = current[name];
      });

    	return parent;
    }
  };
}());

if (typeof define === 'function' && define.amd) {
  define(['purr'], function (Purr) {

      return Utils;
  });
}

if (typeof module === 'object') {
  module.exports = Utils;
}

},{}],8:[function(require,module,exports){
'use strict';

describe('dispatcher.js suite', function () {

  var Dispatcher = require('../../js/dispatcher'),
    controller,
    someUIObj;

  beforeEach(function () {

    controller = new Dispatcher();

    someUIObj = {
      data: 'some data',

      update: function (newData) {
        this.data = newData;
      }
    };
  });

  it('should create channels list', function () {

    expect(typeof controller.channels).toEqual('object');
  });

  it('should implement subscribe method', function () {

    controller.subscribe('change', someUIObj, someUIObj.update);

    expect(controller.channels['change']).toBeDefined();
    expect(controller.channels['change'][0].method).toEqual(someUIObj.update);
  });

  it('should implement publish method', function () {

    var updates = 'updated data';

    spyOn(someUIObj, 'update').and.callThrough();

    controller.subscribe('change', someUIObj, someUIObj.update);

    controller.publish('change', updates);

    expect(someUIObj.update).toHaveBeenCalled();
    expect(someUIObj.data).toEqual(updates);
  });
});

},{"../../js/dispatcher":1}],9:[function(require,module,exports){
'use strict';

describe('interface.js suite', function () {

  var Interface = require('../../js/interface'),
    PersonInterface;

  beforeEach(function () {
    PersonInterface = new Interface(['getName', 'setName']);
  });

  it('should check for implementation', function () {

    expect(function () {
      PersonInterface.ensureImplemented({
        getName: function () {},

        setName: function () {}
      });
    }).not.toThrow();

    expect(function () {
      PersonInterface.ensureImplemented({

        setName: function () {}
      });
    }).toThrow();

  });
});

},{"../../js/interface":2}],10:[function(require,module,exports){
'use strict';

describe('klass.js suite', function () {

  var Interface = require('../../js/interface'),
    Klass = require('../../js/klass'),
    personInterface,
    Person,
    john;

  beforeEach(function () {
    personInterface = new Interface(['getName', 'setName']);

    Person = Klass({
      implements: [personInterface],
      getName: function () {},
      setName: function () {}
    });
  });

  it('should create new constructors', function () {

    john = new Person();

    expect(typeof Klass).toEqual('function');

    expect(john.getName).toBeDefined();
  });

  it('should use initialize method', function () {

    var initSpy = jasmine.createSpy('initSpy'),
      PersonWithInit = Klass({
        initialize: initSpy
      });

    john = new PersonWithInit('John');

    expect(initSpy).toHaveBeenCalled();
    expect(initSpy.calls.mostRecent().args[0]).toEqual('John');
  });

  it('should know how to use interfaces', function () {

    spyOn(personInterface, 'ensureImplemented');

    john = new Person();

    expect(personInterface.ensureImplemented).toHaveBeenCalled();
    expect(personInterface.ensureImplemented).not.toThrow();
  });

  it('should implement multiple interfaces', function () {

    var betterPersonInterface = new Interface(['getAge', 'sayHello']),
      BetterPerson = Klass({
        implements: [personInterface, betterPersonInterface],
        getName: function () {},
        setName: function () {},
        sayHello: function () {}
      }),
      jamesBond;

    spyOn(personInterface, 'ensureImplemented');

    jamesBond = spyOn(betterPersonInterface, 'ensureImplemented').and.callFake(function () {});

    john = new BetterPerson();

    expect(personInterface.ensureImplemented).toHaveBeenCalled();
    expect(betterPersonInterface.ensureImplemented).toHaveBeenCalled();
    expect(function () {
      jamesBond.and.callThrough();
      betterPersonInterface.ensureImplemented(john);
    }).toThrow();
  });

  it('should extend other klasses', function () {
    var Hero = Klass({
      extends: [Person],
      fly: function () {}
    }),
    superman = new Hero();

    expect(superman.getName).toBeDefined();
  });

  it('should be able to call superklass methods', function () {
    var Hero, superman;

    spyOn(Person.prototype, 'getName').and.callThrough();

    Hero = Klass({
      extends: [Person],
      fly: function () {},
      getName: function (_super) {

        _super();
      }
    });

    superman = new Hero();

    superman.getName();

    expect(Person.prototype.getName).toHaveBeenCalled();
  });
});

},{"../../js/interface":2,"../../js/klass":3}],11:[function(require,module,exports){
'use strict';

describe('mvc.js suite', function () {
  var Interface = require('../../js/interface'),
    Utils = require('../../js/utils'),
    Klass = require('../../js/klass'),
    MVC = require('../../js/mvc');

  it('should create models', function () {

    var user = new MVC.model();

    expect(user.add).toBeDefined();
    expect(user.get).toBeDefined();
    expect(user.update).toBeDefined();
    expect(user.remove).toBeDefined();
  });

  it('should create custom models', function () {

    var user = new MVC.model({
        add: function (data) {
          return data;
        }
      }),
      data = 'some data';

    spyOn(user, 'add').and.callThrough();

    user.add(data);

    expect(user.add.calls.mostRecent().returnValue).toEqual(data);
  });

  it('should create views', function () {

    var userView = new MVC.view();

    expect(userView.render).toBeDefined();

  });

  it('should create custom views', function () {

    var userView = new MVC.view({
        render: function (data) {
          return data;
        }
      }),
      data = 'some data';

    spyOn(userView, 'render').and.callThrough();

    userView.render(data);

    expect(userView.render.calls.mostRecent().returnValue).toEqual(data);
  });

  it('should create controllers', function () {

    var user = new MVC.model(),
      userView = new MVC.view(),
      userController = new MVC.controller(),
      updates = 'some new data';

    spyOn(user, 'update');

    spyOn(userView, 'render');

    userController.subscribe('change', user, user.update);

    userController.subscribe('update', userView, userView.render);

    userController.publish('change', updates);

    userController.publish('update', updates);

    expect(user.update).toHaveBeenCalled();

    expect(user.update.calls.mostRecent().args[0]).toEqual(updates);

    expect(userView.render).toHaveBeenCalled();

    expect(userView.render.calls.mostRecent().args[0]).toEqual(updates);

  });

  it('should provide communication between all app components', function () {
    var user = new MVC.model({
        update: function (data) {
          this.data = data;
        },
        fetch: function (dispatcher) {
          var data = Math.round(Math.random() * 100) + 'xxx' + Math.round(Math.random() * 33) + 'yyy';

          dispatcher.publish('update', data);
        }
      }),
      userView = new MVC.view({
        onChange: function (dispatcher, data) {
          dispatcher.publish('change', data);
        },
        render: function (data) {
          this.data = data;
        }
      }),
      userController = new MVC.controller();

    spyOn(user, 'update');

    spyOn(userView, 'render');

    userController.subscribe('change', user, user.update);

    userController.subscribe('update', userView, userView.render);

    user.fetch(userController);

    userView.onChange(userController, 'some data');

    expect(user.update).toHaveBeenCalled();

    expect(user.update.calls.mostRecent().args[0]).toEqual('some data');

    expect(userView.render).toHaveBeenCalled();

    expect((/\d+[x]{3}\d+[y]{3}/gi).test(userView.render.calls.mostRecent().args[0])).toBeTruthy();
  });
});

},{"../../js/interface":2,"../../js/klass":3,"../../js/mvc":4,"../../js/utils":7}],12:[function(require,module,exports){
'use strict';

describe('observable.js suite', function () {

    var Observable = require('../../js/observable'),
      Observer = require('../../js/observer'),
      obs,
      watcher;

    beforeEach(function () {
      obs = new Observable();

      watcher = new Observer({
        recieve: function (message) {
          console.log(message);
        }
      });
    });

    it('should create an observable instance', function () {

      expect(typeof obs).toEqual('object');
      expect(obs.observers).toBeDefined();
    });

    it('should implement add method', function () {

      expect(obs.add).toBeDefined();

      watcher.observe(obs);

      expect(obs.observers.length).toEqual(1);
    });

    it('should implement remove method', function () {

      expect(obs.remove).toBeDefined();

      watcher.unObserve(obs);

      expect(obs.observers.length).toEqual(0);
    });

    it('should implement notify method', function () {

      var message = 'Attention!';

      expect(obs.notify).toBeDefined();

      watcher.observe(obs);

      spyOn(watcher, 'recieve');

      obs.notify(message);

      expect(watcher.recieve).toHaveBeenCalled();

      expect(watcher.recieve.calls.mostRecent().args[0]).toEqual(message);
    });
});

},{"../../js/observable":5,"../../js/observer":6}],13:[function(require,module,exports){
'use strict';

var Utils = require('../../js/utils');

describe('utils.js suite', function () {

  it('should be an object', function () {

    expect(typeof Utils).toEqual('object');
  });

  it('should define correct type of the passed argument', function () {

    expect(Utils.getType([])).toEqual('Array');
    expect(Utils.getType({})).toEqual('Object');
    expect(Utils.getType(function () {})).toEqual('Function');
    expect(Utils.getType(null)).toEqual('Null');
    expect(Utils.getType(2)).toEqual('Number');
    expect(Utils.getType(new Date())).toEqual('Date');
    expect(Utils.getType(new Error())).toEqual('Error');

  });

  it('should iterate through an object', function () {
    var barInFoo = false;

    Utils.each({foo: 'bar'}, function (item) {
      if (item === 'bar') {
        barInFoo = true;
      }
    });

    expect(barInFoo).toBeTruthy();

  });

  it('should handle inapropriate types of arguments', function () {

    expect(Utils.each.bind(Utils, ('inapropriate'))).toThrow();

  });

  it('should be able to work with prototype chain', function () {
    var doStuff = false,
      TestCase = function () {
        this.buzz = 'word';
      };

    TestCase.prototype.doStuff = function () {};

    Utils.each(new TestCase(), function (item, key) {
      if (key === 'doStuff') {
        doStuff = true;
      }
    }, null, true);

    expect(doStuff).toBeTruthy();

  });

  it('should transform arrays with duplicates into arrays with unique elements', function () {

    expect(Utils.unique([1, 2, 3, 2])).toEqual([1, 2, 3]);

  });

  it('should implement a count method', function () {

    expect(Utils.count([2, 4, 6, 2, 5, 2], 2)).toEqual(3);

  });

  it('should implement an intersect method', function () {

    expect(Utils.intersect([2, 3, 4, 5, 6], [7, 9, 6, 3, 1])).toEqual([3, 6]);

  });

  it('should implement a diff method', function () {

    var setA = ['cat', 'dog', 'fish'],
      setB = ['cheese', 'tomato', 'fish'],
      expected = ['cat', 'dog'];

    expect(Utils.diff(setA, setB)).toEqual(expected);

  });

  it('should implement an contains method', function () {
    var tools = ['Babel', 'Grunt.js', 'Jasmine'];

    expect(Utils.contains(tools, 'Gulp.js')).toBeFalsy();
  });

  it('should transform an argument into an array', function () {
    var transformed,
      transformedWithShift;

    (function () {
      transformed = Utils.callToSlice(arguments);
      transformedWithShift = Utils.callToSlice(arguments, 1);
    } ('foo', 'bar', 'baz'));

    expect(Utils.getType(transformed)).toEqual('Array');
    expect(transformedWithShift.length).toEqual(2);
  });

  it('should implement an extend method', function () {
    var simpleObj = {
        name: 'Conan'
      },
      largeObj = {
        age: 23,
        klass: 'barbarian'
      };

    expect(Utils.extend(simpleObj, largeObj).klass).toEqual('barbarian');
  });

  it('should implement an extendDeep method', function () {
    var original = {
        name: 'Darth',
        inventory: {
          armour: 'helmet',
          weapon: 'lightsabre'
        }
      },
      copy = {};

      Utils.extendDeep(copy, original);

      copy.inventory.clothes = 'black cloak';

    expect(original.inventory.clothes).toBe(undefined);
  });

  it('should implement a mixin method', function () {
    var simpleObj = {
        name: 'Conan'
      },
      largeObj = {
        age: 23,
        klass: 'barbarian'
      },
      superObj = {
        skills: {
          'attack': 32,
          'defence': 24,
          'wisdom': 7
        },
        weapon: 'two-handed sword'
      };

    expect(Utils.mixin(simpleObj, largeObj, superObj).weapon).toEqual('two-handed sword');
  });

  it('should implement an inspect method', function () {
    var darth = {
      name: 'Vader',
      usePower: function () {},
      enemies: ['Skywalker', {name: 'Kenobi'}, 'Yoda'],
      misc: {
        side: 'dark'
      }
    },
    expected = '{"name": "Vader", "usePower": "function () {}", ';

    expected += '"enemies": ["Skywalker", {"name": "Kenobi"}, "Yoda"], ';

    expected += '"misc": {"side": "dark"}}';

    expect(Utils.inspect(darth)).toEqual(expected);
  });

  it('should implement random number generation', function () {

    var inBetween = Utils.randomNum(10, 49);

    expect(inBetween).not.toBeLessThan(10);
    expect(inBetween).not.toBeGreaterThan(49);
  });

  it('should create namespaces', function () {

    var ns = Utils.namespace('foo.bar.baz');

    expect(typeof ns).toEqual('object');
    expect(typeof ns.foo.bar.baz).toEqual('object');
  });
});

},{"../../js/utils":7}]},{},[8,9,10,11,12,13]);
