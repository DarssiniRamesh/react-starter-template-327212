import React from "react";
import SlideFrame from "../components/SlideFrame";
import "../deck.css";

// PUBLIC_INTERFACE
export default function Slide13CaseStudyJamaica({ slideNumber, slideMeta }) {
  /** Slide 13: Case study - Jamaica work permits. */
  return (
    <SlideFrame slideNumber={slideNumber} slideTitle={slideMeta.title} sectionLabel="Proof">
      <div style={{ height: "100%", textAlign: "left" }}>
        <h2 className="slideTitle" style={{ fontSize: 34 }}>
          Case Study — Jamaica Work Permits (CSME Integration)
        </h2>
        <p className="slideSubTitle">Regional mobility made real</p>

        <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <div className="sectionBlock problemMode">
            <p className="sectionBlockTitle">Before</p>
            <ul className="bullets">
              <li>Manual processing — 30+ days</li>
              <li>Paper-heavy workflow</li>
              <li>Fraud risks and difficult compliance</li>
            </ul>
          </div>
          <div className="sectionBlock solutionMode">
            <p className="sectionBlockTitle">After</p>
            <ul className="bullets">
              <li>Digital application + issuance</li>
              <li>Payment gateway and TRN integration</li>
              <li>Electronic permits with blockchain verification</li>
            </ul>
          </div>

          <div className="sectionBlock" style={{ gridColumn: "1 / -1" }}>
            <p className="sectionBlockTitle">Results</p>
            <ul className="bullets">
              <li>Processing time: 30 days → 7 days</li>
              <li>Paperwork reduction: 90%</li>
              <li>CSME compliance: seamless regional integration</li>
              <li>Employer satisfaction: streamlined hiring</li>
            </ul>
            <p style={{ margin: "10px 0 0", fontWeight: 800, color: "var(--deck-klefki-blue)" }}>
              Why this matters for SVG: As OECS and CARICOM member, SVG has regional mobility obligations—this model is turnkey for compliance.
            </p>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}
