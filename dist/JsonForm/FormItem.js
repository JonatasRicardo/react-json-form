(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'react-bootstrap', 'react-datetime', 'react-icheck', 'react-select', 'prop-types', '../Helpers', 'icheck/skins/all.css', 'react-select/dist/react-select.css', 'react-datetime/css/react-datetime.css', 'moment/locale/pt-br'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('react-bootstrap'), require('react-datetime'), require('react-icheck'), require('react-select'), require('prop-types'), require('../Helpers'), require('icheck/skins/all.css'), require('react-select/dist/react-select.css'), require('react-datetime/css/react-datetime.css'), require('moment/locale/pt-br'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.reactBootstrap, global.reactDatetime, global.reactIcheck, global.reactSelect, global.propTypes, global.Helpers, global.all, global.reactSelect, global.reactDatetime, global.ptBr);
    global.FormItem = mod.exports;
  }
})(this, function (exports, _react, _reactBootstrap, _reactDatetime, _reactIcheck, _reactSelect, _propTypes, _Helpers) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _reactDatetime2 = _interopRequireDefault(_reactDatetime);

  var _reactSelect2 = _interopRequireDefault(_reactSelect);

  var _propTypes2 = _interopRequireDefault(_propTypes);

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
    model: _propTypes2.default.shape({}).isRequired,
    parentState: _propTypes2.default.shape({}).isRequired,
    validateField: _propTypes2.default.func.isRequired,
    onChange: _propTypes2.default.func,
    onSelectChange: _propTypes2.default.func,
    onMultiSelectChange: _propTypes2.default.func,
    onAsyncChange: _propTypes2.default.func,
    onDateTimeChange: _propTypes2.default.func,
    onInputChange: _propTypes2.default.func,
    checkRequirement: _propTypes2.default.bool
  };

  var defaultProps = {
    onChange: function onChange() {},
    onSelectChange: function onSelectChange() {},
    onMultiSelectChange: function onMultiSelectChange() {},
    onAsyncChange: function onAsyncChange() {},
    onDateTimeChange: function onDateTimeChange() {},
    onInputChange: function onInputChange() {},
    checkRequirement: true
  };

  function FormItem(_ref) {
    var model = _ref.model,
        parentState = _ref.parentState,
        validateField = _ref.validateField,
        _onChange = _ref.onChange,
        onSelectChange = _ref.onSelectChange,
        onMultiSelectChange = _ref.onMultiSelectChange,
        onAsyncChange = _ref.onAsyncChange,
        onDateTimeChange = _ref.onDateTimeChange,
        onInputChange = _ref.onInputChange,
        checkRequirement = _ref.checkRequirement;
    var _parentState$ = parentState['validation_' + model.name],
        valid = _parentState$.valid,
        message = _parentState$.message;

    var hasError = valid === false;
    var statusClass = hasError && 'has-error';
    var formItem = null;

    if (model.type) {
      switch (model.type) {
        case 'text':
          formItem = _react2.default.createElement(_reactBootstrap.FormControl, _extends({
            name: model.name,
            placeholder: model.placeholder || '',
            value: parentState[model.name],
            onChange: function onChange(el) {
              _onChange(el);
            },
            onBlur: function onBlur() {
              validateField(model.name, parentState[model.name], checkRequirement);
            }
          }, model.props));
          break;

        case 'select':
          formItem = _react2.default.createElement(_reactSelect2.default, _extends({
            name: model.name,
            noResultsText: model.noResultsText || 'Sem Resultados',
            options: model.options,
            value: parentState[model.name],
            onChange: function onChange(value) {
              onSelectChange(model.name)(value);
            },
            onBlur: function onBlur() {
              validateField(model.name, parentState[model.name], checkRequirement);
            }
          }, model.props));
          break;

        case 'multi':
          formItem = _react2.default.createElement(_reactSelect2.default, _extends({
            noResultsText: 'Sem Resultados',
            placeholder: model.placeholder || 'Selecione',
            multi: true,
            options: model.options,
            value: parentState[model.name],
            onChange: function onChange(value) {
              onMultiSelectChange(model.name)(value);
            },
            onBlur: function onBlur() {
              validateField(model.name, parentState[model.name], checkRequirement);
            }
          }, model.props));
          break;

        case 'asyncSelect':
          formItem = _react2.default.createElement(_reactSelect2.default.Async, _extends({
            multi: model.multi,
            value: parentState[model.name],
            onChange: function onChange(val) {
              onAsyncChange(val, model.name);
            },
            onBlur: function onBlur() {
              validateField(model.name, parentState[model.name], checkRequirement);
            },
            onValueClick: model.onValueClick,
            valueKey: model.valueKey,
            labelKey: model.labelKey,
            loadOptions: model.loadOptions,
            backspaceRemoves: model.backspaceRemoves,
            loadingPlaceholder: 'carregando'
          }, model.props));
          break;

        case 'textarea':
          formItem = _react2.default.createElement(_reactBootstrap.FormControl, _extends({
            name: model.name,
            placeholder: model.placeholder || '',
            componentClass: 'textarea',
            value: parentState[model.name],
            onChange: function onChange(el) {
              _onChange(el);
            },
            onBlur: function onBlur() {
              validateField(model.name, parentState[model.name], checkRequirement);
            },
            rows: 4
          }, model.props));
          break;

        case 'datetime':
          formItem = _react2.default.createElement(_reactDatetime2.default, _extends({
            defaultText: 'Selecione data e hora',
            locale: 'pt-br',
            defaultValue: '',
            value: parentState[model.name] && new Date(parentState[model.name]),
            onChange: function onChange(val) {
              onDateTimeChange(val, model.name);
              validateField(model.name, parentState[model.name], checkRequirement);
            }
          }, model.props));
          break;

        case 'date':
          formItem = _react2.default.createElement(_reactDatetime2.default, _extends({
            defaultText: 'Selecione a data',
            DateFormat: 'DD/MM/YY',
            timeFormat: false,
            viewMode: 'days',
            className: 'json-form__date-field',
            value: parentState[model.name] && new Date(parentState[model.name]),
            onChange: function onChange(val) {
              // console.log('Datetime::Datetime::val', val);
              onDateTimeChange(val, model.name);
              validateField(model.name, parentState[model.name], checkRequirement);
            }
          }, model.props));
          break;

        case 'time':
          formItem = _react2.default.createElement(_reactDatetime2.default, _extends({
            defaultText: 'Selecione o hor\xE1rio',
            timeFormat: 'hh:mm',
            dateFormat: false,
            value: parentState[model.name] && new Date(parentState[model.name]),
            onChange: function onChange(val) {
              onDateTimeChange(val, model.name);
              validateField(model.name, parentState[model.name], checkRequirement);
            }
          }, model.props));
          break;

        case 'checkbox':
          formItem = _react2.default.createElement(
            _reactBootstrap.Col,
            null,
            (0, _Helpers.keyIndex)(model.options, 42).map(function (options) {
              return _react2.default.createElement(_reactIcheck.Checkbox, _extends({
                key: options.ID_label,
                checkboxClass: 'icheckbox_square-blue',
                checked: parentState[model.name] === options.value,
                onChange: function onChange() {
                  var value = parentState[model.name] === options.value ? '' : options.value;
                  onInputChange(value, model.name);
                  validateField(model.name, parentState[model.name], checkRequirement);
                },
                increaseArea: '20%',
                label: '&nbsp;&nbsp;' + options.label + '&nbsp;&nbsp;&nbsp;&nbsp;'
              }, model.props));
            })
          );
          break;

        default:
          formItem = null;
          break;
      }
    }

    return _react2.default.createElement(
      'div',
      { className: 'form-group buildFormItem ' + statusClass },
      _react2.default.createElement(
        _reactBootstrap.ControlLabel,
        null,
        model.label,
        ' ',
        model.required && '*'
      ),
      formItem,
      _react2.default.createElement(
        'span',
        { className: 'help-block' },
        hasError && message
      )
    );
  }

  FormItem.propTypes = propTypes;
  FormItem.defaultProps = defaultProps;

  exports.default = FormItem;
});