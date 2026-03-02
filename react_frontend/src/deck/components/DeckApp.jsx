import React, { useCallback, useEffect, useMemo, useState } from "react";
import "../deck.css";
import { getSlides } from "../data/slides";
import { exportSvgKlefkiDeckToPptx } from "../export/exportDeckToPptx";

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function useSlideScale(designWidth, designHeight) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const compute = () => {
      // Scale based on available viewport width; keep some margins.
      const maxW = Math.min(1200, window.innerWidth - 36);
      const scaleByWidth = maxW / designWidth;
      // Reduce reserved chrome so the deck uses more of the available viewport height.
      const scaleByHeight = (window.innerHeight - 170) / designHeight;
      setScale(Math.max(0.3, Math.min(scaleByWidth, scaleByHeight, 1)));
    };

    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, [designWidth, designHeight]);

  return scale;
}

// PUBLIC_INTERFACE
export default function DeckApp() {
  /**
   * The primary deck web app.
   *
   * Contract:
   * - Renders slide 1–24 as defined by getSlides().
   * - Supports keyboard navigation:
   *   - ArrowRight/PageDown/Space: next
   *   - ArrowLeft/PageUp: prev
   *   - Home/End: first/last
   *   - O: toggle overview
   * - Supports PPTX export via "Download PPTX".
   *
   * Errors:
   * - PPTX export failures are surfaced via alert + console error (boundary behavior).
   */
  const slides = useMemo(() => getSlides(), []);
  const [index, setIndex] = useState(0);
  const [overviewOpen, setOverviewOpen] = useState(false);
  const scale = useSlideScale(1366, 768);

  const goTo = useCallback(
    (nextIndex) => setIndex((prev) => clamp(typeof nextIndex === "number" ? nextIndex : prev, 0, slides.length - 1)),
    [slides.length]
  );

  const next = useCallback(() => setIndex((prev) => clamp(prev + 1, 0, slides.length - 1)), [slides.length]);
  const prev = useCallback(() => setIndex((prev) => clamp(prev - 1, 0, slides.length - 1)), [slides.length]);

  const onKeyDown = useCallback(
    (e) => {
      if (e.key === "o" || e.key === "O") {
        setOverviewOpen((v) => !v);
        return;
      }
      if (overviewOpen) return;

      if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") next();
      if (e.key === "ArrowLeft" || e.key === "PageUp") prev();
      if (e.key === "Home") goTo(0);
      if (e.key === "End") goTo(slides.length - 1);
    },
    [goTo, next, overviewOpen, prev, slides.length]
  );

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  const active = slides[index];

  const onDownloadPptx = useCallback(async () => {
    try {
      // Lightweight observability (searchable in console).
      // eslint-disable-next-line no-console
      console.info("[ExportSvgKlefkiDeckFlow] start", { slideCount: slides.length });
      await exportSvgKlefkiDeckToPptx({ fileName: "SVG-Klefki-Deck-March-2026.pptx" });
      // eslint-disable-next-line no-console
      console.info("[ExportSvgKlefkiDeckFlow] success");
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("[ExportSvgKlefkiDeckFlow] failure", err);
      alert("PPTX export failed. Please check the browser console for details.");
    }
  }, [slides.length]);

  return (
    <div className="deckRoot" role="application" aria-label="SVG Klefki slide deck">
      <div className="deckTopbar">
        <div className="deckTopbarInner">
          <div className="deckBrand">
            <div className="deckBrandTitle">SVG Klefki Deck</div>
            <div className="deckBrandSub">Slides 1–24 • Use O for overview • ←/→ to navigate</div>
          </div>

          <div className="deckControls">
            <button className="deckBtn" onClick={prev} aria-label="Previous slide">
              Prev
            </button>
            <button className="deckBtn" onClick={next} aria-label="Next slide">
              Next
            </button>
            <button
              className="deckBtn"
              onClick={() => setOverviewOpen((v) => !v)}
              aria-pressed={overviewOpen}
              aria-label="Toggle overview"
            >
              Overview
            </button>
            <button className="deckBtn deckBtnPrimary" onClick={onDownloadPptx} aria-label="Download PPTX">
              Download PPTX
            </button>
          </div>
        </div>
      </div>

      <main className="deckMain">
        {overviewOpen ? (
          <div className="overviewGrid" aria-label="Slide overview grid">
            {slides.map((s, i) => (
              <div
                key={s.id}
                className="overviewThumb"
                role="button"
                tabIndex={0}
                onClick={() => {
                  setOverviewOpen(false);
                  goTo(i);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setOverviewOpen(false);
                    goTo(i);
                  }
                }}
                aria-label={`Go to slide ${i + 1}: ${s.title}`}
              >
                <div className="overviewThumbTitle">
                  {i + 1}. {s.title}
                </div>
                <div className="overviewThumbMeta">{s.section}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="deckStage">
            <div className="slideViewport">
              <div className="slideScaleWrap">
                <div style={{ transform: `scale(${scale})` }}>
                  <active.Component slideNumber={index + 1} slideMeta={active} />
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
