import React, { Component } from 'react';
import { Row, Col, Button, Tabs, Tab } from 'react-bootstrap';
import PropTypes from 'prop-types';
import axios from 'axios';
import _ from 'lodash';
import 'moment/locale/pt-br';
import 'react-select/dist/react-select.css';
import 'react-datetime/css/react-datetime.css';
import { keyIndex, flatten, unflatten } from '../Helpers';
import FormArea from './FormArea';
import FormPanel from './FormPanel';


const validationExemple = (val) => {
  if (val !== 'teste') {
    return { valid: true, message: 'ok' };
  }
  return { valid: false, message: 'preencha o campo corretamente' };
};

const propTypes = {
  onSuccess: PropTypes.func,
  onError: PropTypes.func,
  onFormUpdate: PropTypes.func,
  multidata: PropTypes.arrayOf(PropTypes.string),
  displayButtons: PropTypes.bool,
  saveForm: PropTypes.bool,
  initialData: PropTypes.shape({}),
  tabs: PropTypes.bool,
  layout: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    grid: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({
      model: PropTypes.shape({
        type: PropTypes.string,
        name: PropTypes.string,
        value: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.array,
        ]),
        label: PropTypes.string,
        required: PropTypes.bool,
        validation: PropTypes.func,
      }),
      colProps: PropTypes.shape({
        md: PropTypes.number,
        lg: PropTypes.number,
        sm: PropTypes.number,
        xs: PropTypes.number,
      }),
    }))),
  })),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]),
};

const defaultProps = {
  onSuccess: (data, layout) => {
    console.log('JsonForm.onSuccess.data', data);
    console.log('JsonForm.onSuccess.layout', layout);
  },
  onError: (data, layout) => {
    console.log('JsonForm.onError.data', data);
    console.log('JsonForm.onError.layout', layout);
  },
  multidata: [],
  saveForm: false,
  initialData: {},
  displayButtons: true,
  tabs: false,
  onFormUpdate: () => {},
  // onFormUpdate: (data) => { console.log('onFormUpdate', data); }
  layout: [
    {
      title: 'Text Fields',
      grid: [
        [
          {
            model: {
              type: 'text',
              name: 'text',
              value: '',
              label: 'Text',
              required: true,
              validation: (val) => {
                if (!val) {
                  return { valid: false, message: 'erro inesperado' };
                } else if (val.length < 10) {
                  return { valid: false, message: 'O campo nome deve conter mais de 10 caracteres' };
                }
                return { valid: true, message: 'ok' };
              },
            },
            colProps: { md: 12 },
          },
        ],
        [
          {
            model: {
              type: 'textarea',
              name: 'textarea',
              value: '',
              label: 'Textarea',
              required: true,
              validation: validationExemple,
            },
            colProps: { md: 12 },
          },
        ],
      ],
    },
    {
      title: 'Date Fields',
      grid: [
        [
          {
            model: {
              type: 'datetime',
              name: 'datetime',
              value: '',
              label: 'Datetime',
              required: true,
              validation: validationExemple,
            },
            colProps: { md: 4 },
          },
          {
            model: {
              type: 'time',
              name: 'time',
              value: '',
              label: 'Time',
              required: true,
              validation: validationExemple,
            },
            colProps: { md: 4 },
          },
          {
            model: {
              type: 'date',
              name: 'date',
              value: '',
              label: 'date',
              required: true,
              validation: validationExemple,
            },
            colProps: { md: 4 },
          },
        ],
      ],
    },
    {
      title: 'Select Fields',
      grid: [
        [
          {
            model: {
              type: 'select',
              name: 'select',
              value: '',
              label: 'Select',
              options: [
                { label: 'Sim', value: 'sim' },
                { label: 'Não', value: 'nao' },
              ],
              required: true,
              validation: validationExemple,
            },
            colProps: { md: 3 },
          },
          {
            model: {
              type: 'multi',
              name: 'multi',
              value: '',
              label: 'multi',
              options: [
                { label: 'Sim', value: 'sim' },
                { label: 'Não', value: 'nao' },
              ],
              required: true,
              validation: validationExemple,
              props: {},
            },
            colProps: { md: 3 },
          },
          {
            model: {
              type: 'asyncSelect',
              name: 'asyncSelect',
              value: '',
              label: 'asyncSelect',
              required: true,
              multi: true,
              onValueClick: (value, event) => {
                console.log('asyncSelect::value', value);
                console.log('asyncSelect::event', event);
              },
              valueKey: 'id',
              labelKey: 'login',
              loadOptions: (input) => {
                if (!input) {
                  return Promise.resolve({ options: [] });
                }
                return axios.get(`https://api.github.com/search/users?q=${input}`)
                  .then((json) => {
                    console.log('json', json);
                    return { options: json.data.items };
                  });
              },
              backspaceRemoves: true,
              validation: validationExemple,
            },
            colProps: { md: 3 },
          },
          {
            model: {
              type: 'checkbox',
              name: 'checkbox',
              value: '',
              label: 'checkbox',
              options: [
                { label: 'Sim', value: 'sim' },
                { label: 'Não', value: 'nao' },
              ],
              required: true,
              validation: validationExemple,
            },
            colProps: { md: 3 },
          },
        ],
      ],
    },
  ],
  children: null,
};

