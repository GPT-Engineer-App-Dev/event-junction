import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import EventDetails from "./pages/EventDetails.jsx";
import AdminLogin from "./pages/AdminLogin.jsx"; // Import the new AdminLogin component
import JobsManagement from "./pages/JobsManagement.jsx"; // Import the new JobsManagement component
import { SupabaseAuthProvider } from "./integrations/supabase/auth.jsx"; // Import the SupabaseAuthProvider

function App() {
  return (
    <SupabaseAuthProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Index />} />
          <Route path="/event/:id" element={<EventDetails />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/jobs-management" element={<JobsManagement />} />
        </Routes>
      </Router>
    </SupabaseAuthProvider>
  );
}

export default App;
