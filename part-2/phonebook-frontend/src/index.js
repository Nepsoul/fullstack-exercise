import React from "react";
import { creatRoot } from "react-dom/client";
import App from "./App";

let container = document.getElementById("root");
let root = creatRoot(container);
root.render(React.createElement(App));
