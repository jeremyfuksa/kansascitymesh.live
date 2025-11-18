import { useEffect, useMemo, useState } from 'react';
import HomePage from './components/HomePage';
import GetStartedPage from './components/GetStartedPage';
import { trackPageView } from './utils/analytics';

type Page = 'home' | 'get-started';

const getPageFromPath = (): Page => {
  if (typeof window === 'undefined') return 'home';
  return window.location.pathname === '/getting-started' ? 'get-started' : 'home';
};

const getPathForPage = (page: Page) => {
  return page === 'home' ? '/' : '/getting-started';
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
  };

  return (
    <div className="min-h-screen bg-black">
      {currentPage === 'home' ? (
        <HomePage onNavigate={navigate} />
      ) : (
        <GetStartedPage onNavigate={navigate} />
      )}
    </div>
  );
}
