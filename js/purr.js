/*
* PurrJS JavaScript library. 
* (c) 2013, happyCoda. 
* MIT License. 
* https://github.com/happyCoda/purrjs
*/

var Purr = Purr || {};


/*
* @param {}
* @param {}
* @return {}
*/


Purr.util = {};
Purr.array = {};
Purr.string = {};
Purr.object = {};


/*
* Makes any object available in global scope
*
* @param {any} item Entity for expose
* @param {string} name The name of the exposed entity
*/
Purr.util.expose = function (item, name) {
	window.exposed = window.exposed || {};

	window.exposed[name] = item;
};


/*
* 
*/
Purr.util.cleanScope = function () {
	var exps,
	item;

	if (window.exposed) {
		exps = window.exposed;
		for (item in exps) {
			item = exps[item];
			if (Purr.forInCheck(exps, item, 'object')) {
				if (typeof item === 'object') {
					for (item[subItem] in exps[item]) {
						//TODO: check on hasOwnProp
						item[subItem] = null;
					}
				}
				
			}

			exps[item] = null;
		}

		exps = null;

		delete exps;
	}
};


/*
* Iterates through array and executes a callback on each item.
*
* @param {array} arr An array to map through
* @param {function} fn The function which should be called on each array element
* @return {array} mappedArr Changed array.
*/
Purr.array.map = function (arr, fn) {
	var i,
	mappedArr = [];

	if (typeof Array.prototype.map !== 'undefined') {
		arr.map(fn);
	} else {
		i = arr.length - 1;

		for (; arr[i]; i -= 1) {
			mappedArr.push(fn(arr[i]));
		}

		return mappedArr;
	}
};


/*
* Checks wether given item exists in array or not.
*
* @param {array} arr An array for searching the needle.
* @param {any} needle Entity of any type wich we searching for.
* @return {boolean} res The result of the searching.
*/
Purr.array.has = function (arr, needle) {
	var i = arr.length - 1,
	res = false;

	for (; arr[i]; i -= 1) {
		if (arr[i] === needle) {
			res = true;
		}
	}

	return res;
};


/*
* Removes given item from array.
*
* @param {array} arr An array we removing from.
* @param {any} item Entity we're going to remove.
* @return {}
*/
Purr.array.remove = function (arr, item) {
	var i = arr.length - 1;

	if (Array.prototype.indexOf !== 'undefined') {
		arr.splice(arr.indexOf(item), 1);
	} else {
		for (; arr[i]; i -= 1) {
			// TODO: improve it for object items
			if (arr[i] === item) {
				arr.splice(i, 1);
			}
		}
	}
};


/*
*
*/
Purr.array.intersect = function (arr1, arr2) {};

/*
* Makes an array from the given arguments.
*
* @param {any} arguments Any number of any type arguments.
* @return {array} res Result array combined of the given arguments.
*/
Purr.array.create = function () {
	var prop, 
	i = arguments.length - 1,
	firstArg = arguments[0],
	res = [];

	if (i > 1) {
		for (; arguments[i]; i -= 1) {

			res.push(arguments[i]);
			res.reverse();
		}
	} else if (i === 0) {
		if (Purr.util.getType(firstArg) !== 'Object') {
			res.push(firstArg);
		} else {
			for (prop in firstArg) {
				res.push(firstArg[prop]);
			}
		}
	}

	return res;
};

/*
*
*/
// TODO: finish this method
Purr.varDump = function () {
	var vArr = {};
	for (item in Lib) {
		if (typeof Lib[item] !== 'function') {
			vArr[item] = Lib[item];
		}
	}
};


/*
* @param
*/
Purr.findProp = function (propName) {
	if (Lib[propName]) {
		return true;
	}

	return false;
};


/*
* @param
* @param
* @param
* @return
*/
Purr.forInCheck = function (obj, item ,type) {
	if (typeof item === type && !obj.hasOwnProperty(item)) {
		return true;
	}

	return false;
};


