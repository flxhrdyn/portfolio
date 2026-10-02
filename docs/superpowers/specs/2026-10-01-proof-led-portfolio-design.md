# Proof-Led Portfolio Design

## Goal

Make the portfolio cleaner, more minimal, and more distinctive through the strength of its work and implementation. Take cues from the current Vercel homepage's open spacing, strong type, and precise geometry, and Scale's media-led project storytelling and concrete proof. Preserve the chat-first purpose, all existing copy, and the existing monochrome identity while making the web craft visible through responsive composition, well-made project media, clear UX, full-stack evidence, and restrained interaction.

“Old-school Computer Science” means mature engineering judgment and substance over spectacle. It does not mean retro terminal chrome, a lab-notebook costume, or decorative technical motifs.

## Audience and success

Recruiters, hiring managers, and clients arrive with limited time. They should understand Felix's role quickly, see real work and technical depth without asking the chat first, and have a clear route to ask a question or contact him.

Success means:

- The design feels authored for Felix through the actual projects, demos, and technical detail.
- The first screen has a clear identity, short proposition, primary chat action, and one supporting route.
- Existing interface copy remains unchanged throughout the redesign.
- The project list gives Amon Hen and Angrist enough media and context to communicate what each tool does.
- Existing project content remains intact apart from the two new project entries; the redesign does not add new case-study sections or architecture diagrams.
- No text, video, or control is clipped at 320px and above.
- Animation improves comprehension or feedback, follows one calm motion language, and respects reduced-motion preferences.
- Theme behavior, chat status, and video controls are truthful and accessible.

## Visual direction

Use a quiet editorial layout: generous negative space, clear alignment, strong but controlled headline sizing, concise copy, and sharp contrast. Keep Geist Sans for reading and display, Geist Mono for code, measurements, and technical labels. Keep the monochrome palette and light/dark switch; use the clean light surface as the first-visit presentation, consistent with the current Vercel and Scale homepages, while maintaining a complete dark variant.

Give the portfolio its own character through carefully composed type, a decisive but restrained layout, and specific project evidence—not a borrowed logo, signature triangle, enterprise photography, or generic AI graphics. Remove the full-hero particle mesh while preserving all existing visible wording, including the “ACTIVE //” eyebrow. Let project titles, real project media, and concise technical detail carry the visual interest. Keep cards varied according to their evidence rather than repeating a stock icon-heading-description pattern. Take Vercel's typographic precision and Scale's media-led proof as references for craft, not as templates to copy.

Show UI/UX skill through clear hierarchy, responsive composition, useful interface states, and careful interaction details. Show full-stack skill through the existing project descriptions and the accurate technologies visible across the portfolio. Do not add new architecture diagrams, rewrite existing case studies, or suggest that CLI projects are web applications.

Keep all existing headlines, descriptions, eyebrow text, navigation labels, button text, section headings, project summaries, transition labels, and chat copy exactly as they are. New visible copy is limited to the Amon Hen and Angrist entries required to identify and explain those projects. Functional screen-reader announcements may be added where needed for accessibility, without altering existing visible wording.

## Motion direction

Replace randomized background movement and repeated blurred word entrances with a restrained, consistent motion vocabulary. Use one brief, coordinated first-viewport entrance. Keep interaction transitions short and useful: nav/menu state, chat answering/error state, project tabs, and modal entry/exit. Project demo media plays only when visitors use its controls; do not autoplay audio or present recorded output as live computation. Reduced-motion mode renders content immediately and disables nonessential movement.

## Chat-first homepage

Preserve the two-column desktop composition of concise identity copy and the portfolio chat. Remove the generic mesh but preserve all existing hero wording, including the eyebrow. Ensure the name wraps naturally, children can shrink inside the grid, and the widget remains within the viewport on mobile. Stack identity, actions, and chat in a readable order at smaller widths.

