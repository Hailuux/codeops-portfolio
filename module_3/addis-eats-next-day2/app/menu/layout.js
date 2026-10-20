import MenuSidebar from "./MenuSidebar";

export default function MenuLayout({ children }) {
  return (
    <div className="menu-layout">
      <MenuSidebar />
      <div className="menu-main">{children}</div>
    </div>
  );
}
