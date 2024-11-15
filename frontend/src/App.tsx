import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./pages/user/SignUp";
import Blog from "./pages/blog/Blog";
import Login from "./pages/user/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Blogs from "./pages/blog/Blogs";
import NavBar from "./components/navBar";
import Publish from "./pages/Publish";
// import Home from "./pages/home";
import { AuthProvider } from "./context";
import { ProtectedRoute } from "./routes/protectedRoute";
import { lazy, Suspense } from "react";
import { Loading } from "./components/loading";
import { Footer } from "./components/footer";
import UserProfile from "./pages/profile";
const Home = lazy(() => import("./pages/home"));
function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <AuthProvider>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/blog/:id" element={<Blog />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/publish" element={<Publish />} />
              <Route path="/profile" element={<UserProfile />} />
            </Route>
          </Routes>
          <Footer />
          <ToastContainer />
        </AuthProvider>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
