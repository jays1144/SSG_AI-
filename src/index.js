import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";

// import { Provider } from "react-redux";
// import { createStore } from "redux";
import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  StyledEngineProvider,
} from "@mui/material";

import "./global.css";

const muiTheme = createTheme();

const container = document.getElementById("root");
const root = createRoot(container);
// function reducer(currentState, action) {
//   console.log("action 값 : ", action.name);
//   if (currentState == undefined) {
//     return {
//       name: "tl_name없음요.",
//     };
//   }

//   if (action.type == "test") {
//     console.log("reducer : " + action.name);
//     currentState.name = action.name;
//     console.log("currentState들어가진 값 : " + currentState.name);
//   }

//   return { ...currentState };
// }

// const store = createStore(reducer);

root.render(
  <BrowserRouter>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        {/* <Provider store={store}> */}
        <App />
        {/* </Provider> */}
      </ThemeProvider>
    </StyledEngineProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
