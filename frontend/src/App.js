import React, { useState } from 'react';
import SubirDocumento from './components/SubirDocumento';
import ListaDocumentos from './components/ListaDocumentos';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [seccion, setSeccion] = useState('inicio'); // Control de la sección

  const manejarLogin = (e) => {
    e.preventDefault();
    if (usuario === 'admin' && contrasena === '1234') {
      setIsLoggedIn(true);
    } else {
      alert('Credenciales incorrectas');
    }
  };

  const cerrarSesion = () => {
    setIsLoggedIn(false);
    setUsuario('');
    setContrasena('');
  };

  if (!isLoggedIn) {
    return (
      <div className="login-container">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={manejarLogin}>
          <input
            type="text"
            placeholder="Usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
          />
          <button type="submit">Entrar</button>
        </form>
      </div>
    );
  }

  return (
    <div className="App">
      <nav className="navbar">
        <div className="navbar-left">
          <h1>📚 Gestor de Documentos</h1>
        </div>
        <ul className="navbar-menu">
          <li onClick={() => setSeccion('inicio')}>🏠 Inicio</li>
          <li onClick={() => setSeccion('subir')}>⬆️ Subir PDF</li>
          <li onClick={() => setSeccion('documentos')}>📁 Documentos</li>
        </ul>
        <div className="navbar-right">
          <span>💜 Bienvenida, Vanessa</span>
          <button onClick={cerrarSesion} className="logout-button">Cerrar Sesión</button>
        </div>
      </nav>

      <main className="main-section">
        {seccion === 'inicio' && <h2>📖 Bienvenida al Gestor de Documentos</h2>}

        {seccion === 'subir' && <SubirDocumento />}

        {seccion === 'documentos' && <ListaDocumentos />}
      </main>
    </div>
  );
}

export default App;
