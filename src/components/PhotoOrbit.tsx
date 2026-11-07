"use client";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useModalOpen } from "@/lib/useModalOpen";
const AnatomicalHeart = dynamic(() => import("./AnatomicalHeart").then(m => m.AnatomicalHeart), { ssr: false });
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { ArrowLeft, ArrowRight, Pause, Play, Expand, X } from "lucide-react";
const photos = [
  {
    file: "dj-decks",
    title: "After dark",
    type: "DJs & electronic",
    alt: "DJ at the decks under pink and blue stage lights",
  },
  {
    file: "piano-evening",
    title: "An intimate evening",
    type: "Piano & acoustic",
    alt: "Pianist at a grand piano with a vocalist beside him",
  },
  {
    file: "rooftop-band",
    title: "Above the everyday",
    type: "Live bands",
    alt: "Violinist, saxophonist, and band performing on a rooftop",
  },
  {
    file: "festival-sparks",
    title: "Feel the energy",
    type: "Concerts & festivals",
    alt: "Crowd watching a purple-lit stage with sparkling effects",
  },
  {
    file: "classical-ensemble",
    title: "Rooted in rhythm",
    type: "Indian classical",
    alt: "An ensemble of sitar and tabla musicians performing on stage",
  },
  {
    file: "jazz-evening",
    title: "A little golden hour",
    type: "Jazz & lounge",
    alt: "Vocalist with saxophone and guitar musicians in warm stage lighting",
  },
  {
    file: "crowd-vocals",
    title: "Sing it together",
    type: "Live vocals",
    alt: "Vocalist performing to an enthusiastic indoor crowd",
  },
  {
    file: "stadium-stage",
    title: "The big-stage feeling",
    type: "Live performances",
    alt: "Silhouette of a guitarist facing a large audience under a spotlight",
  },
];
const visibilitySubscribe = (fn: () => void) => {
  document.addEventListener("visibilitychange", fn);
  return () => document.removeEventListener("visibilitychange", fn);
};
export function PhotoOrbit() {
  const angle = useRef(0);
  const ring = useRef<HTMLDivElement>(null);
  const selectedRef = useRef(0);
  const [selected, setSelected] = useState(0);
  const [focused, setFocused] = useState(false);
  const manual = useRef<{from: number; to: number; start: number} | null>(null);
  const modalOpen = useModalOpen();
  const [selectionVersion, setSelectionVersion] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [inView, setInView] = useState(false);
  const [view, setView] = useState<number | null>(null);
  const hidden = useSyncExternalStore(
    visibilitySubscribe,
    () => document.hidden,
    () => true,
  );
  const reduced = useReducedMotion();
  const section = useRef<HTMLElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const touchStart = useRef<number | null>(null);
  const swiped = useRef(false);
  const auto =
    playing && !hovered && !focused && inView && !hidden && !reduced && !modalOpen;
  useEffect(() => {
    const el = section.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  const autoRef = useRef(auto);
  useEffect(() => { autoRef.current = auto; }, [auto]);
  useEffect(() => {
    let frame = 0;
    let previous = 0;
    function draw(now: number) {
      const delta = previous ? Math.min(now - previous, 64) : 0;
      previous = now;
      if (manual.current) {
        const motion = manual.current;
        if (!motion.start) motion.start = now;
        const progress = reduced ? 1 : Math.min(1, (now - motion.start) / 650);
        const eased = 1 - Math.pow(1 - progress, 3);
        angle.current = motion.from + (motion.to - motion.from) * eased;
        if (progress === 1) manual.current = null;
      } else if (autoRef.current) angle.current += delta / 3125;
      if (ring.current) ring.current.style.transform = `translateZ(calc(-1 * var(--orbit-radius))) rotateY(${-angle.current * 45}deg)`;
      const next = ((Math.round(angle.current) % 8) + 8) % 8;
      if (next !== selectedRef.current) { selectedRef.current = next; setSelected(next); }
      if (manual.current || autoRef.current) frame = requestAnimationFrame(draw);
    }
    if (!hidden && !modalOpen && inView) frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, [auto, hidden, modalOpen, inView, reduced, selectionVersion]);
  useEffect(() => {
    if (view === null) return;
    const el = dialog.current;
    if (!el) return;
    if (!el.open) el.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [view]);
  function select(index: number) {
    const current = ((angle.current % 8) + 8) % 8;
    let delta = index - current;
    if (delta > 4) delta -= 8;
    if (delta < -4) delta += 8;
    manual.current = {from: angle.current, to: angle.current + delta, start: 0};
    // Wake the animation for a manual transition even while paused or focused.
    setSelectionVersion(v => v + 1);
  }
  function move(direction: number) { select(((Math.round(manual.current?.to ?? angle.current) + direction) % 8 + 8) % 8); }
  return (
    <section
      ref={section}
      className={`photo-section section ${inView && !hidden ? "gallery-visible" : ""}`}
      id="photo-gallery"
      aria-labelledby="photo-heading"
      onKeyDown={(e) => {
          if (e.defaultPrevented || (e.target as HTMLElement).closest("dialog, canvas")) return;
          if (e.key === "ArrowRight") {
            e.preventDefault();
            move(1);
          }
          if (e.key === "ArrowLeft") {
            e.preventDefault();
            move(-1);
          }
        }}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={e => { if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false); }}
    >
      <div className="wrap section-heading">
        <div>
          <p className="eyebrow gold">A glimpse of the feeling</p>
          <h2 id="photo-heading">
            Find a moment.
            <br />
            <em>Make it yours.</em>
          </h2>
        </div>
        <p>
          From an intimate set to a room full of energy. Explore the gallery,
          then bring us your ideas.
        </p>
      </div>
      <div
        className="orbit-viewport"
        onPointerEnter={(e) => {
          if (e.pointerType === "mouse") setHovered(true);
        }}
        onPointerLeave={() => setHovered(false)}
        role="region"
        aria-roledescription="carousel"
        aria-label="Performance inspiration photos"
        onPointerDown={(e) => {
          if (e.pointerType === "touch") {
            setHovered(true);
            touchStart.current = e.clientX;
            swiped.current = false;
          }
        }}
        onPointerUp={(e) => {
          if (e.pointerType === "touch") setHovered(false);
          if (touchStart.current !== null) {
            const distance = e.clientX - touchStart.current;
            touchStart.current = null;
            if (Math.abs(distance) > 40) {
              swiped.current = true;
              move(distance < 0 ? 1 : -1);
            }
          }
        }}
        onPointerCancel={() => {
          setHovered(false);
          touchStart.current = null;
        }}
      >
        <AnatomicalHeart side="left" active={inView && !hidden && !modalOpen} />
        <AnatomicalHeart side="right" active={inView && !hidden && !modalOpen} />
        <div className="orbit-floor" aria-hidden="true" />
        <div
          ref={ring}
          className="orbit-ring is-revolving"
          style={{ transform: "translateZ(calc(-1 * var(--orbit-radius))) rotateY(0deg)" }}
        >
          {photos.map((photo, i) => (
            <button
              key={photo.file}
              className={`orbit-photo ${selected === i ? "is-selected" : ""}`}
              style={{
                transform: `rotateY(${i * 45}deg) translateZ(var(--orbit-radius))`,
              }}
              onClick={() => {
                if (swiped.current) {
                  swiped.current = false;
                  return;
                }
                setView(i);
              }}
              aria-label={`View ${photo.title} photo`}
              tabIndex={0}
            >
              <Image
                src={`/photos/${photo.file}.webp`}
                alt={photo.alt}
                fill
                sizes="(max-width: 600px) 220px, 340px"
              />
              <span className="orbit-photo-caption">
                <span>{photo.type}</span>
                <strong>{photo.title}</strong>
              </span>
              {selected === i && (
                <span className="expand-photo">
                  <Expand size={17} />
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
      <div className="wrap orbit-navigation">
        <div className="orbit-controls">
          <button
            className="circle-control"
            aria-label="Previous photo"
            onClick={() => move(-1)}
          >
            <ArrowLeft size={19} />
          </button>
          <span className="orbit-counter" aria-live={auto ? "off" : "polite"}>
            {String(selected + 1).padStart(2, "0")} <span>/ 08</span>
          </span>
          <button
            className="circle-control"
            aria-label="Next photo"
            onClick={() => move(1)}
          >
            <ArrowRight size={19} />
          </button>
          <button
            className="circle-control"
            aria-label="Enlarge selected photo"
            onClick={() => {
              setView(selected);
            }}
          >
            <Expand size={18} />
          </button>
          {!reduced && (
            <button
              className="circle-control"
              aria-label={
                playing ? "Pause photo rotation" : "Play photo rotation"
              }
              aria-pressed={playing}
              onClick={() => setPlaying((v) => !v)}
            >
              {playing ? <Pause size={17} /> : <Play size={17} />}
            </button>
          )}
        </div>
        <p>
          Hover to pause. Select any photo to see it in full.
        </p>
      </div>
      <div
        className="wrap orbit-thumbnails"
        aria-label="Choose a gallery photo"
      >
        {photos.map((photo, i) => (
          <button
            key={photo.file}
            aria-label={`Show ${photo.title}`}
            aria-current={selected === i ? "true" : undefined}
            onClick={() => select(i)}
          >
            <Image
              src={`/photos/${photo.file}.webp`}
              alt=""
              fill
              sizes="72px"
            />
          </button>
        ))}
      </div>
      <dialog
        ref={dialog}
        className="photo-dialog"
        aria-label="Full photo viewer"
        onClose={() => setView(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            const r = e.currentTarget.getBoundingClientRect();
            if (
              e.clientX < r.left ||
              e.clientX > r.right ||
              e.clientY < r.top ||
              e.clientY > r.bottom
            )
              e.currentTarget.close();
          }
        }}
        onKeyDown={(e) => {
          if (view === null) return;
          if (e.key === "ArrowRight") {
            e.preventDefault();
            setView((view + 1) % photos.length);
          }
          if (e.key === "ArrowLeft") {
            e.preventDefault();
            setView((view + photos.length - 1) % photos.length);
          }
        }}
      >
        {view !== null && (
          <>
            <div className="viewer-toolbar">
              <p>
                {photos[view].title}
                <span>{photos[view].type}</span>
              </p>
              <button
                className="circle-control"
                aria-label="Close photo viewer"
                autoFocus
                onClick={() => dialog.current?.close()}
              >
                <X size={21} />
              </button>
            </div>
            <div key={photos[view].file} className="viewer-image">
              <Image
                src={`/photos/${photos[view].file}.webp`}
                alt={photos[view].alt}
                fill
                sizes="(max-width: 800px) 94vw, 1100px"
                style={{ objectFit: "contain" }}
              />
            </div>
            <div className="viewer-navigation">
              <button
                className="circle-control"
                aria-label="Previous full photo"
                onClick={() =>
                  setView((view + photos.length - 1) % photos.length)
                }
              >
                <ArrowLeft size={20} />
              </button>
              <p>
                {view + 1} / {photos.length}
              </p>
              <button
                className="circle-control"
                aria-label="Next full photo"
                onClick={() => setView((view + 1) % photos.length)}
              >
                <ArrowRight size={20} />
              </button>
            </div>
          </>
        )}
      </dialog>
    </section>
  );
}
