var strEmpty = '',
	str = 'This is a string',
	obj = {},
	creditCard = "5196255216134695",
	d = new Date(),
	arr = [],
	bool = true,
	fl = 22.5,
	integer = 23,
	reg = /abc/,
	iOSAppVersion = '5.0 (iPhone; CPU iPhone OS 11_0_2 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A421 Safari/604.1',
	androidAppVersion = '8.0',
	iOSPlatform = { platform: 'iPhone' },
	androidPlatform = { platform: 'Android' },
	allBrowserTests = [
		'ie', 'ie6', 'ie7', 'ie8', 'ie9', 'ie10', 'ie11', 'firefox', 'gecko', 'opera', 'safari',
		'thirdPartyIOSBrowser', 'chrome', 'edge', 'webkit', 'mobile', 'brave'
	].sort(),
	userAgents = {
		edgeOnIOS11: {
			ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_2 like Mac OS X) AppleWebKit/603.2.4 (KHTML, like Gecko) Mobile/14F89 Safari/603.2.4 EdgiOS/41.1.35.1',
			av: iOSAppVersion,
			navigator: iOSPlatform,
			expected: ['gecko', 'mobile', 'thirdPartyIOSBrowser', 'webkit'],
		},
		edgeOnAndroid8: {
			ua: 'Mozilla/5.0 (Linux; Android 8.0; Pixel XL Build/OPP3.170518.006) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.0 Mobile Safari/537.36 EdgA/41.1.35.1',
			av: androidAppVersion,
			navigator: androidPlatform,
			expected: ['chrome', 'gecko', 'mobile', 'webkit'],
		},
		safariOnIOS10: {
			ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_2 like Mac OS X) AppleWebKit/602.3.3 (KHTML, like Gecko) Version/10.0 Mobile/14C5062e Safari/602.1',
			av: iOSAppVersion,
			navigator: iOSPlatform,
			expected: ['safari', 'gecko', 'webkit', 'mobile'],
		},
		safariOnIOS11: {
			ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A356 Safari/604.1',
			av: iOSAppVersion,
			navigator: iOSPlatform,
			expected: ['safari', 'gecko', 'webkit', 'mobile'],
		},
		safariOnIOS12: {
			ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 12_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0 Mobile/15E148 Safari/604.1',
			av: iOSAppVersion,
			navigator: iOSPlatform,
			expected: ['safari', 'gecko', 'webkit', 'mobile'],
		},
		chromeOnIOS10: {
			ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75 Mobile/14E5239e Safari/602.1',
			av: iOSAppVersion,
			navigator: iOSPlatform,
			expected: ['chrome', 'gecko', 'mobile', 'thirdPartyIOSBrowser', 'webkit'],
		},
		chromeOnIOS11: {
			ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_4 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) CriOS/67.0.3396.59 Mobile/15F79 Safari/604.1',
			av: iOSAppVersion,
			navigator: iOSPlatform,
			expected: ['chrome', 'gecko', 'mobile', 'thirdPartyIOSBrowser', 'webkit'],
		},
		firefoxOnIOS10: {
			ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_2 like Mac OS X) AppleWebKit/603.2.4 (KHTML, like Gecko) FxiOS/7.5b3349 Mobile/14F89 Safari/603.2.4',
			av: iOSAppVersion,
			navigator: iOSPlatform,
			expected: ['firefox', 'gecko', 'mobile', 'thirdPartyIOSBrowser', 'webkit'],
		},
		firefoxOnIOS11: {
			ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_2_6 like Mac OS X) AppleWebKit/604.5.6 (KHTML, like Gecko) FxiOS/10.6b8836 Mobile/15D100 Safari/604.5.6',
			av: iOSAppVersion,
			navigator: iOSPlatform,
			expected: ['firefox', 'gecko', 'mobile', 'thirdPartyIOSBrowser', 'webkit'],
		},
		googleSearchOnIOS10: {
			ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_1_1 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) GSA/20.3.136880903 Mobile/14B100 Safari/600.1.4',
			av: iOSAppVersion,
			navigator: iOSPlatform,
			expected: ['gecko', 'mobile', 'thirdPartyIOSBrowser', 'webkit'],
		},
		googleSearchOnIOS11: {
			ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_1_2 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) GSA/40.1.177082287 Mobile/15B202 Safari/604.1',
			av: iOSAppVersion,
			navigator: iOSPlatform,
			expected: ['gecko', 'mobile', 'thirdPartyIOSBrowser', 'webkit'],
		},
		puffinOnIOS11: {
			ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0_2 like Mac OS X; en-GB) AppleWebKit/537.36 (KHTML, like Gecko) Version/11.0.2 Mobile/15A421 Safari/537.36 Puffin/5.2.2IP Chrome/63.0.1234.56',
			av: iOSAppVersion,
			navigator: iOSPlatform,
			expected: ['gecko', 'mobile', 'thirdPartyIOSBrowser', 'webkit'],
		},
		operaMiniOnIOS11: {
			ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0_2 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) OPiOS/16.0.10.121137 Mobile/15A421 Safari/9537.53',
			av: iOSAppVersion,
			navigator: iOSPlatform,
			expected: ['gecko', 'mobile', 'thirdPartyIOSBrowser', 'webkit'],
		},
		braveOnIOS11: {
			ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0_2 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) FxiOS/1.6.2b18.05.29.10 Mobile/15A421 Safari/604.1.38 _id/000001',
			av: iOSAppVersion,
			navigator: iOSPlatform,
			expected: ['brave', 'firefox', 'gecko', 'mobile', 'thirdPartyIOSBrowser', 'webkit'],
		},
		alohaBrowserOnIOS11: {
			ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) AlohaBrowser/2.4.3b1 Mobile/15F79',
			av: iOSAppVersion,
			navigator: iOSPlatform,
			expected: ['gecko', 'mobile', 'thirdPartyIOSBrowser', 'webkit'],
		},
		dolphinBrowserOnIOS11: {
			ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) AlohaBrowser/2.4.3b1 Mobile/15F79',
			av: iOSAppVersion,
			navigator: iOSPlatform,
			expected: ['gecko', 'mobile', 'thirdPartyIOSBrowser', 'webkit'],
		},
	};

