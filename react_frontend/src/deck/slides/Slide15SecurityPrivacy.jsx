import React from "react";
import SlideFrame from "../components/SlideFrame";
import "../deck.css";

function Shield({ title, body }) {
  return (
    <div className="iconCard">
      <div className="iconCardHeader">
        <h3 className="iconCardTitle">{title}</h3>
        <div className="iconPill" style={{ background: "var(--deck-navy)" }}>
          🔒
        </div>
      </div>
      <p className="iconCardBody">{body}</p>
    </div>
  );
}

// PUBLIC_INTERFACE
export default function Slide15SecurityPrivacy({ slideNumber, slideMeta }) {
  /** Slide 15: Security & Privacy. */
  return (
    <SlideFrame slideNumber={slideNumber} slideTitle={slideMeta.title} sectionLabel="Trust & Security">
      <div style={{ height: "100%", textAlign: "left" }}>
        <h2 className="slideTitle" style={{ fontSize: 34 }}>
          Security & Privacy — Built-In, Not Bolted-On
        </h2>
        <p className="slideSubTitle">Trust through technology</p>

        <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 14 }}>
          <Shield
            title="1. Cryptographic Security"
            body="Digital signatures and blockchain anchoring ensure authenticity and tamper-evidence through standard public-key cryptography."
          />
          <Shield
            title="2. Privacy by Design"
            body="Zero-knowledge proofs and selective disclosure: prove ‘over 18’ without revealing birthdate; share only what’s needed."
          />
          <Shield
            title="3. Data Sovereignty"
            body="Credentials live in personal wallets, not centralized databases—consent-based sharing with audit trails reduces risk."
          />
          <Shield
            title="4. Offline Capability"
            body="QR code verification works without internet—critical for outer islands. Sync can occur when connectivity returns."
          />
          <Shield
            title="5. Regulatory Compliance"
            body="W3C Verifiable Credentials + OpenID integration align with international identity assurance frameworks and accountability needs."
          />
          <div className="sectionBlock solutionMode">
            <p className="sectionBlockTitle">Azure Marketplace Verified</p>
            <p style={{ margin: 0, lineHeight: 1.45 }}>
              Microsoft-vetted for enterprise security, reliability, and compliance.
            </p>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}
