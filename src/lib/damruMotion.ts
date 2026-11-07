export type CordPoint = { x: number; y: number; z: number };
export const DAMRU_CORD_LENGTH = 2.5;
export const DAMRU_HEAD_Y = 1.16;
export const DAMRU_BEAD_RADIUS = 0.12;
const smooth = (t: number) => t * t * (3 - 2 * t);
/** Authored motion based on wrist-twist demonstrations. The cord stays outside
 * the flared shell, folds over the rim, and the bead alternates between skins. */
export function damruCordPath(time: number, side: number) {
  const phase =
    ((((time * 7.5) / (Math.PI * 2) - 0.1 + (side === 1 ? 0.5 : 0)) % 1) + 1) %
    1;
  const keys = [
    [0, -1.28, 0],
    [1.08, -1.42, 0.12],
    [1.55, 0, 0.18],
    [1.08, 1.42, 0.12],
    [0, 1.28, 0],
    [1.08, 1.42, -0.12],
    [1.55, 0, -0.18],
    [1.08, -1.42, -0.12],
    [0, -1.28, 0],
  ];
  const slot = phase * 8,
    index = Math.floor(slot),
    blend = smooth(slot - index);
  const a = keys[index],
    b = keys[index + 1];
  const bead = {
    x: side * (a[0] + (b[0] - a[0]) * blend),
    y: a[1] + (b[1] - a[1]) * blend,
    z: a[2] + (b[2] - a[2]) * blend,
  };
  const head = Math.abs(bead.y) >= 1.28;
  const upper = bead.y < 0;
  const shoulder = { x: side * 0.96, y: (upper ? -1 : 1) * 1.23, z: 0 };
  const base: CordPoint[] = [];
  for (let i = 0; i <= 48; i++) {
    const t = i / 48;
    let x: number, y: number, z: number;
    if (head && t < 0.6) {
      const u = t / 0.6;
      y = shoulder.y * u;
      x = side * (0.26 + 0.7 * Math.pow(u, 0.9));
      z = 0;
    } else if (head) {
      const u = (t - 0.6) / 0.4;
      x = shoulder.x + (bead.x - shoulder.x) * u;
      y = shoulder.y + (bead.y - shoulder.y) * u;
      z = bead.z * u;
    } else {
      x = side * 0.26 + (bead.x - side * 0.26) * t;
      y = bead.y * t;
      z = bead.z * t;
    }
    // Keep the cord clear of wood even during the free-swing portion.
    if (Math.abs(y) < DAMRU_HEAD_Y) {
      const clearance = 0.28 + 0.65 * Math.pow(Math.abs(y) / 1.15, 0.9);
      if (Math.hypot(x, z) < clearance)
        x = side * Math.sqrt(Math.max(0, clearance * clearance - z * z));
    }
    base.push({ x, y, z });
  }
  base[0] = { x: side * 0.26, y: 0, z: 0 };
  base[base.length - 1] = bead;
  const bowed = (sag: number) =>
    base.map((p, i) => ({
      ...p,
      z: p.z + Math.sin((i / (base.length - 1)) * Math.PI) * sag,
    }));
  const length = (path: CordPoint[]) =>
    path
      .slice(1)
      .reduce(
        (sum, p, i) =>
          sum + Math.hypot(p.x - path[i].x, p.y - path[i].y, p.z - path[i].z),
        0,
      );
  // Extra cord becomes slack, rather than visibly stretching between frames.
  let low = 0,
    high = 2;
  for (let i = 0; i < 18; i++) {
    const mid = (low + high) / 2;
    if (length(bowed(mid)) < DAMRU_CORD_LENGTH) low = mid;
    else high = mid;
  }
  return { bead, cord: bowed((low + high) / 2), phase };
}
