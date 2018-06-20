import React from 'react';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import 'moment/locale/pt-br';
import FormItem from './FormItem';
import FormPanel from './FormPanel';
import { keyIndex } from '../Helpers';

const propTypes = {
  area: PropTypes.shape({}).isRequired,
  parentState: PropTypes.shape({}).isRequired,
  validateField: PropTypes.func.isRequired,
  onChange: PropTypes.func,
  onSelectChange: PropTypes.func,
  onMultiSelectChange: PropTypes.func,
  onAsyncChange: PropTypes.func,
  onDateTimeChange: PropTypes.func,
  onInputChange: PropTypes.func,
  requirementMessage: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]),
};

const defaultProps = {
  onChange: () => {},
  onSelectChange: () => {},
  onMultiSelectChange: () => {},
  onAsyncChange: () => {},
  onDateTimeChange: () => {},
  onInputChange: () => {},
  requirementMessage: false,
  children: null,
};

function FormArea({
  area,
  parentState,
  validateField,
  onChange,
  onSelectChange,
  onMultiSelectChange,
  onAsyncChange,
  onDateTimeChange,
  onInputChange,
  requirementMessage,
  children,
}) {
  return (
    <FormPanel bsStyle={area.bsStyle} ID={area.ID_grid} title={area.title}>
      {area.grid && keyIndex(area.grid, 2).map(row => (
        <Row key={row.ID_0}>
          {keyIndex(row, 35).map(col => (
            <Col key={col.ID_model} {...col.colProps}>
              {(!col.custom && col.model) && <FormItem
                model={col.model}
                parentState={parentState}
                validateField={validateField}
                onChange={onChange}
                onSelectChange={onSelectChange}
                onMultiSelectChange={onMultiSelectChange}
                onAsyncChange={onAsyncChange}
                onDateTimeChange={onDateTimeChange}
                onInputChange={onInputChange}
                requirementMessage={requirementMessage}
              />}
              {col.custom && <col.custom
                model={col.model}
                parentState={parentState}
                validateField={validateField}
                onChange={onChange}
                onSelectChange={onSelectChange}
                onMultiSelectChange={onMultiSelectChange}
                onAsyncChange={onAsyncChange}
                onDateTimeChange={onDateTimeChange}
                onInputChange={onInputChange}
                requirementMessage={requirementMessage}
              />}
            </Col>
          ))}
        </Row>
      ))}
      {children && children}
    </FormPanel>
  );
}

FormArea.propTypes = propTypes;
FormArea.defaultProps = defaultProps;

export default FormArea;
