import PptxGenJS from "pptxgenjs";
import { saveAs } from "file-saver";
import { getInvestmentNumbers, getSvgDataPointValue } from "../data/svgDataPoints";
import { getUseCases } from "../data/useCases";

/**
 * Implementation notes:
 * - This exporter intentionally uses the same data modules as the React deck (slides + CSV-derived data),
 *   so “web view” and “downloaded PPTX” remain consistent.
 *
 * - We keep the PPTX visuals intentionally simple and robust (text + shapes),
 *   as a first pass that generates a professional, editable deck.
 */

const WIDE_LAYOUT = "LAYOUT_WIDE"; // 13.333 x 7.5 in (16:9)

function addTitle(slide, title, subtitle) {
  slide.addText(title, {
    x: 0.7,
    y: 1.5,
    w: 12,
    h: 1.0,
    fontFace: "Calibri",
    fontSize: 40,
    bold: true,
    color: "1A2745"
  });
  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.7,
      y: 2.6,
      w: 12,
      h: 0.6,
      fontFace: "Calibri",
      fontSize: 18,
      color: "2D3748"
    });
  }
}

function addFooter(slide, slideNo, total) {
  slide.addShape("rect", { x: 0, y: 7.12, w: 13.333, h: 0.38, fill: { color: "F8F9FA" }, line: { color: "E6EAF0" } });
  slide.addText("St. Vincent and the Grenadines • March 2026", {
    x: 0.7,
    y: 7.20,
    w: 10.5,
    h: 0.24,
    fontFace: "Calibri",
    fontSize: 12,
    color: "5B677A"
  });
  slide.addText(`${slideNo}/${total}`, {
    x: 11.8,
    y: 7.20,
    w: 0.8,
    h: 0.24,
    fontFace: "Calibri",
    fontSize: 12,
    bold: true,
    color: "5B677A",
    align: "right"
  });
}

