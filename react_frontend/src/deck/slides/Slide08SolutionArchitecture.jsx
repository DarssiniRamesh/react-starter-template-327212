import React from "react";
import SlideFrame from "../components/SlideFrame";
import "../deck.css";

function LayerBlock({ title, bullets, timing, mode }) {
  return (
    <div className={`iconCard ${mode || "solutionMode"}`}>
      <div className="iconCardHeader">
        <h3 className="iconCardTitle">{title}</h3>
        <div className="iconPill" style={{ background: mode === "problemMode" ? "var(--deck-problem)" : "var(--deck-klefki-blue)" }}>
          {timing}
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
export default function Slide08SolutionArchitecture({ slideNumber, slideMeta }) {
  /** Slide 8: Klefki Solution Architecture - SVG Implementation. */
  return (
    <SlideFrame slideNumber={slideNumber} slideTitle={slideMeta.title} sectionLabel="Solution Introduction">
      <div style={{ height: "100%", textAlign: "left" }}>
        <h2 className="slideTitle" style={{ fontSize: 34 }}>
          Klefki Solution Architecture — SVG Implementation
        </h2>
        <p className="slideSubTitle">Three-layer approach with a phased rollout.</p>

        <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 14 }}>
          <LayerBlock
            title="Layer 1: Foundation (Underway)"
            timing="2024–2026"
            bullets={[
              "MOSIP: UID generation, biometrics, authentication",
              "OpenCRVS: birth/death/marriage registration",
              "Equipment distributed across islands"
            ]}
          />
          <LayerBlock
            title="Layer 2: Credential Issuance (Enablement)"
            timing="3–4 months"
            bullets={[
              "Issuance portal for ministries",
              "Integration with MOSIP authentication",
              "Templates: birth, police, education, health",
              "Blockchain anchoring for tamper-proof verification"
            ]}
          />
          <LayerBlock
            title="Layer 3: Ecosystem Activation"
            timing="6–9 months"
            bullets={[
              "Wallet deployment + onboarding",
              "Verifier dashboard for service providers",
              "Integrations: banks, hospitals, tourism, employers",
              "Offline capability for outer islands"
            ]}
          />
        </div>

        <div style={{ marginTop: 14 }} className="sectionBlock">
          <p className="sectionBlockTitle">Technical Features</p>
          <ul className="bullets">
            <li>W3C Verifiable Credentials standard</li>
            <li>Blockchain-agnostic (Polygon for cost efficiency)</li>
            <li>Zero-knowledge proofs (privacy by design)</li>
            <li>API-first architecture • Available on Azure Marketplace</li>
          </ul>
        </div>
      </div>
    </SlideFrame>
  );
}
