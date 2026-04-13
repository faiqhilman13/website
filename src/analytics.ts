declare global {
  interface Window {
    dataLayer?: unknown[][];
    gtag?: (...args: unknown[]) => void;
  }
}

const injectGoogleAnalytics = (measurementId: string) => {
  if (!measurementId || document.querySelector(`script[data-ga-id="${measurementId}"]`)) {
    return;
  }

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
  script.dataset.gaId = measurementId;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag(...args: unknown[]) {
      window.dataLayer?.push(args);
    };

  window.gtag('js', new Date());
  window.gtag('config', measurementId, {
    anonymize_ip: true,
    send_page_view: true,
  });
};

const injectCloudflareBeacon = (token: string) => {
  if (!token || document.querySelector('script[data-cf-beacon-token]')) {
    return;
  }

  const script = document.createElement('script');
  script.defer = true;
  script.src = 'https://static.cloudflareinsights.com/beacon.min.js';
  script.dataset.cfBeaconToken = token;
  script.setAttribute('data-cf-beacon', JSON.stringify({ token }));
  document.head.appendChild(script);
};

export const initAnalytics = () => {
  if (!import.meta.env.PROD) {
    return;
  }

  const gaMeasurementId = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim();
  const cloudflareBeaconToken = import.meta.env.VITE_CLOUDFLARE_BEACON_TOKEN?.trim();

  if (gaMeasurementId) {
    injectGoogleAnalytics(gaMeasurementId);
  }

  if (cloudflareBeaconToken) {
    injectCloudflareBeacon(cloudflareBeaconToken);
  }
};
