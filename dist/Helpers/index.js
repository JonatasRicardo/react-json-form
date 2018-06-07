(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'hashids'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('hashids'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.hashids);
    global.index = mod.exports;
  }
})(this, function (exports, _hashids) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.unflatten = exports.flatten = exports.keyIndex = exports.formateDate = exports.lessThenZeroFormat = undefined;

  var _hashids2 = _interopRequireDefault(_hashids);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
      }

      return arr2;
    } else {
      return Array.from(arr);
    }
  }

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  var lessThenZeroFormat = exports.lessThenZeroFormat = function lessThenZeroFormat(_num) {
    var num = parseInt(_num, 10);
    return num < 10 ? '0' + num : '' + num;
  };

  var formateDate = exports.formateDate = function formateDate(dateString) {
    var showTime = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var portion = typeof dateString === 'string' ? 1 : 0;
    var data = new Date(dateString);
    if (data.toString() === 'Invalid Date' || !dateString) {
      return '__/__/__';
    }
    var time = showTime ? ' ' + lessThenZeroFormat(data.getHours()) + ':' + lessThenZeroFormat(data.getMinutes()) : '';
    var formatedDate = lessThenZeroFormat(data.getDate() + portion) + '/' + lessThenZeroFormat(data.getMonth() + 1) + '/' + data.getFullYear() + time;
    return formatedDate;
  };

  // Padronização ESLINT do módulo https://www.npmjs.com/package/react-key-index
  var keyIndex = exports.keyIndex = function keyIndex(_array, digit) {
    var hashids = new _hashids2.default();
    var digits = [9, 9, digit];
    var obj = {};
    var array = _array;

    var result = array.map(function (_arr, index) {
      var i = 0;
      var arr = _arr;
      var aleatory = index + 1;
      digits.push(index);
      if ((typeof arr === 'undefined' ? 'undefined' : _typeof(arr)) === 'object') {
        Object.keys(arr).forEach(function (key) {
          var k = '';
          digits.push(i);
          k = 'ID_' + key;
          arr[k] = hashids.encode([].concat(_toConsumableArray(digits), [aleatory]));
          digits = digits.slice(0, 6);
          i += 1;
        });
        return arr;
      }
      obj = {
        value: arr,
        id: hashids.encode(digits)
      };
      digits = digits.slice(0, 5);
      return obj;
    });
    return result;
  };

  // "aplana" objetos e arrays
  var flatten = exports.flatten = function flatten(arr) {
    function dive(currentKey, into, _target) {
      var target = _target;
      Object.keys(into).forEach(function (i) {
        var newKey = i;
        var newVal = into[i];

        if (currentKey.length > 0) {
          newKey = currentKey + '.' + i;
        }
        if ((typeof newVal === 'undefined' ? 'undefined' : _typeof(newVal)) === 'object' && typeof newVal.getMonth !== 'function') {
          dive(newKey, newVal, target);
        } else {
          target[newKey] = newVal;
        }
      });
    }
    var newObj = {};
    dive('', arr, newObj);
    return newObj;
  };

  /* eslint-disable */
  var unflatten = exports.unflatten = function unflatten(data) {
    var resultArr = [];
    var resultObj = {};
    var result = resultArr;
    for (var i in data) {
      var keys = i.split('.');
      keys.reduce(function (r, e, j) {
        return r[e] || (r[e] = isNaN(Number(keys[j + 1])) ? keys.length - 1 == j ? data[i] : {} : []);
      }, result);
    }
    return result;
  };
});