import { useAuth } from "./context/useAuth";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import "./App.css";

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="app">{isAuthenticated ? <Dashboard /> : <AuthPage />}</div>
  );
}

export default App;
