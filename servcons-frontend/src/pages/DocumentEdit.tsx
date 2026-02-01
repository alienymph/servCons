// src/pages/DocumentEdit.tsx

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL, updateDocument } from "../services/api";

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
};

export default function DocumentEdit() {
  const { id } = useParams<{ id: string }>();
  const [doc, setDoc] = useState<Doc | null>(null);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const res = await fetch(`${API_URL}/documents/${id}`);
        if (!res.ok) throw new Error(`GET /documents/${id} → ${res.status}`);
        const data = await res.json();
        setDoc(data);
      } catch (e: any) {
        setMsg(e?.message || String(e));
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!id || !doc) return;
    try {
      setMsg("");
      await updateDocument(id, {
        title: doc.title,
        empresa: doc.empresa,
        codigoSua: doc.codigoSua,
        tipo: doc.tipo,
        ambito: doc.ambito,
        domicilio: doc.domicilio,
        rfc: doc.rfc,
        tieneIne: doc.tieneIne,
        unidadReceptora: doc.unidadReceptora,
        vigencia: doc.vigencia,
        descripcion: doc.descripcion,
      });
      setMsg("✅ Cambios guardados.");
      setTimeout(() => {
        navigate(`/documents/${id}`);
      }, 800);
    } catch (e: any) {
      setMsg(`❌ ${e?.message || String(e)}`);
    }
  }

  if (loading) return <div className="card">Cargando…</div>;
  if (!doc) return <div className="card">No se encontró el documento.</div>;

  return (
    <div className="card" style={{ maxWidth: 700 }}>
      <h2 style={{ marginBottom: 12 }}>✏️ Editar documento</h2>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Título"
          value={doc.title}
          onChange={(e) => setDoc({ ...doc, title: e.target.value })}
        />

        <input
          type="text"
          placeholder="Nombre de la empresa"
          value={doc.empresa || ""}
          onChange={(e) => setDoc({ ...doc, empresa: e.target.value })}
        />

        <input
          type="text"
          placeholder="Código SUA"
          value={doc.codigoSua || ""}
          onChange={(e) => setDoc({ ...doc, codigoSua: e.target.value })}
        />

        <input
          type="text"
          placeholder="Tipo (CONVENIO / ESCRITURA / OTRO)"
          value={doc.tipo || ""}
          onChange={(e) => setDoc({ ...doc, tipo: e.target.value })}
        />

        <input
          type="text"
          placeholder="Ámbito (NACIONAL / INTERNACIONAL)"
          value={doc.ambito || ""}
          onChange={(e) => setDoc({ ...doc, ambito: e.target.value })}
        />

        <input
          type="text"
          placeholder="Domicilio"
          value={doc.domicilio || ""}
          onChange={(e) => setDoc({ ...doc, domicilio: e.target.value })}
        />

        <input
          type="text"
          placeholder="RFC"
          value={doc.rfc || ""}
          onChange={(e) => setDoc({ ...doc, rfc: e.target.value })}
        />

        <label style={{ marginBottom: 8, display: "block" }}>
          <input
            type="checkbox"
            checked={!!doc.tieneIne}
            onChange={(e) => setDoc({ ...doc, tieneIne: e.target.checked })}
          />{" "}
          Tiene INE
        </label>

        <input
          type="text"
          placeholder="Unidad receptora"
          value={doc.unidadReceptora || ""}
          onChange={(e) =>
            setDoc({ ...doc, unidadReceptora: e.target.value })
          }
        />

        <label style={{ display: "block", marginBottom: 4 }}>
          Vigencia
        </label>
        <input
          type="date"
          value={doc.vigencia || ""}
          onChange={(e) => setDoc({ ...doc, vigencia: e.target.value })}
        />

        <textarea
          placeholder="Descripción / notas"
          value={doc.descripcion || ""}
          onChange={(e) => setDoc({ ...doc, descripcion: e.target.value })}
          style={{ marginTop: 8 }}
        />

        <button className="btn" style={{ marginTop: 12 }}>
          Guardar cambios
        </button>
      </form>

      {msg && <p style={{ marginTop: 10 }}>{msg}</p>}
    </div>
  );
}
