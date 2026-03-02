import React from "react";
import SlideFrame from "../components/SlideFrame";
import "../deck.css";

// PUBLIC_INTERFACE
export default function Slide14CaseStudyIndia({ slideNumber, slideMeta }) {
  /** Slide 14: Case study - India certificates (scale proof). */
  return (
    <SlideFrame slideNumber={slideNumber} slideTitle={slideMeta.title} sectionLabel="Proof">
      <div style={{ height: "100%", textAlign: "left" }}>
        <h2 className="slideTitle" style={{ fontSize: 34 }}>
          Case Study — India Education Certificates (Scale Example)
        </h2>
        <p className="slideSubTitle">From pilot to national scale</p>

        <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <div className="sectionBlock problemMode">
            <p className="sectionBlockTitle">Before</p>
            <ul className="bullets">
              <li>Verification took 3–5 days</li>
              <li>Hard to verify globally</li>
            </ul>
          </div>
          <div className="sectionBlock solutionMode">
            <p className="sectionBlockTitle">After</p>
            <ul className="bullets">
              <li>Digital issuance with blockchain anchoring</li>
              <li>QR code scanning for instant verification</li>
              <li>Integration with national repositories (e.g., DigiLocker)</li>
            </ul>
          </div>

          <div className="sectionBlock" style={{ gridColumn: "1 / -1" }}>
            <p className="sectionBlockTitle">Why this matters for SVG</p>
            <ul className="bullets">
              <li>Shows Klefki scales from small island states to massive populations</li>
              <li>SVG’s ~100,000 population is ideal for rapid, complete coverage</li>
            </ul>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}
