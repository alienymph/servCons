// src/App.tsx

import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import DocumentList from "./pages/DocumentList";
import DocumentUpload from "./pages/DocumentUpload";
import DocumentView from "./pages/DocumentView";
import DocumentEdit from "./pages/DocumentEdit";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<DocumentList />} />
        <Route path="upload" element={<DocumentUpload />} />
        <Route path="documents/:id" element={<DocumentView />} />
        <Route path="documents/:id/edit" element={<DocumentEdit />} />
      </Route>
    </Routes>
  );
}
