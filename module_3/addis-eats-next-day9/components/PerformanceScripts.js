import Script from "next/script";

// Analytics is optional. Its identifier is public configuration, not a secret.
// lazyOnload defers the third-party download until the page has loaded and is idle.
export default function PerformanceScripts() {
  const measurementId = process.env.NEXT_PUBLIC_ANALYTICS_ID;
  if (!measurementId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="lazyOnload"
      />
      <Script id="analytics-init" strategy="lazyOnload">
        {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${measurementId}');`}
      </Script>
    </>
  );
}
