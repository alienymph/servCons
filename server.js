const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();

// Habilita CORS y parsing de JSON/urlencoded (por si lo necesitas más adelante)
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Asegúrate de que exista la carpeta 'uploads'
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configuración de Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Usa el nombre proporcionado en el formulario, o genera uno por defecto si no lo hay
    const nombreArchivo = req.body.nombre || Date.now();  // Si no se proporciona nombre, usa el timestamp
    cb(null, `${nombreArchivo}${path.extname(file.originalname)}`);
  }
});
const upload = multer({ storage });

// Endpoint para subir el PDF
app.post('/subir', upload.single('archivo'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No se subió ningún archivo' });
  }
  // Devuelve la confirmación y el nombre con que se guardó
  res.json({
    mensaje: 'Documento subido correctamente',
    archivo: req.file.filename
  });
});

// Permite acceder a los archivos estáticos desde /uploads
app.use('/uploads', express.static(uploadDir));

// Endpoint para obtener la lista de archivos subidos
app.get('/documentos', (req, res) => {
  const uploadDir = path.join(__dirname, 'uploads');
  fs.readdir(uploadDir, (err, archivos) => {
    if (err) return res.status(500).send('Error leyendo la carpeta de uploads');
    // Devuelve un JSON con la lista de nombres
    res.json(archivos);
  });
});

// Arranca el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
