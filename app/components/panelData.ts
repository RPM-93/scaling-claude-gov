export interface EvidenceBlock {
  text: string;
  tag: string;
}

export interface StatItem {
  value: number;
  suffix: string;
  desc: string;
}

export interface PanelData {
  index: number;
  label: string;
  navLabel: string;
  type: "hero" | "observation" | "lesson" | "vision" | "about";
  heading?: string;
  headingHtml?: string;
  paragraphs: string[];
  paragraphsHtml?: string[];
  stats?: StatItem[];
  evidence?: EvidenceBlock;
  visionTexts?: string[];
  visionCoda?: string;
}

export const panels: PanelData[] = [
  {
    index: 0,
    label: "A Perspective From Inside Government",
    navLabel: "Intro",
    type: "hero",
    headingHtml:
      'What a Decade Inside Government Agencies <em>Taught Me About AI Adoption</em>',
    paragraphs: [
      "I've spent 9+ years embedded in public sector agencies, not as an observer, but as the person responsible for making technology work in environments where the stakes are public trust and the margin for error is zero.",
      "What follows are patterns I've seen repeat across 20+ agencies. They're offered as perspective from someone who deeply admires what Anthropic is building and believes Claude for Government has the potential to fundamentally improve how government serves citizens.",
    ],
    stats: [
      { value: 26, suffix: "%", desc: "of gov orgs have integrated AI across operations" },
      { value: 83, suffix: "%", desc: "of gen AI pilots fail to reach production" },
      { value: 62, suffix: "%", desc: "cite privacy & security as top barrier" },
    ],
  },
  {
    index: 1,
    label: "Observation 01",
    navLabel: "Resistance",
    type: "observation",
    heading: "The Resistance Isn't About the Technology",
    paragraphsHtml: [
      'In my experience, most government employees aren\'t opposed to better tools. What I\'ve watched them navigate is something deeper: a shift from <strong>"my value is what I know and what I process"</strong> to <strong>"my value is how I think, connect, and lead."</strong>',
      "A benefits claims processor who handles 40 cases a day isn't worried about a chatbot. They're trying to understand what their role looks like when AI handles 400. I've found that the most effective way through this isn't demonstrating capability. It's helping people see what they become when the routine is handled and they can focus on what actually matters.",
      "That's a conversation that requires trust, and trust takes time to build inside agencies.",
    ],
    paragraphs: [],
    evidence: {
      text: "At DOHMH, I led the modernization of the Center for Immunization Records call center, a system handling thousands of daily inquiries from healthcare providers and parents. The team processing those calls wasn't resistant to the new platform. They were worried about being reduced to button-pushers. The breakthrough came when we reframed the solution as something that handled routine lookups so they could spend their time on the complex cases that actually needed human judgment, like reconciling records across multiple health systems. Adoption followed naturally once people saw themselves in the future state.",
      tag: "What this taught me about the human side of adoption",
    },
  },
  {
    index: 2,
    label: "Observation 02",
    navLabel: "Adoption Gap",
    type: "observation",
    heading: "The Front Door Is Open. The Hard Part Is What Comes After.",
    paragraphsHtml: [
      "The OneGov deal at $1 per agency is a remarkable achievement in government procurement. But from what I've seen delivering technology to agencies, procurement is just the beginning. The real work starts after the contract is signed.",
      "An agency CIO who signs on still has to answer to their ISSM about data classification, to program directors about workflow disruption, to their union about workforce impact, and to appropriators about ROI. Often simultaneously, with competing priorities.",
      'The gap between <strong>"we have access"</strong> and <strong>"this is transforming how we serve citizens"</strong> is where I\'ve watched a lot of government technology investments stall. In my experience, closing that gap is less about the product and more about understanding the stakeholder dynamics unique to each agency.',
    ],
    paragraphs: [],
    evidence: {
      text: "At NYC's Department of Cultural Affairs, I inherited a grants management engagement that was 30 days from cancellation. Executive sponsorship existed, the contract was signed, and the technical plan was sound. But the ISSM had security concerns no one had surfaced, the program team felt blindsided by workflow changes, and trust between the agency and our team had collapsed. I spent the first weeks just listening, rebuilding credibility through transparency before touching a single technical deliverable. That engagement went on to successfully process and release $30M+ in arts funding to organizations across the city.",
      tag: "What this taught me about stakeholder alignment",
    },
  },
  {
    index: 3,
    label: "Observation 03",
    navLabel: "Timing",
    type: "observation",
    heading: "Government Moves on Its Own Clock",
    paragraphsHtml: [
      "Enterprise SaaS companies measure adoption in weeks and quarters. Government operates on fiscal year budget cycles, multi-year appropriations, and political timelines. I've seen CIOs who championed a technology initiative get replaced before it reached full deployment.",
      'What I\'ve learned from that is the value of <strong>building outcomes that are durable enough to survive leadership transitions, budget negotiations, and shifting political winds.</strong> The metrics that tend to matter most aren\'t usage dashboards. They\'re the ones that show up in a budget justification document and give the next person in the chair a reason to keep going.',
    ],
    paragraphs: [],
    evidence: {
      text: "I've managed engagements where the executive sponsor who championed the project left mid-deployment. The ones that survived had something in common: we had already built enough documented value that the incoming leadership could see the ROI without needing to be sold on it again. I learned to build for the person who inherits the initiative, not just the person who starts it.",
      tag: "What this taught me about building durable value",
    },
  },
  {
    index: 4,
    label: "Observation 04",
    navLabel: "Shadow AI",
    type: "observation",
    heading: "The Unsanctioned Tools Are Already in the Building",
    paragraphsHtml: [
      "Research suggests over 70% of knowledge workers already use generative AI outside official policy. In government, this has real compliance implications. I've seen agency employees reach for consumer tools on sensitive work because official channels were too slow or simply didn't exist.",
      "This is part of why I find the Claude for Government story so compelling. <strong>The security and compliance infrastructure is already built.</strong> The urgency now is getting the sanctioned platform adopted before the unsanctioned ones create problems that are much harder to fix after the fact.",
    ],
    paragraphs: [],
    evidence: {
      text: "During COVID-19, I was deployed to California's Office of Emergency Services where the state needed functioning technology systems within weeks, not months. Traditional procurement timelines were impossible. We delivered critical emergency response capability under extreme time pressure while maintaining full state security compliance. I learned that when the mission is urgent enough, speed of deployment isn't just an efficiency play. It's the difference between a system that serves people when they need it and one that arrives after the moment has passed.",
      tag: "What this taught me about urgency in adoption",
    },
  },
  {
    index: 5,
    label: "What I've Learned",
    navLabel: "Mission",
    type: "lesson",
    heading: "Mission First, Always",
    paragraphsHtml: [
      'Every government agency I\'ve worked with exists to serve a mission. What I\'ve found is that the moment a conversation leads with product capabilities instead of mission outcomes, the room shifts. The question that has consistently opened doors for me is: <strong>"What does your team spend the most time on that keeps them from the work that actually matters?"</strong>',
      'That reframe changes everything. "10x faster processing" is impressive. "Your team can redirect 200 hours per month from data entry to case investigation" is what gets a Deputy Commissioner to lean in.',
    ],
    paragraphs: [],
    evidence: {
      text: "When I was brought into a failing engagement at the Port Authority of NY & NJ, the project had been stalled for two years under a previous vendor. Business stakeholders were frustrated and skeptical that the project would ever deliver value. The path forward wasn't a better technical solution. It started with sitting across from frustrated stakeholders, listening to understand the root causes, and demonstrating momentum through iterative delivery of working functionality. That engagement grew into a multi-year partnership spanning Service Cloud, Microsoft Azure, Marketing Cloud, and Social Studio integrations.",
      tag: "What this taught me about earning trust",
    },
  },
  {
    index: 6,
    label: "What I've Learned",
    navLabel: "Champions",
    type: "lesson",
    heading: "The Best Adoption Strategy Makes Itself Unnecessary",
    paragraphsHtml: [
      "Government agencies are, in my experience, structurally cautious about vendor dependence. If adoption requires the vendor's team to be in the room, it becomes fragile the moment a contract is questioned.",
      "The pattern I've seen work best is investing early in internal champions: people inside the agency who are curious, influential with their teams, and motivated by the mission impact. <strong>When the budget review comes around, you want the agency's own people making the case, not the vendor.</strong>",
    ],
    paragraphs: [],
    evidence: {
      text: "The enablement programs I built across my portfolio were designed to reduce dependency on my team while increasing adoption. At the NYC City Clerk's office, I mentored the assigned business analyst in using AI tooling for rapid prototyping, which accelerated client sign-off and reduced development cycles. We delivered the entire marriage licensing digital transformation above margin with 1.5 FTE. Counterintuitive in a services business, but building agency capacity to operate independently is the only approach I've seen produce durable results in government.",
      tag: "What this taught me about sustainable adoption",
    },
  },
  {
    index: 7,
    label: "What I've Learned",
    navLabel: "Metrics",
    type: "lesson",
    heading: "Speak the Language of the People Who Control the Budget",
    paragraphsHtml: [
      "In government, ROI doesn't live in a dashboard. It lives in a budget justification document, a congressional briefing, or an agency performance report. I've learned to measure impact in terms that government leadership actually uses: <strong>FTE hours redirected, processing time reduction on citizen-facing services, compliance audit pass rates, constituent response times.</strong>",
    ],
    paragraphs: [],
    evidence: {
      text: "Every Executive Business Review I run is built around this principle. I don't show agency leadership usage metrics. I show them a story: here's what your team accomplished, here's the impact on your mission, here's why continued investment is justified. In government, that story will be scrutinized by people whose job is to find reasons to cut costs. It has to hold up.",
      tag: "What this taught me about proving value",
    },
  },
  {
    index: 8,
    label: "Why This Matters to Me",
    navLabel: "Why Anthropic",
    type: "vision",
    paragraphs: [],
    visionTexts: [
      "I built this because I genuinely believe in what Anthropic is doing. The combination of frontier AI capability with real safety research and the compliance posture to earn government trust is rare. Most companies have one or two of those. Anthropic has all three.",
      "After nearly a decade of making technology work inside government agencies, I know how hard it is to earn trust in these environments and how meaningful it is when the technology actually improves how citizens are served. Claude for Government has the potential to do that at a scale I haven't seen before.",
    ],
    visionCoda:
      "I want to be part of making that happen. Not because it's a job, but because it's the intersection of everything I've built my career around and everything I believe technology should be used for.",
  },
  {
    index: 9,
    label: "About",
    navLabel: "About",
    type: "about",
    heading: "Ryan McCormack",
    paragraphs: [],
  },
];
