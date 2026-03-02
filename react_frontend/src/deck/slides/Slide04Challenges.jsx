import React from "react";
import SlideFrame from "../components/SlideFrame";
import "../deck.css";

function ProblemCard({ n, title, bullets }) {
  return (
    <div className="iconCard problemMode">
      <div className="iconCardHeader">
        <h3 className="iconCardTitle">{title}</h3>
        <div className="iconPill" style={{ background: "var(--deck-problem)" }}>
          {n}
        </div>
      </div>
      <ul className="bullets">
        {bullets.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
    </div>
  );
}

// PUBLIC_INTERFACE
export default function Slide04Challenges({ slideNumber, slideMeta }) {
  /** Slide 4: Current Digital ID Implementation Challenges. */
  return (
    <SlideFrame slideNumber={slideNumber} slideTitle={slideMeta.title} sectionLabel="Problem Framing">
      <div style={{ height: "100%", textAlign: "left" }}>
        <h2 className="slideTitle" style={{ fontSize: 34 }}>
          Current Digital ID Implementation Challenges
        </h2>
        <p className="slideSubTitle">The Fragmentation Problem</p>

        <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 14 }}>
          <ProblemCard
            n="1"
            title="Fragmented Ecosystem"
            bullets={[
              "Separate apps for ID, health records, financial services",
              "Limited interoperability between systems",
              "No unified login across government services",
              "Citizens carry multiple physical cards"
            ]}
          />
          <ProblemCard
            n="2"
            title="Infrastructure Limitations"
            bullets={[
              "Reliance on physical cards (cost, fraud risk)",
              "Limited offline capabilities for outer islands",
              "Complex integration requirements for small ministries",
              "Security vulnerabilities in siloed systems"
            ]}
          />
          <ProblemCard
            n="3"
            title="Resource Constraints"
            bullets={[
              "Limited technical capacity",
              "High maintenance costs for multiple solutions",
              "Vendor lock-in risks",
              "Difficulty scaling across 32 islands"
            ]}
          />
        </div>

        <div style={{ marginTop: 14 }} className="sectionBlock">
          <p style={{ margin: 0, fontWeight: 800, color: "var(--deck-navy)" }}>The Result</p>
          <p style={{ margin: "6px 0 0", color: "var(--deck-text)" }}>
            Low citizen adoption, minimal ROI from digital ID investment, services remain paper-based, and regional mobility is hampered.
          </p>
        </div>
      </div>
    </SlideFrame>
  );
}
