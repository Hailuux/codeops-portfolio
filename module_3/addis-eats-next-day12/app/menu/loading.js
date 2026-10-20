export const metadata = { title: 'Loading Menu', description: 'The ADDIS EATS menu is loading. Browse traditional Ethiopian dishes when it is ready.' };

export default function MenuLoading() {
  return <section className="loading-panel" role="status" aria-live="polite">
    <div className="spinner" /><h1>Loading the menu...</h1><p>Please wait while we prepare our dishes.</p>
  </section>;
}