// PUBLIC_INTERFACE
export async function exportSvgKlefkiDeckToPptx({ fileName }) {
  /**
   * ExportSvgKlefkiDeckFlow
   *
   * Contract:
   * Inputs:
   * - fileName: string (should end with .pptx)
   *
   * Outputs:
   * - Triggers a browser download of a PPTX file.
   *
   * Side effects:
   * - Creates an in-memory PPTX and downloads it.
   *
   * Failure modes:
   * 1) PptxGenJS serialization error -> throws Error
   * 2) Browser download blocked -> saveAs may fail (throws)
   * 3) Unexpected runtime errors -> throws (caller boundary handles)
   */
  const pptx = new PptxGenJS();
  pptx.layout = WIDE_LAYOUT;

  // Basic metadata (helps future debugging of file provenance)
  pptx.author = "Vlinder Inc.";
  pptx.company = "Vlinder Inc.";
  pptx.subject = "Digital Identity Ecosystem for St. Vincent & the Grenadines";
  pptx.title = "SVG Klefki Deck (March 2026)";

  const total = 24;

  // Slide 1
  {
    const slide = pptx.addSlide();
    slide.background = { color: "FFFFFF" };
    addTitle(
      slide,
      "Digital Identity Ecosystem",
      "Enabling Seamless Public-Private-Citizen Transactions\nKlefki Solution by Vlinder Inc."
    );
    slide.addText("Prepared for: Government of St. Vincent and the Grenadines", {
      x: 0.7,
      y: 3.6,
      w: 12,
      h: 0.4,
      fontFace: "Calibri",
      fontSize: 14,
      color: "2D3748"
    });
    slide.addText("Confidential", { x: 0.7, y: 6.7, w: 12, h: 0.3, fontFace: "Calibri", fontSize: 12, color: "EF4444" });
    addFooter(slide, 1, total);
  }

  // Slide 2
  {
    const slide = pptx.addSlide();
    slide.background = { color: "FFFFFF" };
    slide.addText("SVG’s Digital Transformation Vision", {
      x: 0.7,
      y: 0.6,
      w: 12,
      h: 0.5,
      fontFace: "Calibri",
      fontSize: 30,
      bold: true,
      color: "1A2745"
    });

    const inv = getInvestmentNumbers();
    const stats = [
      { label: "Total Investment", value: `$${inv.totalMillions}M` },
      { label: "Population", value: getSvgDataPointValue("Population") ?? "~100,000" },
      { label: "Active Digital Projects", value: getSvgDataPointValue("Digital Projects Active") ?? "49 projects" },
      { label: "Timeline", value: getSvgDataPointValue("Project Timeline") ?? "June 2020 - June 2026" }
    ];

    // 2x2 stat cards
    let x = 0.7;
    let y = 1.6;
    const cardW = 5.9;
    const cardH = 1.2;
    for (let i = 0; i < stats.length; i++) {
      const row = Math.floor(i / 2);
      const col = i % 2;
      const cx = x + col * (cardW + 0.5);
      const cy = y + row * (cardH + 0.35);
      slide.addShape("roundRect", { x: cx, y: cy, w: cardW, h: cardH, fill: { color: "F3F8FF" }, line: { color: "D7E6FF" } });
      slide.addText(stats[i].value, { x: cx + 0.25, y: cy + 0.18, w: cardW - 0.5, h: 0.5, fontSize: 24, bold: true, color: "1A2745" });
      slide.addText(stats[i].label, { x: cx + 0.25, y: cy + 0.75, w: cardW - 0.5, h: 0.3, fontSize: 12, bold: true, color: "5B677A" });
    }

    slide.addText("Your Challenge: How do you deliver world-class digital services with limited resources across dispersed island populations?", {
      x: 0.7,
      y: 4.4,
      w: 12,
      h: 0.6,
      fontFace: "Calibri",
      fontSize: 14,
      color: "2D3748"
    });
    slide.addText("Our Answer: Leverage open-source, interoperable platforms that work from day one—without reinventing the wheel.", {
      x: 0.7,
      y: 5.0,
      w: 12,
      h: 0.6,
      fontFace: "Calibri",
      fontSize: 14,
      bold: true,
      color: "0066CC"
    });

    addFooter(slide, 2, total);
  }

  // Slide 10 (use cases) as representative data-backed slide in PPTX
  // (Other slides are still included as title+bullets for completeness in this export pass.)
  const useCases = getUseCases();
  const phase1 = useCases.filter((u) => u.phase.startsWith("Phase 1"));
  const phase2 = useCases.filter((u) => u.phase.startsWith("Phase 2"));
  const phase3 = useCases.filter((u) => u.phase.startsWith("Phase 3"));
  const strategic = useCases.filter((u) => u.phase === "Strategic");

  // Create slides 3-9 quickly (text-based but editable)
  const simpleSlides = [
    {
      no: 3,
      title: "The SVG Context — Why Digital Identity Matters",
      bullets: [
        "Tourism Powerhouse: 83% growth (2022–2023); cruise arrivals up 120%",
        "Digital Readiness: 131.6% mobile penetration; 68% made digital payments in 12 months",
        "Regional Integration: OECS member; CARICOM mobility requirements",
        "The Gap: one digital identity that works across public & private services"
      ]
    },
    {
      no: 4,
      title: "Current Digital ID Implementation Challenges",
      bullets: [
        "Fragmented ecosystem: separate apps, limited interoperability, no unified login",
        "Infrastructure limitations: reliance on physical cards, offline gaps, integration complexity",
        "Resource constraints: limited technical capacity, high maintenance costs, vendor lock-in risk"
      ]
    },
    {
      no: 5,
      title: "SVG’s MOSIP Journey — Where You Are Today",
      bullets: [
        "MOSIP Pilot launched Q1 2024; OpenCRVS integration; UID creation underway",
        "What’s working: CARDTP partnership, OECS support, legal assessment, equipment delivered",
        "Missing link: citizen wallet + secure sharing + use-case activation"
      ]
    },
    {
      no: 6,
      title: "Introducing Klefki — The Ecosystem Enabler",
      bullets: [
        "Digital wallet layer (offline-capable, citizen-controlled)",
        "Issuance portal (ministries issue verifiable credentials)",
        "Verification ecosystem (banks/employers verify instantly via APIs)",
        "Use-case activation (pre-built templates; weeks not years)"
      ]
    },
    {
      no: 7,
      title: "How Klefki Complements Your MOSIP Investment",
      bullets: [
        "Klefki activates MOSIP by enabling issuers, wallets, and verifiers on open standards",
        "W3C Verifiable Credentials; API-first; Azure Marketplace availability",
        "Does not replace MOSIP—builds on it"
      ]
    },
    {
      no: 8,
      title: "Klefki Solution Architecture — SVG Implementation",
      bullets: [
        "Layer 1: Foundation (MOSIP + OpenCRVS) — 2024–2026",
        "Layer 2: Credential issuance enablement — 3–4 months",
        "Layer 3: Ecosystem activation — 6–9 months phased rollout",
        "Offline verification for outer islands via QR codes"
      ]
    },
    {
      no: 9,
      title: "Why SVG Should Choose Klefki",
      bullets: [
        "Caribbean/Pacific small-island experience (Vanuatu, Jamaica)",
        "Rapid deployment via templates + Azure Marketplace",
        "Lower TCO via open-source foundation and interoperability",
        "MOSIP ecosystem alignment (Inji compatible; open standards)",
        "Proven ROI: 5–7 days → 2 hours; 30 days → 7 days; 3–5 days → instant"
      ]
    }
  ];

  for (const s of simpleSlides) {
    const slide = pptx.addSlide();
    slide.addText(s.title, { x: 0.7, y: 0.7, w: 12, h: 0.6, fontFace: "Calibri", fontSize: 30, bold: true, color: "1A2745" });
    slide.addText(s.bullets.map((b) => `• ${b}`).join("\n"), {
      x: 0.9,
      y: 1.6,
      w: 12,
      h: 4.8,
      fontFace: "Calibri",
      fontSize: 16,
      color: "2D3748",
      valign: "top"
    });
    addFooter(slide, s.no, total);
  }

  // Slide 10
  {
    const slide = pptx.addSlide();
    slide.addText("SVG Priority Use Cases — What to Build First", {
      x: 0.7,
      y: 0.7,
      w: 12,
      h: 0.6,
      fontFace: "Calibri",
      fontSize: 28,
      bold: true,
      color: "1A2745"
    });

    const colW = 4.0;
    const startY = 1.6;

    const renderPhase = (title, items, x) => {
      slide.addShape("roundRect", { x, y: startY, w: colW, h: 4.9, fill: { color: "FFFFFF" }, line: { color: "DDE3EE" } });
      slide.addText(title, { x: x + 0.2, y: startY + 0.2, w: colW - 0.4, h: 0.4, fontSize: 14, bold: true, color: "0066CC" });
      slide.addText(
        items.map((u) => `• ${u.useCase}`).join("\n"),
        { x: x + 0.2, y: startY + 0.7, w: colW - 0.4, h: 4.0, fontSize: 13, color: "2D3748" }
      );
    };

    renderPhase("Phase 1 (Months 1–4)", phase1, 0.7);
    renderPhase("Phase 2 (Months 5–9)", phase2, 4.7);
    renderPhase("Phase 3 (Months 10–15)", phase3, 8.7);

    slide.addShape("roundRect", { x: 0.7, y: 6.6, w: 12.7, h: 0.45, fill: { color: "FFF7ED" }, line: { color: "FDE68A" } });
    slide.addText(`Strategic: ${strategic.map((u) => u.useCase).join(", ")}`, {
      x: 0.95,
      y: 6.69,
      w: 12.2,
      h: 0.28,
      fontSize: 13,
      bold: true,
      color: "92400E"
    });

    addFooter(slide, 10, total);
  }

  // Slides 11-24 (text-based for this export pass)
  const remaining = [
    {
      no: 11,
      title: "The Klefki Wallet Experience — Citizen Journey",
      bullets: [
        "Birth: Digital birth certificate → MOSIP UID",
        "Education: Digital diplomas issued and shared instantly",
        "Employment: Police clearance + work permits, verified via QR code",
        "Financial access: eKYC account opening under 2 hours",
        "Healthcare: consent-based sharing of records across islands",
        "Tourism & travel: selective disclosure, seamless verification"
      ]
    },
    {
      no: 12,
      title: "Case Study — Electronic Police Clearance (Vanuatu)",
      bullets: [
        "Before: 5–7 days; travel to capital; high cost; fraud risk",
        "After: 2 hours; remote application; QR + blockchain verification",
        "Results: 70% cost reduction; 95%+ citizen satisfaction; faster remittances"
      ]
    },
    {
      no: 13,
      title: "Case Study — Jamaica Work Permits (CSME Integration)",
      bullets: [
        "Before: 30+ days; paper-heavy; fraud risk",
        "After: 7 days; electronic permits with blockchain verification",
        "Results: 90% paperwork reduction; streamlined hiring; CSME compliance"
      ]
    },
    {
      no: 14,
      title: "Case Study — India Education Certificates (Scale Example)",
      bullets: [
        "Before: 3–5 days verification",
        "After: instant verification via QR + blockchain anchoring",
        "Scale: proven from small islands to national scale"
      ]
    },
    {
      no: 15,
      title: "Security & Privacy — Built-In, Not Bolted-On",
      bullets: [
        "Cryptographic signatures + immutable verification trails",
        "Privacy by design: ZK proofs + selective disclosure",
        "Data sovereignty: credentials stored in personal wallets",
        "Offline capability for outer islands",
        "Standards: W3C VC, OpenID; Azure Marketplace verified"
      ]
    },
    {
      no: 16,
      title: "Implementation Roadmap for SVG — 12 Months",
      bullets: [
        "Months 1–3: platform setup; MOSIP integration; pilot (birth cert + police clearance)",
        "Months 4–6: wallet launch; onboarding; early verifiers (banks, hospitals, employers)",
        "Months 7–9: ecosystem expansion; tourism integration; outer islands testing",
        "Months 10–12: scale; regional pilots; advanced use cases"
      ]
    },
    {
      no: 17,
      title: "Governance & Capacity Building",
      bullets: [
        "Technical training for SVG teams and partners",
        "Policy/legal support: electronic transactions + data protection",
        "Change management: citizen awareness + ministry champions",
        "Governance: steering committee + working groups + PPP framework"
      ]
    },
    {
      no: 18,
      title: "Investment & Funding Options",
      bullets: [
        "Total range: $420K–$600K (12-month implementation)",
        "Funding strategy: CARDTP allocation, development partners, PPP, regional coordination",
        "ROI: process efficiency savings + reduced fraud + improved inclusion"
      ]
    },
    {
      no: 19,
      title: "Risk Mitigation & Success Factors",
      bullets: [
        "Adoption: start with high-value use cases; carrier partnerships; community engagement",
        "Connectivity: offline QR verification + periodic sync",
        "Cybersecurity: Azure security + audits + cryptographic protections",
        "Success factors: champions, quick wins, private sector buy-in, iterative rollout"
      ]
    },
    {
      no: 20,
      title: "Why Vlinder / Klefki — Commitment to SVG",
      bullets: [
        "Proven island context experience; fast time-to-value",
        "Open standards commitment; ecosystem enablement focus",
        "Capacity building priority; aligned incentives for long-term success"
      ]
    },
    {
      no: 21,
      title: "Regional Vision — SVG as Caribbean Digital Identity Leader",
      bullets: [
        "OECS digital identity hub and reference implementation",
        "CARICOM mobility leadership (work permits + credentials)",
        "Tourism credential standard-setting",
        "Financial inclusion pioneer; readiness for regional digital payments"
      ]
    },
    {
      no: 22,
      title: "Next Steps — How to Get Started",
      bullets: [
        "30 days: steering committee; discovery workshop; secure funding; legal/policy assessment",
        "90 days: pilot launch; early adopter recruitment; public awareness campaign",
        "6–12 months: scale ecosystem; regional integration; sustainability planning"
      ]
    },
    {
      no: 23,
      title: "Call to Action",
      bullets: [
        "Opportunity: $111M momentum, MOSIP foundation underway, 49 projects",
        "Missing piece: activate ecosystem so citizens experience tangible benefits",
        "Timeline: CARDTP ends June 2026 — embed credentials + pilots before close-out",
        "Ask: discovery workshop in Kingstown; launch pilot within 90 days"
      ]
    },
    {
      no: 24,
      title: "Thank You",
      bullets: ["Questions & Discussion", "From Digital Infrastructure to Digital Ecosystem", "Let’s make digital identity work for every Vincentian, from every island."]
    }
  ];

  for (const s of remaining) {
    const slide = pptx.addSlide();
    slide.addText(s.title, { x: 0.7, y: 0.7, w: 12, h: 0.6, fontFace: "Calibri", fontSize: 30, bold: true, color: "1A2745" });
    slide.addText(s.bullets.map((b) => `• ${b}`).join("\n"), {
      x: 0.9,
      y: 1.6,
      w: 12,
      h: 5.4,
      fontFace: "Calibri",
      fontSize: 16,
      color: "2D3748",
      valign: "top"
    });
    addFooter(slide, s.no, total);
  }

  const out = await pptx.write("arraybuffer");
  saveAs(new Blob([out], { type: "application/vnd.openxmlformats-officedocument.presentationml.presentation" }), fileName);
}
