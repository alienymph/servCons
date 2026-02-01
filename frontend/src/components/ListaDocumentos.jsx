import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ListaDocumentos() {
  const [documentos, setDocumentos] = useState([]);
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/documentos')
      .then(res => setDocumentos(res.data))
      .catch(console.error);
  }, []);

  const filtrados = documentos.filter(doc =>
    doc.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div>
      <h2>📁 Documentos Subidos</h2>
      <input
        type="text"
        placeholder="Buscar..."
        className="form-control mb-3"
        value={busqueda}
        onChange={e => setBusqueda(e.target.value)}
      />
      <ul className="list-group">
        {filtrados.map((doc, i) => (
          <li
            key={i}
            className="list-group-item d-flex justify-content-between align-items-center"
            style={{ cursor: 'pointer' }}
          >
            {doc}
            <span className="badge bg-primary rounded-pill">👁️ Ver</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaDocumentos;
