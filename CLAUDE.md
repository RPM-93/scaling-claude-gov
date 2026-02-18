# CLAUDE.md — Scaling Claude in Government: Interactive Briefing Site

## Project Overview

This is a premium interactive single-pane briefing site built as a job application artifact for Anthropic's Customer Success Manager, Public Sector role. It presents observations and lessons learned from 9+ years inside 20+ government agencies, framed as perspective on the challenges of scaling Claude in the public sector.

The site doubles as something Anthropic could use internally even if they don't hire the author. The tone is humble, insightful, and grounded in real experience. It is not a sales pitch. It is not telling Anthropic how to run their business. It is offering perspective from someone who has been embedded in the agencies that will adopt Claude.

## Author

Ryan McCormack — Delivery Director at MTX Group Inc., managing an $18M+ government technology portfolio with full P&L responsibility across 20+ NYC agencies (OTI, OMB, DOHMH, Port Authority, and others). 9+ years in government technology consulting. No support team, no handoff structure — full lifecycle ownership of every customer relationship.

## Design Direction

### Aesthetic
- Dark mode, warm palette inspired by Anthropic's brand identity
- Isometric wireframe 3D composition (reference: IMG_0552.png) as the background scene
- Minimalist, editorial, intentional — every element earns its place
- The quality bar is "Apple product design team would respect this"
- Zero AI slop: no purple gradients, no Inter font, no generic card layouts, no cookie-cutter components

### Reference Image (IMG_0552.png)
Two compositions labeled A and B on dark backgrounds:
- **Composition A**: Layered rectangular frames with internal grid subdivisions, overlapping at different depths and angles. A triangular prism nested inside rectangular frames. Small floating diamond/octahedron accents scattered around.
- **Composition B**: A central cube frame containing a sphere with orbital rings. Surrounding smaller cubes, grid planes, and spherical accents. More volumetric and assembled feeling.
- Both use thin white wireframe strokes on near-black backgrounds
- The feel is architectural, precise, and calm — not flashy or chaotic

### Color Palette (Anthropic-Inspired)
```
Background:   #0e0e0d  (near-black)
Surface:      #161615  (panels, cards)
Border:       #2a2a28  (dividers, edges)
Border hover: #3a3a37
Text:         #e8e6dc  (primary text, warm off-white)
Text dim:     #8a8880  (body text, secondary)
Text muted:   #5a5850  (labels, tertiary)
Accent:       #c15f3c  (Anthropic rust-orange "Crail")
Accent glow:  rgba(193, 95, 60, 0.12)
```

### Typography
- **Headings**: Source Serif 4 (Google Fonts) — weight 300, light and elegant
- **Body**: DM Sans — weight 300/400/500
- **Labels/Mono**: DM Mono — weight 300/400
- No Inter, no Roboto, no system fonts

## Content Structure (10 Panels)

The site is a single viewport with panel-based navigation (no scrolling down a page). Users navigate with arrow keys, scroll wheel, touch swipe, dot navigation, or arrow buttons.

| Panel | Label | Content |
|-------|-------|---------|
| 0 | A Perspective From Inside Government | Hero with title, intro text, 3 stat cards (26%, 83%, 62%) |
| 1 | Observation 01 | "The Resistance Isn't About the Technology" + DOHMH evidence block |
| 2 | Observation 02 | "The Front Door Is Open. The Hard Part Is What Comes After." + stakeholder alignment evidence |
| 3 | Observation 03 | "Government Moves on Its Own Clock" + leadership transition evidence |
| 4 | Observation 04 | "The Unsanctioned Tools Are Already in the Building" + OMB urgency evidence |
| 5 | What I've Learned | "Mission First, Always" + Port Authority $30M recovery evidence |
| 6 | What I've Learned | "The Best Adoption Strategy Makes Itself Unnecessary" + enablement evidence |
| 7 | What I've Learned | "Speak the Language of the People Who Control the Budget" + EBR evidence |
| 8 | Why This Matters to Me | Personal statement on Anthropic's mission — vision text |
| 9 | About | Name, LinkedIn, note about application. NO email, NO phone number. |

### Evidence Blocks (Orange)
Every observation and lesson has an orange-accented evidence block:
- Left border: 2px solid #c15f3c
- Background: rgba(193, 95, 60, 0.12)
- Italic body text describing the personal experience
- Tag line at bottom in mono uppercase: "What this taught me about [topic]"

## Content Rules

- **Do not change any text content.** All copy is finalized in the HTML prototype.
- **No contact info** other than LinkedIn and the note "I've applied for the Customer Success Manager, Public Sector role and would love to connect. My contact information is on my application."
- **Tone**: humble, offering perspective, not prescriptive. "In my experience..." not "You should..."
- **No em dashes** anywhere in the content. Use commas, colons, or restructured sentences.

## Technical Architecture

