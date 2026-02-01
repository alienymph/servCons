// src/services/api.ts

// URL base del backend
export const API_URL =
  (import.meta as any).env?.VITE_API_URL || "http://127.0.0.1:5173";

// Tipo de documento que viene del backend
export interface DocumentDTO {
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
}

// Datos que enviamos al crear / actualizar
export interface CreateDocumentPayload {
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
}

// LISTAR documentos
export async function fetchDocuments(): Promise<DocumentDTO[]> {
  const res = await fetch(`${API_URL}/documents`);
  if (!res.ok) {
    throw new Error(`GET /documents → ${res.status} ${await res.text()}`);
  }
  return res.json();
}

// CREAR documento (metadata) → el backend debería devolver { id, ... }
export async function uploadDocument(
  payload: CreateDocumentPayload
): Promise<{ id: string; uploadUrl?: string }> {
  const res = await fetch(`${API_URL}/documents`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(`POST /documents → ${res.status} ${await res.text()}`);
  }

  return res.json();
}

// ACTUALIZAR documento (EDITAR)
export async function updateDocument(
  id: string,
  payload: Partial<CreateDocumentPayload>
): Promise<DocumentDTO> {
  const res = await fetch(`${API_URL}/documents/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(
      `PATCH /documents/${id} → ${res.status} ${await res.text()}`
    );
  }

  return res.json();
}

// (Opcional) ELIMINAR documento, por si lo usas en la lista
export async function deleteDocument(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/documents/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error(
      `DELETE /documents/${id} → ${res.status} ${await res.text()}`
    );
  }
}
