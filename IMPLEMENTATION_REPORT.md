# OccasionOrbit Beta implementation

Target: `/Users/deepakkumarsingh/Downloads/ocassionorbit-main`
Reference: local StageX-Singing-Platform at commit `79c9a33295c4e32e43762e8ad93a7c5ea27f65ea`.

## Changes

Reused the reference implementation and all 24 optimized photographs. Restored the navy, gold and purple visual system, three-line hero, performance categories, occasion cards, Photography & Videography, illustrative app, artist journey, platform ambitions, community placeholders, planning process, FAQs, artist CTA, navigation and footer.

The CSS 3D gallery rotates continuously. Angles live in a ref and update the ring directly; React updates only when the front-facing selection changes. Manual selection eases over 650 ms. Pointer hover and keyboard interaction pause automatic movement. Thumbnails keep focus as selection changes. Arrow keys work throughout the gallery, with dialog and sculpture keys handled separately. Gallery code and sculpture geometry load as the gallery approaches the viewport.

Photo and sculpture viewers use native modal dialogs, keyboard controls, focus restoration and scroll locking. Fixed the reference's zero-size initial expanded canvas with ResizeObserver. All five sculptures retain number-filled 3D geometry. Added cached periodic damru geometry, fewer preview points, reusable projection buffers, and memoized sculpture components. Dragging retains the displayed orientation. Small-screen sculpture controls sit below the ring so photos cannot cover them.

Shared scene loops suspend hidden and obscured work, respect reduced motion, bound pixel density, and render a calm composition on enquiry pages. Motion resumes after route changes. The active gallery uses a small media-query subscription instead of importing Framer Motion for its reduced-motion hook.

Static-export-compatible booking prefills accept style, category, service, event and occasion. Event and artist forms validate whitespace, phone digit counts, public portfolio URLs and local event dates. The message preview stays local; visitors must open WhatsApp and press Send themselves. Photography wording is service-neutral.

The hero asset changed from a 956,332-byte PNG to a 174,372-byte WebP. This is a measured file-size reduction; no Lighthouse or frame-rate claims were made.

## Preserved

- Target telephone, WhatsApp destination, company identity, email, registered address and policy dates.
- Contact, privacy, terms, refund, shipping and delete-account routes and policy navigation.
- Next.js/React framework, static export, trailing slashes, image settings, public CNAME and existing GitHub Pages workflow.
- Original assets and legacy components remain recoverable. No backend, authentication, database or analytics integration was present in the inspected source.
- Reference project was read only. No pushes, deployment, DNS changes or production database actions were performed.

The target arrived without `.git`, so no uncommitted-state comparison was available. A pre-edit archive is saved at `/private/tmp/occasionorbit-beta-before-20261108.tar.gz`.

## Principal files

- `src/app/page.tsx`, `layout.tsx`, `globals.css`, and events/booking/artists route pages.
- `PhotoOrbit.tsx`, `GalleryLoader.tsx`, `AnatomicalHeart.tsx`, `PhotographySection.tsx`, `PerformanceCategories.tsx`, `EventOccasions.tsx`, `InquiryForm.tsx`, `BookingInquiry.tsx`.
- Reference app, journey, vision, community, navigation, footer, waveform and ribbon components.
- `src/lib/enquiry.ts`, `useModalOpen.ts`, `useReducedMotion.ts`, `sceneMotion.ts`, `musicSculptures.ts`, `damruMotion.ts`, and corrected contact message branding.
- `tests/enquiry.test.cjs`, `public/photos`, `public/hero-bg.webp`, dependency lockfile and package scripts.

## Verification

- Production build: PASS; all routes export statically. `npm run build` uses webpack because Turbopack's internal worker failed to bind a port in this environment.
- TypeScript: PASS (`npx tsc --noEmit`).
- ESLint: PASS (`npm run lint`).
- Six focused automated tests: PASS (`npm test`). Phone validation; local calendar dates; category/event/coverage prefills; WhatsApp message generation and encoding; 480 damru samples checking attachment, shell clearance and constant cord length; reduced-motion/hidden-tab/modal scene-loop suspension.
- All 24 optimized photographs decode; all 30 homepage image elements were observed loaded in the browser.
- Browser checks covered homepage, eight-category events page, booking and artist forms, photography prefill, occasion prefill, blank-phone rejection, local message preview, full-photo click opening, photo arrow keys, Escape, focus restoration and body-scroll unlock.
- All five expanded sculptures render; checked keyboard rotation, reset, pointer dragging, mobile control wrapping and stable selected object.
- Measured continuous rotation: 162.48816 degrees over 11.301 seconds, equivalent to 25.04 seconds per revolution. Hover pause and resume were checked separately from keyboard focus.
- Checked desktop, 768-pixel tablet and 375-pixel mobile layouts and mobile menu. No horizontal overflow on the checked pages.
- Production dependency audit: zero vulnerabilities after compatible updates to Next.js/eslint-config-next 16.4.5 and non-breaking dependency fixes. Eight moderate development-tool advisories remain in the minimatch/typescript-eslint chain; the suggested automatic fix would downgrade the framework lint configuration, so it was not forced.

## Screenshots

Saved in `screenshots/`: full homepage, homepage hero, gallery, photo viewer, sculpture viewer, mobile sculpture viewer and Photography & Videography.

## Remaining limits

No assets are missing. No real WhatsApp message was sent. Touch swiping and reduced-motion/hidden-tab logic are implemented, but a physical touch-device swipe and operating-system motion-preference changes were not exercised in the available browser controls. Scene suspension/reduced-motion behavior was covered by automated clock tests. No production hosting or domain configuration was changed or recommended.

## Preview

Production export served locally at `http://127.0.0.1:4107/` on a separate port. To recreate it after stopping the preview, run `npm run build`, then `python3 -m http.server 4107 --bind 127.0.0.1 --directory out`.