/*** Object Functions ***/
QUnit.test("isArray", function( assert ) {
	equal( is.isArray(arr), true, "Array is Array" );
	equal( is.isArray(obj), false, "Object is not Array" );
	equal( is.isArray(str), false, "String is not Array" );
	equal( is.isArray(d), false, "Date is not Array" );
	equal( is.isArray(bool), false, "Boolean is not Array" );
	equal( is.isArray(integer), false, "Number is not Array" );
	equal( is.isArray(reg), false, "Regexp is not Array" );

	equal( is.not.isArray(reg), true, "Regexp is not Array" );
});

QUnit.test("isBoolean", function( assert ) {
	equal( is.isBoolean(bool), true, "Boolean is Boolean" );
	equal( is.isBoolean(arr), false, "Array is notBoolean" );
	equal( is.isBoolean(obj), false, "Object is not Boolean" );
	equal( is.isBoolean(str), false, "String is not Boolean" );
	equal( is.isBoolean(d), false, "Date is not Boolean" );
	equal( is.isBoolean(integer), false, "Number is not Boolean" );
	equal( is.isBoolean(reg), false, "Regexp is not Boolean" );
});

QUnit.test("isDate", function( assert ) {
	equal( is.isDate(d), true, "Date is Date" );
	equal( is.isDate(arr), false, "Array is not Date" );
	equal( is.isDate(obj), false, "Object is not Date" );
	equal( is.isDate(str), false, "String is not Date" );
	equal( is.isDate(bool), false, "Boolean is not Date" );
	equal( is.isDate(integer), false, "Number is not Date" );
	equal( is.isDate(reg), false, "Regexp is not Date" );
});

QUnit.test("isEmpty", function( assert ) {
	equal( is.isEmpty(strEmpty), true, "empty String is empty" );
	equal( is.isEmpty(str), false, "not empty String is not Empty" );
	equal( is.isEmpty(arr), true, "empty Array is Empty" );
	equal( is.isEmpty([1,2,3]), false, "not empty Array is not Empty" );
	equal( is.isEmpty(obj), true, "empty Object is Empty" );
	equal( is.isEmpty({'sarah': 'maximum', 1: 2}), false, "not empty Object is not Empty" );
});

QUnit.test("number.isEven", function( assert ) {
	var even = 2, noteven = 3;

	equal( is.number.isEven(even), true, "2 is Even" );
	equal( is.number.isEven(noteven), false, "3 is not Even" );
});

