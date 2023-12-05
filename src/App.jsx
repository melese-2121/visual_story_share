import { Routes, Route } from "react-router-dom";

import { SignupForm, SigninForm } from "./_Auth";
import AuthLayout from "./_Auth/AuthLayout";
import RootLayout from "./_Root/RootLayout";
import "./globals.css";
import { Home } from "./_Root/Pages";

function App() {
  return (
    <div>
      <Routes>
        {/* Public Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-up" element={<SignupForm />} />
          <Route path="/sign-in" element={<SigninForm />} />

          {/* Private Routes */}
          <Route element={<RootLayout />}>
            <Route index element={<Home />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
