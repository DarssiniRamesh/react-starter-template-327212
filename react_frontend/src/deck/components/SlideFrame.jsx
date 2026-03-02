import React from "react";
import "../deck.css";

// PUBLIC_INTERFACE
export default function SlideFrame({ slideNumber, slideTitle, sectionLabel, children }) {
  /**
   * Slide layout shell for consistent header/footer/spacing.
   *
   * Contract:
   * Inputs:
   * - slideNumber: number (1-based)
   * - slideTitle: string (for header context)
   * - sectionLabel: string (optional)
   * - children: slide content
   *
   * Output:
   * - A fixed 16:9 slide canvas that can be scaled responsively by the parent.
   */
  return (
    <div className="slideCanvas" role="group" aria-label={`Slide ${slideNumber}: ${slideTitle}`}>
      <div className="slideHeader">
        <div className="slideHeaderLeft">{sectionLabel ? <p className="slideKicker">{sectionLabel}</p> : null}</div>
        <div className="slideHeaderRight">
          <span>Klefki by Vlinder Inc.</span>
        </div>
      </div>

      <div className="slideBody">{children}</div>

      <div className="slideFooter">
        <div className="slideFooterLeft">St. Vincent and the Grenadines • March 2026</div>
        <div className="slideFooterRight">{slideNumber}/24</div>
      </div>
    </div>
  );
}
