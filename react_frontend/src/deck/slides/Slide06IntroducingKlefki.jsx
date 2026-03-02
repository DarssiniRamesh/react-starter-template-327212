import React from "react";
import SlideFrame from "../components/SlideFrame";
import "../deck.css";

function Node({ title, body }) {
  return (
    <div className="iconCard solutionMode">
      <div className="iconCardHeader">
        <h3 className="iconCardTitle">{title}</h3>
        <div className="iconPill" style={{ background: "var(--deck-success)" }}>
          ✓
        </div>
      </div>
      <p className="iconCardBody">{body}</p>
    </div>
  );
}

// PUBLIC_INTERFACE
export default function Slide06IntroducingKlefki({ slideNumber, slideMeta }) {
  /** Slide 6: Introducing Klefki - The Ecosystem Enabler. */
  return (
    <SlideFrame slideNumber={slideNumber} slideTitle={slideMeta.title} sectionLabel="Solution Introduction">
      <div style={{ height: "100%", textAlign: "left" }}>
        <h2 className="slideTitle" style={{ fontSize: 34 }}>
          Introducing Klefki — The Ecosystem Enabler
        </h2>
        <p className="slideSubTitle">
          Klefki bridges the gap between MOSIP infrastructure and real-world citizen services.
        </p>

        <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "1fr 0.9fr", gap: 14, alignItems: "stretch" }}>
          <div className="sectionBlock" style={{ display: "grid", placeItems: "center", textAlign: "center" }}>
            <div style={{ width: 220, height: 220, borderRadius: 999, background: "rgba(0,102,204,0.10)", display: "grid", placeItems: "center" }}>
              <div style={{ width: 150, height: 150, borderRadius: 999, background: "rgba(0,102,204,0.16)", display: "grid", placeItems: "center" }}>
                <div style={{ fontWeight: 900, color: "var(--deck-navy)", fontSize: 22, lineHeight: 1.1 }}>
                  KLEFKI
                  <div style={{ fontSize: 12, marginTop: 6, color: "var(--deck-text-muted)", fontWeight: 800 }}>
                    Ecosystem Enabler
                  </div>
                </div>
              </div>
            </div>
            <p style={{ margin: "14px 0 0", fontWeight: 800, color: "var(--deck-text-muted)" }}>
              Open standards + MOSIP compatibility + Caribbean experience = fast time-to-value
            </p>
          </div>

          <div style={{ display: "grid", gap: 12 }}>
            <Node
              title="1. Digital Wallet Layer"
              body="Citizens store government-issued credentials securely. Mobile-first and offline-capable, interoperable with Inji and other W3C wallets."
            />
            <Node
              title="2. Issuance Portal"
              body="Government ministries and agencies issue verifiable credentials with minimal infrastructure and MOSIP integration."
            />
            <Node
              title="3. Verification Ecosystem"
              body="Banks, employers, and service providers verify credentials instantly via APIs and dashboards with privacy-preserving controls."
            />
            <Node
              title="4. Use Case Activation"
              body="Pre-built templates for common services enable rapid deployment in weeks, not years—proven implementations you can adapt."
            />
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}
