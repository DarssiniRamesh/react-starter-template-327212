import { PPTX_THEME } from "./theme";
import { MASTER, SLIDE_W_IN, SLIDE_H_IN, getFooterY, clampPositive } from "./geometry";

/**
 * NOTE: PptxGenJS exposes ShapeType/ChartType via the `pptx` instance (not as named exports),
 * so we pass `pptx` into helpers that need shape constants.
 */

function safeText(v) {
  if (v === null || v === undefined) return "";
  return String(v);
}

// PUBLIC_INTERFACE
export function addMasterChrome({ pptx, slide, slideNumber, sectionLabel }) {
  /**
   * Add the shared header/footer for the deck.
   *
   * Contract:
   * - Inputs:
   *   - pptx: PptxGenJS instance (used for ShapeType constants)
   *   - slide: PptxGenJS slide instance
   *   - slideNumber: number (1..24)
   *   - sectionLabel: string (kicker label)
   * - Side effects:
   *   - Adds header/footer text and a footer separator line.
   */
  // Header kicker (left)
  slide.addText(safeText(sectionLabel), {
    x: MASTER.padX,
    y: MASTER.headerY + 0.15,
    w: 5.6,
    h: 0.3,
    fontFace: PPTX_THEME.fonts.body,
    fontSize: PPTX_THEME.fontSizes.kicker,
    color: PPTX_THEME.colors.muted,
    bold: true,
    charSpacing: 1.2
  });

  // Header right brand
  slide.addText("Klefki by Vlinder Inc.", {
    x: SLIDE_W_IN - MASTER.padX - 3.6,
    y: MASTER.headerY + 0.15,
    w: 3.6,
    h: 0.3,
    fontFace: PPTX_THEME.fonts.body,
    fontSize: PPTX_THEME.fontSizes.kicker,
    color: PPTX_THEME.colors.muted,
    bold: true,
    align: "right"
  });

  // Footer separator line
  slide.addShape(pptx.ShapeType.line, {
    x: MASTER.padX,
    y: getFooterY(),
    w: SLIDE_W_IN - MASTER.padX * 2,
    h: 0,
    line: { color: PPTX_THEME.colors.line, width: 1 }
  });

  // Footer left
  slide.addText("St. Vincent and the Grenadines • March 2026", {
    x: MASTER.padX,
    y: getFooterY() + 0.15,
    w: 7.5,
    h: 0.3,
    fontFace: PPTX_THEME.fonts.body,
    fontSize: PPTX_THEME.fontSizes.small,
    color: PPTX_THEME.colors.muted,
    bold: true
  });

  // Footer right
  slide.addText(`${slideNumber}/24`, {
    x: SLIDE_W_IN - MASTER.padX - 1.2,
    y: getFooterY() + 0.15,
    w: 1.2,
    h: 0.3,
    fontFace: PPTX_THEME.fonts.body,
    fontSize: PPTX_THEME.fontSizes.small,
    color: PPTX_THEME.colors.muted,
    bold: true,
    align: "right"
  });
}

// PUBLIC_INTERFACE
export function addTitle(slide, text, { x, y, w }) {
  /** Add a slide title text box with consistent typography. */
  slide.addText(safeText(text), {
    x,
    y,
    w,
    h: 0.5,
    fontFace: PPTX_THEME.fonts.heading,
    fontSize: PPTX_THEME.fontSizes.title,
    color: PPTX_THEME.colors.navy,
    bold: true
  });
}

// PUBLIC_INTERFACE
export function addSubtitle(slide, text, { x, y, w }) {
  /** Add a subtitle line under the title. */
  if (!text) return;
  slide.addText(safeText(text), {
    x,
    y,
    w,
    h: 0.35,
    fontFace: PPTX_THEME.fonts.body,
    fontSize: PPTX_THEME.fontSizes.subtitle,
    color: PPTX_THEME.colors.muted,
    bold: false
  });
}

export function addRoundedRect({ pptx, slide, x, y, w, h, fill, line, radius }) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x,
    y,
    w: clampPositive(w),
    h: clampPositive(h),
    fill: fill ? { color: fill } : undefined,
    line: line ? { color: line, width: 1 } : { color: PPTX_THEME.colors.line, width: 1 },
    radius: radius ?? 10
  });
}

// PUBLIC_INTERFACE
export function addCard(
  { pptx, slide },
  { x, y, w, h, title, body, bullets, fill = PPTX_THEME.colors.white, accent, mode = "neutral" }
) {
  /**
   * Standard card used throughout the deck.
   *
   * Contract:
   * - Provide either body (string) or bullets (string[]). Both may be provided.
   * - Adds a rounded rectangle + title + content.
   */
  const lineColor =
    mode === "problem"
      ? "F7C7C7"
      : mode === "solution"
      ? "BFEBDD"
      : mode === "warn"
      ? "FDE4B8"
      : PPTX_THEME.colors.line;

  addRoundedRect({
    pptx,
    slide,
    x,
    y,
    w,
    h,
    fill,
    line: lineColor,
    radius: 10
  });

  const titleY = y + 0.16;
  slide.addText(safeText(title), {
    x: x + 0.22,
    y: titleY,
    w: w - 0.44,
    h: 0.28,
    fontFace: PPTX_THEME.fonts.body,
    fontSize: 14,
    color: PPTX_THEME.colors.navy,
    bold: true
  });

  if (accent) {
    // Right-side pill
    slide.addShape(pptx.ShapeType.roundRect, {
      x: x + w - 0.65,
      y: y + 0.12,
      w: 0.45,
      h: 0.28,
      fill: { color: accent },
      line: { color: "FFFFFF", width: 1 },
      radius: 14
    });
  }

  const contentY = y + 0.48;
  const contentH = h - 0.6;

  if (body) {
    slide.addText(safeText(body), {
      x: x + 0.22,
      y: contentY,
      w: w - 0.44,
      h: contentH,
      fontFace: PPTX_THEME.fonts.body,
      fontSize: PPTX_THEME.fontSizes.body,
      color: PPTX_THEME.colors.text,
      valign: "top"
    });
  }

  if (bullets?.length) {
    slide.addText(bullets.map((b) => safeText(b)).join("\n"), {
      x: x + 0.3,
      y: contentY,
      w: w - 0.55,
      h: contentH,
      fontFace: PPTX_THEME.fonts.body,
      fontSize: PPTX_THEME.fontSizes.body,
      color: PPTX_THEME.colors.text,
      valign: "top",
      bullet: { indent: 18 },
      hanging: 4
    });
  }
}

