import PptxGenJS from "pptxgenjs";
import { saveAs } from "file-saver";
import { toPng } from "html-to-image";

const WIDE_LAYOUT = "LAYOUT_WIDE"; // 13.333 x 7.5 in (16:9)
const PPTX_W_IN = 13.333;
const PPTX_H_IN = 7.5;

const DEFAULT_EXPORT_SELECTOR = '[data-pptx-slide="true"]';
const DEFAULT_EXPECTED_SLIDE_COUNT = 24;

// Higher pixelRatio -> sharper charts/text, but larger PPTX.
// 2x is a good practical balance for 1366x768 slides.
const DEFAULT_PIXEL_RATIO = 2;

/**
 * Export implementation approach (high-fidelity):
 * - We render an off-screen export DOM (mounted by DeckApp only while exporting)
 * - We capture each slide node to a high-resolution PNG (html-to-image)
 * - We embed each PNG as a full-bleed image in a 16:9 PPTX slide
 *
 * This matches on-screen layout/typography/charts as closely as possible.
 */

function ensurePptxFileName(fileName) {
  if (typeof fileName !== "string" || fileName.trim().length === 0) {
    throw new Error("exportSvgKlefkiDeckToPptx: fileName must be a non-empty string");
  }
  return fileName.toLowerCase().endsWith(".pptx") ? fileName : `${fileName}.pptx`;
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function waitForDomSlides({ selector, expectedCount, timeoutMs }) {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    const nodes = Array.from(document.querySelectorAll(selector));
    if (nodes.length >= expectedCount) return nodes;
    // eslint-disable-next-line no-await-in-loop
    await sleep(50);
  }
  const found = document.querySelectorAll(selector).length;
  throw new Error(
    `ExportSvgKlefkiDeckFlow: Timed out waiting for export DOM slides. Expected >= ${expectedCount}, found ${found}.`
  );
}

async function waitForFontsReady({ timeoutMs }) {
  // document.fonts is supported in modern browsers; best-effort fallback.
  if (!document.fonts || typeof document.fonts.ready?.then !== "function") return;

  let timeoutId;
  await Promise.race([
    document.fonts.ready,
    new Promise((resolve) => {
      timeoutId = setTimeout(resolve, timeoutMs);
    })
  ]);

  if (timeoutId) clearTimeout(timeoutId);
}

async function waitForImagesLoaded(rootEl, timeoutMs) {
  const imgs = Array.from(rootEl.querySelectorAll("img"));
  if (imgs.length === 0) return;

  const started = Date.now();
  await Promise.race([
    Promise.all(
      imgs.map((img) => {
        if (img.complete && img.naturalWidth > 0) return Promise.resolve();
        return new Promise((resolve) => {
          const cleanup = () => {
            img.removeEventListener("load", onLoad);
            img.removeEventListener("error", onLoad);
          };
          const onLoad = () => {
            cleanup();
            resolve();
          };
          img.addEventListener("load", onLoad);
          img.addEventListener("error", onLoad);
        });
      })
    ),
    new Promise((resolve) => {
      const remaining = Math.max(0, timeoutMs - (Date.now() - started));
      setTimeout(resolve, remaining);
    })
  ]);
}

function sortSlideNodesByNumber(nodes) {
  return [...nodes].sort((a, b) => {
    const an = Number(a.getAttribute("data-slide-number"));
    const bn = Number(b.getAttribute("data-slide-number"));
    return (Number.isFinite(an) ? an : 0) - (Number.isFinite(bn) ? bn : 0);
  });
}

async function captureSlideNodeToPngDataUrl({ node, pixelRatio }) {
  // Ensure everything is loaded for this node (best-effort).
  await waitForImagesLoaded(node, 2500);

  // html-to-image returns a data URL (e.g. data:image/png;base64,...)
  // backgroundColor ensures no transparency artifacts.
  return toPng(node, {
    cacheBust: true,
    pixelRatio,
    backgroundColor: "#ffffff"
  });
}

function createBasePptx() {
  const pptx = new PptxGenJS();
  pptx.layout = WIDE_LAYOUT;

  // Helps keep file size reasonable (especially with many images).
  pptx.compress = true;

  // Basic metadata (helps future debugging of file provenance)
  pptx.author = "Vlinder Inc.";
  pptx.company = "Vlinder Inc.";
  pptx.subject = "Digital Identity Ecosystem for St. Vincent & the Grenadines";
  pptx.title = "SVG Klefki Deck (March 2026)";

  return pptx;
}

