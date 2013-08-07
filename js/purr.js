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



/*
* @param {any} item Entity for expose
* @param {string} name The name of the exposed entity
*/
Purr.expose = function (item, name) {
	window.exposed = window.exposed || {};

	window.exposed[name] = item;
};


/*
* 
*/
Purr.cleanScope = function () {
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
* @param {array} An array to map through
* @param {function} fn The function which should be called on each array element
*/
Purr.map = function (arr, fn) {
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
* @param {array} arr An array for searching the needle
* @param {any} needle Entity of any type wich we searching for
* @return {boolean} res The result of the searching
*/
Purr.inArray = function (arr, needle) {
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
* @param {array} arr An array we removing from
* @param {any} item Entity we're going to remove
* @return {}
*/
Purr.arrayRemove = function (arr, item) {
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
}

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
Purr.getType = function (obj) {

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
* @param
*/
Purr.objectDump = function (obj) {
	var objStr = '{',
	prop;

	for (prop in obj) {
		objStr += prop + ': ' + obj[prop];
	}
};

//TODO: object exploder that can explode object props to the single variables, using eval