// PUBLIC_INTERFACE
export function addBarChart(
  { pptx, slide },
  { x, y, w, rows, barH = 0.18, rowGap = 0.12, labelW = 1.45, valueW = 1.05 }
) {
  /**
   * Simple, fully-editable bar chart built from shapes.
   * rows: Array<{ key: string, label: string, value: number, note?: string, color: hex }>
   */
  const max = Math.max(...rows.map((r) => r.value), 1);
  const trackW = w - labelW - valueW - 0.2;

  rows.forEach((r, idx) => {
    const ry = y + idx * (barH + rowGap);
    slide.addText(r.label, {
      x,
      y: ry - 0.02,
      w: labelW,
      h: barH + 0.06,
      fontFace: PPTX_THEME.fonts.body,
      fontSize: 11,
      color: PPTX_THEME.colors.navy,
      bold: true
    });

    // Track
    slide.addShape(pptx.ShapeType.roundRect, {
      x: x + labelW,
      y: ry,
      w: trackW,
      h: barH,
      fill: { color: "E9EEF5" },
      line: { color: PPTX_THEME.colors.line, width: 1 },
      radius: 6
    });

    // Fill
    const fillW = Math.max(0.05, (r.value / max) * trackW);
    slide.addShape(pptx.ShapeType.roundRect, {
      x: x + labelW,
      y: ry,
      w: fillW,
      h: barH,
      fill: { color: r.color },
      line: { color: r.color, width: 1 },
      radius: 6
    });

    slide.addText(r.note ?? String(r.value), {
      x: x + labelW + trackW + 0.15,
      y: ry - 0.02,
      w: valueW,
      h: barH + 0.06,
      fontFace: PPTX_THEME.fonts.body,
      fontSize: 11,
      color: PPTX_THEME.colors.muted,
      bold: true,
      align: "right"
    });
  });
}

// PUBLIC_INTERFACE
export function addTwoColTable(
  { pptx, slide },
  { x, y, w, h, headerLeft, headerRight, rows, colGap = 0.15 }
) {
  /**
   * Two-column table built from shapes + text (editable).
   * rows: Array<{ left: string, right: string, leftFill?: hex, rightFill?: hex }>
   */
  const headerH = 0.38;
  const bodyY = y + headerH + 0.12;
  const bodyH = h - headerH - 0.12;

  const colW = (w - colGap) / 2;

  // Header background
  slide.addShape(pptx.ShapeType.roundRect, {
    x,
    y,
    w,
    h: headerH,
    fill: { color: "F3F6FA" },
    line: { color: PPTX_THEME.colors.line, width: 1 },
    radius: 10
  });

  slide.addText(safeText(headerLeft), {
    x: x + 0.2,
    y: y + 0.08,
    w: colW - 0.2,
    h: headerH,
    fontFace: PPTX_THEME.fonts.body,
    fontSize: 12,
    bold: true,
    color: PPTX_THEME.colors.navy
  });

  slide.addText(safeText(headerRight), {
    x: x + colW + colGap + 0.2,
    y: y + 0.08,
    w: colW - 0.2,
    h: headerH,
    fontFace: PPTX_THEME.fonts.body,
    fontSize: 12,
    bold: true,
    color: PPTX_THEME.colors.navy
  });

  const rowH = Math.min(0.42, bodyH / Math.max(rows.length, 1));
  rows.forEach((r, idx) => {
    const ry = bodyY + idx * rowH;

    slide.addShape(pptx.ShapeType.roundRect, {
      x,
      y: ry,
      w: colW,
      h: rowH - 0.06,
      fill: { color: r.leftFill ?? "FDE8E8" },
      line: { color: PPTX_THEME.colors.line, width: 1 },
      radius: 10
    });

    slide.addShape(pptx.ShapeType.roundRect, {
      x: x + colW + colGap,
      y: ry,
      w: colW,
      h: rowH - 0.06,
      fill: { color: r.rightFill ?? "E9FBF1" },
      line: { color: PPTX_THEME.colors.line, width: 1 },
      radius: 10
    });

    slide.addText(safeText(r.left), {
      x: x + 0.18,
      y: ry + 0.06,
      w: colW - 0.3,
      h: rowH - 0.12,
      fontFace: PPTX_THEME.fonts.body,
      fontSize: 11,
      bold: true,
      color: PPTX_THEME.colors.text,
      valign: "top"
    });

    slide.addText(safeText(r.right), {
      x: x + colW + colGap + 0.18,
      y: ry + 0.06,
      w: colW - 0.3,
      h: rowH - 0.12,
      fontFace: PPTX_THEME.fonts.body,
      fontSize: 11,
      bold: true,
      color: PPTX_THEME.colors.text,
      valign: "top"
    });
  });
}
