"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // These selectors target dropdowns, popovers, scrollable content
    const ignoreSelectors = [
      "[role='listbox']",
      "[data-slot='popover-content']",
      "[data-ignore-lenis]",
    ];

    const stopPropagationIfScrollable = (e: WheelEvent) => {
      const el = e.currentTarget as HTMLElement;
      const scrollable =
        el.scrollHeight > el.clientHeight || el.scrollWidth > el.clientWidth;

      if (scrollable) {
        e.stopPropagation();
      }
    };

    // Attach listener to all matching elements
    const addWheelListeners = () => {
      ignoreSelectors.forEach((selector) => {
        document.querySelectorAll(selector).forEach((el) => {
          el.addEventListener("wheel", stopPropagationIfScrollable as any, {
            passive: false,
          });
        });
      });
    };

    addWheelListeners();

    const observer = new MutationObserver(() => addWheelListeners());
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      lenis.destroy();
      observer.disconnect();
      ignoreSelectors.forEach((selector) => {
        document.querySelectorAll(selector).forEach((el) => {
          el.removeEventListener("wheel", stopPropagationIfScrollable as any);
        });
      });
    };
  }, []);

  return <>{children}</>;
}
