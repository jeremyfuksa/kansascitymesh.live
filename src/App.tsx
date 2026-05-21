import { useEffect, useMemo, useState } from 'react';
import HomePage from './components/HomePage';
import GetStartedPage from './components/GetStartedPage';
import HostANodePage from './components/HostANodePage';
import { trackPageView } from './utils/analytics';

type Page = 'home' | 'get-started' | 'host';

const getPageFromPath = (): Page => {
  if (typeof window === 'undefined') return 'home';
  const path = window.location.pathname;
  if (path === '/getting-started') return 'get-started';
  if (path === '/host-a-node') return 'host';
  return 'home';
};

const getPathForPage = (page: Page) => {
  if (page === 'get-started') return '/getting-started';
  if (page === 'host') return '/host-a-node';
  return '/';
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>(getPageFromPath);
  const pagePath = useMemo(() => getPathForPage(currentPage), [currentPage]);

  useEffect(() => {
    trackPageView(pagePath);
  }, [pagePath]);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(getPageFromPath());
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const navigate = (target: Page) => {
    const nextPath = getPathForPage(target);
    setCurrentPage(target);
    if (window.location.pathname !== nextPath) {
      window.history.pushState({}, '', nextPath);
    }
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {currentPage === 'home' && <HomePage onNavigate={navigate} />}
      {currentPage === 'get-started' && <GetStartedPage onNavigate={navigate} />}
      {currentPage === 'host' && <HostANodePage onNavigate={navigate} />}
    </div>
  );
}
