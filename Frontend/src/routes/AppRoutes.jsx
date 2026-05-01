import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Documents from "../pages/Documents/Documents";
import Profile from "../pages/Profile/Profile";
import Editor from "../pages/Editor/Editor";
import CreateDocument from "../pages/Documents/CreateDocument";
import Share from "../pages/Share/Share";
import PrivacyPolicy from "../pages/Privacypolicy/Privacypolicy";
import TermsCondition from "../pages/Termcondition/TermsCondition";
import Contact from "../pages/Contact/Contact";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/documents" element={<Documents />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/documents/:id" element={<Editor />} />
      <Route path="/documents/create" element={<CreateDocument />} />
      <Route path="/documents/share" element={<Share />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/termsconditon" element={<TermsCondition />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
};

export default AppRoutes;
