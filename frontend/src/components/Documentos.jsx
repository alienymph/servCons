import React, { useState } from 'react';
import SubirDocumento from './SubirDocumento';
import ListaDocumentos from './ListaDocumentos';

function Documentos() {
  const [recargar, setRecargar] = useState(false);

  const manejarRecarga = () => {
    setRecargar(prev => !prev); // Cambia el estado para forzar recarga
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">📚 Panel de Documentos</h1>
      <SubirDocumento onSubidaExitosa={manejarRecarga} />
      <ListaDocumentos recargar={recargar} />
    </div>
  );
}

export default Documentos;
