import { ErrorBoundary } from '@/components/error-boundary';
import Home from '@/pages/Home';
import { InsightPage } from '@/pages/InsightPage';

function App() {
  const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');
  const path = window.location.pathname.replace(basePath, '') || '/';
  const insightMatch = path.match(/^\/insights\/([^/]+)\/?$/);

  return (
    <ErrorBoundary resetKey="root">
      {insightMatch ? <InsightPage slug={insightMatch[1]} /> : <Home />}
    </ErrorBoundary>
  );
}

export default App;
