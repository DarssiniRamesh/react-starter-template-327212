import React from "react";
import SlideFrame from "../components/SlideFrame";
import "../deck.css";

function Quad({ title, body }) {
  return (
    <div className="iconCard">
      <div className="iconCardHeader">
        <h3 className="iconCardTitle">{title}</h3>
        <div className="iconPill" style={{ background: "var(--deck-turquoise)" }}>
          ◎
        </div>
      </div>
      <p className="iconCardBody">{body}</p>
    </div>
  );
}

// PUBLIC_INTERFACE
export default function Slide17Governance({ slideNumber, slideMeta }) {
  /** Slide 17: Governance & Capacity Building. */
  return (
    <SlideFrame slideNumber={slideNumber} slideTitle={slideMeta.title} sectionLabel="Implementation">
      <div style={{ height: "100%", textAlign: "left" }}>
        <h2 className="slideTitle" style={{ fontSize: 34 }}>
          Governance & Capacity Building
        </h2>
        <p className="slideSubTitle">Ensuring long-term sustainability</p>

        <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 14 }}>
          <Quad
            title="Technical Capacity Building"
            body="Train IT staff, run credential design workshops for ministries, API integration training for private sector, and security best practices."
          />
          <Quad
            title="Policy & Legal Framework"
            body="Support e-transactions legislation, data protection regulations, credential standards, and cross-border recognition agreements."
          />
          <Quad
            title="Change Management"
            body="Citizen awareness campaigns, ministry champions program, private sector engagement, and feedback loops for iterative improvement."
          />
          <Quad
            title="Governance Structure"
            body="Steering committee, technical working groups per use case, PPP framework, and regional OECS coordination."
          />
        </div>

        <div style={{ marginTop: 14 }} className="sectionBlock solutionMode">
          <p className="sectionBlockTitle">Open-Source Contribution</p>
          <p style={{ margin: 0, lineHeight: 1.45 }}>
            SVG becomes a Caribbean reference implementation—sharing knowledge via MOSIP community and strengthening regional digital public infrastructure.
          </p>
        </div>
      </div>
    </SlideFrame>
  );
}
