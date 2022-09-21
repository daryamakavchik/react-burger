import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { App } from "./components/app/app";
import { Provider } from "react-redux";
import { store } from "./services/store";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { HashRouter} from "react-router-dom";

ReactDOM.render(
  <Provider store={store}>
    <DndProvider backend={HTML5Backend}>
      <HashRouter>
        <App />
      </HashRouter>
    </DndProvider>
  </Provider>,
  document.getElementById("root")
);
