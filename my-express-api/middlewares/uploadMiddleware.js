const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve('uploads/'));  // Pasta onde as imagens serão armazenadas
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);  // Define o nome do arquivo
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Formato de arquivo inválido. Permitido apenas JPEG, JPG e PNG.'));
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 2 },  // Limite de 2MB
  fileFilter
});

module.exports = upload;
