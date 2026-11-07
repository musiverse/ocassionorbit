"use client";
import { memo, useEffect, useRef, useState } from "react";
import { createSceneLoop, scenePixelRatio } from "@/lib/sceneMotion";
import { damruCordPath } from "@/lib/damruMotion";
import { makeMusicSculptures } from "@/lib/musicSculptures";
const SCULPTURES = ["heart", "damru", "tabla", "vinyl", "microphone"] as const;
type Sculpture = (typeof SCULPTURES)[number];
const LABELS: Record<Sculpture, string> = {heart:"Heart",damru:"Damru",tabla:"Tabla",vinyl:"Vinyl",microphone:"Microphone"};
const TITLES: Record<Sculpture, string> = {heart:"A heart full of numbers",damru:"The rhythm of the damru",tabla:"A pair of rhythms",vinyl:"Keep the record spinning",microphone:"A voice for every occasion"};
const MUSIC = makeMusicSculptures();
type Point = {
  x: number;
  y: number;
  z: number;
  nx: number;
  ny: number;
  nz: number;
  digit: string;
  vessel: boolean;
  twoSided?: boolean;
};
type Vec = [number, number, number];
const smooth = (v: number) => {
  const k = Math.max(0, Math.min(1, v));
  return k * k * (3 - 2 * k);
};
/** An original, stylized anterior silhouette: tapered ventricles, atria and great vessels.
 * It is decorative geometry, not a clinical anatomical model. */
