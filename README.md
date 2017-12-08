# Purr.js
> Simple JavaScript utility library with respect to FP

## Installation
Library can be installed via downloading a git repo:

```shell
git clone https://github.com/happyCoda/purrjs.git
```

or from npm:
```shell
npm i purrjs
```

## Functions

<dl>
<dt><a href="#_checkType">_checkType(thing)</a> ⇒ <code>Boolean</code></dt>
<dd><p>Checks entity&#39;s type</p>
</dd>
<dt><a href="#_throwIfNotObjectOrArrayOrString">_throwIfNotObjectOrArrayOrString(thing)</a></dt>
<dd><p>Throws if entity is not Object, Array or String. Wrapper method over _throwIfNotOneOfTypes</p>
</dd>
<dt><a href="#_throwIfNotObjectOrArray">_throwIfNotObjectOrArray(thing)</a></dt>
<dd><p>Throws if entity is not Object or Array. Wrapper method over _throwIfNotOneOfTypes</p>
</dd>
<dt><a href="#_throwIfNotOneOfTypes">_throwIfNotOneOfTypes(thing, types)</a></dt>
<dd><p>Throws if entity is not of one of types provided</p>
</dd>
<dt><a href="#_throwWrongType">_throwWrongType(expected, given)</a></dt>
<dd><p>Throws exception with given explanations</p>
</dd>
<dt><a href="#_checkArity">_checkArity(args, arity)</a> ⇒ <code>Boolean</code></dt>
<dd><p>Checks if args given fits arity provided</p>
</dd>
<dt><a href="#_expose">_expose(global, item, name)</a></dt>
<dd><p>Makes any object available in global scope</p>
</dd>
<dt><a href="#_inspect">_inspect(collection, deeper)</a> ⇒ <code>String</code></dt>
<dd><p>Inspects objects</p>
</dd>
<dt><a href="#_setRecursionMaxDepth">_setRecursionMaxDepth(value)</a></dt>
<dd><p>Sets maximum recursion depth (useful for walk method)</p>
</dd>
<dt><a href="#isObject">isObject(thing)</a> ⇒ <code>Boolean</code></dt>
<dd><p>Checks if entity is an Object</p>
</dd>
<dt><a href="#isArray">isArray(thing)</a> ⇒ <code>Boolean</code></dt>
<dd><p>Checks if entity is an Array</p>
</dd>
<dt><a href="#isFunction">isFunction(thing)</a> ⇒ <code>Boolean</code></dt>
<dd><p>Checks if entity is an Function</p>
</dd>
<dt><a href="#isBoolean">isBoolean(thing)</a> ⇒ <code>Boolean</code></dt>
<dd><p>Checks if entity is an Boolean</p>
</dd>
<dt><a href="#isNumber">isNumber(thing)</a> ⇒ <code>Boolean</code></dt>
<dd><p>Checks if entity is an Number</p>
</dd>
<dt><a href="#isString">isString(thing)</a> ⇒ <code>Boolean</code></dt>
<dd><p>Checks if entity is an String</p>
</dd>
<dt><a href="#isNull">isNull(thing)</a> ⇒ <code>Boolean</code></dt>
<dd><p>Checks if entity is an Null</p>
</dd>
<dt><a href="#isUndefined">isUndefined(thing)</a> ⇒ <code>Boolean</code></dt>
<dd><p>Checks if entity is an Undefined</p>
</dd>
<dt><a href="#isSymbol">isSymbol(thing)</a> ⇒ <code>Boolean</code></dt>
<dd><p>Checks if entity is an Symbol</p>
</dd>
<dt><a href="#is">is(thing, type)</a> ⇒ <code>Boolean</code></dt>
<dd><p>Checks if entity has a given type</p>
</dd>
<dt><a href="#isOneOfTypes">isOneOfTypes(thing, types)</a> ⇒ <code>Boolean</code></dt>
<dd><p>Checks if entity has one of the given types</p>
</dd>
<dt><a href="#isTruthy">isTruthy(thing)</a> ⇒ <code>Boolean</code></dt>
<dd><p>Checks if entity has a truthy value</p>
</dd>
<dt><a href="#isEmpty">isEmpty(thing)</a> ⇒ <code>Boolean</code></dt>
<dd><p>Checks if entity has an empty value (&#39;&#39;, [], {})</p>
</dd>
<dt><a href="#curry">curry(func, arity, context)</a> ⇒ <code>function</code> | <code>Any</code></dt>
<dd><p>Performs function currying</p>
</dd>
<dt><a href="#compose">compose(...args)</a> ⇒ <code>function</code></dt>
<dd><p>Composed functions</p>
</dd>
<dt><a href="#noop">noop(thing)</a> ⇒ <code>Any</code></dt>
<dd><p>Function placeholder in case you need some callback. Simply returns given value</p>
</dd>
<dt><a href="#each">each(collection, func)</a></dt>
<dd><p>Iterates over collection and calls callback on every iteration</p>
</dd>
<dt><a href="#map">map(collection, func)</a> ⇒ <code>Arrray</code> | <code>Object</code> | <code>String</code></dt>
<dd><p>Iterates over collection and calls callback on every iteration</p>
</dd>
<dt><a href="#reduce">reduce(collection, func, acc)</a> ⇒ <code>Any</code></dt>
<dd><p>Reduces collection to single value</p>
</dd>
<dt><a href="#filter">filter(collection, func, reverse)</a> ⇒ <code>Arrray</code> | <code>Object</code> | <code>String</code></dt>
<dd><p>Filter collection by criteria</p>
</dd>
<dt><a href="#reject">reject(collection, func)</a> ⇒ <code>Arrray</code> | <code>Object</code> | <code>String</code></dt>
<dd><p>Reject collection&#39;s items by criteria</p>
</dd>
<dt><a href="#all">all(collection, func)</a> ⇒ <code>Arrray</code> | <code>Object</code> | <code>String</code></dt>
<dd><p>Checks if all collection&#39;s items fit criteria</p>
</dd>
<dt><a href="#any">any(collection, func)</a> ⇒ <code>Arrray</code> | <code>Object</code> | <code>String</code></dt>
<dd><p>Checks if any collection&#39;s items fit criteria</p>
</dd>
<dt><a href="#times">times(num, func)</a></dt>
<dd><p>Calls the function a specified number of times</p>
</dd>
<dt><a href="#find">find(collection, func)</a> ⇒ <code>Arrray</code> | <code>Object</code> | <code>Undefined</code></dt>
<dd><p>Searches element in collection</p>
</dd>
<dt><a href="#contains">contains(collection, valOrKey)</a> ⇒ <code>Boolean</code></dt>
<dd><p>Checks if element is in collection</p>
</dd>
<dt><a href="#destroy">destroy(collection, key)</a> ⇒ <code>Boolean</code></dt>
<dd><p>Deletes property from collection</p>
</dd>
<dt><a href="#groupBy">groupBy(collection, criteria)</a> ⇒ <code>Object</code></dt>
<dd><p>Group collection&#39;s elements by given criteria</p>
</dd>
<dt><a href="#orderBy">orderBy(collection, criteria, direction)</a> ⇒ <code>Array</code></dt>
<dd><p>Order collection&#39;s elements by given criteria and direction</p>
</dd>
<dt><a href="#uniq">uniq(collection)</a> ⇒ <code>Object</code></dt>
<dd><p>Drops all collection&#39;s duplicates</p>
</dd>
<dt><a href="#toArray">toArray(arrayLike)</a> ⇒ <code>Array</code></dt>
<dd><p>Converts array like structures to array</p>
</dd>
<dt><a href="#debounce">debounce(fn, wait, asap)</a> ⇒ <code>function</code></dt>
<dd><p>Creates debounced version of the function given</p>
</dd>
<dt><a href="#pluck">pluck(collection, key)</a> ⇒ <code>Array</code></dt>
<dd><p>Creates new collection from the old one by the given key</p>
</dd>
<dt><a href="#omit">omit(collection, key)</a> ⇒ <code>Object</code></dt>
<dd><p>Drops values from collection</p>
</dd>
<dt><a href="#extend">extend(collection, source)</a> ⇒ <code>Object</code></dt>
<dd><p>Extends collection</p>
</dd>
<dt><a href="#clone">clone(collection)</a> ⇒ <code>Object</code></dt>
<dd><p>Clones collection</p>
</dd>
<dt><a href="#mixin">mixin(collection, ...sources)</a> ⇒ <code>Object</code></dt>
<dd><p>Ads mixin&#39;s props to the collection</p>
</dd>
<dt><a href="#chunk">chunk(collection, size, start)</a> ⇒ <code>Object</code></dt>
<dd><p>Gets collection chunk</p>
</dd>
<dt><a href="#size">size(collection)</a> ⇒ <code>Number</code></dt>
<dd><p>Calculates collection size</p>
</dd>
<dt><a href="#walk">walk(collection, func, parent, depth)</a></dt>
<dd><p>Walks collection recursively</p>
</dd>
<dt><a href="#flatten">flatten(collection, flatArr)</a></dt>
<dd><p>Makes multidimensional arrays flat</p>
</dd>
<dt><a href="#inject">inject(obj, stuff)</a> ⇒ <code>Object</code></dt>
<dd><p>Injects logic from purr to given object</p>
</dd>
<dt><a href="#namespace">namespace(parent, nsstring)</a> ⇒ <code>Object</code></dt>
<dd><p>Creates namespace on the given object or new object</p>
</dd>
<dt><a href="#ensureImplements">ensureImplements(obj, methods)</a> ⇒ <code>Boolean</code></dt>
<dd><p>Ensures than object implements given interface</p>
</dd>
<dt><a href="#randomNum">randomNum(min, max)</a> ⇒ <code>Number</code></dt>
<dd><p>Generates random number</p>
</dd>
</dl>

<a name="_checkType"></a>

## _checkType(thing) ⇒ <code>Boolean</code>
Checks entity's type

**Kind**: global function  
**Returns**: <code>Boolean</code> - true or false  

| Param | Type | Description |
| --- | --- | --- |
| thing | <code>Any</code> | Entity to check type for |

<a name="_throwIfNotObjectOrArrayOrString"></a>

## _throwIfNotObjectOrArrayOrString(thing)
Throws if entity is not Object, Array or String. Wrapper method over _throwIfNotOneOfTypes

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| thing | <code>Any</code> | Entity to check type for |

<a name="_throwIfNotObjectOrArray"></a>

## _throwIfNotObjectOrArray(thing)
Throws if entity is not Object or Array. Wrapper method over _throwIfNotOneOfTypes

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| thing | <code>Any</code> | Entity to check type for |

<a name="_throwIfNotOneOfTypes"></a>

## _throwIfNotOneOfTypes(thing, types)
Throws if entity is not of one of types provided

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| thing | <code>Any</code> | Entity to check type for |
| types | <code>Array</code> | Array of types to check against |

<a name="_throwWrongType"></a>

## _throwWrongType(expected, given)
Throws exception with given explanations

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| expected | <code>String</code> | Expected type(s) |
| given | <code>String</code> | Type provided |

<a name="_checkArity"></a>

## _checkArity(args, arity) ⇒ <code>Boolean</code>
Checks if args given fits arity provided

**Kind**: global function  
**Returns**: <code>Boolean</code> - true or false  

| Param | Type | Description |
| --- | --- | --- |
| args | <code>Array</code> | Arguments array |
| arity | <code>Number</code> | Arity of a function |

<a name="_expose"></a>

## _expose(global, item, name)
Makes any object available in global scope

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| global | <code>Object</code> | Any global object to include exposable |
| item | <code>Any</code> | Entity for expose |
| name | <code>String</code> | The name of the exposed entity |

<a name="_inspect"></a>

## _inspect(collection, deeper) ⇒ <code>String</code>
Inspects objects

**Kind**: global function  
**Returns**: <code>String</code> - stringified Stringified collection representation  

| Param | Type | Description |
| --- | --- | --- |
| collection | <code>Object</code> | Can be array or object |
| deeper | <code>Boolean</code> | Wether we need trailing coma |

<a name="_setRecursionMaxDepth"></a>

## _setRecursionMaxDepth(value)
Sets maximum recursion depth (useful for walk method)

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>Number</code> | New recursion depth |

<a name="isObject"></a>

## isObject(thing) ⇒ <code>Boolean</code>
Checks if entity is an Object

**Kind**: global function  
**Returns**: <code>Boolean</code> - true or false  

| Param | Type | Description |
| --- | --- | --- |
| thing | <code>Any</code> | Entity to check type for |

<a name="isArray"></a>

## isArray(thing) ⇒ <code>Boolean</code>
Checks if entity is an Array

**Kind**: global function  
**Returns**: <code>Boolean</code> - true or false  

| Param | Type | Description |
| --- | --- | --- |
| thing | <code>Any</code> | Entity to check type for |

<a name="isFunction"></a>

## isFunction(thing) ⇒ <code>Boolean</code>
Checks if entity is an Function

**Kind**: global function  
**Returns**: <code>Boolean</code> - true or false  

| Param | Type | Description |
| --- | --- | --- |
| thing | <code>Any</code> | Entity to check type for |

<a name="isBoolean"></a>

## isBoolean(thing) ⇒ <code>Boolean</code>
Checks if entity is an Boolean

**Kind**: global function  
**Returns**: <code>Boolean</code> - true or false  

| Param | Type | Description |
| --- | --- | --- |
| thing | <code>Any</code> | Entity to check type for |

<a name="isNumber"></a>

## isNumber(thing) ⇒ <code>Boolean</code>
Checks if entity is an Number

**Kind**: global function  
**Returns**: <code>Boolean</code> - true or false  

| Param | Type | Description |
| --- | --- | --- |
| thing | <code>Any</code> | Entity to check type for |

<a name="isString"></a>

## isString(thing) ⇒ <code>Boolean</code>
Checks if entity is an String

**Kind**: global function  
**Returns**: <code>Boolean</code> - true or false  

| Param | Type | Description |
| --- | --- | --- |
| thing | <code>Any</code> | Entity to check type for |

<a name="isNull"></a>

## isNull(thing) ⇒ <code>Boolean</code>
Checks if entity is an Null

**Kind**: global function  
**Returns**: <code>Boolean</code> - true or false  

| Param | Type | Description |
| --- | --- | --- |
| thing | <code>Any</code> | Entity to check type for |

<a name="isUndefined"></a>

## isUndefined(thing) ⇒ <code>Boolean</code>
Checks if entity is an Undefined

**Kind**: global function  
**Returns**: <code>Boolean</code> - true or false  

| Param | Type | Description |
| --- | --- | --- |
| thing | <code>Any</code> | Entity to check type for |

<a name="isSymbol"></a>

## isSymbol(thing) ⇒ <code>Boolean</code>
Checks if entity is an Symbol

**Kind**: global function  
**Returns**: <code>Boolean</code> - true or false  

| Param | Type | Description |
| --- | --- | --- |
| thing | <code>Any</code> | Entity to check type for |

<a name="is"></a>

## is(thing, type) ⇒ <code>Boolean</code>
Checks if entity has a given type

**Kind**: global function  
**Returns**: <code>Boolean</code> - true or false  

| Param | Type | Description |
| --- | --- | --- |
| thing | <code>Any</code> | Entity to check type for |
| type | <code>String</code> | Entity's type to check against |

<a name="isOneOfTypes"></a>

## isOneOfTypes(thing, types) ⇒ <code>Boolean</code>
Checks if entity has one of the given types

**Kind**: global function  
**Returns**: <code>Boolean</code> - true or false  

| Param | Type | Description |
| --- | --- | --- |
| thing | <code>Any</code> | Entity to check type for |
| types | <code>Array</code> | Entity's types to check against |

<a name="isTruthy"></a>

## isTruthy(thing) ⇒ <code>Boolean</code>
Checks if entity has a truthy value

**Kind**: global function  
**Returns**: <code>Boolean</code> - true or false  

| Param | Type | Description |
| --- | --- | --- |
| thing | <code>Any</code> | Entity to check |

<a name="isEmpty"></a>

## isEmpty(thing) ⇒ <code>Boolean</code>
Checks if entity has an empty value ('', [], {})

**Kind**: global function  
**Returns**: <code>Boolean</code> - true or false  

| Param | Type | Description |
| --- | --- | --- |
| thing | <code>Any</code> | Entity to check |

<a name="curry"></a>

## curry(func, arity, context) ⇒ <code>function</code> \| <code>Any</code>
Performs function currying

**Kind**: global function  
**Returns**: <code>function</code> \| <code>Any</code> - Returns curried function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| func | <code>function</code> |  | Function to curry |
| arity | <code>Number</code> | <code>2</code> | Number of arguments curried function expected |
| context | <code>Object</code> | <code></code> | Context to apply curried function on |

<a name="compose"></a>

## compose(...args) ⇒ <code>function</code>
Composed functions

**Kind**: global function  
**Returns**: <code>function</code> - Curried function  

| Param | Type | Description |
| --- | --- | --- |
| ...args | <code>\*</code> | Functions to compose |

<a name="noop"></a>

## noop(thing) ⇒ <code>Any</code>
Function placeholder in case you need some callback. Simply returns given value

**Kind**: global function  
**Returns**: <code>Any</code> - thing Some argument  

| Param | Type | Description |
| --- | --- | --- |
| thing | <code>Any</code> | Some argument |

<a name="each"></a>

## each(collection, func)
Iterates over collection and calls callback on every iteration

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| collection | <code>Arrray</code> \| <code>Object</code> \| <code>String</code> | Collection to iterate over |
| func | <code>function</code> | Callback function to to call |

<a name="map"></a>

## map(collection, func) ⇒ <code>Arrray</code> \| <code>Object</code> \| <code>String</code>
Iterates over collection and calls callback on every iteration

**Kind**: global function  
**Returns**: <code>Arrray</code> \| <code>Object</code> \| <code>String</code> - collectionMapped New mapped collection  

| Param | Type | Description |
| --- | --- | --- |
| collection | <code>Arrray</code> \| <code>Object</code> \| <code>String</code> | Collection to iterate over |
| func | <code>function</code> | Callback function to call |

<a name="reduce"></a>

## reduce(collection, func, acc) ⇒ <code>Any</code>
Reduces collection to single value

**Kind**: global function  
**Returns**: <code>Any</code> - acc Reduced value  

| Param | Type | Description |
| --- | --- | --- |
| collection | <code>Arrray</code> \| <code>Object</code> \| <code>String</code> | Collection to reduce |
| func | <code>function</code> | Callback function to call |
| acc | <code>Any</code> | Some initial accumulator value |

<a name="filter"></a>

## filter(collection, func, reverse) ⇒ <code>Arrray</code> \| <code>Object</code> \| <code>String</code>
Filter collection by criteria

**Kind**: global function  
**Returns**: <code>Arrray</code> \| <code>Object</code> \| <code>String</code> - result Filtered collection  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| collection | <code>Arrray</code> \| <code>Object</code> \| <code>String</code> |  | Collection to filter |
| func | <code>function</code> \| <code>Array</code> \| <code>Object</code> |  | Callback function to call |
| reverse | <code>Boolean</code> | <code>false</code> | Determines whether filter should invert condition |

<a name="reject"></a>

## reject(collection, func) ⇒ <code>Arrray</code> \| <code>Object</code> \| <code>String</code>
Reject collection's items by criteria

**Kind**: global function  
**Returns**: <code>Arrray</code> \| <code>Object</code> \| <code>String</code> - Rejected collection  

| Param | Type | Description |
| --- | --- | --- |
| collection | <code>Arrray</code> \| <code>Object</code> \| <code>String</code> | Collection to reject |
| func | <code>function</code> \| <code>Array</code> \| <code>Object</code> | Callback function to call |

<a name="all"></a>

## all(collection, func) ⇒ <code>Arrray</code> \| <code>Object</code> \| <code>String</code>
Checks if all collection's items fit criteria

**Kind**: global function  
**Returns**: <code>Arrray</code> \| <code>Object</code> \| <code>String</code> - Checked collection  

| Param | Type | Description |
| --- | --- | --- |
| collection | <code>Arrray</code> \| <code>Object</code> \| <code>String</code> | Collection to check |
| func | <code>function</code> | Callback function to call |

<a name="any"></a>

## any(collection, func) ⇒ <code>Arrray</code> \| <code>Object</code> \| <code>String</code>
Checks if any collection's items fit criteria

**Kind**: global function  
**Returns**: <code>Arrray</code> \| <code>Object</code> \| <code>String</code> - Checked collection  

| Param | Type | Description |
| --- | --- | --- |
| collection | <code>Arrray</code> \| <code>Object</code> \| <code>String</code> | Collection to check |
| func | <code>function</code> | Callback function to call |

<a name="times"></a>

## times(num, func)
Calls the function a specified number of times

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| num | <code>Number</code> | Number of times to call the function |
| func | <code>function</code> | Callback function to call |

<a name="find"></a>

## find(collection, func) ⇒ <code>Arrray</code> \| <code>Object</code> \| <code>Undefined</code>
Searches element in collection

**Kind**: global function  
**Returns**: <code>Arrray</code> \| <code>Object</code> \| <code>Undefined</code> - Value found or undefined  

| Param | Type | Description |
| --- | --- | --- |
| collection | <code>Arrray</code> \| <code>Object</code> \| <code>String</code> | Collection to check |
| func | <code>function</code> \| <code>Array</code> \| <code>Object</code> | Iteratee for checking |

<a name="contains"></a>

## contains(collection, valOrKey) ⇒ <code>Boolean</code>
Checks if element is in collection

**Kind**: global function  
**Returns**: <code>Boolean</code> - true or false  

| Param | Type | Description |
| --- | --- | --- |
| collection | <code>Arrray</code> \| <code>Object</code> \| <code>String</code> | Collection to check |
| valOrKey | <code>Number</code> \| <code>String</code> | Value for checking |

<a name="destroy"></a>

## destroy(collection, key) ⇒ <code>Boolean</code>
Deletes property from collection

**Kind**: global function  
**Returns**: <code>Boolean</code> - true or false  

| Param | Type | Description |
| --- | --- | --- |
| collection | <code>Arrray</code> \| <code>Object</code> \| <code>String</code> | Collection to operate |
| key | <code>String</code> | Property to delete |

<a name="groupBy"></a>

## groupBy(collection, criteria) ⇒ <code>Object</code>
Group collection's elements by given criteria

**Kind**: global function  
**Returns**: <code>Object</code> - result Groupped collection  

| Param | Type | Description |
| --- | --- | --- |
| collection | <code>Object</code> | Collection to operate |
| criteria | <code>String</code> | Property to order collection by |

<a name="orderBy"></a>

## orderBy(collection, criteria, direction) ⇒ <code>Array</code>
Order collection's elements by given criteria and direction

**Kind**: global function  
**Returns**: <code>Array</code> - result Ordered collection  

| Param | Type | Description |
| --- | --- | --- |
| collection | <code>Array</code> | Collection to operate |
| criteria | <code>String</code> | Property to order collection by |
| direction | <code>String</code> | Ascendant or Descendant |

<a name="uniq"></a>

## uniq(collection) ⇒ <code>Object</code>
Drops all collection's duplicates

**Kind**: global function  
**Returns**: <code>Object</code> - result Unique collection  

| Param | Type | Description |
| --- | --- | --- |
| collection | <code>Array</code> | Collection to operate |

<a name="toArray"></a>

## toArray(arrayLike) ⇒ <code>Array</code>
Converts array like structures to array

**Kind**: global function  
**Returns**: <code>Array</code> - result Converted value  

| Param | Type | Description |
| --- | --- | --- |
| arrayLike | <code>Object</code> | Array like to convert |

<a name="debounce"></a>

## debounce(fn, wait, asap) ⇒ <code>function</code>
Creates debounced version of the function given

**Kind**: global function  
**Returns**: <code>function</code> - Debounced function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| fn | <code>function</code> |  | The function to debounce |
| wait | <code>Number</code> | <code>200</code> | Timeout value |
| asap | <code>Boolean</code> | <code>false</code> | Whether function shuld be called immediately |

<a name="pluck"></a>

## pluck(collection, key) ⇒ <code>Array</code>
Creates new collection from the old one by the given key

**Kind**: global function  
**Returns**: <code>Array</code> - result New collection of plucked values  

| Param | Type | Description |
| --- | --- | --- |
| collection | <code>Array</code> \| <code>Object</code> | The collection to pluck |
| key | <code>String</code> | The key to pluck collection by |

<a name="omit"></a>

## omit(collection, key) ⇒ <code>Object</code>
Drops values from collection

**Kind**: global function  
**Returns**: <code>Object</code> - obj Mutated collection  

| Param | Type | Description |
| --- | --- | --- |
| collection | <code>Object</code> | The collection to omit |
| key | <code>String</code> | The property to delete |

<a name="extend"></a>

## extend(collection, source) ⇒ <code>Object</code>
Extends collection

**Kind**: global function  
**Returns**: <code>Object</code> - collection Extended collection  

| Param | Type | Description |
| --- | --- | --- |
| collection | <code>Object</code> | The collection to extend |
| source | <code>Object</code> | The extension source |

<a name="clone"></a>

## clone(collection) ⇒ <code>Object</code>
Clones collection

**Kind**: global function  
**Returns**: <code>Object</code> - clone Clone of the collection  

| Param | Type | Description |
| --- | --- | --- |
| collection | <code>Object</code> | The collection to clone |

<a name="mixin"></a>

## mixin(collection, ...sources) ⇒ <code>Object</code>
Ads mixin's props to the collection

**Kind**: global function  
**Returns**: <code>Object</code> - collection Mutated collection  

| Param | Type | Description |
| --- | --- | --- |
| collection | <code>Object</code> | The collection to mutate |
| ...sources | <code>\*</code> | The mixin sources |

<a name="chunk"></a>

## chunk(collection, size, start) ⇒ <code>Object</code>
Gets collection chunk

**Kind**: global function  
**Returns**: <code>Object</code> - Collection chunk  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| collection | <code>Array</code> \| <code>String</code> |  | The collection to operate |
| size | <code>Number</code> |  | Chunk size |
| start | <code>Number</code> | <code>0</code> | Chunk start position |

<a name="size"></a>

## size(collection) ⇒ <code>Number</code>
Calculates collection size

**Kind**: global function  
**Returns**: <code>Number</code> - Collection size  

| Param | Type | Description |
| --- | --- | --- |
| collection | <code>Array</code> \| <code>String</code> | The collection to operate |

<a name="walk"></a>

## walk(collection, func, parent, depth)
Walks collection recursively

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| collection | <code>Array</code> \| <code>Object</code> |  | The collection to operate |
| func | <code>function</code> |  | Callback to call |
| parent | <code>Array</code> \| <code>Object</code> | <code></code> | Parent entity |
| depth | <code>Number</code> | <code>0</code> | Walk's depth |

<a name="flatten"></a>

## flatten(collection, flatArr)
Makes multidimensional arrays flat

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| collection | <code>Array</code> | The Array to flat |
| flatArr | <code>Array</code> | New flattened array |

<a name="inject"></a>

## inject(obj, stuff) ⇒ <code>Object</code>
Injects logic from purr to given object

**Kind**: global function  
**Returns**: <code>Object</code> - obj Mutated object  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | Object to inject logic |
| stuff | <code>Array</code> \| <code>String</code> | Properties to inject |

<a name="namespace"></a>

## namespace(parent, nsstring) ⇒ <code>Object</code>
Creates namespace on the given object or new object

**Kind**: global function  
**Returns**: <code>Object</code> - parent Mutated object  

| Param | Type | Description |
| --- | --- | --- |
| parent | <code>Object</code> | Object create namespace |
| nsstring | <code>String</code> | String representation of namespace |

<a name="ensureImplements"></a>

## ensureImplements(obj, methods) ⇒ <code>Boolean</code>
Ensures than object implements given interface

**Kind**: global function  
**Returns**: <code>Boolean</code> - true or false  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | Object to operate |
| methods | <code>Array</code> \| <code>String</code> | Interface to implement |

<a name="randomNum"></a>

## randomNum(min, max) ⇒ <code>Number</code>
Generates random number

**Kind**: global function  
**Returns**: <code>Number</code> - randNum Random number generated.  

| Param | Type | Description |
| --- | --- | --- |
| min | <code>Number</code> | Minimum number boundary. |
| max | <code>Number</code> | Maximum number boundary. |

## Release History
* 2017-12-08   v1.0.0   v1.0.0 release
* 2013-08-07   v0.1.0   First release
