import Link from "next/link";
import SidebarControls from "./SidebarControls";

export default function MenuSidebar() {
  return (
    <aside className="menu-sidebar">
      <h2>Explore Menu</h2>
      <SidebarControls>
        <nav aria-label="Menu navigation" className="sidebar-links">
          <Link href="/menu">All dishes</Link>
          <Link href="/menu/1">Shiro</Link>
          <Link href="/menu/2">Misir Wot</Link>
          <Link href="/menu/3">Doro Wot</Link>
        </nav>
      </SidebarControls>
      <p className="sidebar-hint">Explore dishes without leaving the menu section.</p>
    </aside>
  );
}
