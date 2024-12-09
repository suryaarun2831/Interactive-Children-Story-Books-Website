import React from "react";
import { Helmet } from 'react-helmet';
import './App.css';
import Router from "./components/router/router";
function App() {
  return (
    <div className="App">
      <Helmet>
        <title>WonderBooks</title>
      </Helmet>
        <Router/>
        
    </div>
  );
}

export default App;
