import { Routes } from "react-router";
import { Route } from "react-router";
import Home from "./pages/home";
import Login from "./pages/login";
import ProfileSelector from "./pages/profileSelector";
import ResgisterArt from "./pages/registerArt";
import ResgisterCon from "./pages/registerCon";
import ForgotPassword from "./pages/forgot-password";
import Profile from "./pages/profile";
import Dashboard from "./pages/dashboard";
import Explore from "./pages/explore";
import Settings from "./pages/settings";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profileSelector" element={<ProfileSelector />} />
      <Route path="/registerArt" element={<ResgisterArt />}></Route>
      <Route path="/registerCon" element={<ResgisterCon />}></Route>
      <Route path="forgot-password" element={<ForgotPassword />}></Route>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}

export default AppRouter;
