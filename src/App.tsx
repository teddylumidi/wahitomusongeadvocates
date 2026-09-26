import { ErrorBoundary } from '@/components/error-boundary';
import Home from '@/pages/Home';
import { InsightPage } from '@/pages/InsightPage';
import { InsightsArchivePage } from '@/pages/InsightsArchivePage';
import { ServicePage } from '@/pages/ServicePage';
import { ServicesPage } from '@/pages/ServicesPage';
import { ContactPage } from '@/pages/ContactPage';
import { SitePage } from '@/pages/SitePage';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import {
  AdminDashboardPage,
  AdminAccountPage,
  AdminLoginPage,
  AdminPostEditorPage,
  AdminPostsPage,
} from '@/admin/AdminPages';

function App() {
  const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');
  const path = window.location.pathname.replace(basePath, '') || '/';
  const adminEditMatch = path.match(/^\/admin\/posts\/([^/]+)\/edit\/?$/);
  const isAdminLogin = path === '/admin/login' || path === '/admin/login/';
  const isAdminDashboard = path === '/admin' || path === '/admin/';
  const isAdminPosts = path === '/admin/posts' || path === '/admin/posts/';
  const isAdminNewPost = path === '/admin/posts/new' || path === '/admin/posts/new/';
  const isAdminAccount = path === '/admin/account' || path === '/admin/account/';
  const insightMatch = path.match(/^\/insights\/([^/]+)\/?$/);
  const serviceMatch = path.match(/^\/services\/([^/]+)\/?$/);
  const sitePageMatch = path.match(
    /^\/(about-me|about-us|mary-njogu-wahito|managing-partner|legalnuggets|privacy-policy|terms-and-conditions|website-disclaimer)\/?$/,
  );
  const sitePageSlug = sitePageMatch?.[1] === 'about-us' ? 'about-me' : sitePageMatch?.[1];
  const isInsightsArchive = path === '/insights' || path === '/blog' || path === '/insights/';
  const isServicesPage = path === '/services' || path === '/practice-areas' || path === '/services/';
  const isContactPage = path === '/contact' || path === '/contact/';

  return (
    <ErrorBoundary resetKey="root">
      <>
        {adminEditMatch ? (
          <AdminPostEditorPage id={adminEditMatch[1]} />
        ) : isAdminLogin ? (
          <AdminLoginPage />
        ) : isAdminDashboard ? (
          <AdminDashboardPage />
        ) : isAdminPosts ? (
          <AdminPostsPage />
        ) : isAdminNewPost ? (
          <AdminPostEditorPage />
        ) : isAdminAccount ? (
          <AdminAccountPage />
        ) : serviceMatch ? (
          <ServicePage slug={serviceMatch[1]} />
        ) : insightMatch ? (
          <InsightPage slug={insightMatch[1]} />
        ) : sitePageSlug ? (
          <SitePage slug={sitePageSlug} />
        ) : isInsightsArchive ? (
          <InsightsArchivePage />
        ) : isServicesPage ? (
          <ServicesPage />
        ) : isContactPage ? (
          <ContactPage />
        ) : (
          <Home />
        )}
        <WhatsAppButton />
      </>
    </ErrorBoundary>
  );
}

export default App;
