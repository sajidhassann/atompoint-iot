import express from "express";
import iotDataRoutes from "./api/iotDataRoutes.js";
import path from "path";
import { URL } from "url";

const __dirname = new URL(".", import.meta.url).pathname;

const app = express();
app.use("/api", iotDataRoutes);

if (process.env.NODE_ENV === "production") {
  // Set static folder

  app.use(express.static(path.resolve(__dirname, "client")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "index.html"))
  );
}

export default app;
