"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
const PhotoOrbit = dynamic(() => import("./PhotoOrbit").then(m => m.PhotoOrbit));
export function GalleryLoader() {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setReady(true); observer.disconnect(); }
    }, {rootMargin:"500px"});
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref}>{ready ? <PhotoOrbit /> : <section className="section wrap" style={{minHeight:700}} aria-label="Photo gallery loading"><p className="eyebrow gold">A glimpse of the feeling</p><h2>Find a moment.<br/><em>Make it yours.</em></h2></section>}</div>;
}
