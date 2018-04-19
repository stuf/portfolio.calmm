import * as React from 'karet';
import ReactDOM from 'react-dom';
import 'normalize.css';
import './index.css';
import App from './app';
import registerServiceWorker from './registerServiceWorker';

import { mkState } from './state';

const state = mkState({});

if (process.env.NODE_ENV === 'development') {
  state.log('state');
}

ReactDOM.render(<App state={state} />, document.getElementById('root'));
registerServiceWorker();
