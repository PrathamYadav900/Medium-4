import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Blog } from "./pages/Blog";
import { SingleBlog } from "./pages/SingleBlog";
import { Publish } from "./pages/Publish";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/" element={<Blog />} />
          <Route path="/:id" element={<SingleBlog />} />
          <Route path="/publish" element={<Publish />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}
