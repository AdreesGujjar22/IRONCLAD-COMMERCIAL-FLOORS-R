import { renderToString } from 'react-dom/server';

import App from './App';
import { ErrorBoundary } from '@/components/error-boundary';

export { services, areas, faqItems, reviews, pageMeta } from './site-data';

export function render(path: string) {
  return renderToString(
    <ErrorBoundary>
      <App ssrPath={path} />
    </ErrorBoundary>,
  );
}
