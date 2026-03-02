import React from "react";
import SlideFrame from "../components/SlideFrame";
import "../deck.css";

// PUBLIC_INTERFACE
export default function Slide18Investment({ slideNumber, slideMeta }) {
  /** Slide 18: Investment & Funding Options. */
  return (
    <SlideFrame slideNumber={slideNumber} slideTitle={slideMeta.title} sectionLabel="Investment">
      <div className="twoCol" style={{ textAlign: "left" }}>
        <div>
          <h2 className="slideTitle" style={{ fontSize: 34 }}>
            Investment & Funding Options
          </h2>
          <p className="slideSubTitle">Making this affordable</p>

          <div style={{ marginTop: 14 }} className="sectionBlock">
            <p className="sectionBlockTitle">Total Investment Estimate (12-Month Implementation)</p>
            <ul className="bullets">
              <li>Platform & Infrastructure: $150K – $200K</li>
              <li>Integration & Customization: $100K – $150K</li>
              <li>Training & Capacity Building: $50K – $75K</li>
              <li>Marketing & Adoption: $50K – $75K</li>
              <li>Contingency & Support (20%): $70K – $100K</li>
            </ul>
            <p style={{ margin: "10px 0 0", fontWeight: 900, color: "var(--deck-navy)", fontSize: 18 }}>
              Total Range: $420K – $600K USD
            </p>
          </div>
        </div>

        <div style={{ display: "grid", gap: 12, alignContent: "start" }}>
          <div className="sectionBlock solutionMode">
            <p className="sectionBlockTitle">Funding Strategy</p>
            <ul className="bullets">
              <li>
                <strong>CARDTP Allocation:</strong> propose $400K – $500K from the $30M program
              </li>
              <li>Development partner co-funding (UNDP, ITU, Australian Aid, Commonwealth, OECS)</li>
              <li>Public-private partnership (banks, tourism operators, telcos)</li>
              <li>Regional coordination (OECS multi-country economies of scale)</li>
            </ul>
          </div>

          <div className="sectionBlock">
            <p className="sectionBlockTitle">Return on Investment</p>
            <ul className="bullets">
              <li>Year 1 efficiency savings: $200K – $300K</li>
              <li>Reduced fraud + faster service delivery</li>
              <li>Improved inclusion and citizen satisfaction</li>
              <li>Regional leadership positioning</li>
            </ul>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}
