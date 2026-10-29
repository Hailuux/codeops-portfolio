import MenuSidebar from "./MenuSidebar";
import MenuShell from "./MenuShell";

export default function MenuLayout({ children }) {
  return (
    <MenuShell>
      <MenuSidebar />
      <div className="menu-main">{children}</div>
    </MenuShell>
  );
}
