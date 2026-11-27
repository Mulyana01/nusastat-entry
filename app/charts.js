// NusaStat chart builders: small hand-rolled SVG charts, no library, so the
// first load stays tiny. Each function returns an SVG string; every mark
// carries a <title> so hovering a point or bar reads out its exact value.

const NS = '';

function esc(text) {
  return String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;');
}

function lineChart(points, options) {
  const { color = '#b3271e', format = (v) => v, area = true, unit = '' } = options;
  const W = 720, H = 300, PL = 52, PR = 16, PT = 18, PB = 34;
  const values = points.map((p) => p.value);
  let min = Math.min(...values), max = Math.max(...values);
  const pad = (max - min) * 0.15 || 1;
  min = Math.floor((min - pad) * 10) / 10;
  max = Math.ceil((max + pad) * 10) / 10;
  const x = (i) => PL + (i * (W - PL - PR)) / (points.length - 1);
  const y = (v) => PT + ((max - v) * (H - PT - PB)) / (max - min);
  let grid = '';
  for (let g = 0; g <= 4; g++) {
    const gv = min + ((max - min) * g) / 4;
    const gy = y(gv);
    grid += `<line x1="${PL}" y1="${gy}" x2="${W - PR}" y2="${gy}" class="grid"/>` +
      `<text x="${PL - 8}" y="${gy + 4}" class="axis" text-anchor="end">${esc(format(gv))}</text>`;
  }
  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(p.value).toFixed(1)}`).join(' ');
  const areaPath = area
    ? `<path d="${path} L${x(points.length - 1).toFixed(1)},${(H - PB).toFixed(1)} L${x(0).toFixed(1)},${(H - PB).toFixed(1)} Z" fill="${color}" opacity="0.12"/>`
    : '';
  const dots = points.map((p, i) =>
    `<circle cx="${x(i)}" cy="${y(p.value)}" r="4.5" fill="${color}"><title>${p.year}: ${esc(format(p.value))}${unit}</title></circle>` +
    `<text x="${x(i)}" y="${H - 10}" class="axis" text-anchor="middle">${p.year}</text>`).join('');
  const last = points[points.length - 1];
  const label = `<text x="${x(points.length - 1)}" y="${y(last.value) - 12}" class="chart-value" text-anchor="end">${esc(format(last.value))}${unit}</text>`;
  return `<svg viewBox="0 0 ${W} ${H}" class="chart-svg" role="img">${grid}${areaPath}<path d="${path}" fill="none" stroke="${color}" stroke-width="3" stroke-linejoin="round"/>${dots}${label}</svg>`;
}

function barChart(points, options) {
  const { color = '#0e7c6b', negativeColor = '#b3271e', format = (v) => v, unit = '' } = options;
  const W = 720, H = 300, PL = 44, PR = 12, PT = 22, PB = 34;
  const values = points.map((p) => p.value);
  let min = Math.min(0, ...values), max = Math.max(0, ...values);
  const pad = (max - min) * 0.12 || 1;
  max = Math.ceil((max + pad) * 10) / 10;
  min = Math.floor((min - pad) * 10) / 10;
  const y = (v) => PT + ((max - v) * (H - PT - PB)) / (max - min);
  const zeroY = y(0);
  const step = (W - PL - PR) / points.length;
  const bw = Math.min(46, step * 0.62);
  let grid = '';
  for (let g = 0; g <= 4; g++) {
    const gv = min + ((max - min) * g) / 4;
    const gy = y(gv);
    grid += `<line x1="${PL}" y1="${gy}" x2="${W - PR}" y2="${gy}" class="grid"/>` +
      `<text x="${PL - 8}" y="${gy + 4}" class="axis" text-anchor="end">${esc(format(gv))}</text>`;
  }
  const bars = points.map((p, i) => {
    const cx = PL + step * i + step / 2;
    const top = y(Math.max(0, p.value));
    const bottom = y(Math.min(0, p.value));
    const fill = p.value < 0 ? negativeColor : color;
    const labelY = p.value < 0 ? bottom + 16 : top - 7;
    return `<rect x="${(cx - bw / 2).toFixed(1)}" y="${top.toFixed(1)}" width="${bw}" height="${Math.max(2, bottom - top).toFixed(1)}" fill="${fill}" rx="3"><title>${p.year}: ${esc(format(p.value))}${unit}</title></rect>` +
      `<text x="${cx}" y="${labelY}" class="chart-value" text-anchor="middle">${esc(format(p.value))}</text>` +
      `<text x="${cx}" y="${H - 10}" class="axis" text-anchor="middle">${p.year}</text>`;
  }).join('');
  return `<svg viewBox="0 0 ${W} ${H}" class="chart-svg" role="img">${grid}<line x1="${PL}" y1="${zeroY}" x2="${W - PR}" y2="${zeroY}" class="zero"/>${bars}</svg>`;
}

function hBarChart(items, options) {
  const { color = '#b3271e', format = (v) => v, unit = '' } = options;
  const W = 720, rowH = 34, PT = 6;
  const H = PT * 2 + items.length * rowH;
  const max = Math.max(...items.map((d) => d.value));
  const labelW = 168, valueW = 74;
  const barMax = W - labelW - valueW;
  const rows = items.map((d, i) => {
    const y0 = PT + i * rowH;
    const w = Math.max(3, (d.value / max) * barMax);
    return `<text x="${labelW - 10}" y="${y0 + 20}" class="hbar-label" text-anchor="end">${esc(d.label)}</text>` +
      `<rect x="${labelW}" y="${y0 + 6}" width="${w.toFixed(1)}" height="18" fill="${color}" rx="3"><title>${esc(d.label)}: ${esc(format(d.value))}${unit}</title></rect>` +
      `<text x="${labelW + w + 8}" y="${y0 + 20}" class="chart-value">${esc(format(d.value))}${unit}</text>`;
  }).join('');
  return `<svg viewBox="0 0 ${W} ${H}" class="chart-svg" role="img">${rows}</svg>`;
}

function donutChart(parts, options) {
  const { centerTop = '', centerBottom = '' } = options || {};
  const size = 260, cx = size / 2, cy = size / 2, r = 96, inner = 58;
  const total = parts.reduce((s, p) => s + p.value, 0);
  let angle = -Math.PI / 2;
  const arcs = parts.map((p) => {
    const frac = p.value / total;
    const sweep = frac * Math.PI * 2;
    const a0 = angle, a1 = angle + sweep;
    angle = a1;
    const large = sweep > Math.PI ? 1 : 0;
    const x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
    const xi1 = cx + inner * Math.cos(a1), yi1 = cy + inner * Math.sin(a1);
    const xi0 = cx + inner * Math.cos(a0), yi0 = cy + inner * Math.sin(a0);
    return `<path d="M${x0.toFixed(1)},${y0.toFixed(1)} A${r},${r} 0 ${large} 1 ${x1.toFixed(1)},${y1.toFixed(1)} L${xi1.toFixed(1)},${yi1.toFixed(1)} A${inner},${inner} 0 ${large} 0 ${xi0.toFixed(1)},${yi0.toFixed(1)} Z" fill="${p.color}"><title>${esc(p.label)}: ${p.value}%</title></path>`;
  }).join('');
  const center = `<text x="${cx}" y="${cy - 4}" class="donut-center" text-anchor="middle">${esc(centerTop)}</text>` +
    `<text x="${cx}" y="${cy + 18}" class="donut-sub" text-anchor="middle">${esc(centerBottom)}</text>`;
  return `<svg viewBox="0 0 ${size} ${size}" class="donut-svg" role="img">${arcs}${center}</svg>`;
}

function legend(parts, format) {
  const fmt = format || ((v) => `${v}%`);
  return `<ul class="legend">${parts.map((p) =>
    `<li><span class="swatch" style="background:${p.color}"></span><span class="legend-label">${esc(p.label)}</span><strong>${esc(fmt(p.value))}</strong></li>`).join('')}</ul>`;
}

export { NS, lineChart, barChart, hBarChart, donutChart, legend };
