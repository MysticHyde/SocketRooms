import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider, RequireAuth } from "./context/Auth";
import Layout from "./components/Layout";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import NotFoundPage from "./pages/NotFound";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route element={<RequireAuth />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/profile" element={<Profile />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
