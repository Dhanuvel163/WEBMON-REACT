import { ColorModeScript } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux';
import {configStore} from '../src/shared/store';
import {BrowserRouter} from 'react-router-dom';
const store=configStore();
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <StrictMode>
        <ColorModeScript />
        <App />
      </StrictMode>    
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);