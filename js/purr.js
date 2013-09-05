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
* @param {string} nsstring String representation of the desired namespace
* @return {object} self Returning Purr object for chaining purposes
*/
Purr.namespace = function (nsstring) {
	var names = nsstring.split('.'),
	self = this,
	len,
	parent = self;

	if (names[0] === 'Purr') {
		names.shift();
	}

	names.reverse();

	for (len = names.length; len--;) {
		if (!parent[names[len]]) {
			parent[names[len]] = {};
		}
		
		parent = parent[names[len]];
	}

	return self;
};

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

// TODO: make an self invoking function here to create closure and contain reference to this in it
Purr.list = function (arr) {
	if (!(this instanceof Purr.list) ) {
		var instance = new Purr.list();
		return instance;
	}
	this.rawArray = arr || [];
	this.length = this.rawArray.length;
	this.klass = Purr.list;
};



Purr.list.create = function (arr) {
	var purrArray = new Purr.list(arr);
	return purrArray;
};

Purr.list.prototype.getRawArray = function () {
	return this.rawArray;
};

Purr.list.prototype.map = function (fn) {
	var self = this,
	len,
	mappedArray = [];
	if (typeof Array.prototype.map !== 'function') {
		for (len = self.length; len--;) {
			mappedArray.push(fn(self.rawArray[len], len));
		}
	} else {
		mappedArray = self.rawArray.map(fn);
	}

	return mappedArray;
};

Purr.list.prototype.reduce = function (fn) {
	var self = this,
	len,
	res;

	for (len = self.length; len--) {

	}
};

Purr.list.prototype.index = function (item) {
	var self = this,
	len,
	itemIndex = -1;

	if (typeof Array.prototype.indexOf !== 'function') {
		for (len = self.length; len--;) {
			if (self.rawArray[len] === item) {
				itemIndex = len;
				break;
			}
		}
	} else {
		itemIndex = self.rawArray.indexOf(item);
	}


	return itemIndex;
};

Purr.list.prototype.filter = function (fn) {
	var self = this,
	len,
	filteredList = Purr.list.create();
};

Purr.list.prototype.forEach = function (fn) {
	var self = this,
	len;

	if (typeof Array.prototype.foreEach !== 'function') {
		for (len = self.length; len--;) {
			fn(self.rawArray(len), len);
		}
	} else {
		self.rawArray.forEach(fn);
	}
	

	return self;
};


Purr.list.prototype.count = function (item) {
	var self = this,
	len,
	duplicatesArray = [],
	count;

	for (len = self.length; len--;) {
		if (self.rawArray[len] === item) {
			duplicatesArray.push(self.rawArray[len]);
		}
	}

	count = duplicatesArray.length;

	return count;
};

Purr.list.prototype.get = function (index) {
	var self = this;

	return self.rawArray[index];
};

Purr.list.prototype.add = function () {
	var self = this,
	len;

	for (len = arguments.length; len--;) {
		self.rawArray.push(arguments[len]);
	}

	return self;
};

Purr.list.prototype.addFirst = function () {
	var self = this,
	slice = Array.prototype.slice,
	elements = slice.call(arguments, null),
	len;

	elements.reverse();

	for (len = elements.length; len--;) {
		self.rawArray.unshift(elements[len]);
	}

	return self;
}


Purr.list.prototype.remove = function () {
	var self = this,
	len,
	removeLogic = function (item) {
		var itemIndex,
		leftPos,
		leftSlice,
		rightPos,
		rightSlice,
		unionSlice;


		itemIndex = self.index(item);

		if (itemIndex === 0) {
			self.rawArray = self.slice(itemIndex + 1).rawArray;
		} else {

			leftPos = 0;
			leftSlice = self.slice(leftPos, itemIndex);
			rightPos = itemIndex + 1;
			rightSlice = self.slice(rightPos);
			unionSlice = leftSlice.union(rightSlice);
			self.rawArray = unionSlice.rawArray;
		}
	};

	if (arguments.length > 1) {
		for (len = arguments.length; len--;) {
			removeLogic(arguments[len]);
		}
	} else {
		removeLogic(arguments[0]);
	}

	self.length -= arguments.length;

	return self;

};


Purr.list.prototype.removeFirst = function () {
	var self = this,
	len = self.length,
	itemToRemove = self.get(0);

	self.remove(itemToRemove);

	return self;
};



Purr.list.prototype.removeLast = function () {
	var self = this,
	len = self.length,
	itemToRemove = self.get(len-1);

	self.remove(itemToRemove);

	return self;
};

Purr.list.prototype.slice = function (left, right) {
	var self = this,
	slicedArray,
	slicedList;

	if (!right) {
		right = self.length;
	}

	slicedArray = self.rawArray.slice(left, right);
	slicedList = Purr.list.create(slicedArray);
	return slicedList;
};

