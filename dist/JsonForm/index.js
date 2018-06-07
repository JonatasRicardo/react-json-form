(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'react-bootstrap', 'prop-types', 'axios', 'lodash', '../Helpers', './FormArea', './FormPanel', 'moment/locale/pt-br', 'react-select/dist/react-select.css', 'react-datetime/css/react-datetime.css'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('react-bootstrap'), require('prop-types'), require('axios'), require('lodash'), require('../Helpers'), require('./FormArea'), require('./FormPanel'), require('moment/locale/pt-br'), require('react-select/dist/react-select.css'), require('react-datetime/css/react-datetime.css'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.reactBootstrap, global.propTypes, global.axios, global.lodash, global.Helpers, global.FormArea, global.FormPanel, global.ptBr, global.reactSelect, global.reactDatetime);
    global.index = mod.exports;
  }
})(this, function (exports, _react, _reactBootstrap, _propTypes, _axios, _lodash, _Helpers, _FormArea, _FormPanel) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

  var _axios2 = _interopRequireDefault(_axios);

  var _lodash2 = _interopRequireDefault(_lodash);

  var _FormArea2 = _interopRequireDefault(_FormArea);

  var _FormPanel2 = _interopRequireDefault(_FormPanel);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

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

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var validationExemple = function validationExemple(val) {
    if (val !== 'teste') {
      return { valid: true, message: 'ok' };
    }
    return { valid: false, message: 'preencha o campo corretamente' };
  };

  var propTypes = {
    onSuccess: _propTypes2.default.func,
    onError: _propTypes2.default.func,
    multidata: _propTypes2.default.arrayOf(_propTypes2.default.string),
    displayButtons: _propTypes2.default.bool,
    // getValues: PropTypes.func,
    saveForm: _propTypes2.default.bool,
    initialData: _propTypes2.default.shape({}),
    layout: _propTypes2.default.arrayOf(_propTypes2.default.shape({
      title: _propTypes2.default.string,
      grid: _propTypes2.default.arrayOf(_propTypes2.default.arrayOf(_propTypes2.default.shape({
        model: _propTypes2.default.shape({
          type: _propTypes2.default.string,
          name: _propTypes2.default.string,
          value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.array]),
          label: _propTypes2.default.string,
          required: _propTypes2.default.bool,
          validation: _propTypes2.default.func
        }),
        colProps: _propTypes2.default.shape({
          md: _propTypes2.default.number,
          lg: _propTypes2.default.number,
          sm: _propTypes2.default.number,
          xs: _propTypes2.default.number
        })
      })))
    }))
  };

  var defaultProps = {
    onSuccess: function onSuccess() {},
    onError: function onError() {},
    multidata: [],
    // getValues: () => {},
    saveForm: false,
    initialData: {},
    displayButtons: true,
    layout: [{
      title: 'Text Fields',
      grid: [[{
        model: {
          type: 'text',
          name: 'text',
          value: '',
          label: 'Text',
          required: true,
          validation: function validation(val) {
            if (val.length < 10) {
              return { valid: false, message: 'O campo nome deve conter mais de 10 caracteres' };
            }
            return { valid: true, message: 'ok' };
          }
        },
        colProps: { md: 12 }
      }], [{
        model: {
          type: 'textarea',
          name: 'textarea',
          value: '',
          label: 'Textarea',
          required: true,
          validation: validationExemple
        },
        colProps: { md: 12 }
      }]]
    }, {
      title: 'Date Fields',
      grid: [[{
        model: {
          type: 'datetime',
          name: 'datetime',
          value: '',
          label: 'Datetime',
          required: true,
          validation: validationExemple
        },
        colProps: { md: 4 }
      }, {
        model: {
          type: 'time',
          name: 'time',
          value: '',
          label: 'Time',
          required: true,
          validation: validationExemple
        },
        colProps: { md: 4 }
      }, {
        model: {
          type: 'date',
          name: 'date',
          value: '',
          label: 'date',
          required: true,
          validation: validationExemple
        },
        colProps: { md: 4 }
      }]]
    }, {
      title: 'Select Fields',
      grid: [[{
        model: {
          type: 'select',
          name: 'select',
          value: '',
          label: 'Select',
          options: [{ label: 'Sim', value: 'sim' }, { label: 'Não', value: 'nao' }],
          required: true,
          validation: validationExemple
        },
        colProps: { md: 3 }
      }, {
        model: {
          type: 'multi',
          name: 'multi',
          value: '',
          label: 'multi',
          options: [{ label: 'Sim', value: 'sim' }, { label: 'Não', value: 'nao' }],
          required: true,
          validation: validationExemple,
          props: {}
        },
        colProps: { md: 3 }
      }, {
        model: {
          type: 'asyncSelect',
          name: 'asyncSelect',
          value: '',
          label: 'asyncSelect',
          required: true,
          multi: true,
          onValueClick: function onValueClick(value, event) {
            console.log('asyncSelect::value', value);
            console.log('asyncSelect::event', event);
          },
          valueKey: 'id',
          labelKey: 'login',
          loadOptions: function loadOptions(input) {
            if (!input) {
              return Promise.resolve({ options: [] });
            }
            return _axios2.default.get('https://api.github.com/search/users?q=' + input).then(function (json) {
              console.log('json', json);
              return { options: json.data.items };
            });
          },
          backspaceRemoves: true,
          validation: validationExemple
        },
        colProps: { md: 3 }
      }, {
        model: {
          type: 'checkbox',
          name: 'checkbox',
          value: '',
          label: 'checkbox',
          options: [{ label: 'Sim', value: 'sim' }, { label: 'Não', value: 'nao' }],
          required: true,
          validation: validationExemple
        },
        colProps: { md: 3 }
      }]]
    }]
  };

  var JsonForm = function (_Component) {
    _inherits(JsonForm, _Component);

    _createClass(JsonForm, null, [{
      key: 'treeNamingFields',
      value: function treeNamingFields(_layout) {
        var flatLayout = (0, _Helpers.flatten)(_layout);
        Object.keys(flatLayout).forEach(function (key) {
          if (key.indexOf('.model.name') > -1) {
            var prefix = key.replace('.model.name', '.model');
            flatLayout[key] = prefix + '.' + flatLayout[key];
          }
        });
        return (0, _Helpers.unflatten)(flatLayout);
      }
    }]);

    function JsonForm(props) {
      _classCallCheck(this, JsonForm);

      var _this = _possibleConstructorReturn(this, (JsonForm.__proto__ || Object.getPrototypeOf(JsonForm)).call(this, props));

      _this.state = {
        utilities_newLayout: null,
        utilities_formData: null
      };

      _this.onChange = _this.onChange.bind(_this);
      _this.onInputChange = _this.onInputChange.bind(_this);
      _this.onAsyncChange = _this.onAsyncChange.bind(_this);
      _this.onSelectChange = _this.onSelectChange.bind(_this);
      _this.onMultiSelectChange = _this.onMultiSelectChange.bind(_this);
      _this.onDateTimeChange = _this.onDateTimeChange.bind(_this);
      _this.saveForm = _this.saveForm.bind(_this);
      _this.clearForm = _this.clearForm.bind(_this);
      _this.validateForm = _this.validateForm.bind(_this);
      _this.validateField = _this.validateField.bind(_this);
      _this.listFormFields = _this.listFormFields.bind(_this);
      _this.extractModelFromLayout = _this.extractModelFromLayout.bind(_this);
      _this.extractLayoutFromFormData = _this.extractLayoutFromFormData.bind(_this);
      return _this;
    }

    _createClass(JsonForm, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        this.extractModelFromLayout(this.extractLayoutFromFormData(this.props.initialData), this.props.multidata);
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(props) {
        // console.log('componentWillReceiveProps', props);
        if (props.layout) {
          this.extractModelFromLayout(this.extractLayoutFromFormData(props.initialData, props.layout), props.multidata);
        }
        if (props.saveForm) {
          this.saveForm();
        }
      }
    }, {
      key: 'onSelectChange',
      value: function onSelectChange(name) {
        var _this2 = this;

        return function (value) {
          return _this2.setState(_defineProperty({}, name, !value ? '' : value.value));
        };
      }
    }, {
      key: 'onMultiSelectChange',
      value: function onMultiSelectChange(name) {
        var _this3 = this;

        var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'value';

        return function (opt) {
          var temp = [];
          opt.forEach(function (v) {
            temp.push(v[key]);
          });
          _this3.setState(_defineProperty({}, name, temp));
        };
      }
    }, {
      key: 'onAsyncChange',
      value: function onAsyncChange(value, name) {
        this.setState(_defineProperty({}, name, !value ? '' : value));
      }
    }, {
      key: 'onDateTimeChange',
      value: function onDateTimeChange(date, name) {
        var newState = this.state;
        newState[name] = date._isAMomentObject ? date.toDate() : date; // eslint-disable-line
        this.setState(_extends({}, newState));
      }
    }, {
      key: 'onChange',
      value: function onChange(el) {
        var newState = this.state;
        newState[el.target.name] = el.target.value;
        this.setState(_extends({}, newState));
      }
    }, {
      key: 'onInputChange',
      value: function onInputChange(val, name) {
        var newState = this.state;
        newState[name] = val;
        this.setState(_extends({}, newState));
      }
    }, {
      key: 'extractModelFromLayout',
      value: function extractModelFromLayout(_layout) {
        var multidata = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

        var model = {};
        var validation = {};
        console.log('extractModelFromLayout::_layout', _layout);
        var layout = JsonForm.treeNamingFields(_layout);
        console.log('extractModelFromLayout::layout', layout);
        if (this.state) {
          Object.keys(this.state).forEach(function (key) {
            model[key] = null;
          });
        }

        function gridMap(area) {
          area.grid.forEach(function (rows) {
            rows.forEach(function (row) {
              if (row.model) {
                model[row.model.name] = row.model.value || '';
                model['validation_' + row.model.name] = {};
                validation[row.model.name] = {
                  rule: row.model.validation || function () {
                    return { valid: true, message: 'ok' };
                  },
                  required: row.model.required || false
                };
              }
            });
          });
        }

        function layoutMap(layoutItem) {
          if (layoutItem) {
            layoutItem.forEach(function (area) {
              if (area.grid) {
                gridMap(area);
              }
              multidata.forEach(function (multi) {
                if (area[multi]) {
                  layoutMap(area[multi]);
                }
              });
            });
          }
        }

        this.setState({});
        layoutMap(layout);
        this.validation = validation;

        this.setState(model);
      }
    }, {
      key: 'extractLayoutFromFormData',
      value: function extractLayoutFromFormData(formData, _layout) {
        var multidata = this.props.multidata;

        var multdataQty = {};
        var layout = _lodash2.default.cloneDeep(_layout || this.props.layout);

        multidata.forEach(function (field) {
          try {
            multdataQty[field] = formData[field].length || 0;
          } catch (error) {
            multdataQty[field] = 0;
          }
        });

        layout.forEach(function (area) {
          Object.keys(multdataQty).forEach(function (multi) {
            if (area[multi]) {
              area[multi].splice(1, area[multi].length);
            }
            for (var i = 1; i < multdataQty[multi]; i += 1) {
              if (area[multi] && multdataQty[multi] > area[multi].length) {
                area[multi].push(area[multi][0]);
              }
            }
          });
        });

        layout = JsonForm.treeNamingFields(layout);

        function gridMap(area) {
          area.grid.forEach(function (rows) {
            rows.forEach(function (_row) {
              var row = _row;
              if (row.model) {
                var _row$model$name$split = row.model.name.split('.model.').reverse(),
                    _row$model$name$split2 = _slicedToArray(_row$model$name$split, 1),
                    newName = _row$model$name$split2[0];

                var _row$model$name$split3 = row.model.name.split('.grid.')[0].split('.').reverse(),
                    _row$model$name$split4 = _slicedToArray(_row$model$name$split3, 2),
                    index = _row$model$name$split4[0],
                    multfield = _row$model$name$split4[1];

                if (multidata.indexOf(multfield) > -1 && formData[multfield]) {
                  try {
                    row.model.value = formData[multfield][index][newName] || '';
                  } catch (error) {
                    row.model.value = '';
                  }
                } else {
                  row.model.value = formData[newName] || '';
                }
                row.model.name = newName;
              }
            });
          });
        }

        function layoutMap(layoutItem) {
          if (layoutItem) {
            layoutItem.forEach(function (area) {
              if (area.grid) {
                gridMap(area);
              }
              Object.keys(multdataQty).forEach(function (multi) {
                if (area[multi]) {
                  layoutMap(area[multi]);
                }
              });
            });
          }
        }

        layoutMap(layout);

        return layout;
      }
    }, {
      key: 'listFormFields',
      value: function listFormFields() {
        var _this4 = this;

        var formFields = {};

        if (this.props.multidata) {
          this.props.multidata.forEach(function (multiField) {
            formFields[multiField] = [];
          });
        }

        Object.keys(this.state).forEach(function (key) {
          var newKey = key.split('model.')[1];
          var multiIndex = 0;
          var multKey = '';
          var isMulti = false;

          if (_this4.props.multidata) {
            _this4.props.multidata.forEach(function (multiField) {
              if (key.indexOf('.' + multiField + '.') > -1) {
                isMulti = true;
                multKey = multiField;
              }
            });
          }

          if (key.indexOf('validation_') === -1 && !isMulti && _this4.state[key] !== null) {
            formFields[newKey] = _this4.state[key];
          } else if (key.indexOf('validation_') === -1 && isMulti && _this4.state[key] !== null) {
            multiIndex = parseInt(key.split('.' + multKey + '.')[1].split('.')[0], 10);
            formFields[multKey][multiIndex] = formFields[multKey][multiIndex] || {};
            formFields[multKey][multiIndex][newKey] = _this4.state[key];
          }
        });

        return formFields;
      }
    }, {
      key: 'clearForm',
      value: function clearForm() {
        var state = this.state;

        var newState = {};
        Object.keys(state).forEach(function (key) {
          if (key.indexOf('utilities_') === -1 && key.indexOf('validation_') === -1 && state[key] !== null) {
            newState[key] = '';
          }
        });
        this.setState(newState);
      }
    }, {
      key: 'saveForm',
      value: function saveForm() {
        if (this.validateForm()) {
          this.props.onSuccess(this.listFormFields(), this.extractLayoutFromFormData(this.listFormFields()));
        } else {
          // this.props.onError(this.state);
          this.props.onError(this.listFormFields(), this.extractLayoutFromFormData(this.listFormFields()));
        }
      }
    }, {
      key: 'validateForm',
      value: function validateForm() {
        var _this5 = this;

        var state = this.state;

        var canSubmit = true;
        Object.keys(state).forEach(function (key) {
          if (state[key] !== null && key.indexOf('utilities_') === -1 && key.indexOf('validation_') === -1) {
            var result = _this5.validateField(key, state[key], true);
            if (!result.valid || result.requirementError) {
              canSubmit = false;
            }
          }
        });
        return canSubmit;
      }
    }, {
      key: 'validateField',
      value: function validateField(name, value) {
        var requirementMessage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        var validation = this.validation;

        var result = {};
        if (validation[name]) {
          result = validation[name].rule(value);

          try {
            result.requirementError = validation[name].required && value === '';
            if (requirementMessage && result.requirementError) {
              result.valid = false;
              result.message = 'esse campo é obrigatório';
            }
            this.setState(_defineProperty({}, 'validation_' + name, result));
          } catch (error) {
            console.error('error', error);
            console.error('o campo "validation" deve retornar um objet com o schema: { valid: true, message: "ok" }');
          }
        }
        return result;
      }
    }, {
      key: 'addMultidata',
      value: function addMultidata(multidata, _layout) {
        var formData = this.listFormFields();
        var blankTemplate = {};
        Object.keys(formData[multidata][0]).forEach(function (key) {
          blankTemplate[key] = '';
        });
        formData[multidata].push(blankTemplate);

        var layout = this.extractLayoutFromFormData(formData, _layout || this.props.layout);

        // atualiza o state com os valores dos campos e validações
        this.extractModelFromLayout(layout, this.props.multidata);

        this.setState({
          utilities_newLayout: layout,
          utilities_formData: formData
        });
      }
    }, {
      key: 'removeMultidata',
      value: function removeMultidata(multidata, index, _layout) {
        var formData = this.listFormFields();
        console.log('removeMultidata::formData', formData);
        formData[multidata].splice(index, 1);

        var layout = this.extractLayoutFromFormData(formData, _layout || this.props.layout);
        console.log('removeMultidata::layout', layout);
        // atualiza o state com os valores dos campos e validações
        this.extractModelFromLayout(layout, this.props.multidata);

        this.setState({
          utilities_newLayout: layout,
          utilities_formData: formData
        });
      }
    }, {
      key: 'render',
      value: function render() {
        var _this6 = this;

        return _react2.default.createElement(
          'form',
          null,
          _react2.default.createElement(
            _reactBootstrap.Row,
            null,
            _react2.default.createElement(
              _reactBootstrap.Col,
              { md: 9 },
              (0, _Helpers.keyIndex)(JsonForm.treeNamingFields(this.extractLayoutFromFormData(this.state.utilities_formData || this.props.initialData, this.state.utilities_newLayout)), 1).map(function (area) {
                return _react2.default.createElement(
                  'div',
                  null,
                  area.grid && _react2.default.createElement(_FormArea2.default, {
                    area: area,
                    title: area.title,
                    id: area.ID_grid,
                    bsStyle: area.bsStyle,
                    parentState: _this6.state,
                    validateField: _this6.validateField,
                    onChange: _this6.onChange,
                    onSelectChange: _this6.onSelectChange,
                    onMultiSelectChange: _this6.onMultiSelectChange,
                    onAsyncChange: _this6.onAsyncChange,
                    onDateTimeChange: _this6.onDateTimeChange,
                    onInputChange: _this6.onInputChange,
                    requirementMessage: _this6.props.saveForm
                  }),
                  _this6.props.multidata.map(function (multi, i) {
                    return area[multi] && _react2.default.createElement(
                      _FormPanel2.default,
                      { title: 'itens', ID: area['ID_' + multi] },
                      (0, _Helpers.keyIndex)(area[multi], 5 + i).map(function (subArea, j) {
                        return _react2.default.createElement(
                          'div',
                          null,
                          _react2.default.createElement(
                            _FormArea2.default,
                            {
                              area: subArea,
                              title: subArea.title,
                              id: subArea.ID_grid,
                              bsStyle: subArea.bsStyle,
                              parentState: _this6.state,
                              validateField: _this6.validateField,
                              onChange: _this6.onChange,
                              onSelectChange: _this6.onSelectChange,
                              onMultiSelectChange: _this6.onMultiSelectChange,
                              onAsyncChange: _this6.onAsyncChange,
                              onDateTimeChange: _this6.onDateTimeChange,
                              onInputChange: _this6.onInputChange,
                              requirementMessage: _this6.props.saveForm
                            },
                            area[multi].length > 1 && _react2.default.createElement(
                              'div',
                              { className: 'box-footer text-right' },
                              _react2.default.createElement(
                                _reactBootstrap.Button,
                                {
                                  bsStyle: 'primary',
                                  className: 'btn-flat btn-danger',
                                  onClick: function onClick() {
                                    _this6.removeMultidata(multi, j, _this6.state.utilities_newLayout);
                                  }
                                },
                                _react2.default.createElement('i', { className: 'fa fa-times' }),
                                ' Remover'
                              )
                            )
                          ),
                          _react2.default.createElement('br', null)
                        );
                      }),
                      _react2.default.createElement(
                        _reactBootstrap.Col,
                        { xs: 12, md: 12, className: 'text-center' },
                        _react2.default.createElement(
                          'div',
                          { className: 'box-footer' },
                          _react2.default.createElement(
                            _reactBootstrap.Button,
                            {
                              bsStyle: 'primary',
                              className: 'btn-flat',
                              onClick: function onClick() {
                                _this6.addMultidata(multi, _this6.state.utilities_newLayout);
                              }
                            },
                            _react2.default.createElement('i', { className: 'fa fa-plus' }),
                            ' Adicionar'
                          )
                        )
                      )
                    );
                  })
                );
              })
            ),
            this.props.displayButtons && _react2.default.createElement(
              _reactBootstrap.Col,
              { md: 3 },
              _react2.default.createElement(
                'div',
                { className: 'box box-primary' },
                _react2.default.createElement(
                  'div',
                  { className: 'box-header' },
                  _react2.default.createElement(
                    'h3',
                    { className: 'box-title' },
                    'Informa\xE7\xF5es e A\xE7\xF5es'
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'box-footer text-right' },
                  _react2.default.createElement(
                    _reactBootstrap.Button,
                    {
                      bsStyle: 'primary',
                      className: 'btn-flat btn-warning',
                      onClick: this.clearForm
                    },
                    _react2.default.createElement('i', { className: 'fa fa-trash' }),
                    ' Limpar'
                  ),
                  '\xA0\xA0',
                  _react2.default.createElement(
                    _reactBootstrap.Button,
                    {
                      bsStyle: 'primary',
                      className: 'btn-flat btn-success',
                      onClick: this.saveForm
                    },
                    _react2.default.createElement('i', { className: 'fa fa-save' }),
                    ' Salvar'
                  )
                )
              )
            )
          )
        );
      }
    }]);

    return JsonForm;
  }(_react.Component);

  JsonForm.propTypes = propTypes;

  JsonForm.defaultProps = defaultProps;

  exports.default = JsonForm;
});