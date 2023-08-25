import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";

let container = document.getElementById("root");
let root = createRoot(container);
root.render(React.createElement(App));
