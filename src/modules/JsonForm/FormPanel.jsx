import React from 'react';
import PropTypes from 'prop-types';
import 'moment/locale/pt-br';


const propTypes = {
  bsStyle: PropTypes.string,
  ID: PropTypes.string,
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]),
};

const defaultProps = {
  bsStyle: 'primary',
  ID: null,
  children: null,
};

function FormPanel({
  bsStyle,
  ID,
  title,
  children,
}) {
  return (
    <div className={`box box-${bsStyle}`} key={ID}>
      <div className="box-header">
        <h3 className="box-title">{title}</h3>
      </div>
      <div className="box-body">
        {children && children}
      </div>
    </div>
  );
}

FormPanel.propTypes = propTypes;
FormPanel.defaultProps = defaultProps;

export default FormPanel;
