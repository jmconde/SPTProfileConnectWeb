import express from "express";
import path from "path";
import cors from "cors";
import https from "https";
import fs from "fs";

import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 3000;
const HTTPS_PORT = process.env.HTTPS_PORT || 3444;
const appPath = path.resolve(process.cwd(), "dist");
const secureMode = process.env.SECURE_MODE === "true";

app.use(cors());

app.use(express.static(appPath));

app.get("/*", function (req, res) {
  res.sendFile(path.join(process.cwd(), "dist", "index.html"));
});

if (!secureMode) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
} else {
  https
    .createServer(
      {
        key: fs.readFileSync(path.join(process.cwd(), process.env.SSL_KEY)),
        cert: fs.readFileSync(path.join(process.cwd(), process.env.SSL_CERT)),
      },
      app
    )
    .listen(HTTPS_PORT, () => {
      console.log(`Server running on port ${HTTPS_PORT}`);
    });

  app.listen(PORT, () => {});
}
