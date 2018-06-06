/* eslint-env browser */

/* Basics */
import React from 'react';
import { render } from 'react-dom';

import JsonForm from '../JsonForm';

render(
  (
    <JsonForm />
  ), document.getElementById('app'),
);
