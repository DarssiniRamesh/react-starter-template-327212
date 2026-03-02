import React from "react";
import SlideFrame from "../components/SlideFrame";
import "../deck.css";

function Badge({ text }) {
  return (
    <div
      style={{
        borderRadius: 999,
        padding: "10px 12px",
        border: "1px solid rgba(45,55,72,0.14)",
        background: "white",
        fontWeight: 900,
        color: "var(--deck-navy)",
        fontSize: 13
      }}
    >
      {text}
    </div>
  );
}

// PUBLIC_INTERFACE
export default function Slide20VlinderCommitment({ slideNumber, slideMeta }) {
  /** Slide 20: Vlinder commitment. */
  return (
    <SlideFrame slideNumber={slideNumber} slideTitle={slideMeta.title} sectionLabel="Partnership">
      <div className="twoCol" style={{ textAlign: "left" }}>
        <div>
          <h2 className="slideTitle" style={{ fontSize: 34 }}>
            Why Vlinder / Klefki — Our Commitment to SVG
          </h2>
          <p className="slideSubTitle">Partnership, not just a product</p>

          <div style={{ marginTop: 14 }} className="sectionBlock">
            <p className="sectionBlockTitle">Who We Are</p>
            <ul className="bullets">
              <li>Vlinder Inc. — digital credentials specialists</li>
              <li>Proven island deployments (Vanuatu, Jamaica)</li>
              <li>Open-source champions (no proprietary lock-in)</li>
              <li>Global reach, local focus for small island realities</li>
            </ul>
          </div>
        </div>

        <div style={{ display: "grid", gap: 12, alignContent: "start" }}>
          <div className="sectionBlock solutionMode">
            <p className="sectionBlockTitle">What Sets Us Apart</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 10 }}>
              <Badge text="Island Contexts" />
              <Badge text="Fast Time-to-Value" />
              <Badge text="Open Standards" />
              <Badge text="Ecosystem Focus" />
              <Badge text="Capacity Building" />
              <Badge text="Aligned Incentives" />
            </div>
          </div>

          <div className="sectionBlock">
            <p className="sectionBlockTitle">Mindset</p>
            <p style={{ margin: 0, lineHeight: 1.45 }}>
              We measure success by adoption and impact—not just deployment. The goal is a sustainable SVG-led ecosystem.
            </p>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}
