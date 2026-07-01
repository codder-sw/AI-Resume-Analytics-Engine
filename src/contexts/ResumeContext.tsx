// ============================================
// src/contexts/ResumeContext.tsx
// Poore app ka GLOBAL STATE yahan manage hota hai
// File, step, analysis result — sab kuch yahan store hota hai
// ============================================

import { createContext, useContext, useState, type ReactNode } from 'react';
import type { AppStep, AnalysisResult } from '../types';
import { analyzeResume as analyzeResumeAPI } from '../services/api';

// ----------------------------------------------------
// Context ka shape define karna — kya kya isме available hoga
// ----------------------------------------------------
interface ResumeContextType {
  // State values
  currentStep: AppStep;
  selectedFile: File | null;
  userName: string;
  jobDescription: string;
  analysisResult: AnalysisResult | null;
  isLoading: boolean;
  error: string | null;

  // Functions jo state ko change karte hain
  setCurrentStep: (step: AppStep) => void;
  setSelectedFile: (file: File | null) => void;
  setUserName: (name: string) => void;
  setJobDescription: (desc: string) => void;
  runAnalysis: () => Promise<void>;
  resetAll: () => void;
}

// ----------------------------------------------------
// Context banate hain — shuru mein undefined (abhi tak koi value nahi)
// ----------------------------------------------------
const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

// ----------------------------------------------------
// Provider Component — ye App.tsx ke top par wrap hoga
// Iske andar jo bhi components honge, sab is data ko access kar sakte hain
// ----------------------------------------------------
export function ResumeProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState<AppStep>('upload');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [userName, setUserName] = useState<string>('');
  const [jobDescription, setJobDescription] = useState<string>('');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // --------------------------------------------------
  // MAIN FUNCTION: Backend ko call karke resume analyze karwana
  // --------------------------------------------------
  async function runAnalysis() {
    if (!selectedFile) {
      setError('Pehle resume file select kijiye');
      return;
    }

    setIsLoading(true);
    setError(null);
    setCurrentStep('analyzing');

    try {
      const result = await analyzeResumeAPI(
        selectedFile,
        userName || undefined,
        jobDescription || undefined
      );
      setAnalysisResult(result);
      setCurrentStep('results');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Kuch galat ho gaya. Dobara try kijiye.';
      setError(message);
      // Error aane par wapas upload step par bhej dete hain
      setCurrentStep('upload');
    } finally {
      setIsLoading(false);
    }
  }

  // --------------------------------------------------
  // Sab kuch reset karna (naya resume analyze karne ke liye)
  // --------------------------------------------------
  function resetAll() {
    setCurrentStep('upload');
    setSelectedFile(null);
    setUserName('');
    setJobDescription('');
    setAnalysisResult(null);
    setError(null);
    setIsLoading(false);
  }

  const value: ResumeContextType = {
    currentStep,
    selectedFile,
    userName,
    jobDescription,
    analysisResult,
    isLoading,
    error,
    setCurrentStep,
    setSelectedFile,
    setUserName,
    setJobDescription,
    runAnalysis,
    resetAll,
  };

  return <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>;
}

// ----------------------------------------------------
// Custom Hook — components isे use karke context access karenge
// Example: const { currentStep, setCurrentStep } = useResume();
// ----------------------------------------------------
export function useResume(): ResumeContextType {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResume hook ko ResumeProvider ke andar hi use karna hai');
  }
  return context;
}