import React from "react";
import SlideFrame from "../components/SlideFrame";
import "../deck.css";

// PUBLIC_INTERFACE
export default function Slide11CitizenJourney({ slideNumber, slideMeta }) {
  /** Slide 11: Citizen journey from birth to business. */
  const steps = [
    {
      title: "1. Birth → Digital Birth Certificate",
      body: "OpenCRVS creates record → MOSIP generates UID → digital birth certificate issued to parent’s Klefki Wallet."
    },
    {
      title: "2. Education → Digital Diplomas",
      body: "Institutions issue diplomas via issuance portal; students share instantly via QR code or link."
    },
    {
      title: "3. Employment → Police Clearance & Work Permits",
      body: "Police clearance issued digitally with QR + blockchain verification; work permits added for regional mobility."
    },
    { title: "4. Financial Access → eKYC", body: "Bank verifies government-issued credentials in real time; account opened in under 2 hours." },
    { title: "5. Healthcare → Medical Records", body: "Consent-based sharing enables seamless care across islands, even with intermittent connectivity." },
    { title: "6. Tourism & Travel → Seamless Entry", body: "Selective disclosure supports hotel check-in and border verification without photocopying." }
  ];

  return (
    <SlideFrame slideNumber={slideNumber} slideTitle={slideMeta.title} sectionLabel="Proof">
      <div style={{ height: "100%", textAlign: "left" }}>
        <h2 className="slideTitle" style={{ fontSize: 34 }}>
          The Klefki Wallet Experience — Citizen Journey
        </h2>
        <p className="slideSubTitle">From Birth to Business</p>

        <div style={{ marginTop: 14, display: "grid", gap: 10 }}>
          {steps.map((s) => (
            <div key={s.title} className="sectionBlock">
              <div style={{ fontWeight: 900, color: "var(--deck-navy)" }}>{s.title}</div>
              <div style={{ marginTop: 6, color: "var(--deck-text)", fontSize: 15, lineHeight: 1.45 }}>{s.body}</div>
            </div>
          ))}
        </div>
      </div>
    </SlideFrame>
  );
}
