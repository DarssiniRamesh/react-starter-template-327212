import Slide01Title from "../slides/Slide01Title";
import Slide02Vision from "../slides/Slide02Vision";
import Slide03Context from "../slides/Slide03Context";
import Slide04Challenges from "../slides/Slide04Challenges";
import Slide05MosipJourney from "../slides/Slide05MosipJourney";
import Slide06IntroducingKlefki from "../slides/Slide06IntroducingKlefki";
import Slide07TechStack from "../slides/Slide07TechStack";
import Slide08SolutionArchitecture from "../slides/Slide08SolutionArchitecture";
import Slide09WhyKlefki from "../slides/Slide09WhyKlefki";
import Slide10UseCases from "../slides/Slide10UseCases";
import Slide11CitizenJourney from "../slides/Slide11CitizenJourney";
import Slide12CaseStudyVanuatu from "../slides/Slide12CaseStudyVanuatu";
import Slide13CaseStudyJamaica from "../slides/Slide13CaseStudyJamaica";
import Slide14CaseStudyIndia from "../slides/Slide14CaseStudyIndia";
import Slide15SecurityPrivacy from "../slides/Slide15SecurityPrivacy";
import Slide16Roadmap from "../slides/Slide16Roadmap";
import Slide17Governance from "../slides/Slide17Governance";
import Slide18Investment from "../slides/Slide18Investment";
import Slide19RiskMitigation from "../slides/Slide19RiskMitigation";
import Slide20VlinderCommitment from "../slides/Slide20VlinderCommitment";
import Slide21RegionalVision from "../slides/Slide21RegionalVision";
import Slide22NextSteps from "../slides/Slide22NextSteps";
import Slide23CallToAction from "../slides/Slide23CallToAction";
import Slide24ThankYou from "../slides/Slide24ThankYou";

// PUBLIC_INTERFACE
export function getSlides() {
  /**
   * Canonical slide registry (Slides 1–24) and the single source for ordering.
   * Contract:
   * - Each slide has a stable id, title, section label, and React component.
   * - Used both for React rendering and PPTX export.
   */
  return [
    { id: "01", title: "Title", section: "Opening", Component: Slide01Title },
    { id: "02", title: "SVG’s Digital Transformation Vision", section: "Opening", Component: Slide02Vision },
    { id: "03", title: "The SVG Context", section: "Opening", Component: Slide03Context },
    { id: "04", title: "Current Challenges", section: "Problem", Component: Slide04Challenges },
    { id: "05", title: "SVG’s MOSIP Journey", section: "Problem", Component: Slide05MosipJourney },
    { id: "06", title: "Introducing Klefki", section: "Solution", Component: Slide06IntroducingKlefki },
    { id: "07", title: "Technology Stack", section: "Solution", Component: Slide07TechStack },
    { id: "08", title: "Solution Architecture", section: "Solution", Component: Slide08SolutionArchitecture },
    { id: "09", title: "Why Choose Klefki", section: "Differentiation", Component: Slide09WhyKlefki },
    { id: "10", title: "Priority Use Cases", section: "Differentiation", Component: Slide10UseCases },
    { id: "11", title: "Citizen Journey", section: "Proof", Component: Slide11CitizenJourney },
    { id: "12", title: "Case Study: Vanuatu (Police Clearance)", section: "Proof", Component: Slide12CaseStudyVanuatu },
    { id: "13", title: "Case Study: Jamaica (Work Permits)", section: "Proof", Component: Slide13CaseStudyJamaica },
    { id: "14", title: "Case Study: India (Certificates)", section: "Proof", Component: Slide14CaseStudyIndia },
    { id: "15", title: "Security & Privacy", section: "Trust", Component: Slide15SecurityPrivacy },
    { id: "16", title: "Implementation Roadmap", section: "Implementation", Component: Slide16Roadmap },
    { id: "17", title: "Governance & Capacity Building", section: "Implementation", Component: Slide17Governance },
    { id: "18", title: "Investment & Funding Options", section: "Investment", Component: Slide18Investment },
    { id: "19", title: "Risk Mitigation & Success Factors", section: "Risk", Component: Slide19RiskMitigation },
    { id: "20", title: "Vlinder Commitment", section: "Partnership", Component: Slide20VlinderCommitment },
    { id: "21", title: "Regional Vision", section: "Vision", Component: Slide21RegionalVision },
    { id: "22", title: "Next Steps", section: "Action", Component: Slide22NextSteps },
    { id: "23", title: "Call to Action", section: "Action", Component: Slide23CallToAction },
    { id: "24", title: "Thank You", section: "Action", Component: Slide24ThankYou }
  ];
}
