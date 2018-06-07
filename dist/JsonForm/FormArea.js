(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'react-bootstrap', 'prop-types', './FormItem', './FormPanel', '../Helpers', 'moment/locale/pt-br'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('react-bootstrap'), require('prop-types'), require('./FormItem'), require('./FormPanel'), require('../Helpers'), require('moment/locale/pt-br'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.reactBootstrap, global.propTypes, global.FormItem, global.FormPanel, global.Helpers, global.ptBr);
    global.FormArea = mod.exports;
  }
})(this, function (exports, _react, _reactBootstrap, _propTypes, _FormItem, _FormPanel, _Helpers) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

  var _FormItem2 = _interopRequireDefault(_FormItem);

  var _FormPanel2 = _interopRequireDefault(_FormPanel);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  var propTypes = {
    area: _propTypes2.default.shape({}).isRequired,
    parentState: _propTypes2.default.shape({}).isRequired,
    validateField: _propTypes2.default.func.isRequired,
    onChange: _propTypes2.default.func,
    onSelectChange: _propTypes2.default.func,
    onMultiSelectChange: _propTypes2.default.func,
    onAsyncChange: _propTypes2.default.func,
    onDateTimeChange: _propTypes2.default.func,
    onInputChange: _propTypes2.default.func,
    requirementMessage: _propTypes2.default.bool,
    children: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.node), _propTypes2.default.node, _propTypes2.default.arrayOf(_propTypes2.default.element), _propTypes2.default.element])
  };

  var defaultProps = {
    onChange: function onChange() {},
    onSelectChange: function onSelectChange() {},
    onMultiSelectChange: function onMultiSelectChange() {},
    onAsyncChange: function onAsyncChange() {},
    onDateTimeChange: function onDateTimeChange() {},
    onInputChange: function onInputChange() {},
    requirementMessage: false,
    children: null
  };

  function FormArea(_ref) {
    var area = _ref.area,
        parentState = _ref.parentState,
        validateField = _ref.validateField,
        onChange = _ref.onChange,
        onSelectChange = _ref.onSelectChange,
        onMultiSelectChange = _ref.onMultiSelectChange,
        onAsyncChange = _ref.onAsyncChange,
        onDateTimeChange = _ref.onDateTimeChange,
        onInputChange = _ref.onInputChange,
        requirementMessage = _ref.requirementMessage,
        children = _ref.children;

    return _react2.default.createElement(
      _FormPanel2.default,
      { bsStyle: area.bsStyle, ID: area.ID_grid, title: area.title },
      area.grid && (0, _Helpers.keyIndex)(area.grid, 2).map(function (row) {
        return _react2.default.createElement(
          _reactBootstrap.Row,
          { key: row.ID_0 },
          (0, _Helpers.keyIndex)(row, 35).map(function (col) {
            return _react2.default.createElement(
              _reactBootstrap.Col,
              _extends({ key: col.ID_model }, col.colProps),
              _react2.default.createElement(_FormItem2.default, {
                model: col.model,
                parentState: parentState,
                validateField: validateField,
                onChange: onChange,
                onSelectChange: onSelectChange,
                onMultiSelectChange: onMultiSelectChange,
                onAsyncChange: onAsyncChange,
                onDateTimeChange: onDateTimeChange,
                onInputChange: onInputChange,
                requirementMessage: requirementMessage
              })
            );
          })
        );
      }),
      children && children
    );
  }

  FormArea.propTypes = propTypes;
  FormArea.defaultProps = defaultProps;

  exports.default = FormArea;
});