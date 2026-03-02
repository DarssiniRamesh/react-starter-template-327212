import React from "react";
import SlideFrame from "../components/SlideFrame";
import { getSvgDataPointValue } from "../data/svgDataPoints";
import "../deck.css";

function Quadrant({ n, title, body, tone }) {
  return (
    <div className={`iconCard ${tone || ""}`}>
      <div className="iconCardHeader">
        <h3 className="iconCardTitle">{title}</h3>
        <div className="iconPill">{n}</div>
      </div>
      <p className="iconCardBody">{body}</p>
    </div>
  );
}

// PUBLIC_INTERFACE
export default function Slide03Context({ slideNumber, slideMeta }) {
  /** Slide 3: The SVG Context - Why Digital Identity Matters. */
  const tourismGrowth = getSvgDataPointValue("Tourism Growth") ?? "83% growth (2022-2023)";
  const mobile = getSvgDataPointValue("Mobile Penetration") ?? "131.6%";
  const payments = getSvgDataPointValue("Digital Payment Adoption") ?? "68%";

  return (
    <SlideFrame slideNumber={slideNumber} slideTitle={slideMeta.title} sectionLabel="Opening">
      <div className="slideStack" style={{ height: "100%", textAlign: "left" }}>
        <h2 className="slideTitle" style={{ fontSize: 34 }}>
          The SVG Context — Why Digital Identity Matters
        </h2>

        <div className="iconCardGrid4">
          <Quadrant
            n="1"
            title="Tourism Powerhouse"
            body={`• ${tourismGrowth}\n• Cruise arrivals up 120%\n• Leading OECS yachting destination`}
          />
          <Quadrant n="2" title="Digital Readiness" body={`• Mobile penetration: ${mobile}\n• Digital payments: ${payments}\n• Strong eGovernment commitment`} />
          <Quadrant
            n="3"
            title="Regional Integration Needs"
            body="• OECS member state\n• CARICOM mobility requirements\n• Seasonal worker programs (Australia, Canada)"
          />
          <Quadrant
            n="4"
            title="The Gap"
            body="Citizens need ONE digital identity that works for government services, banking, healthcare, education, tourism, and regional mobility."
            tone="problemMode"
          />
        </div>
      </div>
    </SlideFrame>
  );
}
