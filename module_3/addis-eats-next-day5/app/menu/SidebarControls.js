"use client";

import { useState } from "react";

export default function SidebarControls({ children }) {
  const [expanded, setExpanded] = useState(true);
  const [visits, setVisits] = useState(0);
  return (
    <div>
      <button className="secondary-button sidebar-toggle" type="button" onClick={() => { setExpanded((value) => !value); setVisits((value) => value + 1); }}>
        {expanded ? "Collapse links" : "Expand links"}
      </button>
      <p className="sidebar-state" aria-live="polite">Toggle count: {visits}</p>
      {expanded ? children : <p className="muted">Menu links are collapsed.</p>}
    </div>
  );
}