function makeHeart() {
  const points: Point[] = [];
  const add = (
    x: number,
    y: number,
    z: number,
    nx: number,
    ny: number,
    nz: number,
    vessel = false,
  ) =>
    points.push({
      x,
      y,
      z,
      nx,
      ny,
      nz,
      vessel,
      digit: String((points.length * 7 + Math.floor(points.length / 9)) % 10),
    });
  // The ventricular mass tapers toward an off-centre apex.
  for (let j = 1; j < 28; j++) {
    const theta = (j / 28) * Math.PI;
    const v = (1 - Math.cos(theta)) / 2;
    for (let i = 0; i < 46; i++) {
      const phi = ((i + (j % 2) * 0.5) / 46) * Math.PI * 2;
      const nx = Math.sin(theta) * Math.cos(phi),
        ny = -Math.cos(theta),
        nz = Math.sin(theta) * Math.sin(phi);
      const width = 0.94 - 0.22 * v;
      add(
        0.04 + 0.38 * v + nx * width,
        0.38 + ny * 1.09,
        nz * (0.58 - 0.12 * v),
        nx,
        ny,
        nz,
      );
    }
  }
  // Atria sit above the broader shoulder of the ventricular body.
  for (const [cx, cy, cz, rx, ry, rz] of [
    [-0.65, -0.38, -0.08, 0.42, 0.48, 0.42],
    [0.65, -0.48, -0.04, 0.36, 0.32, 0.35],
  ]) {
    for (let j = 1; j < 14; j++) {
      const a = (j / 14) * Math.PI;
      for (let i = 0; i < 28; i++) {
        const b = (i / 28) * Math.PI * 2;
        const nx = Math.sin(a) * Math.cos(b),
          ny = Math.cos(a),
          nz = Math.sin(a) * Math.sin(b);
        const x = cx + rx * nx,
          y = cy + ry * ny,
          z = cz + rz * nz;
        if (y > -0.6 && Math.abs(x) < 0.62) continue;
        add(x, y, z, nx, ny, nz);
      }
    }
  }
  const tube = (a: Vec, b: Vec, c: Vec, d: Vec, r: number) => {
    const at = (u: number) => {
      const v = 1 - u;
      return a.map(
        (n, i) =>
          v * v * v * n +
          3 * v * v * u * b[i] +
          3 * v * u * u * c[i] +
          u * u * u * d[i],
      ) as Vec;
    };
    for (let j = 0; j <= 24; j++) {
      const u = j / 24;
      const center = at(u),
        before = at(Math.max(0, u - 0.01)),
        after = at(Math.min(1, u + 0.01));
      let tx = after[0] - before[0],
        ty = after[1] - before[1],
        tz = after[2] - before[2];
      const len = Math.hypot(tx, ty, tz) || 1;
      tx /= len;
      ty /= len;
      tz /= len;
      const normalLen = Math.hypot(tx, ty) || 1;
      const ax = -ty / normalLen,
        ay = tx / normalLen;
      const bx = -tz * ay,
        by = tz * ax,
        bz = tx * ay - ty * ax;
      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2;
        const co = Math.cos(angle),
          si = Math.sin(angle);
        const nx = ax * co + bx * si,
          ny = ay * co + by * si,
          nz = bz * si;
        add(
          center[0] + nx * r,
          center[1] + ny * r,
          center[2] + nz * r,
          nx,
          ny,
          nz,
          true,
        );
      }
    }
  };
  // Aortic arch and its three branches; pulmonary trunk; superior vena cava.
  tube(
    [0.02, -0.42, -0.15],
    [-0.14, -1.75, -0.2],
    [0.65, -1.86, -0.28],
    [0.72, -0.65, -0.34],
    0.17,
  );
  tube(
    [0.04, -1.25, -0.18],
    [-0.04, -1.45, -0.18],
    [-0.08, -1.57, -0.18],
    [-0.12, -1.75, -0.18],
    0.065,
  );
  tube(
    [0.26, -1.46, -0.22],
    [0.24, -1.57, -0.2],
    [0.27, -1.7, -0.2],
    [0.28, -1.84, -0.2],
    0.062,
  );
  tube(
    [0.48, -1.39, -0.25],
    [0.52, -1.54, -0.25],
    [0.56, -1.65, -0.22],
    [0.61, -1.76, -0.22],
    0.065,
  );
  tube(
    [0.09, -0.35, 0.4],
    [0.08, -0.8, 0.6],
    [0.58, -1.1, 0.42],
    [1, -0.95, 0.27],
    0.14,
  );
  tube(
    [-0.66, -0.32, -0.07],
    [-0.75, -0.64, -0.09],
    [-0.72, -1.03, -0.12],
    [-0.72, -1.26, -0.12],
    0.13,
  );
  return points;
}
/** Two flared drumheads, a narrow waist, lacing and swinging bead-strikers. */
function makeDamru() {
  const points: Point[] = [];
  const add = (
    x: number,
    y: number,
    z: number,
    nx: number,
    ny: number,
    nz: number,
    vessel = false,
  ) =>
    points.push({
      x,
      y,
      z,
      nx,
      ny,
      nz,
      vessel,
      digit: String((points.length * 3 + Math.floor(points.length / 7)) % 10),
    });
  for (let row = 0; row <= 30; row++) {
    const y = -1.15 + (row / 30) * 2.3;
    const radius = 0.23 + 0.65 * Math.pow(Math.abs(y) / 1.15, 0.9);
    for (let col = 0; col < 44; col++) {
      const angle = ((col + (row % 2) * 0.5) / 44) * Math.PI * 2;
      const nx = Math.cos(angle),
        nz = Math.sin(angle);
      const ny = -Math.sign(y) * 0.52;
      add(radius * nx, y, radius * nz, nx, ny, nz, row === 0 || row === 30);
    }
  }
  // Skin surfaces and brighter rims give both ends a readable 3D face.
  for (const end of [-1, 1])
    for (let ring = 0; ring <= 10; ring++) {
      const radius = (ring / 10) * 0.88;
      const count = Math.max(1, Math.round(ring * 5));
      for (let j = 0; j < count; j++) {
        const angle = (j / count) * Math.PI * 2;
        add(
          radius * Math.cos(angle),
          end * 1.16,
          radius * Math.sin(angle),
          0,
          end,
          0,
          true,
        );
      }
    }
  // Number lacing follows alternating diagonals between the two rims.
  for (let cord = 0; cord < 10; cord++)
    for (let j = 0; j <= 28; j++) {
      const v = j / 28;
      const y = -1.14 + v * 2.28;
      const radius = 0.25 + 0.65 * Math.pow(Math.abs(y) / 1.15, 0.9);
      const angle = (cord / 10) * Math.PI * 2 + (v * Math.PI) / 5;
      add(
        radius * Math.cos(angle),
        y,
        radius * Math.sin(angle),
        Math.cos(angle),
        0,
        Math.sin(angle),
        true,
      );
    }
  return points;
}
function damruBeaters(time: number): Point[] {
  const points: Point[] = [];
  for (const side of [-1, 1]) {
    const { bead: end, cord } = damruCordPath(time, side);
    for (const [j, p] of cord.entries()) {
      points.push({
        ...p,
        nx: 0,
        ny: -0.2,
        nz: 1,
        digit: String((j * 7) % 10),
        vessel: true,
        twoSided: true,
      });
    }
    for (let row = 1; row < 7; row++)
      for (let col = 0; col < 12; col++) {
        const a = (row / 7) * Math.PI,
          b = (col / 12) * Math.PI * 2;
        const nx = Math.sin(a) * Math.cos(b),
          ny = Math.cos(a),
          nz = Math.sin(a) * Math.sin(b);
        points.push({
          x: end.x + nx * 0.12,
          y: end.y + ny * 0.12,
          z: end.z + nz * 0.12,
          nx,
          ny,
          nz,
          digit: String((row + col) % 10),
          vessel: true,
        });
      }
  }
  return points;
}
const BEATER_FRAMES = Array.from({length: 120}, (_, i) => damruBeaters(i / 120 * Math.PI * 2 / 7.5));

