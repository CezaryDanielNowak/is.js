/* eslint-disable */
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

  function iOSversion(returnNumber) {
    if (/iP(hone|od|ad)/.test(navigator.platform)) {
      // supports iOS 2.0 and later: <http://bit.ly/TJjs1V>
      var v = av.match(/OS (\d+)_(\d+)_?(\d+)?/) || [0, 0, 0];
      var result = [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
      return returnNumber ? parseFloat(result[0] + '.' + result[1]) : result;
    }
  }

  // source: https://github.com/atomantic/is-ua-webview @ 1.0.1
  var inAppBrowserDetectionRules = '(' + [
    // if it says it's a webview, let's go with that
    'WebView',
    // iOS webview will be the same as safari but missing "Safari"
    '(iPhone|iPod|iPad)(?!.*Safari)',
    // Android Lollipop and Above: webview will be the same as native but it will contain "wv"
    // Android KitKat to lollipop webview will put {version}.0.0.0
    'Android.*(wv|\.0\.0\.0)',
    // old chrome android webview agent
    'Linux; U; Android'
  ].join('|') + ')';

  var _defaultMocks = {
    navigator: navigator,
    ua: ua,
    av: av
  };

  var is = {
    _mockReset: function() {
      navigator = _defaultMocks.navigator;
      ua = _defaultMocks.ua;
      av = _defaultMocks.av;
    },
    _mock: function(varName, varValue) {
      // mock variable for testing purposes
      switch(varName) {
        case 'navigator':
          navigator = Object.assign({}, navigator, varValue);
          break;
        case 'av':
          av = varValue;
          break;
        case 'ua':
          ua = varValue;
          break;
        default:
          throw new Error(varName + ' is not defined in _mock function');
      }
    },
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
      },
      isValidPattern: function(dateString) {
        // Is pattern YYYY-MM-DD?
        if (!/^\d{4}\-\d{1,2}\-\d{1,2}$/.test(dateString)) return false;

        var parts = dateString.split('-');
        var day = parseInt(parts[2], 10);
        var month = parseInt(parts[1], 10);
        var year = parseInt(parts[0], 10);

        // Check the range of the month
        if (month === 0 || month > 12) return false;

        var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        // Is it the leap year?
        if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) monthLength[1] = 29;

        // Check the range of the day
        return day > 0 && day <= monthLength[month - 1];
      },
      isSameOrBefore: function(dateString, comparedDateString) {
        if (!is.date.isValidPattern(dateString) || !is.date.isValidPattern(comparedDateString)) return false;
        return new Date(dateString).getTime() <= new Date(comparedDateString).getTime();
      },
      isMinimumAge: function(dateString, minimumAge) {
        if (!is.date.isValidPattern(dateString)) return false;
        var parsedDate = new Date(dateString);
        var tempDate = new Date(parsedDate.getFullYear() + minimumAge, parsedDate.getMonth(), parsedDate.getDate());
        return tempDate <= new Date();
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
      isJSON: function(input) {
        try {
          JSON.parse(input);
          return true;
        } catch (e) {
          return false;
        }
      },
      isLatLng: function(input) {
        return /-?\d{1,3}\.\d+/.test(input);
      },
      isLatLong: function(input) {
        return is.string.isLatLng(input);
      },
      isLink: function(input) {
        return /^(ht|f)tp(s?)\:\/\/(([a-zA-Z0-9\-\._]+(\.[a-zA-Z0-9\-\._]+)+)|localhost)(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&amp;%\$#_]*)?([\d\w\.\/\%\+\-\=\&amp;\?\:\\\&quot;\'\,\|\~\;]*)$/.test(input);
      },
      isPhone: function(input, country) {
        var regex;
        if (is.isArray(country)) {
          return country.some(function(countryStr) {
            return is.string.isPhone(input, countryStr);
          });
        }
        if (!country) {
          country = 'universal';
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
              return /^(1-|\+1|1)?(\d{3})(:?[\s\-])*(\d{3})(:?[\s\-])*(\d{4})$/;
            case 'pl':
              return /^((0048|048|\+48|)\d{9})$/;
            case 'universal':
              return /^[0-9\-\s]{5,30}$/;
            default:
              throw new Error('There is no contry "' + country + '" specified in next-is.js');
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
            case 'au':
            case 'at':
            case 'be':
            case 'hu':
            case 'nl':
              return /^\d{4}$/;
            case 'it':
            case 'de':
              return /^\d{5}$/;
            case 'br':
              return /^\d{5}[\-]?\d{3}$/;
            case 'ca':
              return /^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/;
            case 'dk':
              return /^\d{3,4}$/;
            case 'es':
              return /^((0[1-9]|5[0-2])|[1-4]\d)\d{3}$/;
            case 'gb':
              return /^[A-Za-z]{1,2}[0-9Rr][0-9A-Za-z]? \d[ABD-HJLNP-UW-Zabd-hjlnp-uw-z]{2}$/;
            case 'is':
              return /^\d{3}$/;
            case 'jp':
              return /^\d{3}-\d{4}$/;
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
      },
      /*
       * Recognise if function is called as template tag instead of normal
       * function call
       *
       *  function test() {
       *    return is.string.isTemplateTagArgs(arguments);
       *  }
       *  test`bla bla bla` // true
       *  test(['bla bla bla']) // false
       */
      isTemplateTagArgs: function(args) {
        return args[0] instanceof Array && args[0].raw instanceof Array;
      },
      hasDigits: function(input) {
        return /\d/.test(input);
      },
      hasLowerCaseLetter: function(input) {
        return (!!input && /[a-z]/.test(input));
      },
      hasUpperCaseLetter: function(input) {
        return /[A-Z]/.test(input);
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
    isPromise: function(item) {
      return !!(item && typeof item.then === 'function' && typeof item.catch === 'function');
    },
    ie: function() {
      return /(msie|trident)/i.test(ua);
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
      return /firefox|FxiOS/i.test(ua);
    },
    gecko: function() {
      return /gecko/i.test(ua);
    },
    opera: function() {
      return /opera/i.test(ua);
    },
    safari: function() {
      return /webkit\W(?!.*chrome).*safari\W/i.test(ua) && !is.thirdPartyIOSBrowser();
    },
    thirdPartyIOSBrowser: function() {
      return is.iOS() &&
        (/(iOS|!Version|GSA|Puffin|AlohaBrowser)\//i.test(ua) ||
         / AppleWebKit\/(\d+)\.(\d+)\.(\d+)\.(\d+)\.(\d+) /i.test(ua) // dolphin browser
        );
    },
    chrome: function() {
      return !is.edge() && /webkit\W.*(chrome|chromium|CriOS)\W/i.test(ua) && !/Puffin\//i.test(ua);
    },
    brave: function() {
      return is.iOS() && is.firefox() && / _id\//i.test(ua);
    },
    edge: function() {
      return / Edge\//.test(ua);
    },
    webkit: function() {
      return /webkit\W/i.test(ua);
    },
    mobile: function() {
      return /iphone|ipod|(android.*?mobile)|blackberry|nokia/i.test(ua);
    },
    android: function() {
      return /(android)/i.test(ua);
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
    },
    iOS: function(returnNumber) {
      // returns version
      return !root.MSStream && iOSversion(returnNumber);
    },
    iOS9: function() {
      return is.iOS() && iOSversion()[0] === 9;
    },
    iOS10: function() {
      return is.iOS() && iOSversion()[0] === 10;
    },
    iOS11: function() {
      return is.iOS() && iOSversion()[0] === 11;
    },
    iOS12: function() {
      return is.iOS() && iOSversion()[0] === 12;
    },
    cordova: function() {
      return root && typeof root.cordova !== 'undefined';
    },
    browser: function() {
      return typeof window !== 'undefined' && (!ua.includes("Node.js") && !ua.includes("jsdom")) ||
        typeof process === 'undefined';
    },
    localStorageSupported: function() {
      // Safari, in Private Browsing Mode, looks like it supports localStorage
      // but all calls to setItem throw QuotaExceededError.
      // Thank you, Safari.
      // Another one - in Safari Paranoia Mode (cookies turned off)
      // merely looking at the localStorage prop throws a DOM exception.
      // Thanks, Apple.
      var keyName = 'next-is-test__localStorage';
      var value = '1';
      try {
        if (typeof localStorage === 'object') {
          localStorage.setItem(keyName, value);
          if (localStorage[keyName] !== value) {
            return false;
          }
          localStorage.removeItem(keyName);
          return true;
        }
      } catch (e) {}

      return false;
    },
    userMediaSupported: function() {
      if (!is.browser()) { return false; }

      // check if native webcam is supported
      var URL = root.URL || root.webkitURL || root.mozURL || root.msURL;
      // Adapted from: https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
      var mediaDevices = (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) ?
        true : ((navigator.mozGetUserMedia || navigator.webkitGetUserMedia) ? true : false);

      var userMedia = !!mediaDevices && !!URL;

      // Older versions of firefox (< 21) apparently claim support but user media does not actually work
      if (ua.match(/Firefox\D+(\d+)/)) {
        if (parseInt(RegExp.$1, 10) < 21) userMedia = null;
      }

      return userMedia;
    },
    inAppBrowser: function() {
      // no browser, no in-app browser
      if (!is.browser()) { return false; } 
      
      // I am not sure about this, but should be fine
      if (is.userMediaSupported()) {
        return false;
      } else {
        if (is.iOS() && iOSversion()[0] >= 11 && is.safari()) {
          // getUserMedia SHOULD be available in iOS over version 11,
          // lack of support might mean in-app-browser
          return true;
        } else {
          // UA detection is not accurate in Slack or FB, but it's worth to try.
          return !!ua.match(new RegExp(inAppBrowserDetectionRules , 'ig'));
        }
      }
    },
    isWindowsTabletAsync: function() {
      // windows tablets are: Surface Pro, Lenovo Miix, HP Envy x2 etc
      // we detect it based on:
      // - has high pixel density
      // - has front and back cameras
      // - has touch
      return new Promise(function(resolve, reject) {
        if (
          !is.windows()
          || !is.userMediaSupported()
          || navigator.maxTouchPoints < 3 // less than 3 touch points - potato
          || root.devicePixelRatio < 1.5
        ) return reject(); 

        navigator
          .mediaDevices
          .enumerateDevices()
          .then(function(mediaDevices) {
            var filter = function(mediaDevice) { return mediaDevice.kind === 'videoinput'; };
            var videoInputs = mediaDevices.filter(filter);
            if (videoInputs.length >= 2) return resolve();
            reject();
          }, reject);
      });
    },
    microBenchmarkScoreAsync: function(passes) {
      passes || (passes = 100);
      return new Promise(function(resolve) {
        var timeStart = Date.now();
        var results = [];
        var promises = [];
        for (var i = passes; i > 0; i--) {
          // regexp
          results.push(Math.random().toString(36).match(new RegExp(inAppBrowserDetectionRules , 'ig')));

          // canvas
          promises.push(testCanvas());

          // Array
          results.sort(function() { return Math.random() < 0.5 ? 1 : -1; });
        }
        var timeOverall = Date.now() - timeStart;

        // Why this ternary operator is required?
        // its important to store values of benchmarks, to prevent
        // - uglifyjs
        // - browser's micro-optimisations
        // from omiting benchmark code
        Promise.all(promises).then(function() {
          resolve(timeOverall ? timeOverall : results);
        });
      });

      function testCanvas() {
        return new Promise(function(resolve) {
          var canvas = document.createElement('canvas');
          canvas.width = canvas.height = 99;
          var ctx = canvas.getContext('2d');
          var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

          function randomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
          }

          for (var i = 0; i < imgData.data.length; i++) {
            imgData.data[i] = randomInt(0, 255); // red
          }

          ctx.putImageData(imgData, 0, 0);
          canvas.style.position = 'absolute';
          canvas.style.bottom = 0;
          canvas.style.opacity = 0.01;
          document.body.appendChild(canvas);

          setTimeout(function() { canvas.parentNode.removeChild(canvas); resolve(); });
        });
      }
    }
  };
  ['Object', 'Array', 'Boolean', 'Date', 'Function', 'Number', 'String', 'RegExp'].forEach(function(type) {
    is["is" + type] = function(input) {
      return isClass(input, type);
    };
  });

  // shortcut: is.number()
  var _obj = is.number;
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
        };
      }
      if (!is.isEmpty(inputObj[key])) {
        // is.not.string.isCC
        extend(result[key], makeNot(inputObj[key]));
      }
      return result;
    }, {});
  };

  is.not = makeNot(is);

  is.appendBrowsers = function() {
    var className = 'desktop mobile edge chrome cordova safari opera firefox ie11 ie10 ie9 ie8 ie7 ie6 iOS iOS9 iOS10 iOS11 iOS12'
    .split(' ')
    .reduce(function(cn, browser) {
      return cn + (is[browser]() ? ' is-browser-' + browser : '');
    }, '');
    var html = document.querySelector('html');
    var origClassName = html.getAttribute('class') || '';
    html.setAttribute('class', (origClassName + ' ' + className).trim());
  };

  if (typeof module === 'object' && module.exports) {
    module.exports = is;
  } else {
    root.is = is;
  }
})();
