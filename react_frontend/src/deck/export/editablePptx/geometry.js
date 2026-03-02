/**
 * Geometry & layout helpers for 16:9 "wide" PPTX.
 * PptxGenJS uses inches as coordinate space.
 */

export const SLIDE_W_IN = 13.333;
export const SLIDE_H_IN = 7.5;

/**
 * These are mapped from the React deck design (1366x768) into PPT inches.
 * We intentionally keep them as rounded numbers for readability.
 */
export const MASTER = Object.freeze({
  padX: 0.6,
  headerY: 0.2,
  headerH: 0.75,
  footerH: 0.55,
  bodyPadTop: 0.12
});

export function getBodyBox() {
  const x = MASTER.padX;
  const y = MASTER.headerY + MASTER.headerH + MASTER.bodyPadTop;
  const w = SLIDE_W_IN - MASTER.padX * 2;
  const h = SLIDE_H_IN - (MASTER.headerY + MASTER.headerH) - MASTER.footerH - MASTER.bodyPadTop;
  return { x, y, w, h };
}

export function getFooterY() {
  return SLIDE_H_IN - MASTER.footerH;
}

export function twoColWithin(bodyBox, leftFrac = 0.54, gap = 0.35) {
  const leftW = (bodyBox.w - gap) * leftFrac;
  const rightW = bodyBox.w - gap - leftW;
  return {
    left: { x: bodyBox.x, y: bodyBox.y, w: leftW, h: bodyBox.h },
    right: { x: bodyBox.x + leftW + gap, y: bodyBox.y, w: rightW, h: bodyBox.h },
    gap
  };
}

export function gridWithin({ x, y, w, h }, cols, rows, gapX = 0.2, gapY = 0.2) {
  const cellW = (w - gapX * (cols - 1)) / cols;
  const cellH = (h - gapY * (rows - 1)) / rows;
  const cells = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      cells.push({
        x: x + c * (cellW + gapX),
        y: y + r * (cellH + gapY),
        w: cellW,
        h: cellH,
        c,
        r
      });
    }
  }
  return { cellW, cellH, cells };
}

/**
 * Clamp helper to avoid negative width/height from accidental layout mistakes.
 */
export function clampPositive(n, min = 0.01) {
  return Math.max(min, n);
}
