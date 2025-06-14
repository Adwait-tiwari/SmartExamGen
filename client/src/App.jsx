import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FormDataProvider } from "./context/FormDataContext";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./context/PrivateRoute"

import LandingPage from "./components/LandingPage/landingPage";
import QuestionPaperForm from "./components/Forms/QuestionPaperForm";
import Dashboard from "./components/LandingPage/Dashboard";
import LoginForm from "./components/Forms/Login";
import SignupForm from "./components/Forms/Signup";
import DisplayQuestions from "./components/card/DisplayQuestions";
import Result from "./components/LandingPage/Result";

function App() {
  return (
    <FormDataProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/generate" element={<QuestionPaperForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/display/:subject" element={<DisplayQuestions />} />
            <Route path="/result" element={<Result />} />
          </Routes>
        </Router>
      </AuthProvider>
    </FormDataProvider>
  );
}

export default App;
