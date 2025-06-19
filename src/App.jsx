import { BrowserRouter, Routes, Route, Outlet, Navigate, useLocation } from "react-router-dom";
import { MainLayout } from "./components/MainLayout";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { QuestionPage } from "./pages/QuestionPage";
import { AddQuestionPageLazy } from "./pages/AddQuestionPage";
import { EditQuestionPage } from "./pages/EditQuestionPage";
import { AuthProvider } from "./auth/AuthProvider";
import { useAuth } from "./hooks/useAuth";
import { ForbiddenPage } from "./pages/ForbiddenPage";

const ProtectedRouts = () => {
  const { isAuth } = useAuth();
  const location = useLocation();
  return isAuth ? <Outlet /> : <Navigate to={"/forbidden"} state={{ from: location.pathname }} replace={true} />;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/forbidden" element={<ForbiddenPage />}></Route>
            <Route path="/question/:id" element={<QuestionPage />}></Route>
            <Route element={<ProtectedRouts />}>
              <Route path="/addquestion" element={<AddQuestionPageLazy />}></Route>
              <Route path="/editquestion/:id" element={<EditQuestionPage />}></Route>
            </Route>
            <Route path="*" element={<NotFoundPage />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
