import { GraduationCap } from "lucide-react";
import { navigateTo, routes } from "./routes";

export function AppLayout({ children, status = "Firebase darslari" }) {
  function handleHomeClick(event) {
    event.preventDefault();
    navigateTo(routes.home);
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href={routes.home} onClick={handleHomeClick}>
          <span className="brand-mark" aria-hidden="true">
            <GraduationCap size={24} />
          </span>
          <span>
            <span className="brand-title">Shoista | Materiallar</span>
            <span className="brand-subtitle">
              O‘quv materiallari va tezkor kirish
            </span>
          </span>
        </a>
        <div className="topbar-status">
          <span className="status-dot" aria-hidden="true" />
          {status}
        </div>
      </header>

      {children}

      <footer className="app-footer">
        <span>Created by myupi for moon)</span>
      </footer>
    </div>
  );
}
