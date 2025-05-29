import { Paths } from 'constants/paths';
import { NotFoundRoute, Route } from '@tanstack/react-router';
import Main from 'components/pages/Main';
import NotFound from 'components/pages/NotFound';
import { Suspense } from 'react';
import { rootRoute } from './router';

const SuspenseWrapper = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<div>Loading...</div>}>
    {children}
  </Suspense>
);

const mainRoute = new Route({
  getParentRoute: () => rootRoute,
  path: Paths.MAIN,
  component: () => (
    <SuspenseWrapper>
      <Main children />
    </SuspenseWrapper>
  )
});

export const notFoundRoute = new NotFoundRoute({
  getParentRoute: () => rootRoute,
  component: () => (
    <SuspenseWrapper>
      <NotFound />
    </SuspenseWrapper>
  )
});

export const routes = [mainRoute];