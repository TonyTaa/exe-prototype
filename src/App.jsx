import { Suspense } from 'react';
import './App.css';
import AppRoutes from './routes/AppRoutes';
import ErrorBoundary from './components/ui/ErrorBoundary';
import PageSkeleton from './components/ui/PageSkeleton';
import FloatingContactBar from './components/ui/FloatingContactBar';

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<PageSkeleton />}>
        <AppRoutes />
      </Suspense>
      <FloatingContactBar />
    </ErrorBoundary>
  );
}

export default App;