QUnit.test("number.isFloat", function( assert ) {
	equal( is.number.isFloat(fl), true, "22.5 is a float number" );
	equal( is.number.isFloat(integer), false, "23 is not a float number" );
});

QUnit.test("isFunction", function( assert ) {
	var func = function(){};

	equal( is.isFunction(func), true, "Function is Function" );
	equal( is.isFunction(d), false, "Date is not Function" );
	equal( is.isFunction(arr), false, "Array is not Function" );
	equal( is.isFunction(obj), false, "Object is not Function" );
	equal( is.isFunction(str), false, "String is not Function" );
	equal( is.isFunction(bool), false, "Boolean is not Function" );
	equal( is.isFunction(integer), false, "Number is not Function" );
	equal( is.isFunction(reg), false, "Regexp is not Function" );
});

QUnit.test("number.isInteger", function( assert ) {
	equal( is.number.isInteger(integer), true, "23 is an Integer" );
	equal( is.number.isInteger(fl), false, "22.5 is not an Integer" );
});

QUnit.test("number.isMultipleOf", function( assert ) {
	var ten = 10, eleven = 11;

	equal( is.number.isMultipleOf( ten, 5 ), true, "10 is multiple of 5" );
	equal( is.number.isMultipleOf( eleven, 5 ), false, "11 is not multiple of 5" );
});

QUnit.test("isNaN", function( assert ) {
	equal( is.isNaN(obj), true, "Object is not a number" );
	equal( is.isNaN(arr), true, "Array is not a number" );
	equal( is.isNaN(str), true, "String is not a number" );
	equal( is.isNaN(d), true, "Date is not a number" );
	equal( is.isNaN(bool), true, "Boolean is not a number" );
	equal( is.isNaN(integer), false, "Integer is a number" );
	equal( is.isNaN(fl), false, "Float is a number" );
	equal( is.isNaN(reg), true, "Regexp is not a number" );
});

QUnit.test("isNumber", function( assert ) {
	equal( is.isNumber(obj), false, "Object is not a number" );
	equal( is.isNumber(arr), false, "Array is not a number" );
	equal( is.isNumber(str), false, "String is not a number" );
	equal( is.isNumber(d), false, "Date is not a number" );
	equal( is.isNumber(bool), false, "Boolean is not a number" );
	equal( is.isNumber(integer), true, "Integer is a number" );
	equal( is.isNumber(fl), true, "Float is a number" );
	equal( is.isNumber(reg), false, "Regexp is not a number" );
});

QUnit.test("isObject", function( assert ) {
	equal( is.isObject(obj), true, "Object is Object" );
	equal( is.isObject(arr), false, "Array is not Object" );
	equal( is.isObject(str), false, "String is not Object" );
	equal( is.isObject(d), false, "Date is not Object" );
	equal( is.isObject(bool), false, "Boolean is not Object" );
	equal( is.isObject(integer), false, "Number is not Object" );
	equal( is.isObject(reg), false, "Regexp is not Object" );
});

QUnit.test("number.isOdd", function( assert ) {
	var even = 2, noteven = 3;

	equal( is.number.isOdd(noteven), true, "3 is Odd" );
	equal( is.number.isOdd(even), false, "2 is not Odd" );
});

QUnit.test("isOwnProperty", function( assert ) {
	var objProp = {};
	objProp.test = 541241;

	equal( is.isOwnProperty( objProp, 'test' ), true, "test is a property of objProp" );
	equal( is.isOwnProperty( objProp, 'comma' ), false, "comma is not a property of objProp" );
});

QUnit.test("isRegExp", function( assert ) {
	equal( is.isRegExp(reg), true, "Regexp is RegExp" );
	equal( is.isRegExp(arr), false, "Array is not RegExp" );
	equal( is.isRegExp(str), false, "String is not RegExp" );
	equal( is.isRegExp(d), false, "Date is not RegExp" );
	equal( is.isRegExp(bool), false, "Boolean is not RegExp" );
	equal( is.isRegExp(integer), false, "Number is not RegExp" );
	equal( is.isRegExp(obj), false, "Object is not RegExp" );
});

QUnit.test("isSameType", function( assert ) {
	equal( is.isSameType( reg, /eio/ ), true, "Regexp is same type RegExp" );
	equal( is.isSameType( arr, {} ), false, "Array is not type Object" );
	equal( is.isSameType( str, "hello world" ), true, "String is same type String" );
	equal( is.isSameType( d, {} ), false, "Date is not type Object" );
	equal( is.isSameType( bool, {} ), false, "Boolean is not type Object" );
	equal( is.isSameType( integer, {} ), false, "Number is not type Object" );
	equal( is.isSameType( obj, {} ), true, "Object is same type Object" );
});

