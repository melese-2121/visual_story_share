import { Routes, Route } from "react-router-dom";

import { SignupForm, SigninForm } from "./_Auth";
import AuthLayout from "./_Auth/AuthLayout";
import RootLayout from "./_Root/RootLayout";
import "./globals.css";
import { Explore, Home, People, Post, Saved } from "./_Root/Pages";
import EditPost from "./components/EditPost";
import PostDetail from "./components/PostDetail";

function App() {
  return (
    <div>
      <Routes>
        {/* Public Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-up" element={<SignupForm />} />
          <Route path="/sign-in" element={<SigninForm />} />
        </Route>
        {/* Private Routes */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="explore" element={<Explore />} />
          <Route path="all-users" element={<People />} />
          <Route path="saved" element={<Saved />} />
          <Route path="post" element={<Post />} />
          <Route path="/update-post/:id" element={<EditPost />} />
          <Route path="/posts/:id" element={<PostDetail />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
