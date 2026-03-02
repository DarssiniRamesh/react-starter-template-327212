import React from "react";
import SlideFrame from "../components/SlideFrame";
import "../deck.css";

function Reason({ n, title, body }) {
  return (
    <div className="iconCard solutionMode">
      <div className="iconCardHeader">
        <h3 className="iconCardTitle">
          {n}. {title}
        </h3>
        <div className="iconPill" style={{ background: "var(--deck-klefki-blue)" }}>
          {n}
        </div>
      </div>
      <p className="iconCardBody">{body}</p>
    </div>
  );
}

// PUBLIC_INTERFACE
export default function Slide09WhyKlefki({ slideNumber, slideMeta }) {
  /** Slide 9: Why SVG Should Choose Klefki. */
  return (
    <SlideFrame slideNumber={slideNumber} slideTitle={slideMeta.title} sectionLabel="Differentiation">
      <div style={{ height: "100%", textAlign: "left" }}>
        <h2 className="slideTitle" style={{ fontSize: 34 }}>
          Why SVG Should Choose Klefki
        </h2>
        <p className="slideSubTitle">Five compelling reasons</p>

        <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 14 }}>
          <Reason
            n="1"
            title="Caribbean Experience"
            body="Proven deployments in island contexts: Vanuatu (electronic police clearance), Jamaica (work permits) and active MOSIP contributions."
          />
          <Reason n="2" title="Rapid Deployment" body="Pre-built templates and Azure Marketplace availability enable weeks—not years—time-to-value." />
          <Reason n="3" title="Lower Total Cost of Ownership" body="Open standards, cloud-native delivery, reusable verification, and no vendor lock-in reduce long-term costs." />
          <Reason n="4" title="MOSIP Ecosystem Alignment" body="Works seamlessly with MOSIP and Inji; interoperable with W3C-compliant wallets; aligns with open wallet principles." />
          <Reason
            n="5"
            title="Proven ROI"
            body="Real outcomes: 5–7 days → 2 hours (police clearance), 30 days → 7 days (work permits), 3–5 days → instant (cert verification)."
          />
        </div>
      </div>
    </SlideFrame>
  );
}
