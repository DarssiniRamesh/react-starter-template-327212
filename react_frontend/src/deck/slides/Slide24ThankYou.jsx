import React from "react";
import SlideFrame from "../components/SlideFrame";
import "../deck.css";

// PUBLIC_INTERFACE
export default function Slide24ThankYou({ slideNumber, slideMeta }) {
  /** Slide 24: Thank you / Q&A. */
  return (
    <SlideFrame slideNumber={slideNumber} slideTitle={slideMeta.title} sectionLabel="Action">
      <div style={{ height: "100%", display: "grid", placeItems: "center", textAlign: "center" }}>
        <div style={{ maxWidth: 900 }}>
          <h2 className="slideTitle" style={{ fontSize: 46, textAlign: "center" }}>
            Thank You
          </h2>
          <p className="slideSubTitle" style={{ textAlign: "center", fontSize: 20 }}>
            Questions & Discussion
          </p>

          <div style={{ marginTop: 18 }} className="sectionBlock">
            <p style={{ margin: 0, fontWeight: 900, color: "var(--deck-navy)" }}>
              St. Vincent and the Grenadines: From Digital Infrastructure to Digital Ecosystem
            </p>
            <p style={{ margin: "10px 0 0", color: "var(--deck-text-muted)", fontWeight: 800 }}>
              “Let’s make digital identity work for every Vincentian, from every island.”
            </p>
          </div>

          <div style={{ marginTop: 14, color: "var(--deck-text-muted)", fontWeight: 800 }}>
            QR code placeholder • vlinder.io • [contact information]
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}
