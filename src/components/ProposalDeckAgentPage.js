import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Bot,
  Brain,
  CheckCircle2,
  Clock3,
  FileText,
  Layers3,
  Lightbulb,
  Rocket,
  Search,
  ShieldCheck,
  Sparkles,
  Wand2,
} from "lucide-react";

const referenceProducts = [
  {
    name: "Chronicle",
    url: "https://www.chroniclehq.com/ai-presentation-maker",
    summary:
      "Best reference for premium storytelling flow, polished layouts, branded consistency, and a presentation experience that feels high-end instead of generic.",
    takeaways: [
      "Narrative-first generation instead of random slide filling",
      "Premium motion, widgets, and visual taste",
      "Strong fit for business and investor-style decks",
    ],
  },
  {
    name: "Gamma",
    url: "https://gamma.app/products/presentations",
    summary:
      "Best reference for speed, flexible AI creation, easy sharing, and multi-format export for fast-moving teams.",
    takeaways: [
      "Very fast prompt-to-deck workflow",
      "Strong sharing and collaboration model",
      "Useful benchmark for PDF, PPT, and web output",
    ],
  },
  {
    name: "Beautiful.ai",
    url: "https://beautiful.ai/blog/introducing-the-create-with-ai-workflow",
    summary:
      "Best reference for structured, outline-first authoring and keeping design quality consistent while the user iterates.",
    takeaways: [
      "Outline-first workflow reduces bad AI output",
      "Design system keeps slides clean while editing",
      "Slide-level iteration improves quality without restarting",
    ],
  },
];

const buildPrinciples = [
  "The deck UI already exists, so the main job is to make it work end to end.",
  "Start with deck generation first, then expand into the broader Muse agent later.",
  "Use an outline-first flow so the story is clear before final slides are generated.",
  "Aim for Chronicle-level quality with a simple and fast user experience.",
  "Keep approval for important actions like emails, project creation, or automation.",
  "Use the right model for each step to keep quality high and costs under control.",
];

const proposalHighlights = [
  "Existing deck UI and interaction surface can be kept and wired to a real backend workflow",
  "AI-powered deck generation from a prompt, project brief, or uploaded notes",
  "Automatic outline, slide writing, visual planning, and final deck assembly",
  "Downloadable output in PPTX, PDF, and shareable presentation formats",
];

const initialReleaseScope = {
  included: [
    "Connect the existing deck UI to real AI generation",
    "Support prompt input, deck modes, themes, and slide count",
    "Add follow-up questions when more context is needed",
    "Generate outline first, then generate full slides",
    "Support PPTX, PDF, and shareable output",
    "Save generated deck state so users can come back to it",
  ],
  nextPhase: [
    "Deeper research and source grounding",
    "Stronger image generation and chart support",
    "More advanced regeneration and editing controls",
    "Broader Muse actions outside deck generation",
  ],
  outOfScope: [
    "Full software automation from day one",
    "Unapproved external actions such as sending emails automatically",
    "A full rebuild of the current deck UI",
  ],
};

const workstreams = [
  {
    icon: Wand2,
    title: "1. AI Deck Generation MVP",
    description:
      "The first step is connecting the existing UI to a real prompt-to-deck system.",
    items: [
      "Connect the current deck UI fields, modes, and theme choices to real generation logic",
      "Project intake chat: topic, audience, tone, goal, presentation length, brand style",
      "Outline generation with approval before slide rendering",
      "Slide-by-slide content generation",
      "Theme-aware layouts so results look clean and consistent",
      "Export to PDF, PPTX, and shareable web presentation",
    ],
  },
  {
    icon: Search,
    title: "2. Research Layer",
    description:
      "Once the core generator is working well, add research to improve the deck content.",
    items: [
      "Web research and source summarization",
      "Structured research memory for each project",
      "Optional image suggestions, charts, and citations",
      "Company context gathering for proposals, pitches, and case-study decks",
    ],
  },
  {
    icon: Bot,
    title: "3. Muse Agent Layer",
    description:
      "After the deck flow is reliable, Muse can grow into a deeper agent.",
    items: [
      "Understands projects, clients, and internal app context",
      "Can propose project scope, timelines, and draft outreach",
      "Can prepare assets or forms before a human confirms",
      "Eventually can trigger software actions through approved tools and guardrails",
    ],
  },
];

