import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";
import LoadingSpinner from "./components/LoadingSpinner";

// Lazy load components for better performance
const Home = lazy(() => import("./components/Home2"));
const Profile = lazy(() => import("./components/Profile"));
const Signup = lazy(() => import("./components/Signup"));
const Login = lazy(() => import("./components/Login"));
const Blogs = lazy(() => import("./components/content/Blog"));
const Contact = lazy(() => import("./components/Contact"));
const AboutUs = lazy(() => import("./components/AboutUs"));
const DestinyLayout = lazy(() => import("./components/content/DestinyLayout"));
const NoPage = lazy(() => import("./components/content/NoPage"));

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="blogs" element={<Blogs />} />
              <Route path="contact" element={<Contact />} />
              <Route path="aboutus" element={<AboutUs />} />
              <Route path="signup" element={<Signup />} />
              <Route path="login" element={<Login />} />
              <Route 
                path="profile" 
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                } 
              />
              <Route path="places/:placeId" element={<DestinyLayout />} />
              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
}

// npm install -g serve
// serve -s build
