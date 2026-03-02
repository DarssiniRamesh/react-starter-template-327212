import React from "react";
import SlideFrame from "../components/SlideFrame";
import "../deck.css";

function TimelineItem({ date, title, note }) {
  return (
    <div className="timelineRow">
      <div className="timelineDate">{date}</div>
      <div>
        <div className="timelineItemTitle">{title}</div>
        {note ? <div className="timelineItemNote">{note}</div> : null}
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
export default function Slide05MosipJourney({ slideNumber, slideMeta }) {
  /** Slide 5: SVG’s MOSIP Journey - Where You Are Today. */
  return (
    <SlideFrame slideNumber={slideNumber} slideTitle={slideMeta.title} sectionLabel="Problem Framing">
      <div className="twoCol" style={{ textAlign: "left" }}>
        <div>
          <h2 className="slideTitle" style={{ fontSize: 34 }}>
            SVG’s MOSIP Journey — Where You Are Today
          </h2>
          <p className="slideSubTitle">Building the foundation</p>

          <div style={{ marginTop: 14 }} className="timeline">
            <TimelineItem date="Jun 2020" title="CARDTP starts" note="World Bank digital transformation program begins" />
            <TimelineItem date="Q1 2024" title="MOSIP pilot launched" note="MOSIP platform + OpenCRVS integration" />
            <TimelineItem date="Mar 2026" title="YOU ARE HERE" note="Window to activate use cases before close-out" />
            <TimelineItem date="Jun 2026" title="CARDTP ends" note="Urgency: embed credential ecosystem before program completion" />
          </div>
        </div>

        <div style={{ display: "grid", gap: 12 }}>
          <div className="sectionBlock solutionMode">
            <p className="sectionBlockTitle">What’s Working</p>
            <ul className="bullets">
              <li>Strong World Bank partnership (CARDTP)</li>
              <li>OECS Commission technical support</li>
              <li>Legal and regulatory assessment completed</li>
              <li>Equipment delivered across rural/urban areas</li>
            </ul>
          </div>

          <div className="sectionBlock problemMode">
            <p className="sectionBlockTitle">The Missing Link</p>
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.45 }}>
              MOSIP gives infrastructure, but citizens and providers ask: where do I store credentials, how do I share securely, and what services can I
              access?
            </p>
            <p style={{ margin: "10px 0 0", fontWeight: 900, color: "var(--deck-klefki-blue)" }}>This is where Klefki enters.</p>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}