const architecture = [
  {
    title: "Frontend",
    body:
      "The frontend already exists. The main job is connecting the current UI to real backend responses, loading states, previews, and exports.",
  },
  {
    title: "Backend orchestration",
    body:
      "A backend workflow that handles research, outlining, slide generation, assets, exports, and saved projects.",
  },
  {
    title: "Model strategy",
    body:
      "Use stronger models for outline and story, cheaper models for lighter tasks, and image models only when needed.",
  },
  {
    title: "Data + memory",
    body:
      "Store briefs, outlines, generated slides, assets, exports, and project history so the system can continue where it left off.",
  },
];

const recommendations = [
  {
    title: "Prompting strategy",
    text:
      "The best results will come from a multi-step flow, not one giant prompt. Intake -> clarify -> outline -> generate -> refine.",
  },
  {
    title: "Model approach",
    text:
      "Do not rely on only one provider. Keep flexibility to use Claude, OpenAI, Gemini, or strong open models based on quality and cost.",
  },
  {
    title: "Agent framework",
    text:
      "If the current app already has orchestration, reuse it. Otherwise, start simple and add heavier agent tooling only when it is really needed.",
  },
  {
    title: "Design quality",
    text:
      "A deck generator wins on quality. The system needs solid layouts, typography, spacing, and visual rules so every output feels polished.",
  },
];

const workflowSteps = [
  {
    title: "1. User input",
    body:
      "The user fills in the existing deck UI with the project description, mode, theme, slide count, tone, and any constraints.",
  },
  {
    title: "2. Clarification and research",
    body:
      "The agent asks follow-up questions when needed and can use web or uploaded context.",
  },
  {
    title: "3. Outline approval",
    body:
      "The system produces a draft slide outline first so the structure can be reviewed before full slide generation.",
  },
  {
    title: "4. Slide generation",
    body:
      "The AI writes the slide content and visual direction for each slide.",
  },
  {
    title: "5. Design and assets",
    body:
      "The deck is mapped into layouts, with generated or sourced visuals added where helpful.",
  },
  {
    title: "6. Export and delivery",
    body:
      "The deck is assembled and exported as PPTX, PDF, and shareable web output.",
  },
];

const openSourceTools = [
  {
    title: "LLMs for content and planning",
    body:
      "Use Claude, OpenAI, or Gemini for high-quality generation, with room to test open models like GLM for lower-cost paths.",
  },
  {
    title: "Slide generation layer",
    body:
      "A slide assembly service can use tools like python-pptx to turn structured slide data into real PPTX exports.",
  },
  {
    title: "Image generation and sourcing",
    body:
      "Use an image API for custom visuals when needed and combine that with stock-image sources.",
  },
  {
    title: "Agent orchestration",
    body:
      "A lightweight workflow engine can handle tools, research, and memory. LangChain or LangGraph can be added later if needed.",
  },
  {
    title: "Open-source references",
    body:
      "Projects like Presenton are useful references for prompt-to-deck workflows, templates, and exports.",
  },
];

const resourcesNeeded = [
  "Access to at least one high-quality LLM provider and one fallback or lower-cost model path",
  "Presentation export tooling for PPTX and PDF generation",
  "Image generation or stock image integrations for visuals",
  "A backend service for orchestration, storage, and export jobs",
  "Time for prompt tuning, backend wiring, export reliability, and generation quality testing",
];

const references = [
  {
    label: "Chronicle AI Presentation Maker",
    url: "https://www.chroniclehq.com/ai-presentation-maker",
  },
  {
    label: "Gamma Presentations",
    url: "https://gamma.app/products/presentations",
  },
  {
    label: "Beautiful.ai Create with AI Workflow",
    url: "https://beautiful.ai/blog/introducing-the-create-with-ai-workflow",
  },
  {
    label: "python-pptx documentation",
    url: "https://python-pptx.readthedocs.io/",
  },
  {
    label: "Presenton open-source reference",
    url: "https://github.com/presenton/presenton",
  },
];

const timeline = [
  {
    phase: "Week 1",
    detail:
      "Audit the existing UI, map every control to backend behavior, define the slide schema, and finalize the generation workflow.",
  },
  {
    phase: "Week 2",
    detail:
      "Implement the AI intake flow, follow-up questions, outline-first generation, and the first working backend pipeline.",
  },
  {
    phase: "Week 3",
    detail:
      "Add regeneration, theme-aware outputs, visuals, and stronger refinement loops while connecting the results back into the existing UI.",
  },
  {
    phase: "Week 4",
    detail:
      "Finish PPTX and PDF export, project save/load, error handling, research-assisted generation improvements, and production polish.",
  },
  {
    phase: "Phase 2 extension",
    detail:
      "Expand Muse into a true agent that can understand the wider software and assist with internal actions behind approval gates.",
  },
];

