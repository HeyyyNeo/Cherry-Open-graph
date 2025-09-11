import express from "express";
import { createCanvas } from "canvas";

const app = express();
app.use(express.json());

app.listen(3000);

app.get("/open-graph", (req, res) => {
  const width = 400;
  const height = 300;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  // Background
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, width, height);

  // Sample data
  const data = [
    Math.random() * 10,
    30 * Math.random(),
    20 * Math.random(),
    50 * Math.random(),
    40 * Math.random(),
    70 * Math.random(),
    60 * Math.random(),
  ];

  // Margins for padding
  const margin = 20;
  const chartWidth = width - 2 * margin;
  const chartHeight = height - 2 * margin;

  // Scale data
  const maxValue = Math.max(...data);
  const stepX = chartWidth / (data.length - 1);
  const scaleY = chartHeight / maxValue;

  // Draw line only
  ctx.strokeStyle = req.query.color;
  ctx.lineWidth = 2;
  ctx.beginPath();
  data.forEach((val, i) => {
    const x = margin + i * stepX;
    const y = height - margin - val * scaleY;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();

  // Send image
  res.setHeader("Content-Type", "image/png");
  canvas.pngStream().pipe(res);
});
