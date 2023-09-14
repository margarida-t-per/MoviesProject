import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserProvider } from "./UserContext";
import { MyProvider } from "./MyContext";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import LoginPage from "./pages/Login/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LogoutPage from "./pages/LogoutPage/LogoutPage";
import AddMovie from "./pages/AddMovie/AddMovie";
import EditMovie from "./pages/EditMovie/EditMovie";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <UserProvider>
      <MyProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/logout" element={<LogoutPage />} />
          <Route path="/addmovie" element={<AddMovie />} />
          <Route path="/editmovie/:movieId" element={<EditMovie />} />
        </Routes>
        <Footer />
      </MyProvider>
    </UserProvider>
  );
}

export default App;