class JsonForm extends Component {
  static treeNamingFields(_layout) {
    const flatLayout = flatten(_layout);
    Object.keys(flatLayout).forEach((key) => {
      if (key.indexOf('.model.name') > -1) {
        const prefix = key.replace('.model.name', '.model');
        flatLayout[key] = `${prefix}.${flatLayout[key]}`;
      }
    });
    return unflatten(flatLayout);
  }

  static emptyValueOfType(type) {
    let emptyValue = '';
    switch (type) {
      case 'multi':
        emptyValue = [];
        break;
      case 'multiCreatable':
        emptyValue = [];
        break;
      default:
        emptyValue = '';
        break;
    }
    return emptyValue;
  }

  constructor(props) {
    super(props);

    this.state = {
      utilities_newLayout: null,
      utilities_formData: null,
    };

    this.onChange = this.onChange.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onAsyncChange = this.onAsyncChange.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
    this.onMultiSelectChange = this.onMultiSelectChange.bind(this);
    this.onDateTimeChange = this.onDateTimeChange.bind(this);
    this.saveForm = this.saveForm.bind(this);
    this.clearForm = this.clearForm.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.validateField = this.validateField.bind(this);
    this.listFormFields = this.listFormFields.bind(this);
    this.extractModelFromLayout = this.extractModelFromLayout.bind(this);
    this.extractLayoutFromFormData = this.extractLayoutFromFormData.bind(this);
    this.formContent = this.formContent.bind(this);
  }

  componentWillMount() {
    this.extractModelFromLayout(this
      .extractLayoutFromFormData(this.props.initialData), this.props.multidata);
  }

  componentWillReceiveProps(props) {
    // console.log('componentWillReceiveProps', props);
    if (props.layout) {
      this.extractModelFromLayout(this
        .extractLayoutFromFormData(props.initialData, props.layout), props.multidata);
    }
    if (props.saveForm) {
      this.saveForm();
    }
  }

  componentDidUpdate() {
    const formData = this.listFormFields();
    this.props.onFormUpdate(formData);
  }

  onSelectChange(name) {
    return (value => this.setState({
      [name]: (!value ? '' : value.value),
    }));
  }

  onMultiSelectChange(name, key = 'value') {
    return ((opt) => {
      const temp = [];
      opt.forEach((v) => {
        temp.push(v[key]);
      });
      this.setState({ [name]: temp });
    });
  }

  onAsyncChange(value, name) {
    this.setState({
      [name]: (!value ? '' : value),
    });
  }

