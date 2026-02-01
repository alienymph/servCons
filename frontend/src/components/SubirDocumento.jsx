import React, { useState } from 'react';
import axios from 'axios';

function SubirDocumento({ onSubidaExitosa }) {
  const [nombre, setNombre] = useState('');
  const [archivo, setArchivo] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre || !archivo) {
      alert('Por favor completa todos los campos.');
      return;
    }

    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('archivo', archivo);

    try {
      const res = await axios.post('http://localhost:5000/subir', formData);
      alert('✅ Archivo subido con éxito');

      setNombre('');
      setArchivo(null);

      if (onSubidaExitosa) {
        onSubidaExitosa(); // 🔄 Llama al callback para recargar la lista
      }
    } catch (err) {
      console.error(err);
      alert('❌ Error al subir el archivo');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-3">
        <label className="form-label">📄 Nombre del documento:</label>
        <input
          type="text"
          className="form-control"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">📎 Selecciona un archivo PDF:</label>
        <input
          type="file"
          className="form-control"
          accept="application/pdf"
          onChange={(e) => setArchivo(e.target.files[0])}
        />
      </div>

      <button type="submit" className="btn btn-success">⬆️ Subir documento</button>
    </form>
  );
}

export default SubirDocumento;