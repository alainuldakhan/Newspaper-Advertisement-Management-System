const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

const MASTHEADS = [
  "DAILY NEWS",
  "THE TIMES",
  "CITY HERALD",
  "GLOBAL GAZETTE",
  "EVENING STAR",
  "MORNING POST",
];

const SECTIONS = [
  "SPORTS",
  "WORLD",
  "BUSINESS",
  "TECH",
  "ENTERTAINMENT",
  "HEALTH",
  "SCIENCE",
  "TRAVEL",
];

const PRICES = ["$25", "$35", "$50", "$60", "$75"];


export function drawBase(ctx, w, h) {
  const masthead = pick(MASTHEADS);

  const now = new Date();
  const dayLabel = now.toLocaleDateString("en-US", {
    weekday: "long",
  });
  const dateLabel = now.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const day = `${dayLabel}, ${dateLabel}`;

  const sec1 = `${pick(SECTIONS)} p.${Math.floor(Math.random() * 30) + 2}`;
  const sec2 = `${pick(SECTIONS)} p.${Math.floor(Math.random() * 30) + 2}`;
  const price = pick(PRICES);
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = "#000";
  ctx.font = "bold 48px serif";
  ctx.fillText(masthead, 20, 60);
  ctx.font = "16px serif";
  ctx.fillText(day, w - 260, 40);
  ctx.fillText(sec1, w - 260, 70);
  ctx.fillText(sec2, w - 260, 100);
  ctx.fillText(price, w - 80, 100);

  ctx.strokeStyle = "#000";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, 120);
  ctx.lineTo(w, 120);
  ctx.stroke();
  ctx.font = "bold 24px serif";
  ctx.fillText("Your headline goes here", 20, 160);
  const cols = 5;
  const gutter = 16;
  const colW = (w - (cols + 1) * gutter) / cols;
  ctx.fillStyle = "#ddd";
  for (let i = 0; i < cols; i += 1) {
    const x = gutter + i * (colW + gutter);
    ctx.fillRect(x, 180, colW, h - 240);
  }
}
  

export function drawTextLines(ctx, w, h) {
  const cols = 5;
  const gutter = 16;
  const colW = (w - (cols + 1) * gutter) / cols;
  ctx.fillStyle = "#000";

  for (let i = 0; i < cols; i += 1) {
    const x = gutter + i * (colW + gutter);
    let y = 200;
    while (y < h - 60) {
      const len = colW * (0.3 + Math.random() * 0.7);
      ctx.fillRect(x, y, len, 1);
      y += 20;
    }
  }
}

export function strokeRoundRect(ctx, x, y, w, h, r = 12) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
  ctx.stroke();
}