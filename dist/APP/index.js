(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['react', 'react-dom', '../JsonForm', '../JsonForm/styles/defaults.dev.css'], factory);
  } else if (typeof exports !== "undefined") {
    factory(require('react'), require('react-dom'), require('../JsonForm'), require('../JsonForm/styles/defaults.dev.css'));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.react, global.reactDom, global.JsonForm, global.defaultsDev);
    global.index = mod.exports;
  }
})(this, function (_react, _reactDom, _JsonForm) {
  'use strict';

  var _react2 = _interopRequireDefault(_react);

  var _JsonForm2 = _interopRequireDefault(_JsonForm);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /* eslint-env browser */

  /* Basics */
  (0, _reactDom.render)(_react2.default.createElement(_JsonForm2.default, null), document.getElementById('app'));
});