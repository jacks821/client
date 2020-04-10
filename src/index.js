import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {
  ThemeProvider,
} from '@chakra-ui/core';
import { theme } from "./theme";

import {Drizzle} from "@drizzle/store";
import { DrizzleContext } from "@drizzle/react-plugin";
import PriorIncidents from "./contracts/PriorIncidents.json";

const options = {
  contracts: [
    PriorIncidents,
  ],
  web3: {
    fallback: {
      type: "ws",
      url: "ws://127.0.0.1:9545",
    },
  },
}

const drizzle = new Drizzle(options);

ReactDOM.render(
  <React.StrictMode>
    <DrizzleContext.Provider drizzle={drizzle}>
      <ThemeProvider theme={theme}>
          <App />
      </ThemeProvider>
    </DrizzleContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
