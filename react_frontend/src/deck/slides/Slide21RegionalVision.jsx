import React from "react";
import SlideFrame from "../components/SlideFrame";
import "../deck.css";

function Pill({ title, body }) {
  return (
    <div className="iconCard">
      <div className="iconCardHeader">
        <h3 className="iconCardTitle">{title}</h3>
        <div className="iconPill" style={{ background: "var(--deck-success)" }}>
          ↗
        </div>
      </div>
      <p className="iconCardBody">{body}</p>
    </div>
  );
}

// PUBLIC_INTERFACE
export default function Slide21RegionalVision({ slideNumber, slideMeta }) {
  /** Slide 21: Regional vision. */
  return (
    <SlideFrame slideNumber={slideNumber} slideTitle={slideMeta.title} sectionLabel="Vision">
      <div style={{ height: "100%", textAlign: "left" }}>
        <h2 className="slideTitle" style={{ fontSize: 34 }}>
          Regional Vision — SVG as Caribbean Digital Identity Leader
        </h2>
        <p className="slideSubTitle">Beyond national benefits</p>

        <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 14 }}>
          <Pill title="1. OECS Digital Identity Hub" body="Reference implementation, shared services, and regional credential interoperability." />
          <Pill title="2. CARICOM Mobility Leader" body="Seamless work permits and professional credential portability across the region." />
          <Pill title="3. Small Island State Innovator" body="Knowledge sharing with Pacific + Caribbean small states; a model for development partners." />
          <Pill title="4. Tourism Credential Standard-Setter" body="Digital tourism and health credentials to streamline travel and improve visitor experience." />
          <Pill title="5. Financial Inclusion Pioneer" body="Model for digital KYC and readiness for regional digital payment ecosystems." />
          <div className="sectionBlock solutionMode">
            <p className="sectionBlockTitle">The Narrative</p>
            <p style={{ margin: 0, fontWeight: 900, fontSize: 18, color: "var(--deck-navy)", lineHeight: 1.2 }}>
              “St. Vincent and the Grenadines — 100,000 citizens leading digital transformation for 44 million Caribbean residents.”
            </p>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}