### Stack
- Next.js 14+ (App Router)
- Three.js with custom GLSL shaders
- Framer Motion or GSAP for UI animation orchestration
- Tailwind CSS + custom CSS for unique elements
- TypeScript
- Deploy: Vercel

### 3D Scene Requirements
- Isometric or near-isometric camera (OrthographicCamera or tightly constrained perspective)
- Geometry that matches the reference image: layered grid planes, nested box frames, floating polyhedra
- Custom GLSL shaders for thin clean wireframe lines, subtle bloom on accent-colored elements, edge fade-out
- Scene reacts to panel changes (camera shifts, elements fade in/out)
- Mouse parallax (damped, subtle)
- Target 60fps, lazy-load scene so content appears first

### Animation Requirements
- Staggered text reveals on panel entry (label > heading > paragraphs > evidence blocks)
- Sequential exit then enter (not simultaneous crossfade)
- Evidence block orange border animates height from 0 to full
- Hero stat numbers count up from 0 on first load (once only)
- Left rail progress line fills between dots as you advance
- Top progress bar (thin accent line) fills based on current panel
- Nav dot labels slide in on hover
- Prefers-reduced-motion: disable 3D, use simple fades

### Mobile
- Left rail collapses to bottom bar or minimal top bar
- Touch/swipe navigation
- All content remains readable
- 3D scene can be simplified or hidden on low-power devices

### Performance
- Under 500KB transferred (excluding fonts)
- GPU-composited layers for animations
- will-change on animated elements
- Intersection Observer for reveal triggers if needed

## Deployment

### Vercel Setup
1. Init git repo, push to GitHub as `scaling-claude-gov`
2. Connect to Vercel
3. Deploy to production
4. Configure custom domain (preferred: `ryanmccormack.dev`)
5. DNS: point from registrar (Cloudflare or Namecheap) to Vercel

### SEO & Meta
- Title: "What a Decade Inside Government Taught Me About AI Adoption | Ryan McCormack"
- Description: "Observations on scaling AI in the public sector, from someone who spent 9+ years inside the agencies that will use Claude."
- OG image: generated card or screenshot with title on dark background
- Favicon: simple geometric shape in accent color (#c15f3c)
- robots.txt: allow indexing

## Files in This Project

- `CLAUDE_CODE_PROMPT.md` — the detailed build instructions
- `CLAUDE.md` — this file, project context and constraints
- `scaling-claude-public-sector.html` — working prototype with all finalized content
- `IMG_0552.png` — reference image for 3D wireframe aesthetic

## Non-Negotiables

1. Do not change the text content
2. No email or phone number anywhere on the site
3. No em dashes in any text
4. Tone stays humble throughout — this is perspective, not prescription
5. Quality over speed — every animation, every spacing choice, every color should feel intentional
6. The 3D scene should enhance, not distract. If it competes with the content for attention, dial it back.
7. The site should work perfectly without JavaScript for content access (progressive enhancement for animations/3D)

## Author's Public Sector Portfolio (Reference Context)

This is background context on the author's actual project experience. It informs the evidence blocks on the site and can be used to ensure accuracy, but should NOT be added as new content panels or sections.

### Key Engagements Referenced in the Site

**DOHMH (Center for Immunization Records)** — Call center modernization on Salesforce Service Cloud. Custom CTI, integrations with NYC health systems, emergency response framework. Led pre-sales through delivery. Established trusted advisor relationship with CIO.

**NYC Department of Cultural Affairs** — Grants management system. Inherited at-risk engagement 30 days from cancellation. Relationship-first recovery. Successfully processed $30M+ in arts funding. Extended beyond initial contract.

**Port Authority of NY & NJ** — Enterprise Service Cloud. Inherited stalled 2-year engagement from previous vendor. Multi-platform integration (Salesforce, Azure, Marketing Cloud, Social Studio). Restored confidence through iterative delivery.

**California Office of Emergency Services** — COVID-19 crisis response. Deployed functioning systems within weeks under pandemic conditions. Maintained state security compliance under extreme time pressure. Remote cross-timezone coordination.

**NYC City Clerk** — Marriage licensing digital transformation. Public-facing portal, payment integration, eligibility validation. Pioneered AI-augmented delivery model. Delivered above margin with 1.5 FTE.

**NYC Department of Sanitation** — Citywide composting program. High political visibility (Mayor's Office). Aggressive timeline. Public-facing signup, case management, geocoding, logistics integration.

**NYC Parks & Recreation** — Worker application platform, scheduling, legacy data migration.

**NYSERDA** — Energy research program management on Salesforce.

**NYS Department of Health** — Rapid process automation under ambiguous requirements.

### Portfolio-Level Metrics
- $18M+ professional services revenue
- 20+ government implementations
- 15+ direct reports
- 95% on-time delivery
- Consistent margin outperformance
- Agencies span: emergency services, public health, cultural affairs, environmental services, transportation, energy, vital records
