import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "./Error.jsx";
import Home from "./Home.jsx";
import CustomerList from "./Components/CustomerList.jsx";
import TrainingList from "./Components/TrainingList.jsx";

// router for different app pages
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        element: <Home />,
        index: true,
      },
      {
        path: "customerlist",
        element: <CustomerList />,
      },
      {
        path: "traininglist",
        element: <TrainingList />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
