import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const ConsultationContext = createContext(null);

const STORAGE_KEY = 'nghe-con-lon-consultation';

export function ConsultationProvider({ children }) {
  const [consultationData, setConsultationData] = useState(() => {
    if (typeof window === 'undefined') {
      return null;
    }

    try {
      const savedValue = window.sessionStorage.getItem(STORAGE_KEY);
      return savedValue ? JSON.parse(savedValue) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    if (consultationData) {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(consultationData));
    } else {
      window.sessionStorage.removeItem(STORAGE_KEY);
    }
  }, [consultationData]);

  const clearConsultationData = () => {
    setConsultationData(null);
  };

  const value = useMemo(
    () => ({ consultationData, setConsultationData, clearConsultationData }),
    [consultationData],
  );

  return <ConsultationContext.Provider value={value}>{children}</ConsultationContext.Provider>;
}

export function useConsultation() {
  const context = useContext(ConsultationContext);

  if (!context) {
    throw new Error('useConsultation must be used inside a ConsultationProvider');
  }

  return context;
}
