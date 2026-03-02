import React from "react";
import SlideFrame from "../components/SlideFrame";
import "../deck.css";

function Layer({ title, subtitle, tone }) {
  const bg =
    tone === "foundation"
      ? "rgba(26,39,69,0.10)"
      : tone === "issuance"
      ? "rgba(0,102,204,0.10)"
      : tone === "verification"
      ? "rgba(6,182,212,0.10)"
      : "rgba(16,185,129,0.10)";
  return (
    <div className="sectionBlock" style={{ background: `linear-gradient(180deg, ${bg}, white)` }}>
      <div style={{ fontWeight: 900, color: "var(--deck-navy)" }}>{title}</div>
      <div style={{ marginTop: 6, color: "var(--deck-text-muted)", fontWeight: 700, fontSize: 14 }}>{subtitle}</div>
    </div>
  );
}

// PUBLIC_INTERFACE
export default function Slide07TechStack({ slideNumber, slideMeta }) {
  /** Slide 7: How Klefki Complements Your MOSIP Investment - Technology Stack. */
  return (
    <SlideFrame slideNumber={slideNumber} slideTitle={slideMeta.title} sectionLabel="Solution Introduction">
      <div className="twoCol" style={{ textAlign: "left" }}>
        <div>
          <h2 className="slideTitle" style={{ fontSize: 34 }}>
            How Klefki Complements Your MOSIP Investment
          </h2>
          <p className="slideSubTitle">Klefki doesn’t replace MOSIP—it activates it.</p>

          <div style={{ marginTop: 14 }} className="sectionBlock">
            <p style={{ margin: 0, fontWeight: 800 }}>Key Point</p>
            <p style={{ margin: "6px 0 0", lineHeight: 1.45 }}>
              MOSIP provides the digital identity foundation. Klefki enables the ecosystem of issuers, wallets, and verifiers so citizens get real services
              from day one.
            </p>
          </div>
        </div>

        <div style={{ display: "grid", gap: 14, alignContent: "start" }}>
          <Layer
            title="Citizen Experience Layer"
            subtitle="Klefki Wallet • Inji Wallet • Other W3C wallets (interoperable, citizen choice)"
          />
          <Layer
            title="Verification & Use Case Layer"
            subtitle="Banks • Hospitals • Schools • Tourism • Employers (Verification APIs + dashboard)"
          />
          <Layer title="Credential Issuance Layer" subtitle="Ministries • Agencies • Universities • Police (Issuance portal / templates)" />
          <Layer title="Digital Identity Foundation" subtitle="MOSIP Platform + OpenCRVS (UID creation • biometrics • authentication)" tone="foundation" />
        </div>
      </div>
    </SlideFrame>
  );
}