const deliverables = [
  "A working implementation plan for the existing deck UI",
  "MVP scope focused on making prompt-to-deck generation actually work",
  "Phased roadmap from working deck generation to a deeper Muse agent",
  "Recommended provider strategy for quality plus cost control",
  "Clear implementation order, risks, and timeline",
];

const risks = [
  "If we jump straight into full autonomy, complexity and cost will rise too early.",
  "If we use a one-shot prompt, slide quality will look generic and inconsistent.",
  "If design rules are weak, the output may feel like AI filler instead of premium presentation work.",
  "If external actions are fully autonomous too early, product trust and safety will suffer.",
];

const futureUnlocks = [
  "Research-assisted deck generation with stronger business context",
  "Proposal and pitch decks with richer source grounding",
  "Draft outreach emails and project summaries behind approval",
  "A broader Muse assistant that can help across the product",
];

const alignmentQuestions = [
  "Which export formats are required in the first release?",
  "Should users approve the outline before full slide generation starts?",
  "How much web research should be included in the first version?",
  "What actions should always require user approval?",
];

const sectionCard =
  "rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-sm shadow-[0_20px_60px_rgba(0,0,0,0.22)]";

const badgeStyle =
  "inline-flex items-center gap-2 rounded-full border border-[#d7ff00]/30 bg-[#d7ff00]/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-[#d7ff00]";

const SectionTitle = ({ icon: Icon, eyebrow, title, description }) => (
  <div className="space-y-4">
    <div className={badgeStyle}>
      <Icon size={14} />
      <span>{eyebrow}</span>
    </div>
    <div className="space-y-3">
      <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      <p className="max-w-3xl text-base leading-7 text-white/70 sm:text-lg">
        {description}
      </p>
    </div>
  </div>
);

