import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/MainLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<div>home</div>}></Route>
          <Route path="/forbidden" element={<div>forbidden!!!</div>}></Route>
          <Route path="/addquestion" element={<div>add question</div>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
