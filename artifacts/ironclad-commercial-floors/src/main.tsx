import { createRoot, hydrateRoot } from 'react-dom/client';

import App from './App';
import { ErrorBoundary } from '@/components/error-boundary';

import './index.css';

const container = document.getElementById('root')!;
const app = (
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);

// Production pages are prerendered at build time, so hydrate the existing markup.
// In dev (empty #root) fall back to a normal client render.
if (container.hasChildNodes()) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
