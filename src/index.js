import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react';
import {render} from 'react-dom';
import App from "./components/App";

// App component implements simple routing management, making postback
render(<App />, document.getElementById('root'));