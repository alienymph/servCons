import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import "../pdfWorker";

const API = (import.meta as any).env?.VITE_API_URL || "http://127.0.0.1:3000";

export default function DocumentView(){
  const { id } = useParams<{id:string}>();
  const [title,setTitle]=useState<string>("Documento");
  const [url,setUrl]=useState<string|null>(null);
  const [err,setErr]=useState<string>("");

  useEffect(()=>{ if(!id) return; (async()=>{
    try{
      setErr(""); setUrl(null);
      const d = await fetch(`${API}/documents/${id}`);
      if(!d.ok) throw new Error(`GET /documents/${id} → ${d.status}`);
      const dj = await d.json(); setTitle(dj.title || "Documento");

      const p = await fetch(`${API}/documents/${id}/versions/1/preview`);
      if(!p.ok) throw new Error(`GET /documents/${id}/versions/1/preview → ${p.status}`);
      const { url } = await p.json(); setUrl(url);
    }catch(e:any){ setErr(e?.message||String(e)); }
  })() },[id]);

  return (
    <div className="card">
      <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:10}}>
        <Link to="/"><button className="btn secondary">← Volver</button></Link>
        <h2 style={{margin:0}}>{title}</h2>
      </div>
      {err && <p style={{color:"#ff8a80",marginBottom:8}}>❌ Error cargando PDF: {err}</p>}
      {!url && !err && <p>Cargando documento…</p>}
      {url && (
        <>
          <a className="link" href={url} target="_blank" rel="noreferrer">🔗 Abrir PDF en pestaña nueva</a>
          <div style={{marginTop:8,height:"80vh",overflow:"auto"}}>
            <Document file={url}>
              <Page pageNumber={1} />
            </Document>
          </div>
        </>
      )}
    </div>
  );
}
