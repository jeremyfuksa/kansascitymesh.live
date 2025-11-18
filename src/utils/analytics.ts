import { GA_MEASUREMENT_ID } from '../constants/analytics';

declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

function gtag(...args: any[]) {
  if (typeof window === 'undefined') return;
  if (window.gtag) {
    window.gtag(...args);
    return;
  }
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(args);
}

export function trackPageView(pagePath: string) {
  gtag('event', 'page_view', {
    page_path: pagePath,
    send_to: GA_MEASUREMENT_ID,
  });
}

export function trackEvent(action: string, label?: string, category = 'engagement') {
  gtag('event', action, {
    event_category: category,
    event_label: label,
    send_to: GA_MEASUREMENT_ID,
  });
}
