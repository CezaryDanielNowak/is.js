/* 
next-is.js 2.0 ~ Copyright (c) 2012-2016 Cedrik Boudreau, Cezary Daniel Nowak
https://github.com/Cedriking/is.js
is.js may be freely distributed under the MIT Licence.
 */

(function() {
  var root = typeof window === 'undefined' ? global : window;
  var navigator = root.navigator ? root.navigator : {};
  var object = Object;
  var proto = object.prototype;
  var ua = navigator.userAgent || "";
  var av = navigator.appVersion || "";
  var isClass = function(obj, klass) {
    return proto.toString.call(obj) === ("[object " + klass + "]");
  };
  var extend = function(target, source) {
    return Array.prototype.slice.call(arguments, 1).forEach(function(source) {
      var key;
      for (key in source) {
        target[key] = source[key];
      }
      return target;
    });
  };
  var each = function(elements, callback) {
    var element, key, i, len;
    if (typeof elements === 'array') {
      for (i = 0, len = elements.length; i < len; i++) {
        element = elements[i];
        if (!callback.call(element, i, element)) {
          return elements;
        }
      }
    } else {
      for (key in elements) {
        if (!callback.call(elements[key], key, elements[key])) {
          return elements;
        }
      }
    }
    return elements;
  };

  var is = {
    number: {
      isInteger: function(input) {
        return input % 1 === 0;
      },
      isFloat: function(input) {
        return !is.number.isInteger(input);
      },
      isOdd: function(input) {
        return !is.number.isEven(input);
      },
      isEven: function(input) {
        return is.number.isMultipleOf(input, 2);
      },
      isMultipleOf: function(input, multiple) {
        return input % multiple === 0;
      }
    },
    date: {
      isPast: function(input, d) {
        if (d == null) {
          d = input;
        }
        return input.getTime() < d.getTime();
      },
      isFuture: function(input, d) {
        if (d == null) {
          d = input;
        }
        return input.getTime() > d.getTime();
      },
      isWeekday: function(input) {
        return input.getUTCDay() > 0 && input.getUTCDay() < 6;
      },
      isWeekend: function(input) {
        return input.getUTCDay() === 0 || input.getUTCDay() === 6;
      },
      isBefore: function(input, d) {
        if (d == null) {
          d = input;
        }
        return is.date.isPast(input, d);
      },
      isAfter: function(input, d) {
        if (d == null) {
          d = input;
        }
        return is.date.isFuture(input, d);
      },
      isLeapYear: function(input) {
        var year;
        year = input.getFullYear();
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
      },
      isValid: function(input) {
        return !is.isNaN(input.getTime());
      }
    },
    string: {
      /* Added in version 1.3 */
      isCC: function(input, type) {
        var regex;
        if (!type) {
          type = 'any';
        }
        regex = (function() {
          switch (type) {
            case 'any':
              return /^[0-9]{15,16}$/;
            case 'ae' || 'AmericanExpress':
              return /^(34)|(37)\d{14}$/;
            case 'Discover':
              return /^6011\d{12}$/;
            case 'mc' || 'MasterCard':
              return /^5[1-5]\d{14}$/;
            case 'Visa':
              return /^4\d{15}$/;
          }
        })();
        return regex.test(input);
      },
      isCreditCard: function() {
        return is.string.isCC.apply(null, arguments);
      },
      isEmail: function(input) {
        return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(input);
      },
      isLatLng: function(input) {
        return /-?\d{1,3}\.\d+/.test(input);
      },
      isLatLong: function(input) {
        return is.string.isLatLng(input);
      },
      isPhone: function(input, country) {
        var regex;
        if (!country) {
          country = 'us';
        }
        regex = (function() {
          switch (country) {
            case 'ar':
              return /^(?:\+|[0]{2})?(54)?(:?[\s-])*\d{4}(:?[\s-])*\d{4}$/;
            case 'au':
              return /^(?:\+|0)?(?:61)?\s?[2-478](?:[ -]?[0-9]){8}$/;
            case 'ca':
              return /^(1-?)?(([2-9]\d{2})|[2-9]\d{2})-?[2-9]\d{2}-?\d{4}$/;
            case 'fr':
              return /^(?:0|\(?\+33\)?\s?|0033\s?)[1-79](?:[\.\-\s]?\d\d){4}$/;
            case 'is':
              return /^(?:\+|[0]{2})?(354)?(:?[\s-])*\d{3}(:?[\s-])*\d{4}$/;
            case 'uk':
              return /^(?:\+|044)?(?:\s+)?\(?(\d{1,5}|\d{4}\s*\d{1,2})\)?\s+|-(\d{1,4}(\s+|-)?\d{1,4}|(\d{6}))\d{6}$/;
            case 'us':
              return /^(1-?)?(\d{3})(:?[\s\-])*(\d{3})(:?[\s\-])*(\d{4})$/;
          }
        })();
        return regex.test(input);
      },
      isZip: function(input, country) {
        var regex;
        if (!country) {
          country = 'us';
        }
        regex = (function() {
          switch (country) {
            case 'ar':
              return /^\d{4}$/;
            case 'au':
              return /^\d{4}$/;
            case 'at':
              return /^\d{4}$/;
            case 'be':
              return /^\d{4}$/;
            case 'br':
              return /^\d{5}[\-]?\d{3}$/;
            case 'ca':
              return /^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/;
            case 'dk':
              return /^\d{3,4}$/;
            case 'de':
              return /^\d{5}$/;
            case 'es':
              return /^((0[1-9]|5[0-2])|[1-4]\d)\d{3}$/;
            case 'gb':
              return /^[A-Za-z]{1,2}[0-9Rr][0-9A-Za-z]? \d[ABD-HJLNP-UW-Zabd-hjlnp-uw-z]{2}$/;
            case 'hu':
              return /^\d{4}$/;
            case 'is':
              return /^\d{3}$/;
            case 'it':
              return /^\d{5}$/;
            case 'jp':
              return /^\d{3}-\d{4}$/;
            case 'nl':
              return /^\d{4}$/;
            case 'pl':
              return /^\d{2}\-\d{3}$/;
            case 'se':
              return /^\d{3}\s?\d{2}$/;
            case 'us':
              return /^(\d{5}([\-]\d{4})?)$/;
          }
        })();
        return regex.test(input);
      },
      isBlank: function(input) {
        return input.trim().length === 0;
      },
      minLen: function(input, len, trim) {
        if (trim) {
          input = input.trim();
        }
        return input.length >= len;
      },
      maxLen: function(input, len, trim) {
        if (trim) {
          input = input.trim();
        }
        return input.length <= len;
      }
    },
    isNaN: function(input) {
      return !is.isNumber(input);
    },
    isEmpty: function(input) {
      if (!input) {
        // 0, '', NaN, false, null, undefined
        return true;
      }
      if (input.hasOwnProperty('length') && !is.isFunction(input)) {
        // Array, string, arguments, NodeList
        return !input.length;
      }
      for (var key in input) {
        if (proto.hasOwnProperty.call(input, key)) {
          return false;
        }
      }
      // remember: isEmpty return true for function!
      return true;
    },
    isSameType: function(input, obj) {
      return proto.toString.call(input) === proto.toString.call(obj);
    },
    isOwnProperty: function(input, prop) {
      return proto.hasOwnProperty.call(input, prop);
    },
    isType: function(input, type) {
      return isClass(input, type);
    },
    ie: function() {
      return /msie/i.test(ua);
    },
    ie6: function() {
      return /msie 6/i.test(ua);
    },
    ie7: function() {
      return /msie 7/i.test(ua);
    },
    ie8: function() {
      return /msie 8/i.test(ua);
    },
    ie9: function() {
      return /msie 9/i.test(ua);
    },
    ie10: function() {
      return /msie 10/i.test(ua);
    },
    ie11: function() {
      return /Trident.*rv[ :]*11\./.test(ua);
    },
    firefox: function() {
      return /firefox/i.test(ua);
    },
    gecko: function() {
      return /gecko/i.test(ua);
    },
    opera: function() {
      return /opera/i.test(ua);
    },
    safari: function() {
      return /webkit\W(?!.*chrome).*safari\W/i.test(ua);
    },
    chrome: function() {
      return /webkit\W.*(chrome|chromium)\W/i.test(ua);
    },
    webkit: function() {
      return /webkit\W/i.test(ua);
    },
    mobile: function() {
      return /iphone|ipod|(android.*?mobile)|blackberry|nokia/i.test(ua);
    },
    tablet: function() {
      return /ipad|android(?!.*mobile)/i.test(ua);
    },
    desktop: function() {
      return !is.mobile() && !is.tablet();
    },
    kindle: function() {
      return /kindle|silk/i.test(ua);
    },
    tv: function() {
      return /googletv|sonydtv|appletv|roku|smarttv/i.test(ua);
    },
    online: function() {
      return navigator.onLine;
    },
    offline: function() {
      return !is.online();
    },
    windows: function() {
      return /win/i.test(av);
    },
    mac: function() {
      return /mac/i.test(av);
    },
    unix: function() {
      return /x11/i.test(av);
    },
    linux: function() {
      return /linux/i.test(av);
    }
  };
  each(['Object', 'Array', 'Boolean', 'Date', 'Function', 'Number', 'String', 'RegExp'], function(i, type) {
    return is["is" + type] = function(input) {
      return isClass(input, type);
    };
  });

  // shortcut: is.number()
  var _obj = is.number
  is.number = is.isNumber;
  extend(is.number, _obj);

  // shortcut: is.string()
  _obj = is.string;
  is.string = is.isString;
  extend(is.string, _obj);

  // shortcut: is.date()
  _obj = is.date;
  is.date = is.isDate;
  extend(is.date, _obj);

  // implement is.not.*
  var makeNot = function(inputObj) {
    return Object.keys(inputObj).reduce(function(result, key) {
      if (inputObj[key] instanceof Function) {
        result[key] = function() {
          return !inputObj[key].apply(null, arguments);
        }
      }
      if (!is.isEmpty(inputObj[key])) {
        // is.not.string.isCC
        extend(result[key], makeNot(inputObj[key]));
      }
      return result;
    }, {});
  };

  is.not = makeNot(is);

  if (typeof module === 'object' && module.exports) {
    module.exports = is;
  } else {
    root.is = is;
  }
})();
