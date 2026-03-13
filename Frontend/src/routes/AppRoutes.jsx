import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Documents from "../pages/Documents/Documents";
import Profile from "../pages/Profile/Profile";
import Editor from "../pages/Editor/Editor";
import CreateDocument from "../pages/Documents/CreateDocument";
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
    </Routes>
  );
};

export default AppRoutes;
