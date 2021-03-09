import React from "react";
import Feedback from "./feedback.js";
import Home from "./Home.js";
import About from "./About.js";
import { BrowserRouter, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Home} />
      <Route path="/about" exact component={About} />
      <Route path="/feedback" exact component={Feedback} />
    </BrowserRouter>
  );
};

export default App;
