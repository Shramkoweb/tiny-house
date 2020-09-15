import React from "react";
import { render } from "react-dom";

import { Listings } from "./sections";

render(
  <React.StrictMode>
    <Listings title='Tiny House'/>
  </React.StrictMode>,
  document.getElementById("root")
);
