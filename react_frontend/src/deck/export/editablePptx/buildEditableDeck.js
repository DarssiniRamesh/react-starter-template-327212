import PptxGenJS from "pptxgenjs";
import { PPTX_THEME } from "./theme";
import { getEditableSlideBuilders, assertAllSlidesCovered, getAllSlideIds, getTitleById, addChromeForSlide } from "./slideBuilders";

/**
 * EditablePptxDeckFlow
 *
 * This module is the single canonical entrypoint for building an editable PPTX
 * from the React deck content model (but without using DOM screenshots).
 */

// PUBLIC_INTERFACE
export function createBaseEditablePptx() {
  /**
   * Create a PptxGenJS deck configured for 16:9 and with metadata for provenance/debugging.
   *
   * Outputs:
   * - A configured PptxGenJS instance.
   */
  const pptx = new PptxGenJS();
  pptx.layout = "LAYOUT_WIDE";
  pptx.author = "Vlinder Inc.";
  pptx.company = "Vlinder Inc.";
  pptx.subject = "Digital Identity Ecosystem for St. Vincent & the Grenadines";
  pptx.title = "SVG Klefki Deck (Editable Export)";
  pptx.compress = true;

  // Theme: PowerPoint will map missing fonts; these names are safe defaults on modern Office.
  pptx.theme = {
    headFontFace: PPTX_THEME.fonts.heading,
    bodyFontFace: PPTX_THEME.fonts.body,
    lang: "en-US"
  };

  return pptx;
}

// PUBLIC_INTERFACE
export async function buildEditableDeckPptx({ expectedSlideCount = 24 } = {}) {
  /**
   * BuildEditableDeckPptxFlow
   *
   * Contract:
   * - Inputs:
   *   - expectedSlideCount: number (default 24)
   * - Output:
   *   - { pptx, slideCount }
   * - Errors:
   *   - Throws if slide builders are missing or the build fails.
   */
  if (!Number.isFinite(expectedSlideCount) || expectedSlideCount <= 0) {
    throw new Error("buildEditableDeckPptx: expectedSlideCount must be a positive number");
  }

  const builders = getEditableSlideBuilders();
  assertAllSlidesCovered(builders);

  const ids = getAllSlideIds().slice(0, expectedSlideCount);
  const pptx = createBaseEditablePptx();

  // eslint-disable-next-line no-console
  console.info("[EditablePptxDeckFlow] build start", { expectedSlideCount });

  for (let i = 0; i < ids.length; i++) {
    const id = ids[i];
    const slideNumber = i + 1;

    // eslint-disable-next-line no-console
    console.info("[EditablePptxDeckFlow] slide build", { slideNumber, id, title: getTitleById(id) });

    const slide = pptx.addSlide();
    slide.background = { color: "FFFFFF" };

    addChromeForSlide({ pptx, slide, id, slideNumber });

    const build = builders[id];
    try {
      // Builders add body shapes/text/charts.
      // eslint-disable-next-line no-await-in-loop
      await build({ pptx, slide, id, slideNumber });
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err ?? "Unknown error");
      throw new Error(`[EditablePptxDeckFlow] Failed building slide ${slideNumber} (id=${id}). Underlying error: ${msg}`);
    }
  }

  // eslint-disable-next-line no-console
  console.info("[EditablePptxDeckFlow] build success", { slideCount: ids.length });

  return { pptx, slideCount: ids.length };
}
