const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function signToken(user) {
  return jwt.sign(
    { user_id: user.user_id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );
}

// POST /api/auth/register  { name, email, password }
exports.register = async (req, res) => {
  try {
    const name = (req.body.name || "").trim();
    const email = (req.body.email || "").trim().toLowerCase();
    const password = req.body.password || "";

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "name, email, dan password wajib diisi" });
    }
    if (!EMAIL_REGEX.test(email)) {
      return res.status(400).json({ message: "Format email tidak valid" });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "Password minimal 6 karakter" });
    }

    const exists = await pool.query("SELECT 1 FROM users WHERE email = $1", [
      email,
    ]);
    if (exists.rows.length > 0) {
      return res.status(409).json({ message: "Email sudah terdaftar" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const { rows } = await pool.query(
      `INSERT INTO users (name, email, password_hash)
       VALUES ($1, $2, $3)
       RETURNING user_id, name, email, role, created_at`,
      [name.slice(0, 100), email, passwordHash],
    );

    const user = rows[0];
    res
      .status(201)
      .json({ message: "Registrasi berhasil", token: signToken(user), user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal registrasi" });
  }
};

// POST /api/auth/login  { email, password }
exports.login = async (req, res) => {
  try {
    const email = (req.body.email || "").trim().toLowerCase();
    const password = req.body.password || "";

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "email dan password wajib diisi" });
    }

    const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    const user = rows[0];

    // Pesan sengaja sama supaya tidak membocorkan email mana yang terdaftar
    const valid = user && (await bcrypt.compare(password, user.password_hash));
    if (!valid) {
      return res.status(401).json({ message: "Email atau password salah" });
    }

    res.json({
      message: "Login berhasil",
      token: signToken(user),
      user: {
        user_id: user.user_id,
        name: user.name,
        email: user.email,
        role: user.role,
        created_at: user.created_at,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal login" });
  }
};

// GET /api/auth/me  (butuh token)
exports.me = async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT user_id, name, email, role, created_at FROM users WHERE user_id = $1",
      [req.user.user_id],
    );
    if (!rows[0])
      return res.status(404).json({ message: "User tidak ditemukan" });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal mengambil data user" });
  }
};