QUnit.test("isString", function( assert ) {
	equal( is.isString(str), true, "String is String" );
	equal( is.isString(arr), false, "Array is not String" );
	equal( is.isString(reg), false, "Regexp is not String" );
	equal( is.isString(d), false, "Date is not String" );
	equal( is.isString(bool), false, "Boolean is not String" );
	equal( is.isString(integer), false, "Number is not String" );
	equal( is.isString(obj), false, "Object is not String" );
});

QUnit.test("isType", function( assert ) {
	equal( is.isType( str, "String" ), true, "String is type String" );
	equal( is.isType( arr, "String" ), false, "Array is not type String" );
	equal( is.isType( reg, "String" ), false, "Regexp is not type String" );
	equal( is.isType( d, "String" ), false, "Date is not type String" );
	equal( is.isType( bool, "String" ), false, "Boolean is not type String" );
	equal( is.isType( integer, "String" ), false, "Number is not type String" );
	equal( is.isType( obj, "String" ), false, "Object is not type String" );
});

QUnit.test("isPromise", function( assert ) {
	equal( is.isPromise( new Promise(function(resolve) { resolve() }) ), true, "Promise is a Promise" );
	equal( is.isPromise( null ), false, "null is not a Promise" );
	equal( is.isPromise( str ), false, "String is not a Promise" );
	equal( is.isPromise( arr ), false, "Array is not a Promise" );
	equal( is.isPromise( reg ), false, "Regexp is not a Promise" );
	equal( is.isPromise( d ), false, "Date is not a Promise" );
	equal( is.isPromise( bool ), false, "Boolean is not a Promise" );
	equal( is.isPromise( integer ), false, "Number is not a Promise" );
	equal( is.isPromise( obj ), false, "Object is not a Promise" );
});


/*** String Functions ***/
QUnit.test("string.isBlank", function( assert ) {
	equal( is.string.isBlank(strEmpty), true, "empty string is Blank" );
	equal( is.string.isBlank(str), false, "String is not Blank" );

	equal( is.not.string.isBlank(str), true, "String is not Blank" );
});

QUnit.test("string.isCC and string.isCreditCard", function( assert ) {
	equal( is.string.isCC(creditCard), true, "'5196255216134695' is a credit card number" );
	equal( is.string.isCC(str), false, "'This is a string' is not a credit card number" );
	equal( is.string.isCreditCard(creditCard), true, "'5196255216134695' is a credit card number" );
	equal( is.string.isCreditCard(str), false, "'This is a string' is not a credit card number" );
});

QUnit.test("string.isEmail", function( assert ) {
	equal( is.string.isEmail('test@email.com'), true, "'test@email.com' is an email" );
	equal( is.string.isEmail(str), false, "'This is a string' is not an email" );
});

QUnit.test("string.isLatLng and string.isLatLong", function( assert ) {
	var latlong = '63.548552, -127.529297';
	equal( is.string.isLatLong(latlong), true, "'63.548552, -127.529297' is a valid Latitude Longitude" );
	equal( is.string.isLatLong(str), false, "'This is a string' is not a latitude longitude" );
	equal( is.string.isLatLng(latlong), true, "'63.548552, -127.529297' is a valid Latitude Longitude" );
	equal( is.string.isLatLng(str), false, "'This is a string' is not a latitude longitude" );
});

