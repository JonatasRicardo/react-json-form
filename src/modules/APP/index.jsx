/* eslint-env browser */

/* Basics */
import React from 'react';
import { render } from 'react-dom';

import JsonForm from '../JsonForm';
import '../JsonForm/styles/defaults.dev.css';

render(
  (
    <JsonForm />
  ), document.getElementById('app'),
);
