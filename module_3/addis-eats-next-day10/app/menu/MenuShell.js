"use client";

// This client shell receives Server Component output through the children slot.
export default function MenuShell({ children }) {
  return <div className="menu-layout">{children}</div>;
}
