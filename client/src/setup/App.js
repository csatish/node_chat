import React from 'react'
import ReactDOM from 'react-dom'
import 'font-awesome/css/font-awesome.min.css';
import 'react-datepicker/dist/react-datepicker.css';

import common from '../styles/common.css'

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

import RouteSetup from './routes'

console.log("Development mode:", DEVELOPMENT)


ReactDOM.render(<RouteSetup />, document.getElementById('xflowContainer'))