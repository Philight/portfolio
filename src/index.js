import React from "react";
import { createRoot } from 'react-dom/client';

import App from "./App.js";


const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


//ReactDOM.render(appRouting, document.getElementById("root"));

/*
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
*/