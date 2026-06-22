import React from "react";

import AppRoutesT from "./routes/AppRoutes.jsx";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { ToastContainer } from "react-toastify";
import ScrollToTop from "./components/ScrollTop/ScrollToTop";
const App = () => {
  return (
    <div className="app-layout">
      <ScrollToTop />
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
      <main className="app-content">
        <AppRoutesT />
      </main>

      <Footer />
    </div>
  );
};

export default App;
