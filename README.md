# next-is.js
is.js is a micro javascript library that helps you with conditions.
This fork of is.js is not poluting global scope.
It's able to work on both: NodeJS and Browser.

This library may be simple replacement for any validation library, modernizr etc.

## Installation
`npm install --save next-is`


#### browser: `<script src="is.js"></script>`
is.js is available under window.is


#### node/require/amd (webpack): `npm install --save next-is`
`const is = require('next-is');`


After that you have already finished with the installation. Inside your main script you can already start using next-is.js!


### Examples:

```js
// Object functions:
var str = 'my string';
is.isString(str); // return true
is.isEmpty(str); // return false
is.isArray(str); // return false

is.string.isBlank(str);   // return false
is.string.isBlank('');    // return true
is.string.isBlank('   '); // return true

is.string.isEmail('this@email.com'); // return true
is.string.isCC('5156300575820365');  // return true
is.string.isCC( '5156300575820365', 'Visa' ) // return false

// also is.js have some core functions:
is.windows();
is.chrome();
is.mobile();
is.online();

if(is.isString(str)){
  // do stuffs here
}
if(is.desktop()){
  // do stuffs here
}
```

## API reference

```
is = {
	chrome function()
	desktop function()
	firefox function()
	gecko function()
	ie function()
	ie10 function()
	ie11 function()
	ie6 function()
	ie7 function()
	ie8 function()
	ie9 function()
	isArray function(input)
	isBoolean function(input)
	isDate function(input)
	isEmpty function(input)
	isFunction function(input)
	isNaN function(input)
	isNumber function(input)
	isObject function(input)
	isOwnProperty function(input, prop)
	isRegExp function(input)
	isSameType function(input, obj)
	isString function(input)
	isType function(input, type)
	kindle function()
	linux function()
	iOS function(returnNumber)
	iOS9 function()
	iOS10 function()
	iOS11 function()
	cordova function()
	browser function()
	localStorageSupported function()
	userMediaSupported function()
	mac function()
	mobile function()
	offline function()
	online function()
	opera function()
	safari function()
	tablet function()
	tv function()
	unix function()
	webkit function()
	windows function()
	date {
		isAfter function(input, date)
		isBefore function(input, date)
		isFuture function(input, date)
		isLeapYear function(input)
		isPast function(input, date)
		isValid function(input)
		isWeekday function(input)
		isWeekend function(input)
	}
	number {
		isEven function(input)
		isFloat function(input)
		isInteger function(input)
		isMultipleOf function(input, multiple)
		isOdd function(input)
	}
	string {
		isBlank function(input)
		isCC function(input, type)
		isCreditCard function(input, type)
			type:
				'any',
				'ae' || 'AmericanExpress',
				'Discover',
				'mc' || 'MasterCard',
				'Visa'
		isEmail function(input)
		isJSON function(input)
		isLatLng function(input)
		isLatLong function(input)
		isPhone function(input, country = 'universal')
			country: 'ar': 'ar', 'au', 'ca', 'fr', 'is', 'uk', 'us', 'pl', 'universal'
		isZip function(input, country)
			country: 'us', 'se', 'pl', 'nl', 'jp', 'it', 'is', 'hu', 'gb', 'es',
					 'de', 'dk', 'ca', 'br', 'be', 'at', 'au', 'ar'

		maxLen function(input, len, trim)
		minLen function(input, len, trim)
		isTemplateTagArgs function(input)
		hasDigits function(input)
		hasLowerCaseLetter function(input)
		hasUpperCaseLetter function(input)
	}
}
```
