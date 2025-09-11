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
    10 * Math.random(),
    30 * Math.random(),
    20 * Math.random(),
    50 * Math.random(),
    40 * Math.random(),
    70 * Math.random(),
    60 * Math.random(),
  ];

  // Margins
  const margin = 20;
  const chartWidth = width - 2 * margin;
  const chartHeight = height - 2 * margin;

  // Scale data
  const maxValue = Math.max(...data);
  const stepX = chartWidth / (data.length - 1);
  const scaleY = chartHeight / maxValue;

  // Draw horizontal grid lines
  ctx.strokeStyle = "#ccc";
  ctx.lineWidth = 1;
  ctx.setLineDash([5, 5]);
  const gridLines = 5;
  for (let i = 0; i <= gridLines; i++) {
    const y = margin + (i * chartHeight) / gridLines;
    ctx.beginPath();
    ctx.moveTo(margin, y);
    ctx.lineTo(width - margin, y);
    ctx.stroke();
  }

  // Draw vertical grid lines
  for (let i = 0; i < data.length; i++) {
    const x = margin + i * stepX;
    ctx.beginPath();
    ctx.moveTo(x, margin);
    ctx.lineTo(x, height - margin);
    ctx.stroke();
  }

  // Reset dash for main line
  ctx.setLineDash([]);

  // Draw data line
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

  // Draw dots at each point
  ctx.fillStyle = "orange";
  data.forEach((val, i) => {
    const x = margin + i * stepX;
    const y = height - margin - val * scaleY;
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fill();
  });

  // Send image
  res.setHeader("Content-Type", "image/png");
  canvas.pngStream().pipe(res);
});
