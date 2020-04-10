import React from 'react';
import {DrizzleContext} from "@drizzle/react-plugin";
import './App.css';
import MyDrizzleApp from "./components/MyDrizzleApp";

const App = () => {

  return (
    <DrizzleContext.Consumer>
        {drizzleContext => {
          const{ drizzle, drizzleState, initialized} = drizzleContext;
          if (!initialized) {
              return "Loading...";
          }
          return (
            <MyDrizzleApp drizzle={drizzle} drizzleState={drizzleState}/>
          );
        }}
    </DrizzleContext.Consumer>
  );
}

export default App;
