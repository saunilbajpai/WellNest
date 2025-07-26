import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Addupdate from "./Pages/Addupdate";
import Logs from "./Pages/Logs";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Header from "./components/Header";
import ProtectedRoute from "./utils/ProtectedRoute";
import Exercise from "./Pages/exercise";
import Progress from "./Pages/Progress";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/exercise" element={<Exercise />} />
        <Route path="/progress" element={<Progress />} />

        {/* Protected Routes */}
        <Route
          path="/Addupdate"
          element={
            <ProtectedRoute>
              <Addupdate />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Logs"
          element={
            <ProtectedRoute>
              <Logs />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
