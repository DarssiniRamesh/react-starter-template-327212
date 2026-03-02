import React from "react";
import SlideFrame from "../components/SlideFrame";
import "../deck.css";

// PUBLIC_INTERFACE
export default function Slide01Title({ slideNumber, slideMeta }) {
  /** Slide 1: Title slide. */
  return (
    <SlideFrame slideNumber={slideNumber} slideTitle={slideMeta.title} sectionLabel="Opening">
      <div style={{ height: "100%", display: "grid", alignContent: "center", justifyItems: "start" }}>
        <h1 className="slideTitle">Digital Identity Ecosystem</h1>
        <p className="slideSubTitle">
          Enabling Seamless Public-Private-Citizen Transactions
          <br />
          <strong>Klefki Solution by Vlinder Inc.</strong>
        </p>

        <div style={{ marginTop: 28, textAlign: "left" }} className="sectionBlock">
          <p className="sectionBlockTitle" style={{ marginBottom: 6 }}>
            Prepared for: Government of St. Vincent and the Grenadines
          </p>
          <p style={{ margin: 0, color: "var(--deck-text-muted)", fontWeight: 700 }}>Date: March 2026 • Confidential</p>
        </div>
      </div>
    </SlideFrame>
  );
}
