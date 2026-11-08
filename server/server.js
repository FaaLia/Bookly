require('dotenv').config();
const app = require('./src/app');

const PORT = process.env.PORT || 5000;

app.listen(PORT, (err) => {
  if (err) {
    console.error(`Gagal menjalankan server di port ${PORT}:`, err.message);
    process.exit(1);
  }
  console.log(`Server berjalan di http://localhost:${PORT}`);
});