QUnit.test("string.isPhone", function( assert ) {
	var ar1 = '1234-5678',
		au1 = '0491 570 156',
		au2 = '+61 491 570 156',
		ca1 = '613-555-0195',
		ca2 = '1-613-555-0195',
		fr1 = '03 7291 6437',
		fr2 = '04.48.95.09.94',
		is1 = '479 5406',
		is2 = '438 7049',
		uk1 = '01632 960483',
		uk2 = '+44 1632 960483',
		us1 = '202-555-0173',
    us2 = '1-202-555-0173',
    pl1 = '+48533628000',
		pl2 = '0048533628000';

	equal( is.string.isPhone( ar1, 'ar' ), true, "'123-4564' is an AR phone number" );
	equal( is.string.isPhone( au1, 'au' ), true, "'0491 570 156' is an AU phone number" );
	equal( is.string.isPhone( au2, 'au' ), true, "'+61 491 570 156' is an AU phone number" );
	equal( is.string.isPhone( ca1, 'ca' ), true, "'613-555-0195' is a CA phone number" );
	equal( is.string.isPhone( ca2, 'ca' ), true, "'1-613-555-0195' is a CA phone number" );
	equal( is.string.isPhone( fr1, 'fr' ), true, "'03 7291 6437' is a FR phone number" );
	equal( is.string.isPhone( fr2, 'fr' ), true, "'04.48.95.09.94' is a FR phone number" );
	equal( is.string.isPhone( is1, 'is' ), true, "'01632 960483' is a IS phone number" );
	equal( is.string.isPhone( is2, 'is' ), true, "'+44 1632 960483' is a IS phone number" );
	equal( is.string.isPhone( uk1, 'uk' ), true, "'01632 960483' is a UK phone number" );
	equal( is.string.isPhone( uk2, 'uk' ), true, "'+44 1632 960483' is a UK phone number" );
	equal( is.string.isPhone( us1, 'us' ), true, "'202-555-0173' is a US phone number" );
  equal( is.string.isPhone( us2, 'us' ), true, "'1-202-555-0173' is a US phone number" );
  equal( is.string.isPhone( us2, ['ca', 'fr', 'us'] ), true, "'1-202-555-0173' is one of: US, FR, CA phone numbers" );
  equal( is.string.isPhone( pl1, 'pl' ), true, "'+48533628000' is a PL phone number" );
  equal( is.string.isPhone( pl2, 'pl' ), true, "'0048533628000' is a PL phone number" );


});

QUnit.test("string.isZip", function( assert ) {
	var ar = '2403',
		au = '2440',
		at = '2413',
		be = '5142',
		br = '18044-280',
		ca = 'M8V 3B6',
		dk = '1131',
		de = '45128',
		es = '29611',
		gb = 'EC1A 1BB',
		hu = '9012',
		_is = '371',
		it = '25049',
		jp = '541-5472',
		nl = '9446',
		pl = '61-324',
		se = '587 42',
		us = '60603'

	equal( is.string.isZip( ar, 'ar' ), true, "'2403' is an AR Zip Code" );
	equal( is.string.isZip( au, 'au' ), true, "'2440' is an AU Zip Code" );
	equal( is.string.isZip( at, 'at' ), true, "'2413' is an AT Zip Code" );
	equal( is.string.isZip( be, 'be' ), true, "'5142' is a BE Zip Code" );
	equal( is.string.isZip( br, 'br' ), true, "'18044-280' is a BR Zip Code" );
	equal( is.string.isZip( ca, 'ca' ), true, "'M8V 3B6' is a CA Zip Code" );
	equal( is.string.isZip( dk, 'dk' ), true, "'1131' is a DK Zip Code" );
	equal( is.string.isZip( de, 'de' ), true, "'45128' is a DE Zip Code" );
	equal( is.string.isZip( es, 'es' ), true, "'29611' is a ES Zip Code" );
	equal( is.string.isZip( gb, 'gb' ), true, "'EC1A 1BB' is a GB Zip Code" );
	equal( is.string.isZip( hu, 'hu' ), true, "'9012' is a HU Zip Code" );
	equal( is.string.isZip( _is, 'is' ), true, "'371' is a IS Zip Code" );
	equal( is.string.isZip( it, 'it' ), true, "'25049' is a IT Zip Code" );
	equal( is.string.isZip( jp, 'jp' ), true, "'541-5472' is a JP Zip Code" );
	equal( is.string.isZip( nl, 'nl' ), true, "'8031' is a NL Zip Code" );
	equal( is.string.isZip( pl, 'pl' ), true, "'61-324' is a PL Zip Code" );
	equal( is.string.isZip( se, 'se' ), true, "'587 42' is a SE Zip Code" );
	equal( is.string.isZip( us, 'us' ), true, "'60603' is a US Zip Code" );
});

