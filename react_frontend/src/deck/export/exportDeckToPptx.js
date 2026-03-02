import { saveAs } from "file-saver";
import { buildEditableDeckPptx } from "./editablePptx/buildEditableDeck";

const DEFAULT_EXPECTED_SLIDE_COUNT = 24;

function ensurePptxFileName(fileName) {
  if (typeof fileName !== "string" || fileName.trim().length === 0) {
    throw new Error("exportSvgKlefkiDeckToPptx: fileName must be a non-empty string");
  }
  return fileName.toLowerCase().endsWith(".pptx") ? fileName : `${fileName}.pptx`;
}

function base64ToArrayBuffer(base64) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes.buffer;
}

async function normalizePptxWriteOutputToArrayBuffer(data) {
  // PptxGenJS supports multiple output types; we normalize to ArrayBuffer for Blob creation.
  if (data instanceof ArrayBuffer) return data;

  // ArrayBuffer views (e.g., Uint8Array)
  if (ArrayBuffer.isView(data) && data.buffer instanceof ArrayBuffer) {
    return data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength);
  }

  // Blob (browser default)
  if (typeof Blob !== "undefined" && data instanceof Blob) {
    return data.arrayBuffer();
  }

  // base64 string (no "data:" prefix for PptxGenJS base64 output)
  if (typeof data === "string") {
    return base64ToArrayBuffer(data);
  }

  throw new Error(
    `ExportEditablePptxDeckFlow: Unsupported PPTX output type from PptxGenJS write(): ${Object.prototype.toString.call(data)}`
  );
}

// PUBLIC_INTERFACE
export async function exportSvgKlefkiDeckToPptx({
  fileName,
  expectedSlideCount = DEFAULT_EXPECTED_SLIDE_COUNT
}) {
  /**
   * ExportEditablePptxDeckFlow
   *
   * Purpose:
   * - Export the slide deck as a fully editable PowerPoint (text + shapes + charts).
   * - No DOM capture, no screenshots, no slide images.
   *
   * Contract:
   * Inputs:
   * - fileName: string ('.pptx' appended if missing)
   * - expectedSlideCount: number (default 24)
   *
   * Output:
   * - Triggers a browser download of a PPTX file.
   *
   * Side effects:
   * - Generates an in-memory PPTX and downloads it
   *
   * Errors / failure modes:
   * 1) Missing slide builders -> throws
   * 2) PptxGenJS serialization error -> throws
   * 3) Browser download blocked -> saveAs may fail (throws)
   */
  const safeName = ensurePptxFileName(fileName);

  if (!Number.isFinite(expectedSlideCount) || expectedSlideCount <= 0) {
    throw new Error("exportSvgKlefkiDeckToPptx: expectedSlideCount must be a positive number");
  }

  // eslint-disable-next-line no-console
  console.info("[ExportEditablePptxDeckFlow] start", {
    fileName: safeName,
    expectedSlideCount
  });

  const { pptx, slideCount } = await buildEditableDeckPptx({ expectedSlideCount });

  // eslint-disable-next-line no-console
  console.info("[ExportEditablePptxDeckFlow] serialize start", { slideCount });

  let outRaw;
  try {
    outRaw = await pptx.write({ outputType: "arraybuffer", compression: true });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn("[ExportEditablePptxDeckFlow] pptx.write({outputType}) failed; attempting legacy signature", e);
    outRaw = await pptx.write("arraybuffer");
  }

  const out = await normalizePptxWriteOutputToArrayBuffer(outRaw);

  // eslint-disable-next-line no-console
  console.info("[ExportEditablePptxDeckFlow] serialize success", { bytes: out?.byteLength });

  saveAs(
    new Blob([out], {
      type: "application/vnd.openxmlformats-officedocument.presentationml.presentation"
    }),
    safeName
  );
}
