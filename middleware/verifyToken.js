import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  const token = req.cookies.token_key;
  if (!token) {
    return res.status(401).json({ message: "not authenticated" });
  }
  jwt.verify(token, "secret_key", (err, payload) => {
    if (err) return res.status(403).json({ message: "not authenticated" });
    console.log(payload, "payload");
    req.id = payload.id;
    next();
  });
};
