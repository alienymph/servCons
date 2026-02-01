// src/components/Layout.tsx
import { NavLink, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="app-shell">
      <div className="container py-4">
        {/* NAVBAR */}
        <nav className="nav mb-3 animate__animated animate__fadeInDown">
          <div className="nav-left">
            <div className="nav-logo">S</div>
            <div>
              <div className="nav-title">ServCons</div>
              <div className="nav-subtitle">
                Gestor de documentos legales
              </div>
            </div>
          </div>

          <div className="nav-links">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Documentos
            </NavLink>
            <NavLink
              to="/upload"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Subir documento
            </NavLink>
          </div>
        </nav>

        {/* CONTENIDO */}
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
