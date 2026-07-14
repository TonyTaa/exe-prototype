import { Outlet } from 'react-router-dom';
import AppHeader from '../components/layout/AppHeader';
import AppFooter from '../components/layout/AppFooter';
import BackToTop from '../components/ui/BackToTop';

function MainLayout() {
  return (
    <div className="app-shell">
      <AppHeader />
      <main className="flex-grow-1">
        <Outlet />
      </main>
      <AppFooter />
      <BackToTop />
    </div>
  );
}

export default MainLayout;
