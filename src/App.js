import { Route, Routes } from "react-router";
import BlogPage from "./BlogPage";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<BlogPage />} />
        <Route path="/:id" element={<BlogPage />} />
        <Route path="/:id/:slug" element={<BlogPage />} />
      </Routes>
    </div>
  );
}
