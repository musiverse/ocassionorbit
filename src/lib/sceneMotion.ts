/** A shared animation clock: capped frames, no background work, live motion preferences. */
export function createSceneLoop(
  draw: (seconds: number, deltaMs: number, reduced: boolean) => void,
  active: () => boolean = () => true,
  foreground = false,
) {
  const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
  let route = window.location.pathname;
  let obscured = !!document.querySelector("dialog[open]");
  let frame = 0;
  let disposed = false;
  let last = 0;
  let elapsed = 0;
  let renderCost = 0;
  const tick = (now: number) => {
    frame = 0;
    if (disposed || document.hidden || (obscured && !foreground)) return;
    const reduced = preference.matches || (!foreground && /^\/(booking|artists)(\/|$)/.test(window.location.pathname));
    const fps = window.innerWidth < 768 || renderCost > 12 ? 30 : 60;
    const interval = 1000 / fps;
    if (!reduced && last && now - last < interval - 1) {
      frame = requestAnimationFrame(tick);
      return;
    }
    const delta = last ? Math.min(now - last, 64) : interval;
    last = now;
    if (!reduced) elapsed += delta / 1000;
    const started = performance.now();
    draw(reduced ? 0 : elapsed, delta, reduced);
    renderCost = renderCost * 0.9 + (performance.now() - started) * 0.1;
    if (!reduced && active()) frame = requestAnimationFrame(tick);
  };
  const invalidate = () => {
    if (disposed || document.hidden || frame) return;
    last = 0;
    frame = requestAnimationFrame(tick);
  };
  const reset = () => {
    cancelAnimationFrame(frame);
    frame = 0;
    last = 0;
    invalidate();
  };
  const observer = new MutationObserver(() => {
    const nextModal = !!document.querySelector("dialog[open]");
    const nextRoute = window.location.pathname;
    if (nextModal !== obscured || nextRoute !== route) {
      obscured = nextModal;
      route = nextRoute;
      reset();
    }
  });
  observer.observe(document.body, {subtree:true, childList:true, attributes:true, attributeFilter:["open"]});
  preference.addEventListener("change", reset);
  document.addEventListener("visibilitychange", reset);
  invalidate();
  return {
    invalidate,
    dispose() {
      disposed = true;
      observer.disconnect();
      cancelAnimationFrame(frame);
      preference.removeEventListener("change", reset);
      document.removeEventListener("visibilitychange", reset);
    },
  };
}

/** Bound both pixel density and total backing-store size on large displays. */
export function scenePixelRatio(width: number, height: number) {
  const cap = width < 768 ? 1.25 : 1.75;
  return Math.min(
    window.devicePixelRatio || 1,
    cap,
    Math.sqrt(2_500_000 / Math.max(1, width * height)),
  );
}
export const easeScene = (
  from: number,
  to: number,
  delta: number,
  duration: number,
) => from + (to - from) * (1 - Math.exp(-delta / duration));
