// charts.js — small hand-rolled SVG charts. No libraries, no network: every
// chart is drawn from the numbers in data.js at render time.

const NS = "http://www.w3.org/2000/svg";
const RED = "#a4131f";
const TEAL = "#0e6b6b";
const GOLD = "#c98a1b";
const GREY = "#8a94a6";

function niceTicks(min, max, count) {
  const span = max - min || 1;
  const step = span / count;
  const mag = Math.pow(10, Math.floor(Math.log10(step)));
  const norm = step / mag;
  const nice = norm < 1.5 ? 1 : norm < 3.5 ? 2 : norm < 7.5 ? 5 : 10;
  const s = nice * mag;
  const start = Math.floor(min / s) * s;
  const out = [];
  for (let v = start; v <= max + s * 0.5; v += s) out.push(v);
  return { ticks: out, step: s };
}

function fmt(v) {
  if (Math.abs(v) >= 1000) return String(Math.round(v));
  if (Number.isInteger(v)) return String(v);
  return v.toFixed(1);
}

// A line chart with points and value labels. points: [{x: label, y: number}]
export function lineChart(points, opts = {}) {
  const w = opts.width || 640;
  const h = opts.height || 280;
  const padL = 52, padR = 14, padT = 18, padB = 34;
  const ys = points.map((p) => p.y);
  let min = Math.min(...ys);
  let max = Math.max(...ys);
  if (opts.floor !== undefined) min = Math.min(min, opts.floor);
  if (opts.zeroBase) min = Math.min(0, min);
  const pad = (max - min) * 0.12 || 1;
  min -= pad;
  max += pad;
  const { ticks } = niceTicks(min, max, 4);
  min = Math.min(min, ticks[0]);
  max = Math.max(max, ticks[ticks.length - 1]);
  const x = (i) => padL + (i * (w - padL - padR)) / Math.max(1, points.length - 1);
  const y = (v) => padT + ((max - v) / (max - min)) * (h - padT - padB);
  const color = opts.color || RED;
  let g = "";
  ticks.forEach((t) => {
    g += `<line x1="${padL}" y1="${y(t)}" x2="${w - padR}" y2="${y(t)}" stroke="#e3e6ea" stroke-width="1"/>`;
    g += `<text x="${padL - 8}" y="${y(t) + 4}" text-anchor="end" font-size="11" fill="#5b6472">${fmt(t)}${opts.suffix || ""}</text>`;
  });
  const line = points.map((p, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)},${y(p.y).toFixed(1)}`).join(" ");
  const area = `${line} L${x(points.length - 1).toFixed(1)},${y(min).toFixed(1)} L${x(0).toFixed(1)},${y(min).toFixed(1)} Z`;
  g += `<path d="${area}" fill="${color}" fill-opacity="0.08"/>`;
  g += `<path d="${line}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>`;
  let lastLabelX = -1000;
  points.forEach((p, i) => {
    g += `<circle cx="${x(i)}" cy="${y(p.y)}" r="3.5" fill="#fff" stroke="${color}" stroke-width="2"/>`;
    // Thin out value labels where points sit close together, so neighbouring
    // labels never print on top of each other. The last point is always labelled.
    if (opts.showValues !== false && (i === points.length - 1 || x(i) - lastLabelX >= 44)) {
      g += `<text x="${x(i)}" y="${y(p.y) - 9}" text-anchor="middle" font-size="11" font-weight="600" fill="#26303d">${p.y}${opts.suffix || ""}</text>`;
      lastLabelX = x(i);
    }
    g += `<text x="${x(i)}" y="${h - 10}" text-anchor="middle" font-size="11" fill="#5b6472">${p.x}</text>`;
  });
  return `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${opts.label || "Line chart"}" xmlns="${NS}">${g}</svg>`;
}