const ProposalDeckAgentPage = () => {
  return (
    <main
      className="min-h-screen text-white"
      style={{
        background:
          "radial-gradient(circle at top left, rgba(215,255,0,0.12), transparent 30%), radial-gradient(circle at top right, rgba(96,165,250,0.12), transparent 25%), linear-gradient(180deg, #050505 0%, #0b0b0b 45%, #111111 100%)",
        fontFamily: "'Space Grotesk', 'Space Mono', sans-serif",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/80 transition hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
          >
            <ArrowLeft size={16} />
            <span>Back to portfolio</span>
          </Link>
        </div>

        <section className={`${sectionCard} overflow-hidden px-6 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-14`}>
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="space-y-6">
              <div className={badgeStyle}>
                <Sparkles size={14} />
                <span>Muse AI Deck + Agent Proposal</span>
              </div>

              <div className="space-y-5">
                <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                  An AI presentation agent that turns project ideas into polished, downloadable decks.
                </h1>
                <p className="max-w-3xl text-lg leading-8 text-white/72">
                  The client already has the deck-generation interface in place.
                  The proposal now is to turn that existing placeholder flow into
                  a real working AI presentation system where a user can describe
                  a project, answer follow-up questions, and receive a complete
                  deck with strong structure, good design, and export-ready output.
                  Once that is working well, Muse can expand into research, project
                  planning, and software-assisted automation.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/45">
                    Primary Goal
                  </p>
                  <p className="mt-3 text-sm leading-6 text-white/80">
                    Chronicle-level deck quality with a clearer AI workflow.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/45">
                    Recommended Start
                  </p>
                  <p className="mt-3 text-sm leading-6 text-white/80">
                    Make the existing deck feature work before adding broader automation.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/45">
                      Delivery Estimate
                  </p>
                  <p className="mt-3 text-sm leading-6 text-white/80">
                      4 weeks at around 6-8 hours per day.
                  </p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {proposalHighlights.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/8 bg-black/20 p-4"
                  >
                    <p className="text-sm leading-7 text-white/75">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[28px] border border-[#d7ff00]/20 bg-[#080808] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
              <div className="mb-5 flex items-center gap-3">
                <div className="rounded-2xl bg-[#d7ff00]/12 p-3 text-[#d7ff00]">
                  <Brain size={22} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">
                    Product Positioning
                  </p>
                  <p className="text-sm text-white/55">
                    Presentation direction
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-sm leading-7 text-white/72">
                <p>
                  We should position this as an <span className="text-white">AI creative
                  director for presentations</span>, not just a slide generator.
                </p>
                <p>
                  The first version should be focused on <span className="text-white">beautiful
                    deck creation, story structure, visuals, exports, and refinement</span>.
                </p>
                <p>
                  The broader Muse agent can then grow into research, client
                  prep, project setup, and software automation with approval
                  gates.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className={`${sectionCard} p-6 sm:p-8`}>
            <SectionTitle
              icon={Lightbulb}
              eyebrow="Core Product Direction"
              title="Approach"
              description="The focus is simple: make the current deck feature work well first, then expand Muse later."
            />

            <div className="mt-8 space-y-4">
              {buildPrinciples.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-white/8 bg-black/20 p-4"
                >
                  <CheckCircle2 className="mt-0.5 shrink-0 text-[#d7ff00]" size={18} />
                  <p className="text-sm leading-7 text-white/75">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={`${sectionCard} p-6 sm:p-8`}>
            <SectionTitle
              icon={Layers3}
              eyebrow="Reference Products"
              title="What the best tools are doing right"
              description="These products are useful references, but the final build should stay focused and practical."
            />

            <div className="mt-8 space-y-4">
              {referenceProducts.map((product) => (
                <a
                  key={product.name}
                  href={product.url}
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-2xl border border-white/8 bg-black/20 p-5 transition hover:border-white/15 hover:bg-black/30"
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-xl font-semibold text-white">{product.name}</h3>
                    <span className="text-xs uppercase tracking-[0.2em] text-[#d7ff00]">
                      Reference
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-white/72">
                    {product.summary}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {product.takeaways.map((takeaway) => (
                      <span
                        key={takeaway}
                        className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-white/75"
                      >
                        {takeaway}
                      </span>
                    ))}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className={`${sectionCard} mt-10 p-6 sm:p-8`}>
          <SectionTitle
            icon={Sparkles}
            eyebrow="Proposal Summary"
            title="What is being proposed"
            description="This is not a UI rebuild. It is a plan to connect the existing feature to a real AI deck workflow."
          />

          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            <div className="rounded-3xl border border-white/8 bg-black/20 p-6">
              <h3 className="text-xl font-semibold text-white">Core feature</h3>
              <p className="mt-3 text-sm leading-7 text-white/72">
                Users interact with the existing deck screen, choose a mode or
                theme, describe a project, and the system generates a polished
                presentation with clear structure and exportable output.
              </p>
            </div>
            <div className="rounded-3xl border border-white/8 bg-black/20 p-6">
              <h3 className="text-xl font-semibold text-white">Product goal</h3>
              <p className="mt-3 text-sm leading-7 text-white/72">
                Match Chronicle on storytelling and presentation polish, while
                keeping the workflow simple and fast like Gamma.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-3">
          <div className={`${sectionCard} p-6 sm:p-8`}>
            <SectionTitle
              icon={CheckCircle2}
              eyebrow="Initial Release"
              title="Included"
              description="This is the core scope for the first version."
            />
            <div className="mt-8 space-y-3">
              {initialReleaseScope.included.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 shrink-0 text-[#d7ff00]" size={18} />
                  <p className="text-sm leading-7 text-white/75">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={`${sectionCard} p-6 sm:p-8`}>
            <SectionTitle
              icon={Rocket}
              eyebrow="Next Phase"
              title="Can Be Added Later"
              description="These are strong follow-up improvements after the first release."
            />
            <div className="mt-8 space-y-3">
              {initialReleaseScope.nextPhase.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <div className="mt-[10px] h-1.5 w-1.5 rounded-full bg-[#d7ff00]" />
                  <p className="text-sm leading-7 text-white/75">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={`${sectionCard} p-6 sm:p-8`}>
            <SectionTitle
              icon={ShieldCheck}
              eyebrow="Out Of Scope"
              title="Not In The First Release"
              description="These should wait until the core deck flow is working well."
            />
            <div className="mt-8 space-y-3">
              {initialReleaseScope.outOfScope.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <div className="mt-[10px] h-1.5 w-1.5 rounded-full bg-[#d7ff00]" />
                  <p className="text-sm leading-7 text-white/75">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={`${sectionCard} mt-10 p-6 sm:p-8 lg:p-10`}>
          <SectionTitle
            icon={Rocket}
            eyebrow="Phased Delivery"
            title="Build order and feature plan"
            description="The work should be done in phases so the first release stays focused."
          />

          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {workstreams.map(({ icon: Icon, title, description, items }) => (
              <div
                key={title}
                className="rounded-3xl border border-white/8 bg-black/20 p-6"
              >
                <div className="mb-5 flex items-center gap-3">
                  <div className="rounded-2xl bg-white/[0.06] p-3 text-[#d7ff00]">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-xl font-semibold text-white">{title}</h3>
                </div>
                <p className="text-sm leading-7 text-white/72">{description}</p>
                <div className="mt-5 space-y-3">
                  {items.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <div className="mt-[10px] h-1.5 w-1.5 rounded-full bg-[#d7ff00]" />
                      <p className="text-sm leading-7 text-white/75">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className={`${sectionCard} p-6 sm:p-8`}>
            <SectionTitle
              icon={Bot}
              eyebrow="Workflow"
              title="How the feature would work"
              description="The user flow should stay simple while the backend handles the generation steps."
            />

            <div className="mt-8 space-y-4">
              {workflowSteps.map((step) => (
                <div
                  key={step.title}
                  className="rounded-2xl border border-white/8 bg-black/20 p-5"
                >
                  <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-white/72">{step.body}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-white/8 bg-black/20 p-5">
              <h3 className="text-lg font-semibold text-white">Dedicated product route</h3>
              <p className="mt-2 text-sm leading-7 text-white/72">
                The route and UI shell already appear to exist in the client
                product. The remaining work is to connect that screen to prompt
                intake, follow-up questions, generation jobs, preview states, and
                export actions.
              </p>
            </div>
          </div>

          <div className={`${sectionCard} p-6 sm:p-8`}>
            <SectionTitle
              icon={Brain}
              eyebrow="Models And Tools"
              title="Technology direction"
              description="Keep the stack practical while still leaving room for strong results and cost control."
            />

            <div className="mt-8 space-y-4">
              {openSourceTools.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/8 bg-black/20 p-5"
                >
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-white/72">{item.body}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-white/8 bg-black/20 p-5">
              <h3 className="text-lg font-semibold text-white">Practical stack recommendation</h3>
              <p className="mt-2 text-sm leading-7 text-white/72">
                Use top-tier hosted models for the best output, keep an open-model
                path for lower-cost use cases, and use a stable export layer so
                the final presentation stays consistent.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className={`${sectionCard} p-6 sm:p-8`}>
            <SectionTitle
              icon={FileText}
              eyebrow="Recommended Stack"
              title="Technology Stack"
              description="This keeps the implementation practical and flexible without adding too much overhead early on."
            />

            <div className="mt-8 space-y-4">
              {architecture.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/8 bg-black/20 p-5"
                >
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-white/72">{item.body}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-[#d7ff00]/20 bg-[#d7ff00]/8 p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#d7ff00]">
                Important recommendation
              </p>
              <p className="mt-3 text-sm leading-7 text-white/80">
                For the first version, I would avoid building a huge agent system
                from day one. The better approach is a structured workflow engine
                behind the existing UI, then upgrade it into a fuller agent once
                the presentation quality and user flow are proven.
              </p>
            </div>
          </div>

          <div className={`${sectionCard} p-6 sm:p-8`}>
            <SectionTitle
              icon={ShieldCheck}
              eyebrow="Execution Notes"
              title="Key product recommendations"
              description="These decisions matter most for quality, cost, and reliability."
            />

            <div className="mt-8 space-y-4">
              {recommendations.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/8 bg-black/20 p-5"
                >
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-white/72">{item.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-white/8 bg-black/20 p-5">
              <h3 className="text-lg font-semibold text-white">Why this structure matters</h3>
              <p className="mt-2 text-sm leading-7 text-white/72">
                Tools like Chronicle and Beautiful.ai work better because they do
                not jump straight into final slides. They move through structure,
                story, then design. That same approach should be used here.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div className={`${sectionCard} p-6 sm:p-8`}>
            <SectionTitle
              icon={Clock3}
              eyebrow="Timeline"
              title="Suggested delivery timeline"
              description="This timeline is realistic for building a strong first version."
            />

            <div className="mt-8 space-y-4">
              {timeline.map((item) => (
                <div
                  key={item.phase}
                  className="grid gap-3 rounded-2xl border border-white/8 bg-black/20 p-4 sm:grid-cols-[120px_1fr]"
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#d7ff00]">
                    {item.phase}
                  </p>
                  <p className="text-sm leading-7 text-white/74">{item.detail}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-[#d7ff00]/20 bg-[#d7ff00]/8 p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#d7ff00]">
                Estimated effort
              </p>
              <p className="mt-3 text-sm leading-7 text-white/80">
                Estimated delivery is <span className="text-white">4 weeks</span> with a working rhythm of
                <span className="text-white"> 6 to 8 hours per day</span>. That gives enough room to build a
                solid first version.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className={`${sectionCard} p-6 sm:p-8`}>
              <SectionTitle
                icon={CheckCircle2}
                eyebrow="Deliverables"
                title="Included In This Plan"
              description="A simple scope for how the feature should be built."
              />
              <div className="mt-8 space-y-3">
                {deliverables.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 shrink-0 text-[#d7ff00]" size={18} />
                    <p className="text-sm leading-7 text-white/75">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className={`${sectionCard} p-6 sm:p-8`}>
              <SectionTitle
                icon={FileText}
                eyebrow="Resources Needed"
                title="Requirements"
              description="The first release does not need a massive stack, but it does need the right core pieces."
              />
              <div className="mt-8 space-y-3">
                {resourcesNeeded.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="mt-[10px] h-1.5 w-1.5 rounded-full bg-[#d7ff00]" />
                    <p className="text-sm leading-7 text-white/75">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className={`${sectionCard} p-6 sm:p-8`}>
              <SectionTitle
                icon={Search}
                eyebrow="Reference Links"
                title="Key sources used for direction"
              description="These references support the product direction and workflow."
              />
              <div className="mt-8 space-y-3">
                {references.map((reference) => (
                  <a
                    key={reference.url}
                    href={reference.url}
                    target="_blank"
                    rel="noreferrer"
                    className="block rounded-2xl border border-white/8 bg-black/20 p-4 text-sm leading-7 text-white/75 transition hover:border-white/15 hover:text-white"
                  >
                    {reference.label}
                  </a>
                ))}
              </div>
            </div>

            <div className={`${sectionCard} p-6 sm:p-8`}>
              <SectionTitle
                icon={ShieldCheck}
                eyebrow="Risks"
                title="Risks To Avoid"
              description="These are the main risks to avoid."
              />
              <div className="mt-8 space-y-3">
                {risks.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="mt-[10px] h-1.5 w-1.5 rounded-full bg-[#d7ff00]" />
                    <p className="text-sm leading-7 text-white/75">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className={`${sectionCard} p-6 sm:p-8`}>
            <SectionTitle
              icon={Sparkles}
              eyebrow="Future Potential"
              title="What This Unlocks Later"
              description="Once the first release is working well, this foundation makes the next steps much easier."
            />
            <div className="mt-8 space-y-3">
              {futureUnlocks.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <div className="mt-[10px] h-1.5 w-1.5 rounded-full bg-[#d7ff00]" />
                  <p className="text-sm leading-7 text-white/75">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={`${sectionCard} p-6 sm:p-8`}>
            <SectionTitle
              icon={Lightbulb}
              eyebrow="Alignment"
              title="Key Questions Before Build"
              description="These points should be confirmed early so the implementation stays focused."
            />
            <div className="mt-8 space-y-3">
              {alignmentQuestions.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <div className="mt-[10px] h-1.5 w-1.5 rounded-full bg-[#d7ff00]" />
                  <p className="text-sm leading-7 text-white/75">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-10 rounded-[32px] border border-[#d7ff00]/20 bg-gradient-to-br from-[#d7ff00]/10 via-white/[0.04] to-transparent px-6 py-8 sm:px-8 sm:py-10">
          <div className="max-w-4xl space-y-5">
            <p className={badgeStyle}>Final Recommendation</p>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Start by making the current deck feature fully work, then turn Muse
              into a deeper agent on top of that foundation.
            </h2>
            <p className="text-base leading-8 text-white/78 sm:text-lg">
              If we make the presentation flow work well first, the client gets
              value immediately. After that, the agent layer becomes much easier
              to plan and build.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ProposalDeckAgentPage;
