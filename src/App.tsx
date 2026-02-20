import { AppProvider, useAppContext } from './context/AppContext';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import './App.css';

function AppContent() {
  const { handle, loading } = useAppContext();

  return (
    <div className="min-h-screen bg-slate-900">
      {loading && (
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-white text-2xl">Loading...</p>
        </div>
      )}
      {!loading && (!handle ? <LandingPage /> : <DashboardPage />)}
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
