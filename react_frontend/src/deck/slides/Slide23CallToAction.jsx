import React from "react";
import SlideFrame from "../components/SlideFrame";
import "../deck.css";

// PUBLIC_INTERFACE
export default function Slide23CallToAction({ slideNumber, slideMeta }) {
  /** Slide 23: Call to action. Contact fields remain placeholders as per PDF. */
  return (
    <SlideFrame slideNumber={slideNumber} slideTitle={slideMeta.title} sectionLabel="Action">
      <div style={{ height: "100%", textAlign: "left" }}>
        <h2 className="slideTitle" style={{ fontSize: 34 }}>
          Let’s Build SVG’s Digital Future Together
        </h2>

        <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
          <div className="sectionBlock">
            <p className="sectionBlockTitle">The Opportunity</p>
            <p style={{ margin: 0, lineHeight: 1.45 }}>
              SVG has momentum: $111M investment, MOSIP foundation underway, 49 active projects, World Bank partnership, OECS support.
            </p>
          </div>
          <div className="sectionBlock problemMode">
            <p className="sectionBlockTitle">The Missing Piece</p>
            <p style={{ margin: 0, lineHeight: 1.45 }}>
              Activate the ecosystem so citizens experience tangible benefits and digital identity infrastructure delivers ROI.
            </p>
          </div>
          <div className="sectionBlock solutionMode">
            <p className="sectionBlockTitle">The Ask</p>
            <p style={{ margin: 0, lineHeight: 1.45 }}>
              Schedule a discovery workshop in Kingstown to align technical integration, co-design the roadmap, and launch a pilot within 90 days.
            </p>
          </div>
        </div>

        <div style={{ marginTop: 14 }} className="sectionBlock" >
          <p className="sectionBlockTitle" style={{ color: "#92400E" }}>Urgency</p>
          <p style={{ margin: 0, fontWeight: 900, fontSize: 18 }}>
            CARDTP ends June 2026. This is the window to embed credential infrastructure and launch pilots before project close-out.
          </p>
        </div>

        <div style={{ marginTop: 14 }} className="sectionBlock">
          <p className="sectionBlockTitle">Contact</p>
          <p style={{ margin: 0, color: "var(--deck-text-muted)", fontWeight: 800 }}>
            Vlinder Inc. • Email: [contact information] • Website: vlinder.io • Klefki: vlinder.io/product/klefki
          </p>
        </div>
      </div>
    </SlideFrame>
  );
}