async function buildPptxFromDomSlides({
  selector,
  expectedSlideCount,
  pixelRatio,
  captureTimeoutMs
}) {
  const pptx = createBasePptx();

  // Fonts: wait once at the beginning (best-effort) so text metrics match on-screen.
  await waitForFontsReady({ timeoutMs: 6000 });

  const nodes = await waitForDomSlides({
    selector,
    expectedCount: expectedSlideCount,
    timeoutMs: captureTimeoutMs
  });

  const ordered = sortSlideNodesByNumber(nodes).slice(0, expectedSlideCount);

  // eslint-disable-next-line no-console
  console.info("[ExportSvgKlefkiDeckFlow] DOM slides found", {
    selector,
    expectedSlideCount,
    found: nodes.length
  });

  for (let i = 0; i < ordered.length; i++) {
    const slideNo = i + 1;
    const node = ordered[i];

    // eslint-disable-next-line no-console
    console.info("[ExportSvgKlefkiDeckFlow] capture", { slideNo, pixelRatio });

    let dataUrl;
    try {
      // eslint-disable-next-line no-await-in-loop
      dataUrl = await captureSlideNodeToPngDataUrl({ node, pixelRatio });
    } catch (err) {
      // Add actionable context while preserving original error visibility.
      const msg =
        err instanceof Error ? err.message : String(err ?? "Unknown error");
      throw new Error(
        `ExportSvgKlefkiDeckFlow: Failed to capture slide ${slideNo} to image. Underlying error: ${msg}`
      );
    }

    const slide = pptx.addSlide();
    slide.addImage({
      data: dataUrl,
      x: 0,
      y: 0,
      w: PPTX_W_IN,
      h: PPTX_H_IN
    });
  }

  return pptx;
}

// PUBLIC_INTERFACE
export async function exportSvgKlefkiDeckToPptx({
  fileName,
  expectedSlideCount = DEFAULT_EXPECTED_SLIDE_COUNT,
  selector = DEFAULT_EXPORT_SELECTOR,
  pixelRatio = DEFAULT_PIXEL_RATIO
}) {
  /**
   * ExportSvgKlefkiDeckFlow
   *
   * Purpose:
   * - Export the on-screen React slide deck to a PPTX that matches layout/styles/charts as closely as possible.
   *
   * Contract:
   * Inputs:
   * - fileName: string ('.pptx' will be appended if missing)
   * - expectedSlideCount: number (how many slide DOM nodes we expect to capture)
   * - selector: string (CSS selector for slide root nodes in export stage)
   * - pixelRatio: number (render scale for image capture; higher = sharper/larger)
   *
   * Outputs:
   * - Triggers a browser download of a PPTX file.
   *
   * Invariants:
   * - Each slide is captured from DOM and embedded as a full-bleed PNG.
   *
   * Side effects:
   * - Reads DOM for nodes matching `selector`
   * - Creates an in-memory PPTX and downloads it
   *
   * Errors / failure modes:
   * 1) Export-stage DOM not mounted or missing slides -> throws (timeout waiting for nodes)
   * 2) DOM-to-image capture fails (e.g., unsupported CSS/SVG edge cases) -> throws with slide index context
   * 3) PptxGenJS serialization error -> throws
   * 4) Browser download blocked -> saveAs may fail (throws)
   */
  const safeName = ensurePptxFileName(fileName);

  if (!Number.isFinite(expectedSlideCount) || expectedSlideCount <= 0) {
    throw new Error("exportSvgKlefkiDeckToPptx: expectedSlideCount must be a positive number");
  }

  if (!Number.isFinite(pixelRatio) || pixelRatio <= 0) {
    throw new Error("exportSvgKlefkiDeckToPptx: pixelRatio must be a positive number");
  }

  // eslint-disable-next-line no-console
  console.info("[ExportSvgKlefkiDeckFlow] build start", {
    fileName: safeName,
    expectedSlideCount,
    selector,
    pixelRatio
  });

  const pptx = await buildPptxFromDomSlides({
    selector,
    expectedSlideCount,
    pixelRatio,
    captureTimeoutMs: 15000
  });

  // eslint-disable-next-line no-console
  console.info("[ExportSvgKlefkiDeckFlow] serialize start");

  const out = await pptx.write("arraybuffer");

  // eslint-disable-next-line no-console
  console.info("[ExportSvgKlefkiDeckFlow] serialize success", {
    bytes: out?.byteLength
  });

  saveAs(
    new Blob([out], {
      type: "application/vnd.openxmlformats-officedocument.presentationml.presentation"
    }),
    safeName
  );
}
