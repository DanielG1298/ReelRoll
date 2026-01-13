import cors from "cors";

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:4173",
  "https://reelroll.netlify.app"
];

const corsMiddleware = cors({
  origin: (origin, callback) => {
    // allow requests with no origin (Postman, server-to-server, etc.)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
  methods: ["GET", "POST", "PUT", "DELETE"],
});

export default corsMiddleware;
