export default function RouteSkeleton() {
  return (
    <main className="route-skeleton" aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading page…</span>

      <div className="skeleton-line skeleton-title" />
      <div className="skeleton-line" />
      <div className="skeleton-line skeleton-short" />

      <div className="skeleton-panel" />
    </main>
  );
}