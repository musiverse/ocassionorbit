"use client";
import { useSyncExternalStore } from "react";
function subscribe(listener: () => void) {
  const observer = new MutationObserver(listener);
  observer.observe(document.body, {subtree:true, attributes:true, attributeFilter:["open"]});
  return () => observer.disconnect();
}
export function useModalOpen() {
  return useSyncExternalStore(subscribe, () => !!document.querySelector("dialog[open]"), () => false);
}