Purr.list.prototype.intersect = function (list) {
	var self = this,
	selfArrayLen,
	listArrayLen,
	intersectList = Purr.list.create();

	for (selfArrayLen = self.length; selfArrayLen--;) {
		for (listArrayLen = list.length; listArrayLen--;) {
			if (self.rawArray[selfArrayLen] === list.rawArray[listArrayLen]) {
				if (intersectList.index(self.rawArray[selfArrayLen]) === -1) {
					intersectList.add(self.rawArray[selfArrayLen]);
				}
				
			}
		}
	}

	return intersectList;

};
Purr.list.prototype.diff = function (list) {
	var self = this,
	selfArrayLen,
	listArrayLen,
	diffList = Purr.list.create([]);

	for (selfArrayLen = self.length; selfArrayLen--;) {
		for (listArrayLen = list.length; listArrayLen--;) {
			if (self.rawArray[selfArrayLen] !== list.rawArray[listArrayLen]) {
				if (diffList.index(self.rawArray[selfArrayLen]) === -1) {
					diffList.add(self.rawArray[selfArrayLen]);
				}
				
			}
		}
	}

	return diffList;
};
Purr.list.prototype.union = function (list) {
	var self = this,
	unionList;

	unionList = Purr.list.create(self.rawArray.concat(list.rawArray));

	return unionList;

};

Purr.list.prototype.some = function (fn) {
	var self = this,
	len,
	res = false;


	if (typeof Array.prototype.some !== 'function') {
		for (len = self.length; len--;) {
			if (fn(self.rawArray[len])) {
				res = true;
				break;
			}
		}
	} else {
		res = self.rawArray.some(fn);
	}

	return res;
};

Purr.list.prototype.every = function (fn) {
	var self = this,
	len,
	res = true;


	if (typeof Array.prototype.some !== 'function') {
		for (len = self.length; len--;) {
			if (!fn(self.rawArray[len])) {
				res = false;
				break;
			}
		}
	} else {
		res = self.rawArray.filter(fn);
	}

	return res;
};
Purr.list.prototype.uniq = function () {
	var self = this,
	len,
	uniqsArray = [],
	purrUniqsList;

	purrUniqsList = Purr.list.create(uniqsArray);

	for (len = self.length; len--;) {

		if (purrUniqsList.index(self.rawArray[len]) === -1) {
			uniqsArray.push(self.rawArray[len]);
		}
	}

	return uniqsArray;
};


Purr.klass = function (obj) {
	var prop;

	if (!(this instanceof Purr.klass) ) {
		var instance = new Purr.klass();
		return instance;
	}

	for (prop in obj) {
		this[prop] = obj[prop];
	}
};

Purr.klass.create = function (obj) {
	var purrObj = new Purr.klass(obj);
	return purrObj;
};

/*Purr.klass.prototype.create = function () {
	var Child = function () {},
	F = function () {};
	F.prototype = this;
	Child.prototype = new F();
	return Child;
};*/

Purr.klass.prototype.extend = function () {
	var argLen = arguments.length - 1,
	loop = function (ctx, loopObj) {
		var prop;

		for (prop in loopObj) {
			ctx[prop] = loopObj[prop];
		}
	};

	if (argLen > 1) {
		for (;arguments[argLen]; argLen--) {
			loop(this, arguments[argLen]);
		}
	} else {
		loop(this, arguments[argLen]);
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
* Searches an intersection between two arrays.
*
* @param {array} arr1 First array to search.
* @param {array} arr2 Second array to search.
* @param {array} arrIntersect An array or intersection results.
*/
Purr.array.intersect = function (arr1, arr2) {
	var arrIntersect = [],
	arr1Len,
	arr2Len;

	for (arr1Len = arr1.length - 1; arr1[arr1Len]; arr1Len--) {
		for (arr2Len = arr2.length - 1; arr2[arr2Len]; arr2Len--) {
			
			if (arr1[arr1Len] === arr2[arr2Len] && !Purr.array.has(arrIntersect, arr1[arr1Len]) && !Purr.array.has(arrIntersect, arr2[arr2Len])) {
				
				arrIntersect.push(arr1[arr1Len]);
			}
		}
	}

	return arrIntersect;


};

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

Purr.util.cast = function (item, type) {
	var casted;

	switch (type) {
		case 'Boolean':
			casted = !!item;
			break;
		case 'Int':
			casted = parseInt(item, 10);
			break;
		case 'String':
			casted = Object.prototype.toString.call(item);
			break;
		default:
			casted = item;
			break;

	}

	return casted;
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