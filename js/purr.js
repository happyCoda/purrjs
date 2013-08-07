/*
* PurrJS JavaScript library. 
* (c) 2013, happyCoda. 
* MIT License. 
* https://github.com/happyCoda/purrjs
*/

var Purr = Purr || {};


/*
* @param item any entity for expose
* @param name string name of the exposed entity
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
* @param
* @param
*/
Purr.map = function (arr, fn) {
	if (typeof Array.prototype.map !== 'undefined') {
		arr.map(fn);
	} else {
		var i = arr.length - 1;

		for (; arr[i]; i--) {
			fn(arr[i]);
		}
	}
};


/*
* @param
* @param
* @return
*/
Purr.inArray = function (arr, needle) {
	var i = arr.length - 1,
	res = false;

	for (; arr[i]; i--) {
		if (arr[i] === needle) {
			res = true;
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