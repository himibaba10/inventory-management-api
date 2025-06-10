import { Application } from "express";
import http from "http";

const PORT = process.env.PORT || 3000;

const startServer = (app: Application) => {
  const server = http.createServer(app);

  server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });

  server.on("error", (err) => {
    console.error("Server error:", err);
    process.exit(1);
  });

  process.on("SIGINT", () => {
    server.close(() => {
      console.log("Server closed gracefully.");
      process.exit(0);
    });
  });

  return server;
};

export default startServer;