// A vertical bar chart. bars: [{x: label, y: number}]
export function barChart(bars, opts = {}) {
  const w = opts.width || 640;
  const h = opts.height || 280;
  const padL = 52, padR = 10, padT = 22, padB = 34;
  const ys = bars.map((b) => b.y);
  // The axis always includes zero, and extends below it when a value is
  // negative (e.g. the -2.07% GDP contraction in 2020) so the bar is drawn
  // instead of vanishing below the chart.
  let min = Math.min(0, ...ys);
  let max = Math.max(...ys);
  const spanPad = (max - min) * 0.08 || 1;
  if (min < 0) min -= spanPad;
  max += spanPad;
  const { ticks } = niceTicks(min, max, 4);
  min = Math.min(min, ticks[0]);
  max = Math.max(max, ticks[ticks.length - 1]);
  const slot = (w - padL - padR) / bars.length;
  const bw = Math.min(46, slot * 0.62);
  const y = (v) => padT + ((max - v) / (max - min)) * (h - padT - padB);
  const color = opts.color || TEAL;
  let g = "";
  ticks.forEach((t) => {
    const zero = t === 0;
    g += `<line x1="${padL}" y1="${y(t)}" x2="${w - padR}" y2="${y(t)}" stroke="${zero ? "#b9bfc9" : "#e3e6ea"}" stroke-width="${zero ? 1.5 : 1}"/>`;
    g += `<text x="${padL - 8}" y="${y(t) + 4}" text-anchor="end" font-size="11" fill="#5b6472">${fmt(t)}${opts.suffix || ""}</text>`;
  });
  bars.forEach((b, i) => {
    const cx = padL + slot * i + slot / 2;
    const neg = b.y < 0;
    const top = neg ? y(0) : y(b.y);
    const height = Math.abs(y(b.y) - y(0));
    const fill = b.color || (neg ? GOLD : color);
    g += `<rect x="${(cx - bw / 2).toFixed(1)}" y="${top.toFixed(1)}" width="${bw.toFixed(1)}" height="${Math.max(1, height).toFixed(1)}" rx="3" fill="${fill}"/>`;
    g += `<text x="${cx}" y="${(neg ? y(b.y) + 16 : top - 7).toFixed(1)}" text-anchor="middle" font-size="11" font-weight="600" fill="#26303d">${b.y}${opts.suffix || ""}</text>`;
    g += `<text x="${cx}" y="${h - 10}" text-anchor="middle" font-size="11" fill="#5b6472">${b.x}</text>`;
  });
  return `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${opts.label || "Bar chart"}" xmlns="${NS}">${g}</svg>`;
}

// Two series on one line chart, for comparing rates over time.
export function dualLine(seriesA, seriesB, opts = {}) {
  const w = opts.width || 640;
  const h = opts.height || 280;
  const padL = 52, padR = 14, padT = 18, padB = 34;
  const all = [...seriesA.map((p) => p.y), ...seriesB.map((p) => p.y)];
  let min = Math.min(...all);
  let max = Math.max(...all);
  const pad = (max - min) * 0.15 || 1;
  min -= pad;
  max += pad;
  const { ticks } = niceTicks(min, max, 4);
  min = Math.min(min, ticks[0]);
  max = Math.max(max, ticks[ticks.length - 1]);
  const n = seriesA.length;
  const x = (i) => padL + (i * (w - padL - padR)) / Math.max(1, n - 1);
  const y = (v) => padT + ((max - v) / (max - min)) * (h - padT - padB);
  let g = "";
  ticks.forEach((t) => {
    g += `<line x1="${padL}" y1="${y(t)}" x2="${w - padR}" y2="${y(t)}" stroke="#e3e6ea" stroke-width="1"/>`;
    g += `<text x="${padL - 8}" y="${y(t) + 4}" text-anchor="end" font-size="11" fill="#5b6472">${fmt(t)}%</text>`;
  });
  const draw = (series, color, above) => {
    const line = series.map((p, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)},${y(p.y).toFixed(1)}`).join(" ");
    g += `<path d="${line}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>`;
    series.forEach((p, i) => {
      g += `<circle cx="${x(i)}" cy="${y(p.y)}" r="3.5" fill="#fff" stroke="${color}" stroke-width="2"/>`;
      g += `<text x="${x(i)}" y="${(above ? y(p.y) - 9 : y(p.y) + 18).toFixed(1)}" text-anchor="middle" font-size="11" font-weight="600" fill="${color}">${p.y}%</text>`;
      g += `<text x="${x(i)}" y="${h - 10}" text-anchor="middle" font-size="11" fill="#5b6472">${p.x}</text>`;
    });
  };
  draw(seriesA, RED, true);
  draw(seriesB, TEAL, false);
  return `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${opts.label || "Two-series line chart"}" xmlns="${NS}">${g}</svg>
<p class="legend"><span class="swatch" style="background:${RED}"></span>${opts.labelA || "Series A"} &nbsp; <span class="swatch" style="background:${TEAL}"></span>${opts.labelB || "Series B"}</p>`;
}

// Horizontal bars, good for ranked lists like provinces or enrolment.
export function hbarChart(rows, opts = {}) {
  const w = opts.width || 640;
  const rowH = opts.rowHeight || 30;
  const padL = opts.labelWidth || 150;
  const padR = 56;
  const h = rowH * rows.length + 14;
  const max = Math.max(...rows.map((r) => r.value)) * 1.06;
  const color = opts.color || RED;
  let g = "";
  rows.forEach((r, i) => {
    const cy = 14 + rowH * i + rowH / 2;
    const bw = ((w - padL - padR) * r.value) / max;
    g += `<text x="${padL - 10}" y="${cy + 4}" text-anchor="end" font-size="12" fill="#26303d">${r.label}</text>`;
    g += `<rect x="${padL}" y="${cy - 9}" width="${Math.max(2, bw).toFixed(1)}" height="18" rx="3" fill="${r.color || color}"/>`;
    g += `<text x="${padL + bw + 8}" y="${cy + 4}" font-size="12" font-weight="600" fill="#26303d">${r.text || r.value}</text>`;
  });
  return `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${opts.label || "Horizontal bar chart"}" xmlns="${NS}">${g}</svg>`;
}

export { RED, TEAL, GOLD, GREY };
