import { Suspense } from 'react';
import './App.css';
import AppRoutes from './routes/AppRoutes';
import ErrorBoundary from './components/ui/ErrorBoundary';
import PageSkeleton from './components/ui/PageSkeleton';
import AICompanion from './components/ui/AICompanion';

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<PageSkeleton />}>
        <AppRoutes />
      </Suspense>
      <AICompanion />
    </ErrorBoundary>
  );
}

export default App;
