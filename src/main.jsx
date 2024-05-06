import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import Error from "./Error.jsx";
import Home from "./Home.jsx";
import CustomerList from "./Components/CustomerList.jsx";
import TrainingList from "./Components/TrainingList.jsx";
import TrainingCalendar from "./Components/TrainingCalendar.jsx";
import { HashRouter } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <HashRouter basename="/">
    <App />
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/" element={<Home />} />
      <Route path="/customerlist" element={<CustomerList />} />
      <Route path="/traininglist" element={<TrainingList />} />
      <Route path="/calendar" element={<TrainingCalendar />} />
    </Routes>
  </HashRouter>
);
