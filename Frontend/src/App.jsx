import React from "react";

import AppRoutes from "./routes/appRoutes";
import Navbar from "./components/Navbar/Navbar";
import { ToastContainer, toast } from "react-toastify";

const App = () => {
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="colored"
      />
      <Navbar />
      <AppRoutes />
    </div>
  );
};

export default App;
