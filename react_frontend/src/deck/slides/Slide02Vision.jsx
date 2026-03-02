import React from "react";
import SlideFrame from "../components/SlideFrame";
import { getInvestmentNumbers, getSvgDataPointValue } from "../data/svgDataPoints";
import "../deck.css";

function StatCard({ value, label }) {
  return (
    <div className="statCard">
      <div className="statValue">{value}</div>
      <div className="statLabel">{label}</div>
    </div>
  );
}

// PUBLIC_INTERFACE
export default function Slide02Vision({ slideNumber, slideMeta }) {
  /** Slide 2: SVG’s Digital Transformation Vision. */
  const inv = getInvestmentNumbers();

  return (
    <SlideFrame slideNumber={slideNumber} slideTitle={slideMeta.title} sectionLabel="Opening">
      <div className="twoCol">
        <div style={{ textAlign: "left" }}>
          <p className="slideKicker">A Nation on the Move</p>
          <h2 className="slideTitle" style={{ fontSize: 34 }}>
            SVG’s Digital Transformation Vision
          </h2>

          <div style={{ marginTop: 14 }} className="sectionBlock">
            <p className="sectionBlockTitle">Your Challenge</p>
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.45 }}>
              How do you deliver world-class digital services with limited resources across dispersed island populations?
            </p>
          </div>

          <div style={{ marginTop: 12 }} className="sectionBlock">
            <p className="sectionBlockTitle">Our Answer</p>
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.45, fontWeight: 700, color: "var(--deck-klefki-blue)" }}>
              Leverage open-source, interoperable platforms that work from day one—without reinventing the wheel.
            </p>
          </div>
        </div>

        <div style={{ textAlign: "left" }}>
          <div className="cardGrid2x2">
            <StatCard value={`$${inv.totalMillions}M`} label="Total Investment" />
            <StatCard value={getSvgDataPointValue("Population") ?? "~100,000"} label="Citizens" />
            <StatCard value={getSvgDataPointValue("Digital Projects Active") ?? "49"} label="Active Digital Projects" />
            <StatCard value={getSvgDataPointValue("Project Timeline") ?? "June 2020 - June 2026"} label="Project Timeline" />
          </div>

          <div style={{ marginTop: 14 }} className="timeline">
            <div className="timelineRow">
              <div className="timelineDate">$81M</div>
              <div>
                <div className="timelineItemTitle">Going Paperless Initiative</div>
                <div className="timelineItemNote">Existing digital commitment</div>
              </div>
            </div>
            <div className="timelineRow">
              <div className="timelineDate">$30M</div>
              <div>
                <div className="timelineItemTitle">CARDTP World Bank Funding</div>
                <div className="timelineItemNote">June 2020 – June 2026</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}