Keep the existing “ONLINE” label and all current chat wording verbatim. Reflect request lifecycle through non-text visual state changes and concise polite screen-reader announcements; do not announce every streamed character or claim backend availability before it has been reached. Retain the existing retry affordance, input label, and send-button label.

Respect a saved theme choice. The initial root theme and early theme script should agree on the light first-visit default to avoid a flash or hydration mismatch. Keep dark mode complete and readable.

## Add two projects

Add entries to `content/projects.json` and use the existing project card and case-study modal flow.

**Amon Hen** is a CPU-native natural-language video-moment retrieval tool. Describe only verified capabilities: MobileCLIP2 ONNX visual embeddings, Whisper-Tiny ONNX speech transcription, SQLite FTS5 plus `sqlite-vec` hybrid retrieval, adaptive frame filtering, and temporal segment results. Link to `https://github.com/flxhrdyn/amon-hen`.

**Angrist** repairs Python bugs with LLMs while locking edits to the target AST node and validating patches in an isolated Git worktree. Describe the target-scope guard and test/lint gates without suggesting that every run is deterministic. Link to `https://github.com/flxhrdyn/angrist`.

Both repositories provide a `demo/demo.gif` terminal demonstration. Download those authored demonstrations, convert them to compact self-hosted WebM, and create still posters from representative frames for the project grid. Use the existing project card and modal behavior. Do not add a new case-study layout or change existing project case studies. Do not use Amon Hen's much larger sample-input clips as its application demo: the repository describes those as source footage fed to the retrieval tool. Treat Angrist's animation as a rendered demonstration based on captured output, not a live session.

Keep the existing InvenioAI, Omnius, and LUCIAN entries unchanged. Add Amon Hen and Angrist to the existing Projects experience and preserve current card and modal behavior. Do not change existing project content or add new case-study sections. For Amon Hen and Angrist, describe their real CLI/library interfaces and processing/validation pipelines; do not imply they are web applications.

## Responsive and accessible behavior

Constrain all grid children with `min-width: 0`; allow long names and project labels to wrap; make every video scale to its modal; and keep mobile actions and chip controls reachable. Preserve visible keyboard focus and touch targets. Give posters descriptive alternative text. Video controls and modal keyboard behavior must remain usable with keyboard and assistive technology.

## Scope and likely files

- `src/components/ChatHero.tsx`: remove the generic canvas and eyebrow; simplify entrance motion.
- `src/components/SynapticMeshCanvas.tsx`: remove from the homepage composition; delete only if no other surface uses it.
- `src/components/ChatWidget.tsx`: accurate states and accessible announcements.
- `src/app/globals.css`: responsive constraints, typography rhythm, and restrained transitions.
- `src/app/layout.tsx` and `src/components/ThemeScript.tsx`: consistent first-visit theme.
- `content/projects.json`: verified Amon Hen and Angrist project entries.
- `public/projects/`: converted WebM demos and representative poster images.
- `DESIGN.md`: update the visual rules to match the approved finished design.

The backend, chat retrieval behavior, and non-project portfolio content are outside this change.

## Review criteria

- At 320px, 390px, tablet, and desktop widths, no hero content, project card, modal, or video is clipped.
- The homepage communicates Felix's role, the chat action, and a path to the full portfolio without decorative filler.
- The Projects section includes Amon Hen and Angrist with accurate summaries, working GitHub links, useful poster frames, and usable self-hosted demos.
- Existing project details remain unchanged; Amon Hen and Angrist are identified as CLI tools and do not imply web applications.
- The source demos are converted to WebM and are materially smaller than their source GIFs; no unrelated sample video is added.
- Chat state is conveyed accessibly without changing existing visible labels, failed requests have a recovery path, and announcements avoid streaming chatter.
- Light is the first-visit theme, a saved theme choice is honored, and both themes maintain readable contrast.
- Motion is brief, consistent, tied to meaningful interface events, and absent when reduced motion is requested.
- Visual hierarchy, restrained composition, and project proof carry the personality; no decorative retro or generic AI motif is needed.
