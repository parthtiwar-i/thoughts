import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./pages/user/SignUp";
import Blog from "./pages/blog/detailedBlog";
import Login from "./pages/user/Login";
import Blogs from "./pages/blog/Blogs";
import Publish from "./pages/createBlog";
// import Home from "./pages/home";
import { AuthProvider } from "./context";
import { ProtectedRoute } from "./routes/protectedRoute";
import { lazy, Suspense } from "react";
import { Loading } from "./components/ui/loading";
import { Footer } from "./components/ui/footer";
import UserProfile from "./pages/profile";
import UpdateBlog from "./pages/updateBlog";
import { Toaster } from "sonner";
import { ThemeProvider } from "./components/themeProvider";
import { Navbar } from "./components/navBar";
const Home = lazy(() => import("./pages/home"));
function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Suspense fallback={<Loading />}>
          <Toaster richColors />
          <AuthProvider>
            <Navbar />
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
          </AuthProvider>
        </Suspense>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
