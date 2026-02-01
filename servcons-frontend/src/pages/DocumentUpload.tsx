// src/pages/DocumentUpload.tsx

import { useState } from "react";
import { uploadDocument } from "../services/api";

export default function DocumentUpload() {
  const [title, setTitle] = useState("");
  const [codigoSua, setCodigoSua] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [tipo, setTipo] = useState<"CONVENIO" | "ESCRITURA" | "OTRO">("CONVENIO");
  const [ambito, setAmbito] = useState<"NACIONAL" | "INTERNACIONAL">("NACIONAL");
  const [domicilio, setDomicilio] = useState("");
  const [rfc, setRfc] = useState("");
  const [tieneIne, setTieneIne] = useState(false);
  const [unidadReceptora, setUnidadReceptora] = useState("");
  const [vigencia, setVigencia] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const [file, setFile] = useState<File | null>(null);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");

    if (!title.trim()) return setMsg("⚠️ Escribe un título.");
    if (!empresa.trim()) return setMsg("⚠️ Escribe el nombre de la empresa.");
    if (!file) return setMsg("⚠️ Selecciona un PDF.");

    try {
      setBusy(true);

      const payload = {
        title,
        codigoSua: codigoSua || undefined,
        empresa: empresa || undefined,
        tipo,
        ambito,
        domicilio: domicilio || undefined,
        rfc: rfc || undefined,
        tieneIne,
        unidadReceptora: unidadReceptora || undefined,
        vigencia: vigencia || undefined,
        descripcion: descripcion || undefined,
      };

      const { uploadUrl } = await uploadDocument(payload);
      if (!uploadUrl) throw new Error("El backend no devolvió uploadUrl.");

      const put = await fetch(uploadUrl, {
        method: "PUT",
        headers: { "Content-Type": "application/pdf" },
        body: file,
      });

      if (!put.ok) {
        throw new Error(`PUT uploadUrl → ${put.status} ${await put.text()}`);
      }

      setMsg("✅ PDF y datos guardados.");
      setTitle("");
      setCodigoSua("");
      setEmpresa("");
      setTipo("CONVENIO");
      setAmbito("NACIONAL");
      setDomicilio("");
      setRfc("");
      setTieneIne(false);
      setUnidadReceptora("");
      setVigencia("");
      setDescripcion("");
      setFile(null);

    } catch (e: any) {
      setMsg(`❌ ${e?.message || String(e)}`);
      console.error(e);
    } finally {
      setBusy(false);
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null;
    if (f && f.size > 1024 * 1024) {
      setMsg("⚠️ El archivo debe pesar máximo 1 MB.");
      e.target.value = "";
      setFile(null);
      return;
    }
    setFile(f);
  }

  return (
    <div className="card form-card animate__animated animate__fadeIn">
      <h2 className="mb-3">⬆️ Registrar convenio / documento</h2>

      <form onSubmit={onSubmit}>

        <h4 className="form-section-title">Datos de la empresa</h4>

        <input
          type="text"
          placeholder="Nombre de la empresa"
          value={empresa}
          onChange={(e) => setEmpresa(e.target.value)}
        />

        <input
          type="text"
          placeholder="Título corto del documento"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="Código SUA"
          value={codigoSua}
          onChange={(e) => setCodigoSua(e.target.value)}
        />

        <label className="mt-3">Tipo de documento</label>
        <select
          className="form-select"
          value={tipo}
          onChange={(e) => setTipo(e.target.value as any)}
        >
          <option value="CONVENIO">Convenio</option>
          <option value="ESCRITURA">Escritura pública</option>
          <option value="OTRO">Otro</option>
        </select>

        <label className="mt-3">Ámbito</label>
        <div className="mb-3 d-flex gap-4">
          <label>
            <input
              type="radio"
              value="NACIONAL"
              checked={ambito === "NACIONAL"}
              onChange={() => setAmbito("NACIONAL")}
            />{" "}
            Nacional
          </label>

          <label>
            <input
              type="radio"
              value="INTERNACIONAL"
              checked={ambito === "INTERNACIONAL"}
              onChange={() => setAmbito("INTERNACIONAL")}
            />{" "}
            Internacional
          </label>
        </div>

        <input
          type="text"
          placeholder="Domicilio"
          value={domicilio}
          onChange={(e) => setDomicilio(e.target.value)}
        />

        <input
          type="text"
          placeholder="RFC"
          value={rfc}
          onChange={(e) => setRfc(e.target.value)}
        />

        <label className="mt-3">
          <input
            type="checkbox"
            checked={tieneIne}
            onChange={(e) => setTieneIne(e.target.checked)}
          />{" "}
          La empresa tiene INE
        </label>

        <input
          type="text"
          placeholder="Unidad receptora"
          value={unidadReceptora}
          onChange={(e) => setUnidadReceptora(e.target.value)}
        />

        <label className="mt-3">Vigencia</label>
        <input
          type="date"
          value={vigencia}
          onChange={(e) => setVigencia(e.target.value)}
        />

        <textarea
          className="mt-3"
          placeholder="Notas / descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />

        <label className="mt-3">Archivo PDF (máx. 1 MB)</label>
        <input type="file" accept="application/pdf" onChange={handleFileChange} />

        <button className="btn mt-3" disabled={busy}>
          {busy ? "Subiendo…" : "Guardar y subir PDF"}
        </button>
      </form>

      {msg && <p className="mt-3">{msg}</p>}
    </div>
  );
}
