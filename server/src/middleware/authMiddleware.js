const jwt = require("jsonwebtoken");

// Wajib login: baca header "Authorization: Bearer <token>"
exports.authenticate = (req, res, next) => {
  const header = req.headers.authorization || "";
  const [scheme, token] = header.split(" ");

  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ message: "Token tidak ada, silakan login" });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { user_id: payload.user_id, role: payload.role };
    next();
  } catch (err) {
    const message =
      err.name === "TokenExpiredError"
        ? "Token sudah kedaluwarsa, silakan login lagi"
        : "Token tidak valid";
    res.status(401).json({ message });
  }
};

// Hanya admin
exports.requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Akses ditolak, khusus admin" });
  }
  next();
};
