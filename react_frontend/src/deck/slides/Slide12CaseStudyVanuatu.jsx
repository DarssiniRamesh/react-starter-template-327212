import React from "react";
import SlideFrame from "../components/SlideFrame";
import "../deck.css";

function BeforeAfter({ before, after, results }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
      <div className="sectionBlock problemMode">
        <p className="sectionBlockTitle">Before</p>
        <ul className="bullets">
          {before.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </div>
      <div className="sectionBlock solutionMode">
        <p className="sectionBlockTitle">After</p>
        <ul className="bullets">
          {after.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </div>

      <div className="sectionBlock" style={{ gridColumn: "1 / -1" }}>
        <p className="sectionBlockTitle">Results</p>
        <ul className="bullets">
          {results.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
        <p style={{ margin: "10px 0 0", color: "var(--deck-text-muted)", fontWeight: 800 }}>
          Video demo: QR code placeholder (add actual QR in final client version).
        </p>
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
export default function Slide12CaseStudyVanuatu({ slideNumber, slideMeta }) {
  /** Slide 12: Case study spotlight - Vanuatu police clearance. */
  return (
    <SlideFrame slideNumber={slideNumber} slideTitle={slideMeta.title} sectionLabel="Proof">
      <div style={{ height: "100%", textAlign: "left" }}>
        <h2 className="slideTitle" style={{ fontSize: 34 }}>
          Case Study Spotlight — Electronic Police Clearance (Vanuatu)
        </h2>
        <p className="slideSubTitle">Proven success in a Pacific island context</p>

        <div style={{ marginTop: 14 }}>
          <BeforeAfter
            before={[
              "Manual process took 5–7 days",
              "Required travel to capital; high cost",
              "Vulnerable to fraud"
            ]}
            after={[
              "Citizens apply remotely via mobile",
              "Police HQ verifies digitally",
              "Certificate issued to wallet with QR + blockchain verification"
            ]}
            results={[
              "Processing time: 5–7 days → 2 hours",
              "Cost reduction: 70%",
              "Fraud elimination via tamper-proof verification",
              "95%+ citizen satisfaction; faster employment and remittances",
              "Funding: UN + Australian Aid"
            ]}
          />
        </div>
      </div>
    </SlideFrame>
  );
}
