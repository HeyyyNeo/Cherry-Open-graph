import express from "express";
import { createCanvas } from "canvas";

const app = express();
app.use(express.json());

app.listen(3000);

app.get("/open-graph", (req, res) => {
  const canvas = createCanvas(200, 200);
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = req.query.color || "lightblue";
  ctx.fillRect(0, 0, 200, 200);

  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  ctx.fillText("Hello!", 50, 100);

  res.setHeader("Content-Type", "image/png");
  canvas.pngStream().pipe(res);
});
