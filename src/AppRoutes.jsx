import React from "react";
import { Routes, Route } from "react-router-dom";
import Menu from "./pages/Menu";
import MainPage from "./components/MainPage";
import MenuRedirect from "./components/MenuRedirect";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/menu/:id" element={<MenuRedirect />} />
    </Routes>
  );
}

export default AppRoutes;
