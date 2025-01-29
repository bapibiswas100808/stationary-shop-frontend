import "./App.css";
import DashboardLayout from "./components/layout/DashboardLayout";
import ProtectedRoute from "./components/layout/ProtectedRoute";

function App() {
  return (
    <>
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    </>
  );
}

export default App;
