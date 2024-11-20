import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./pages/user/SignUp";
import Blog from "./pages/blog/detailedBlog";
import Login from "./pages/user/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Blogs from "./pages/blog/Blogs";
import NavBar from "./components/navBar";
import Publish from "./pages/createBlog";
// import Home from "./pages/home";
import { AuthProvider } from "./context";
import { ProtectedRoute } from "./routes/protectedRoute";
import { lazy, Suspense } from "react";
import { Loading } from "./components/loading";
import { Footer } from "./components/footer";
import UserProfile from "./pages/profile";
import UpdateBlog from "./pages/updateBlog";
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
            <Route path="/blogs" element={<Blogs />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/blog/:id" element={<Blog />} />
              <Route path="/update/:id" element={<UpdateBlog />} />
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
