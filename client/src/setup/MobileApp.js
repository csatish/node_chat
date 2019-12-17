import React from 'react'
import ReactDOM from 'react-dom'
import 'font-awesome/css/font-awesome.min.css';
import 'react-datepicker/dist/react-datepicker.css';

import common from '../styles/common.css'

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

// import MRootContainer from '../containers/MRootContainer'

console.log("Development mode:", DEVELOPMENT)
import DynamicImport from './MDynamic'

ReactDOM.render(<DynamicImport/>, document.getElementById('xflowContainer'))