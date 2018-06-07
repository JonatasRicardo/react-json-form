(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'prop-types', 'moment/locale/pt-br'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('prop-types'), require('moment/locale/pt-br'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.propTypes, global.ptBr);
    global.FormPanel = mod.exports;
  }
})(this, function (exports, _react, _propTypes) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var propTypes = {
    bsStyle: _propTypes2.default.string,
    ID: _propTypes2.default.string,
    title: _propTypes2.default.string.isRequired,
    children: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.node), _propTypes2.default.node, _propTypes2.default.arrayOf(_propTypes2.default.element), _propTypes2.default.element])
  };

  var defaultProps = {
    bsStyle: 'primary',
    ID: null,
    children: null
  };

  function FormPanel(_ref) {
    var bsStyle = _ref.bsStyle,
        ID = _ref.ID,
        title = _ref.title,
        children = _ref.children;

    return _react2.default.createElement(
      'div',
      { className: 'box box-' + bsStyle, key: ID },
      _react2.default.createElement(
        'div',
        { className: 'box-header' },
        _react2.default.createElement(
          'h3',
          { className: 'box-title' },
          title
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'box-body' },
        children && children
      )
    );
  }

  FormPanel.propTypes = propTypes;
  FormPanel.defaultProps = defaultProps;

  exports.default = FormPanel;
});