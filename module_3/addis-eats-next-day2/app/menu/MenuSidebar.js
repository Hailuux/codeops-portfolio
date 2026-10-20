"use client";

import Link from "next/link";
import { useState } from "react";

export default function MenuSidebar() {
  const [expanded, setExpanded] = useState(true);
  const [visits, setVisits] = useState(0);

  return (
    <aside className="menu-sidebar">
      <h2>Explore Menu</h2>
      <button
        className="secondary-button sidebar-toggle"
        type="button"
        onClick={() => {
          setExpanded((value) => !value);
          setVisits((value) => value + 1);
        }}
      >
        {expanded ? "Collapse links" : "Expand links"}
      </button>
      <p className="sidebar-state" aria-live="polite">
        Toggle count: {visits}
      </p>
      {expanded && (
        <nav aria-label="Menu navigation" className="sidebar-links">
          <Link href="/menu">All dishes</Link>
          <Link href="/menu/1">Shiro</Link>
          <Link href="/menu/2">Misir Wot</Link>
          <Link href="/menu/3">Doro Wot</Link>
        </nav>
      )}
      <p className="sidebar-hint">
        Toggle the links, then open a dish. The toggle state remains because
        this shared menu layout stays mounted across menu-route navigation.
      </p>
    </aside>
  );
}
