import React from "react";
import SlideFrame from "../components/SlideFrame";
import "../deck.css";

function ActionCol({ title, items }) {
  return (
    <div className="sectionBlock">
      <p className="sectionBlockTitle" style={{ color: "var(--deck-klefki-blue)" }}>
        {title}
      </p>
      <ul className="bullets">
        {items.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
    </div>
  );
}

// PUBLIC_INTERFACE
export default function Slide22NextSteps({ slideNumber, slideMeta }) {
  /** Slide 22: Next steps. */
  return (
    <SlideFrame slideNumber={slideNumber} slideTitle={slideMeta.title} sectionLabel="Action">
      <div style={{ height: "100%", textAlign: "left" }}>
        <h2 className="slideTitle" style={{ fontSize: 34 }}>
          Next Steps — How to Get Started
        </h2>
        <p className="slideSubTitle">Recommended action plan</p>

        <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 14 }}>
          <ActionCol
            title="Immediate (Next 30 Days)"
            items={[
              "Form Digital Identity Steering Committee (ministries + private sector + OECS liaison)",
              "Conduct discovery workshop in Kingstown",
              "Secure funding commitment (CARDTP + partners + PPP)",
              "Legal & policy assessment for e-transactions and data protection"
            ]}
          />
          <ActionCol
            title="Short-Term (90 Days)"
            items={[
              "Pilot: Digital Birth Certificate + Electronic Police Clearance",
              "Target: 100 credentials issued; 5 verifiers onboarded",
              "Recruit early adopters (2–3 banks, employers, tourism operator)",
              "Launch public awareness campaign (carrier partnerships)"
            ]}
          />
          <ActionCol
            title="Medium-Term (6–12 Months)"
            items={[
              "Scale to 10+ government services and 5+ private verifiers",
              "Reach 30% wallet adoption and outer islands deployment",
              "Regional integration pilots (OECS interoperability, CARICOM mobility)",
              "Sustainability planning: revenue + capacity transfer + governance institutionalization"
            ]}
          />
        </div>
      </div>
    </SlideFrame>
  );
}
