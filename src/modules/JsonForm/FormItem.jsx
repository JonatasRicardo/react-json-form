import React from 'react';
import { Col, FormControl, ControlLabel } from 'react-bootstrap';
import Datetime from 'react-datetime';
import { Checkbox } from 'react-icheck';
import Select from 'react-select';
import PropTypes from 'prop-types';
import 'icheck/skins/all.css'; // or single skin css
import 'react-select/dist/react-select.css';
import 'react-datetime/css/react-datetime.css';
import 'moment/locale/pt-br';
import { keyIndex } from '../Helpers';
import './style.css';

const propTypes = {
  model: PropTypes.shape({}).isRequired,
  parentState: PropTypes.shape({}).isRequired,
  validateField: PropTypes.func.isRequired,
  onChange: PropTypes.func,
  onSelectChange: PropTypes.func,
  onMultiSelectChange: PropTypes.func,
  onAsyncChange: PropTypes.func,
  onDateTimeChange: PropTypes.func,
  onInputChange: PropTypes.func,
  checkRequirement: PropTypes.bool,
};

const defaultProps = {
  onChange: () => { },
  onSelectChange: () => { },
  onMultiSelectChange: () => { },
  onAsyncChange: () => { },
  onDateTimeChange: () => { },
  onInputChange: () => { },
  checkRequirement: true,
};

function FormItem({
  model,
  parentState,
  validateField,
  onChange,
  onSelectChange,
  onMultiSelectChange,
  onAsyncChange,
  onDateTimeChange,
  onInputChange,
  checkRequirement,
}) {
  const { valid, message } = parentState[`validation_${model.name}`];
  const hasError = (valid === false);
  const statusClass = hasError && 'has-error';
  let formItem = null;

  if (model.type) {
    switch (model.type) {
      case 'text':
        formItem = (
          <FormControl
            name={model.name}
            placeholder={model.placeholder || ''}
            value={parentState[model.name]}
            onChange={(el) => {
              onChange(el);
            }}
            onBlur={() => {
              validateField(model.name, parentState[model.name], checkRequirement);
            }}
            {...model.props}
          />
        );
        break;

      case 'select':
        formItem = (
          <Select
            name={model.name}
            noResultsText={model.noResultsText || 'Sem Resultados'}
            options={model.options}
            value={parentState[model.name]}
            onChange={(value) => {
              onSelectChange(model.name)(value);
              validateField(model.name, parentState[model.name], checkRequirement);
            }}
            {...model.props}
          />
        );
        break;

      case 'multi':
        formItem = (
          <Select
            noResultsText="Sem Resultados"
            placeholder={model.placeholder || 'Selecione'}
            multi
            options={model.options}
            value={parentState[model.name]}
            onChange={(value) => {
              onMultiSelectChange(model.name)(value);
              validateField(model.name, parentState[model.name], checkRequirement);
            }}
            {...model.props}
          />

        );
        break;

      case 'asyncSelect':
        formItem = (
          <Select.Async
            multi={model.multi}
            value={parentState[model.name]}
            onChange={(val) => {
              onAsyncChange(val, model.name);
              validateField(model.name, parentState[model.name], checkRequirement);
            }}
            onValueClick={model.onValueClick}
            valueKey={model.valueKey}
            labelKey={model.labelKey}
            loadOptions={model.loadOptions}
            backspaceRemoves={model.backspaceRemoves}
            loadingPlaceholder="carregando"
            {...model.props}
          />
        );
        break;

      case 'textarea':
        formItem = (
          <FormControl
            name={model.name}
            placeholder={model.placeholder || ''}
            componentClass="textarea"
            value={parentState[model.name]}
            onChange={(el) => {
              onChange(el);
            }}
            onBlur={() => {
              validateField(model.name, parentState[model.name], checkRequirement);
            }}
            rows={4}
            {...model.props}
          />
        );
        break;

      case 'datetime':
        formItem = (
          <Datetime
            defaultText="Selecione data e hora"
            locale="pt-br"
            defaultValue=""
            value={parentState[model.name] && new Date(parentState[model.name])}
            onChange={(val) => {
              onDateTimeChange(val, model.name);
              validateField(model.name, parentState[model.name], checkRequirement);
            }}
            {...model.props}
          />
        );
        break;

      case 'date':
        formItem = (
          <Datetime
            defaultText="Selecione a data"
            DateFormat="DD/MM/YY"
            timeFormat={false}
            viewMode="days"
            className="json-form__date-field"
            value={parentState[model.name] && new Date(parentState[model.name])}
            onChange={(val) => {
              // console.log('Datetime::Datetime::val', val);
              onDateTimeChange(val, model.name);
              validateField(model.name, parentState[model.name], checkRequirement);
            }}
            {...model.props}
          />
        );
        break;

      case 'time':
        formItem = (
          <Datetime
            defaultText="Selecione o horário"
            timeFormat="hh:mm"
            dateFormat={false}
            value={parentState[model.name] && new Date(parentState[model.name])}
            onChange={(val) => {
              onDateTimeChange(val, model.name);
              validateField(model.name, parentState[model.name], checkRequirement);
            }}
            {...model.props}
          />
        );
        break;

      case 'checkbox':
        formItem = (
          <Col>
            {keyIndex(model.options, 42).map(options => (
              <Checkbox
                key={options.ID_label}
                checkboxClass="icheckbox_square-blue"
                checked={parentState[model.name] === options.value}
                onChange={() => {
                  const value = parentState[model.name] === options.value ? '' : options.value;
                  onInputChange(value, model.name);
                  validateField(model.name, parentState[model.name], checkRequirement);
                }}
                increaseArea="20%"
                label={`&nbsp;&nbsp;${options.label}&nbsp;&nbsp;&nbsp;&nbsp;`}
                {...model.props}
              />
            ))}
          </Col>
        );
        break;

      default:
        formItem = null;
        break;
    }
  }

  return (
    <div className={`form-group buildFormItem ${statusClass}`}>
      <ControlLabel>{model.label} {model.required && '*'}</ControlLabel>{formItem}
      <span className="help-block">{hasError && message}</span>
    </div>
  );
}

FormItem.propTypes = propTypes;
FormItem.defaultProps = defaultProps;

export default FormItem;
