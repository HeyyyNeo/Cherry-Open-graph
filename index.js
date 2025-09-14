import express from "express";
import { createCanvas } from "canvas";

const app = express();
app.use(express.json());

app.listen(3000);

app.get("/open-graph", (req, res) => {
  const width = 600;
  const height = 400;

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  // Example data points
  const data = [
    20, 10, 15, 10, 5, 20, 10, 10, 20, 35, 20, 25, 50, 20, 20, 40, 35, 0, 7, 50,
    90, 15, 10, 5, 20, 10, 10, 20, 5, 20, 0, 9, 5, 8, 5, 2, 10, 10, 20, 35, 20,
    90, 15, 10, 5, 20, 10, 10, 20, 5, 20, 0, 9, 5, 8, 5, 2, 10, 10, 20, 35, 20,
  ];
  const stepX = width / (data.length - 1);
  const maxY = Math.max(...data);

  // Background
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, width, height);

  // 🔹 Draw static grid lines (every 50px horizontally & vertically)
  ctx.strokeStyle = "#ddd";
  ctx.lineWidth = 1;
  ctx.setLineDash([4, 4]); // dotted

  // vertical grid
  for (let x = 0; x <= width; x += 50) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }

  // horizontal grid
  for (let y = 0; y <= height; y += 50) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  ctx.setLineDash([]); // reset to solid

  // 🔹 Draw area graph
  ctx.beginPath();
  ctx.moveTo(0, height);

  data.forEach((value, i) => {
    const x = i * stepX;
    const y = height - (value / maxY) * (height - 20);
    ctx.lineTo(x, y);
  });

  ctx.lineTo(width, height);
  ctx.closePath();

  ctx.fillStyle = "#C9E8D3";
  ctx.fill();

  // 🔹 Stroke line
  ctx.beginPath();
  ctx.moveTo(0, height - (data[0] / maxY) * (height - 20));
  data.forEach((value, i) => {
    const x = i * stepX;
    const y = height - (value / maxY) * (height - 20);
    ctx.lineTo(x, y);
  });
  ctx.strokeStyle = "green";
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.font = "12px Arial";
  ctx.fillStyle = "#333"; // dark grey
  ctx.fillText("3Y CAGR", 30, 40);

  ctx.font = "bold 16px Arial";
  ctx.fillText("30.27%", 30, 60);

  const x = 20; // center X
  const y = 54; // center Y
  const size = 5; // triangle size

  ctx.beginPath();
  ctx.moveTo(x, y - size); // top point
  ctx.lineTo(x - size, y + size); // bottom left
  ctx.lineTo(x + size, y + size); // bottom right
  ctx.closePath();
  ctx.fillStyle = "green";
  ctx.fill();
  // Send image
  res.setHeader("Content-Type", "image/png");
  canvas.pngStream().pipe(res);
});