  onDateTimeChange(date, name) {
    const newState = this.state;
    newState[name] = date._isAMomentObject ? date.toDate() : date; // eslint-disable-line
    this.setState({ ...newState });
  }

  onChange(el) {
    const newState = this.state;
    newState[el.target.name] = el.target.value;
    this.setState({ ...newState });
  }

  onInputChange(val, name) {
    const newState = this.state;
    newState[name] = val;
    this.setState({ ...newState });
  }

  extractModelFromLayout(_layout, multidata = []) {
    const model = {};
    const validation = {};
    const layout = JsonForm.treeNamingFields(_layout);
    if (this.state) {
      Object.keys(this.state).forEach((key) => {
        model[key] = null;
      });
    }

    function gridMap(area) {
      area.grid.forEach((rows) => {
        rows.forEach((row) => {
          if (row.model) {
            model[row.model.name] =
              row.model.value === undefined ?
                JsonForm.emptyValueOfType(row.model.type) :
                row.model.value;
            model[`validation_${row.model.name}`] = {};
            validation[row.model.name] = {
              rule: row.model.validation || (() => ({ valid: true, message: 'ok' })),
              required: row.model.required || false,
            };
          }
        });
      });
    }

    function layoutMap(layoutItem) {
      if (layoutItem) {
        layoutItem.forEach((area) => {
          if (area.grid) {
            gridMap(area);
          }
          multidata.forEach((multi) => {
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

  extractLayoutFromFormData(formData, _layout) {
    const { multidata } = this.props;
    const multdataQty = {};
    let layout = _.cloneDeep(_layout || this.props.layout);

    multidata.forEach((field) => {
      try {
        multdataQty[field] = formData[field].length || 0;
      } catch (error) {
        multdataQty[field] = 0;
      }
    });

    layout.forEach((area) => {
      Object.keys(multdataQty).forEach((multi) => {
        if (area[multi]) {
          area[multi].splice(1, area[multi].length);
        }
        for (let i = 1; i < multdataQty[multi]; i += 1) {
          if (area[multi] && (multdataQty[multi] > area[multi].length)) {
            area[multi].push(area[multi][0]);
          }
        }
      });
    });

    layout = JsonForm.treeNamingFields(layout);

    function gridMap(area) {
      area.grid.forEach((rows) => {
        rows.forEach((_row) => {
          const row = _row;
          if (row.model) {
            const [newName] = row.model.name.split('.model.').reverse();
            const [index, multfield] = row.model.name.split('.grid.')[0].split('.').reverse();
            if (multidata.indexOf(multfield) > -1 && formData[multfield]) {
              try {
                row.model.value = formData[multfield][index][newName] === undefined ?
                  JsonForm.emptyValueOfType(row.model.type) :
                  formData[multfield][index][newName];
              } catch (error) {
                row.model.value = '';
              }
            } else {
              row.model.value = formData[newName] === undefined ?
                JsonForm.emptyValueOfType(row.model.type) :
                formData[newName];
            }
            row.model.name = newName;
          }
        });
      });
    }

    function layoutMap(layoutItem) {
      if (layoutItem) {
        layoutItem.forEach((area) => {
          if (area.grid) {
            gridMap(area);
          }
          Object.keys(multdataQty).forEach((multi) => {
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

  listFormFields() {
    const formFields = {};

    if (this.props.multidata) {
      this.props.multidata.forEach((multiField) => {
        formFields[multiField] = [];
      });
    }

    Object.keys(this.state).forEach((key) => {
      const newKey = key.split('model.')[1];
      let multiIndex = 0;
      let multKey = '';
      let isMulti = false;

      if (this.props.multidata) {
        this.props.multidata.forEach((multiField) => {
          if (key.indexOf(`.${multiField}.`) > -1) {
            isMulti = true;
            multKey = multiField;
          }
        });
      }

      if (key.indexOf('validation_') === -1 && !isMulti && this.state[key] !== null) {
        formFields[newKey] = this.state[key];
      } else if (key.indexOf('validation_') === -1 && isMulti && this.state[key] !== null) {
        multiIndex = parseInt(key.split(`.${multKey}.`)[1].split('.')[0], 10);
        formFields[multKey][multiIndex] = formFields[multKey][multiIndex] || {};
        formFields[multKey][multiIndex][newKey] = this.state[key];
      }
    });

    return formFields;
  }

  clearForm() {
    const { state } = this;
    const newState = {};
    Object.keys(state).forEach((key) => {
      if (key.indexOf('utilities_') === -1 &&
          key.indexOf('validation_') === -1 &&
          state[key] !== null) {
        newState[key] = '';
      }
    });
    this.setState(newState);
  }

  saveForm() {
    if (this.validateForm()) {
      this.props.onSuccess(this.listFormFields(), this
        .extractLayoutFromFormData(this.listFormFields()));
    } else {
      // this.props.onError(this.state);
      this.props.onError(this.listFormFields(), this
        .extractLayoutFromFormData(this.listFormFields()));
    }
  }

  validateForm() {
    const { state } = this;
    let canSubmit = true;
    Object.keys(state).forEach((key) => {
      if (state[key] !== null
        && key.indexOf('utilities_') === -1
        && key.indexOf('validation_') === -1) {
        const result = this.validateField(key, state[key], true);
        if (!result.valid || result.requirementError) {
          canSubmit = false;
        }
      }
    });
    return canSubmit;
  }

  validateField(name, value, requirementMessage = false) {
    const { validation } = this;
    let result = {};
    if (validation[name]) {
      result = validation[name].rule(value);

      try {
        result.requirementError = validation[name].required && value === '';
        if (requirementMessage && result.requirementError) {
          result.valid = false;
          result.message = 'este campo é obrigatório';
        }
        this.setState({
          [`validation_${name}`]: result,
        });
      } catch (error) {
        console.error('error', error);
        console.error('o campo "validation" deve retornar um objet com o schema: { valid: true, message: "ok" }');
      }
    }
    return result;
  }

  addMultidata(multidata, _layout) {
    const formData = this.listFormFields();
    const blankTemplate = {};
    Object.keys(formData[multidata][0]).forEach((key) => {
      blankTemplate[key] = '';
    });
    formData[multidata].push(blankTemplate);

    const layout = this.extractLayoutFromFormData(formData, (_layout || this.props.layout));

    // atualiza o state com os valores dos campos e validações
    this.extractModelFromLayout(layout, this.props.multidata);

    this.setState({
      utilities_newLayout: layout,
      utilities_formData: formData,
    });
  }

  removeMultidata(multidata, index, _layout) {
    const formData = this.listFormFields();
    console.log('removeMultidata::formData', formData);
    formData[multidata].splice(index, 1);

    const layout = this.extractLayoutFromFormData(formData, (_layout || this.props.layout));
    console.log('removeMultidata::layout', layout);
    // atualiza o state com os valores dos campos e validações
    this.extractModelFromLayout(layout, this.props.multidata);

    this.setState({
      utilities_newLayout: layout,
      utilities_formData: formData,
    });
  }

  formContent({ area, multidata, utilitiesNewLayout }) {
    return (
      <div>
        {area.grid && <FormArea
          area={area}
          title={area.title}
          id={area.ID_grid}
          bsStyle={area.bsStyle}
          parentState={this.state}
          validateField={this.validateField}
          onChange={this.onChange}
          onSelectChange={this.onSelectChange}
          onMultiSelectChange={this.onMultiSelectChange}
          onAsyncChange={this.onAsyncChange}
          onDateTimeChange={this.onDateTimeChange}
          onInputChange={this.onInputChange}
          requirementMessage={this.props.saveForm}
          listFormFields={this.listFormFields}
        />}

        {area.content && area.content()}

        {multidata.map((multi, i) => (
          area[multi] &&
          <FormPanel title="itens" ID={area[`ID_${multi}`]}>
            {keyIndex(area[multi], 5 + i).map((subArea, j) => (
              <div>
                <FormArea
                  area={subArea}
                  title={subArea.title}
                  id={subArea.ID_grid}
                  bsStyle={subArea.bsStyle}
                  parentState={this.state}
                  validateField={this.validateField}
                  onChange={this.onChange}
                  onSelectChange={this.onSelectChange}
                  onMultiSelectChange={this.onMultiSelectChange}
                  onAsyncChange={this.onAsyncChange}
                  onDateTimeChange={this.onDateTimeChange}
                  onInputChange={this.onInputChange}
                  requirementMessage={this.props.saveForm}
                  listFormFields={this.listFormFields}
                >

                  {
                    area[multi].length > 1 &&
                    <div className="box-footer text-right">
                      <Button
                        bsStyle="primary"
                        className="btn-flat btn-danger"
                        onClick={() => {
                          this.removeMultidata(multi, j, utilitiesNewLayout);
                        }}
                      >
                        <i className="fa fa-times" /> Remover
                      </Button>
                    </div>
                  }
                </FormArea>
                <br />
              </div>
            ))}
            <Col xs={12} md={12} className="text-center">
              <div className="box-footer">
                <Button
                  bsStyle="primary"
                  className="btn-flat"
                  onClick={() => {
                    this.addMultidata(multi, utilitiesNewLayout);
                  }}
                >
                  <i className="fa fa-plus" /> Adicionar
                </Button>
              </div>
            </Col>
          </FormPanel>
        ))}
      </div>
    );
  }

  render() {
    const { children } = this.props;

    const childrenWithProps = React.Children.map(children, child =>
      React.cloneElement(child, {
        JF_clearForm: this.clearForm,
        JF_saveForm: this.saveForm,
        JF_getFormData: this.listFormFields,
      }));

    return (
      <form >
        <Row>
          <Col md={9}>

            {this.props.tabs &&
            <Tabs id="uncontrolled-tab-example" className="nav-tabs-custom">
                {keyIndex(JsonForm
                .treeNamingFields(this
                .extractLayoutFromFormData((this.state.utilities_formData
                  || this.props.initialData), this.state.utilities_newLayout)), 1)
                .map((area, i) => (
                  <Tab eventKey={area.tab || i} title={area.tabTitle}>
                    <this.formContent
                      key={area.ID_grid || area.ID_title}
                      area={area}
                      multidata={this.props.multidata}
                      utilitiesNewLayout={this.state.utilities_newLayout}
                    />
                  </Tab>
                ))}
            </Tabs>}

            {!this.props.tabs &&
            <div>
                {keyIndex(JsonForm
                .treeNamingFields(this
                .extractLayoutFromFormData((this.state.utilities_formData
                  || this.props.initialData), this.state.utilities_newLayout)), 1)
                .map(area => (
                  <this.formContent
                    key={area.ID_grid || area.ID_title}
                    area={area}
                    multidata={this.props.multidata}
                    utilitiesNewLayout={this.state.utilities_newLayout}
                  />
                ))}
            </div>}

          </Col>
          <Col md={3}>
            {
              this.props.displayButtons &&
              <div className="box box-primary">
                <div className="box-header">
                  <h3 className="box-title">Ações</h3>
                </div>
                <div className="box-footer text-right">
                  <Button
                    bsStyle="primary"
                    className="btn-flat btn-warning"
                    onClick={this.clearForm}
                  >
                    <i className="fa fa-trash" /> Limpar
                  </Button>
                  &nbsp;&nbsp;
                  <Button
                    bsStyle="primary"
                    className="btn-flat btn-success"
                    onClick={this.saveForm}
                  >
                    <i className="fa fa-save" /> Salvar
                  </Button>
                </div>
              </div>
            }
            {childrenWithProps}
          </Col>
        </Row>
      </form>
    );
  }
}

JsonForm.propTypes = propTypes;

JsonForm.defaultProps = defaultProps;

export default JsonForm;