/*
* @param
* @param
* @return
*/
Purr.randomNum = function (min, max) {
	//TODO work with algorithm
	var randNum = Math.random()*max;

	randNum = Math.floor(randNum);

	if (randNum <= max && randNum >= min) {
		return randNum;
	}

	Purr.randomNum(min, max);
};


/*
* @param
* @return
*/
Purr.util.getType = function (obj) {

	var toStr = Object.prototype.toString,
	typeStr = toStr.apply(obj, []),
	pattern = /\[object (.+)\]/gi,
	typeRes;

	typeStr.replace(pattern, function (match, gr1) {
		typeRes = gr1;
	});

	return typeRes;
};


/*
* @param
*/
Purr.getClass = function (obj) {
	// var self = this,
	// builtInClasses = [
	// 	'Array',
	// 	'Object',
	// 	'Function',
	// 	'Number',
	// 	'String',
	// 	'Boolean',
	// 	'Error',
	// 	'Null',
	// 	'Undefined'
	// ],
	// className = self.getType(obj);


	// if (className === 'Object') {

	// }

};

/*
* @param {object} Parent Parent class to ingerit from.
* @param {object} props Functionality to add to our new class.
* @return {function} Child The new class inherited from Parent.
*/
Purr.object.klass = function (Parent, props) {
	var Child,
	prop,
	F,
	Parent;

	Child = function () {
		if (Child.uber && Child.uber.hasOwnProperty('_construct')) {
			Child.uber._construct.apply(this, arguments);
		}

		if (Child.prototype.hasOwnProperty('_construct')) {
			Child.prototype._construct.apply(this, arguments);
		}
	};

	

	F = function () {};
	Parent = Parent || {};
	F.prototype = Parent.prototype;
	Child.prototype = new F();
	Child.prototype.constructor = Child;
	Child.uber = Parent.prototype;

	for (prop in props) {
		Child.prototype[prop] = props[prop];
	}

	return Child;
};

/*
* Extends one object by another.
*
* @param {object} recipient Object which will be extended.
* @param {object} donator Object by which will be do extension.
* @return {object} recipient Extended object.
*/
Purr.object.extend = function (recipient, donator) {
	var prop,
	i;

	for (prop in donator) {

		if (donator.hasOwnProperty(prop)) {

			if (typeof donator[prop] === 'object') {
				recipient[prop] = (Purr.util.getType(donator[prop]) === 'Object') ? {} : [];

				Purr.object.extend(recipient[prop], donator[prop]);
			} else {
				recipient[prop] = donator[prop];
			}

			// if (Purr.util.getType(donator[prop]) !== 'Object') {

			// 	if (Purr.util.getType(donator[prop]) !== 'Array') {
			// 		recipient[prop] = donator[prop];
			// 		continue;

			// 	} else {
			// 		recipient[prop] = [];
			// 	}
				
			// } else {
			// 	recipient[prop] = {};
			// }

			// Purr.object.extend(recipient[prop], donator[prop]);
		}
	}

	return recipient;
};


/*
* Extends object by the given functionality. Multiple inheritance.
*
* @param {object} any Any number of arguments with object type.
* @return {object} recipient Object extended with mixins.
*/
Purr.object.mixin = function () {
	var slice = Array.prototype.slice,
	recipient = arguments[0],
	mixins = slice.call(arguments, 1),
	i = mixins.length - 1,
	prop;

	for (; mixins[i]; i -= 1) {
		for (prop in mixins[i]) {
			recipient[prop] = mixins[i][prop];
		}
	}

	return recipient;
}


/*
* @param
*/
Purr.object.dump = function (obj) {
	var objStr = '{',
	prop;

	for (prop in obj) {
		objStr += prop + ': ' + obj[prop];
	}
};

//TODO: object exploder that can explode object props to the single variables, using eval