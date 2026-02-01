// src/pages/DocumentList.tsx

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchDocuments, deleteDocument } from "../services/api";

// Tipo de documento que llega del backend
type Doc = {
  id: string;
  title: string;

  codigoSua?: string;
  empresa?: string;
  tipo?: string;
  ambito?: string;
  domicilio?: string;
  rfc?: string;
  tieneIne?: boolean;
  unidadReceptora?: string;
  vigencia?: string;
  descripcion?: string;

  createdAt?: string;
};

function diasRestantes(vigencia?: string) {
  if (!vigencia) return null;
  const hoy = new Date();
  const fin = new Date(vigencia);
  const diff = fin.getTime() - hoy.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export default function DocumentList() {
  const [docs, setDocs] = useState<Doc[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchDocuments();
        setDocs(data);
      } catch (e: any) {
        setErr(e?.message || String(e));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filtrados = docs.filter((d) =>
    (d.empresa || d.title || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  async function handleDelete(id: string) {
    const ok = window.confirm("¿Seguro que quieres eliminar este documento?");
    if (!ok) return;
    try {
      await deleteDocument(id);
      setDocs((prev) => prev.filter((d) => d.id !== id));
    } catch (e: any) {
      alert(`No se pudo eliminar: ${e?.message || String(e)}`);
    }
  }

  if (loading) return <div className="card">Cargando…</div>;
  if (err)
    return (
      <div className="card" style={{ color: "#ff8a80" }}>
        ❌ {err}
      </div>
    );

  return (
    <div className="card">
      <h2 style={{ marginBottom: 12 }}>📄 Documentos</h2>

      <input
        type="text"
        placeholder="Buscar por nombre de empresa"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: 12, width: "100%", padding: 8 }}
      />

      {filtrados.length === 0 ? (
        <p>No hay documentos que coincidan.</p>
      ) : (
        <ul>
          {filtrados.map((d) => {
            const dias = diasRestantes(d.vigencia);
            const porVencer = dias !== null && dias >= 0 && dias <= 30;
            const vencido = dias !== null && dias < 0;

            return (
              <li className="item" key={d.id}>
                <div style={{ flex: 1 }}>
                  {/* NOMBRE PRINCIPAL */}
                  <strong>{d.empresa || d.title}</strong>

                  {/* PROPIEDADES DEBAJO DEL NOMBRE */}
                  <div style={{ fontSize: 12, marginTop: 4, lineHeight: 1.5 }}>
                    {d.codigoSua && (
                      <div>Código SUA: <b>{d.codigoSua}</b></div>
                    )}
                    {d.tipo && (
                      <div>Tipo: <b>{d.tipo}</b></div>
                    )}
                    {d.ambito && (
                      <div>Ámbito: <b>{d.ambito}</b></div>
                    )}
                    {d.domicilio && (
                      <div>Domicilio: <b>{d.domicilio}</b></div>
                    )}
                    {d.rfc && (
                      <div>RFC: <b>{d.rfc}</b></div>
                    )}
                    <div>
                      Tiene INE:{" "}
                      <b>{d.tieneIne ? "Sí" : "No"}</b>
                    </div>
                    {d.unidadReceptora && (
                      <div>Unidad receptora: <b>{d.unidadReceptora}</b></div>
                    )}
                    {d.vigencia && (
                      <div>
                        Vigencia:{" "}
                        <b>{new Date(d.vigencia).toLocaleDateString()}</b>{" "}
                        {vencido
                          ? " · ⚠️ Vencido"
                          : porVencer
                          ? ` · ⏳ Por vencer (${dias} días)`
                          : dias !== null
                          ? ` · ✅ ${dias} días restantes`
                          : ""}
                      </div>
                    )}
                    {d.descripcion && (
                      <div>Descripción: {d.descripcion}</div>
                    )}
                  </div>
                </div>

                {/* BOTONES A LA DERECHA */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                    marginLeft: 12,
                    minWidth: 100,
                  }}
                >
                  <Link className="link" to={`/documents/${d.id}`}>
                    Ver
                  </Link>
                  <button
                    className="btn secondary"
                    onClick={() => navigate(`/documents/${d.id}/edit`)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn danger"
                    onClick={() => handleDelete(d.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
