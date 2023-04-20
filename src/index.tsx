import React from "react";
import ReactDOM from "react-dom/client";
import "./global.css";
import Signup from "./features/Signup/Signup";

const App = () => {
  return (
    <div className="mx-auto mt-4 max-w-lg">
      <Signup />
    </div>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
