import { Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import DegreeRequirements from './pages/DegreeRequirements';
import CourseExplorer from './pages/CourseExplorer';
import Planner from './pages/Planner';
import AdminDashboard from './pages/AdminDashboard';
import LayoutShell from './components/LayoutShell';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/app"
        element={
          <LayoutShell>
            <Dashboard />
          </LayoutShell>
        }
      />
      <Route
        path="/requirements"
        element={
          <LayoutShell>
            <DegreeRequirements />
          </LayoutShell>
        }
      />
      <Route
        path="/courses"
        element={
          <LayoutShell>
            <CourseExplorer />
          </LayoutShell>
        }
      />
      <Route
        path="/planner"
        element={
          <LayoutShell>
            <Planner />
          </LayoutShell>
        }
      />
      <Route
        path="/admin"
        element={
          <LayoutShell requireAdmin>
            <AdminDashboard />
          </LayoutShell>
        }
      />
    </Routes>
  );
}

export default App;