const DAMRU = makeDamru();
const HEART = makeHeart();
const DAMRU_SHAPES = BEATER_FRAMES.map(frame => [...DAMRU, ...frame]);
const FULL_SHAPES = {heart: HEART, ...MUSIC};
const PREVIEW_SHAPES = Object.fromEntries(Object.entries(FULL_SHAPES).map(([key,points]) => [key, points.filter((_,i) => i % 2 === 0)])) as typeof FULL_SHAPES;
const PREVIEW_DAMRU = DAMRU_SHAPES.map(points => points.filter((_,i) => i % 2 === 0));
function SculptureScene({
  side,
  active,
  expanded = false,
  fixedShape,
}: {
  side: "left" | "right";
  active: boolean;
  expanded?: boolean;
  fixedShape?: Sculpture;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const rotation = useRef({ yaw: 0, pitch: 0, roll: 0 });
  const displayed = useRef({yaw: 0, pitch: 0, roll: 0});
  const drag = useRef<{ id: number; x: number; y: number } | null>(null);
  const lockedShape = useRef<Sculpture | null>(null);
  const invalidate = useRef(() => {});
  const [open, setOpen] = useState(false);
  const [viewerShape, setViewerShape] = useState<Sculpture>("damru");
  const viewer = useRef<HTMLDialogElement>(null);
  const lock = () => {
    if (!lockedShape.current) rotation.current = {...displayed.current};
    lockedShape.current =
      (ref.current?.dataset.sculpture as Sculpture) ?? "heart";
  };
  const reset = () => {
    rotation.current = { yaw: 0, pitch: 0, roll: 0 };
    lockedShape.current = null;
    invalidate.current();
  };
  useEffect(() => {
    if (!open) return;
    const el = viewer.current;
    if (!el) return;
    el.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let width = 0,
      height = 0;
    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      const dpr = scenePixelRatio(width, height);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    type Projected = {p: Point; index: number; x: number; y: number; depth: number; nx: number; ny: number; facing: number};
    const projectionPool: Projected[] = [];
    const projected: Projected[] = [];
    const animation = createSceneLoop(
      (time, delta, reduced) => {
        void delta;
        ctx.clearRect(0, 0, width, height);
        // Each sculpture appears alone, then dissolves into the next.
        const cycle = (time + (side === "right" ? 1.1 : 0)) % (SCULPTURES.length * 8);
        const model = fixedShape ?? lockedShape.current;
        const current: Sculpture = model ?? (reduced ? "heart" : SCULPTURES[Math.floor(cycle / 8)]);
        const isDamru = current === "damru";
        const isHeart = current === "heart";
        const phase = cycle % 8;
        const appear =
          model || reduced
            ? 1
            : phase < 0.8
              ? smooth(phase / 0.8)
              : phase < 6.7
                ? 1
                : 1 - smooth((phase - 6.7) / 1.3);
        canvas.dataset.motion = reduced ? "static" : "animated";
        canvas.dataset.sculpture = current;
        if (appear < 0.008) return;
        const beatPhase = time % 1;
        const pulse = reduced
          ? 0
          : Math.exp(-Math.pow((beatPhase - 0.13) / 0.055, 2)) +
            0.55 * Math.exp(-Math.pow((beatPhase - 0.29) / 0.065, 2));
        const yaw =
          rotation.current.yaw +
          (lockedShape.current ? 0 : side === "left" ? -0.25 : 0.25) +
          (reduced || lockedShape.current
            ? 0
            : isDamru
              ? Math.cos(time * 7.5) * 0.55
              : Math.sin(time * 0.4) * 0.24);
        const pitch =
          rotation.current.pitch +
          (lockedShape.current ? 0 : isDamru
            ? -0.24
            : current === "tabla" ? -0.48 : -0.08 +
              (reduced || lockedShape.current
                ? 0
                : Math.cos(time * 0.32) * 0.045));
        const roll = rotation.current.roll +
          (!reduced && !lockedShape.current
            ? isDamru ? Math.sin(time * 7.5) * 0.14 : current === "vinyl" ? time * .65 : 0
            : 0);
        displayed.current = {yaw, pitch, roll};
        const cy = Math.cos(yaw),
          sy = Math.sin(yaw),
          cx = Math.cos(pitch),
          sx = Math.sin(pitch);
        // A contraction and release, rather than an expanding balloon.
        const scale =
          width * (isDamru ? 0.29 : 0.32) * (1 - (isHeart ? pulse * 0.045 : current === "tabla" ? pulse * .015 : 0));
        const frameIndex = Math.floor((((reduced ? 0 : time) * 7.5 / (Math.PI * 2)) % 1) * 120);
        const shape: Point[] = isDamru
          ? (expanded ? DAMRU_SHAPES : PREVIEW_DAMRU)[frameIndex]
          : (expanded ? FULL_SHAPES : PREVIEW_SHAPES)[current as keyof typeof FULL_SHAPES];
        projected.length = 0;
        const cosRoll = Math.cos(roll), sinRoll = Math.sin(roll);
        for (let index = 0; index < shape.length; index++) {
          const p = shape[index];
          const x = p.x * cy + p.z * sy;
          const z = -p.x * sy + p.z * cy;
          const y = p.y * cx - z * sx;
          const depth = p.y * sx + z * cx;
          const nx = p.nx * cy + p.nz * sy;
          const nz = -p.nx * sy + p.nz * cy;
          const ny = p.ny * cx - nz * sx;
          const facing = p.ny * sx + nz * cx;
          if (facing <= -0.13 && !p.twoSided) continue;
          const point = projectionPool[index] ?? (projectionPool[index] = {} as Projected);
          point.p = p; point.index = index;
          point.x = x * cosRoll - y * sinRoll; point.y = x * sinRoll + y * cosRoll;
          point.depth = depth; point.nx = nx; point.ny = ny; point.facing = facing;
          projected.push(point);
        }
        projected.sort((a,b) => a.depth - b.depth);
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        for (const { p, index, x, y, depth, nx, ny, facing } of projected) {
          const perspective = 4.8 / (4.8 - depth);
          const light = Math.max(
            0,
            Math.min(1, 0.25 - nx * 0.3 - ny * 0.32 + facing * 0.55),
          );
          const alpha = appear * (0.18 + 0.62 * light) * (p.vessel ? 0.95 : 1);
          const base = side === "left" ? [174, 120, 244] : [221, 176, 70];
          const white = light ** 5 * 0.6;
          const rgb = base.map((c) => Math.round(c + (255 - c) * white));
          ctx.fillStyle = `rgba(${rgb.join(",")},${alpha.toFixed(3)})`;
          ctx.font = `500 ${Math.max(3.7, width * 0.025 * perspective).toFixed(2)}px monospace`;
          const dissolve = 1 - appear;
          const spread = reduced ? 0 : dissolve * width * 0.1;
          const dx = Math.sin(index * 2.7) * spread,
            dy = Math.cos(index * 1.9) * spread;
          ctx.fillText(
            p.digit,
            width * (isHeart ? 0.46 : 0.5) + x * scale * perspective + dx,
            height * 0.55 + y * scale * perspective + dy,
          );
        }
      },
      () => active,
      expanded,
    );
    invalidate.current = animation.invalidate;
    const onResize = () => {
      resize();
      animation.invalidate();
    };
    const sizeObserver = new ResizeObserver(onResize);
    sizeObserver.observe(canvas);
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      invalidate.current = () => {};
      animation.dispose();
      sizeObserver.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [side, active, fixedShape, expanded]);
  return (
    <div
      className={
        expanded
          ? "sculpture-expanded"
          : `number-heart anatomical-heart number-heart-${side}`
      }
    >
      <canvas
        ref={ref}
        role="img"
        tabIndex={0}
        aria-label="Interactive 3D heart, damru, tabla, vinyl record and microphone. Drag to rotate all around; arrow keys turn, Home resets."
        onPointerDown={(e) => {
          e.stopPropagation();
          e.currentTarget.setPointerCapture(e.pointerId);
          drag.current = { id: e.pointerId, x: e.clientX, y: e.clientY };
          lock();
          e.currentTarget.dataset.dragging = "true";
        }}
        onPointerMove={(e) => {
          const current = drag.current;
          if (!current || current.id !== e.pointerId) return;
          e.stopPropagation();
          const sensitivity =
            (2 * Math.PI) / Math.max(160, e.currentTarget.clientWidth);
          rotation.current.yaw += (e.clientX - current.x) * sensitivity;
          rotation.current.pitch = Math.max(
            -Math.PI / 2,
            Math.min(
              Math.PI / 2,
              rotation.current.pitch +
                (e.clientY - current.y) * sensitivity * 0.6,
            ),
          );
          current.x = e.clientX;
          current.y = e.clientY;
          invalidate.current();
        }}
        onPointerUp={(e) => {
          e.stopPropagation();
          drag.current = null;
          delete e.currentTarget.dataset.dragging;
          if (e.currentTarget.hasPointerCapture(e.pointerId))
            e.currentTarget.releasePointerCapture(e.pointerId);
        }}
        onPointerCancel={(e) => {
          drag.current = null;
          delete e.currentTarget.dataset.dragging;
        }}
        onLostPointerCapture={(e) => {
          drag.current = null;
          delete e.currentTarget.dataset.dragging;
        }}
        onDoubleClick={reset}
        onKeyDown={(e) => {
          if (e.key === "Home") {
            e.preventDefault();
            reset();
            return;
          }
          if (
            !["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)
          )
            return;
          e.preventDefault();
          e.stopPropagation();
          lock();
          if (e.key === "ArrowLeft") rotation.current.yaw -= 0.2;
          if (e.key === "ArrowRight") rotation.current.yaw += 0.2;
          if (e.key === "ArrowUp")
            rotation.current.pitch = Math.max(
              -Math.PI / 2,
              rotation.current.pitch - 0.2,
            );
          if (e.key === "ArrowDown")
            rotation.current.pitch = Math.min(
              Math.PI / 2,
              rotation.current.pitch + 0.2,
            );
          invalidate.current();
        }}
      />
      {expanded ? (
        <div className="sculpture-viewer-help">
          <p>Drag to rotate 360° · arrow keys also work</p>
          <button type="button" className="text-link" onClick={reset}>
            Reset view
          </button>
        </div>
      ) : (
        <>
          <button
            type="button"
            className="sculpture-open"
            aria-label={`Open ${side} sculpture in 360 degree viewer`}
            onClick={(e) => {
              e.stopPropagation();
              setViewerShape(
                (ref.current?.dataset.sculpture as Sculpture) ?? "heart",
              );
              setOpen(true);
            }}
          >
            Explore 360° ↗
          </button>
          <dialog
            ref={viewer}
            className="sculpture-dialog"
            aria-label="360 degree sculpture viewer"
            onClose={() => setOpen(false)}
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
          >
            <div className="sculpture-viewer-toolbar">
              <div>
                <p className="eyebrow gold">Explore every angle</p>
                <h3>
                  {TITLES[viewerShape]}
                </h3>
              </div>
              <button
                type="button"
                className="circle-control"
                aria-label="Close 360 degree viewer"
                autoFocus
                onClick={() => viewer.current?.close()}
              >
                ✕
              </button>
            </div>
            <div className="sculpture-switch">
              {SCULPTURES.map(shape => (
                <button key={shape} type="button" aria-pressed={viewerShape === shape} onClick={() => setViewerShape(shape)}>
                  {LABELS[shape]}
                </button>
              ))}
            </div>
            {open && (
              <AnatomicalHeart
                key={viewerShape}
                side={side}
                active={open}
                expanded
                fixedShape={viewerShape}
              />
            )}
          </dialog>
        </>
      )}
    </div>
  );
}

export const AnatomicalHeart = memo(SculptureScene);
