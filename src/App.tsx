import { ErrorBoundary } from '@/components/error-boundary';
import Home from '@/pages/Home';
import { InsightPage } from '@/pages/InsightPage';
import { ServicePage } from '@/pages/ServicePage';

function App() {
  const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');
  const path = window.location.pathname.replace(basePath, '') || '/';
  const insightMatch = path.match(/^\/insights\/([^/]+)\/?$/);
  const serviceMatch = path.match(/^\/services\/([^/]+)\/?$/);

  return (
    <ErrorBoundary resetKey="root">
      {serviceMatch ? (
        <ServicePage slug={serviceMatch[1]} />
      ) : insightMatch ? (
        <InsightPage slug={insightMatch[1]} />
      ) : (
        <Home />
      )}
    </ErrorBoundary>
  );
}

export default App;
