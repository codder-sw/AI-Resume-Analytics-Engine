import { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { ResumeProvider, useResume } from './contexts/ResumeContext';
import LandingPage from './components/Landing/LandingPage';
import Header from './components/Layout/Header';
import ProgressTracker from './components/Layout/ProgressTracker';
import ResumeUpload from './components/Upload/ResumeUpload';
import JobDescriptionInput from './components/JobMatching/JobDescriptionInput';
import LoadingScreen from './components/Analysis/LoadingScreen';
import Dashboard from './components/Dashboard/Dashboard';
import './styles/global.css';

interface DashboardAppProps {
  onBack: () => void;
}

function DashboardApp({ onBack }: DashboardAppProps) {
  const { currentStep } = useResume();
  return (
    <div className="app-container">
      <Header onBack={onBack} />
      {currentStep !== 'results' && <ProgressTracker />}
      {currentStep === 'upload' && <ResumeUpload />}
      {currentStep === 'job-match' && <JobDescriptionInput />}
      {currentStep === 'analyzing' && <LoadingScreen />}
      {currentStep === 'results' && <Dashboard />}
    </div>
  );
}

function App() {
  const [showDashboard, setShowDashboard] = useState(false);
  return (
    <ThemeProvider>
      {showDashboard ? (
        <ResumeProvider>
          <DashboardApp onBack={() => setShowDashboard(false)} />
        </ResumeProvider>
      ) : (
        <LandingPage onOpenDashboard={() => setShowDashboard(true)} />
      )}
    </ThemeProvider>
  );
}

export default App;