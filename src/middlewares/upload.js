const multer = require('multer');
const storage = multer.memoryStorage(); // para acceder al buffer
const upload = multer({ storage });

module.exports = upload;