QUnit.test("string.minLen and string.maxLen", function( assert ) {
	var str1 = 'abcd';
	var str2 = '  abcd  ';
	equal( is.string.minLen(str1, 4), true, "4-character string is minLen of 4" );
	equal( is.string.minLen(str2, 4, true), true, "trimmed 4-character string is minLen of 4" );
	equal( is.string.minLen(str1, 5), false, "4-character string is not minLen of 5" );

	equal( is.string.maxLen(str1, 4), true, "4-character string is maxLen of 4" );
	equal( is.string.maxLen(str2, 4, true), true, "trimmed 4-character string is maxLen of 4" );
	equal( is.string.maxLen(str2, 3, true), false, "4-character string is not maxLen of 3" );

});



/*** Date Functions ***/
QUnit.test("date.isAfter and date.isFuture", function( assert ) {
	var newDate = new Date();

	equal( is.date.isFuture(d), false, d+" isnt in the Future" );
	ok   ( is.date.isAfter( newDate, d ), newDate + " is After of "+ d );
	equal( is.date.isAfter( d, newDate ), false, d + " is not After of "+ newDate );
	ok   ( is.date.isFuture( newDate, d ), newDate + " is Future of "+ d );
	equal( is.date.isFuture( d, newDate ), false, d + " is not Future of "+ newDate );
});

QUnit.test("date.isBefore and date.isPast", function( assert ) {
	var newDate = new Date();

	equal( is.date.isPast(d), false, d + " is in the past" );
	ok   ( is.date.isPast( d, newDate ), d + " is Past of "+ newDate );
	equal( is.date.isPast( newDate, d ), false, newDate + " is not Past of "+ d );
	ok   ( is.date.isBefore( d, newDate ), d + " is Before of "+ newDate );
	equal( is.date.isBefore( newDate, d ), false, newDate + " is not Before of "+ d );
});

QUnit.test("date.isLeapYear", function( assert ) {
	ok( is.date.isLeapYear(d), "Is this year a Leap Year?" );
});

QUnit.test("date.isValid", function( assert ) {
	ok( is.date.isValid(d), "Date is a valid date" );
});

QUnit.test("date.isWeekend and date.isWeekday", function( assert ) {
	ok( is.date.isWeekend(d), "Is today a Weekend?" );
	ok( is.date.isWeekday(d), "Then today is a Weekday." );
});


/*** Core Functions ***/
QUnit.test("Browser check", function( assert ) {
	ok( is.ie(), "I am currently using Internet Explorer (any version)" );
	ok( is.firefox(), "I am currently using Firefox" );
	ok( is.gecko(), "I am currently using Gecko" );
	ok( is.opera(), "I am currently using Opera" );
	ok( is.safari(), "I am currently using Safari" );
	ok( is.chrome(), "I am currently using Google Chrome" );
	ok( is.webkit(), "I am currently using a WebKit browser" );
});

QUnit.test("Device check", function( assert ) {
	ok( is.mobile(), "I am currently using a Mobile Browser" );
	ok( is.tablet(), "I am currently using a Tablet" );
	ok( is.desktop(), "I am currently using a Computer" );
	ok( is.kindle(), "I am currently using a Kindle" );
	ok( is.tv(), "I am currently using a TV" );
});

QUnit.test("Online / Offline Check", function( assert ) {
	ok( is.online(), "Am I online?" );
	ok( is.offline(), "Then I am offline." );
});

QUnit.test("OS Check", function( assert ) {
	ok( is.windows(), "I am using Windows" );
	ok( is.mac(), "I am using MAC" );
	ok( is.unix(), "I am using UNIX" );
	ok( is.linux(), "I am using LINUX" );
});

QUnit.test("browser features", function( assert ) {
	ok( is.browser(), "I am using browser (not a NodeJS)" );
	ok( is.localStorageSupported(), "My browser supports localStorage" );
	ok( is.userMediaSupported(), "My browser supports getUserMedia" );
	ok( is.inAppBrowser(), "I am using in-app-browser" );
});

const getDetectedBrowsers = () => allBrowserTests.reduce(function(result, browser) {
	if (is[browser]()) {
		result.push(browser);
	}
	return result;
}, []);

QUnit.test("browser detection", function( assert ) {
	Object.keys(userAgents).forEach((browserName) => {
		var userAgent = userAgents[browserName];
		is._mock('ua', userAgent.ua);
		is._mock('av', userAgent.av);
		is._mock('navigator', userAgent.navigator);

		deepEqual(getDetectedBrowsers(), userAgent.expected.sort(), browserName + ' detection should return ' + JSON.stringify(userAgent.expected));

		is._mockReset();
	});
});
