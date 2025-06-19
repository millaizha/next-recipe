"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize Lenis smooth scroll instance
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    // Animation frame loop for Lenis
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Selectors for elements that should ignore Lenis scroll
    const ignoreSelectors = [
      "[role='listbox']",
      "[data-slot='popover-content']",
      "[data-ignore-lenis]",
    ];

    // Prevent Lenis scroll on scrollable elements (e.g., dropdowns)
    const stopPropagationIfScrollable = (e: WheelEvent) => {
      const el = e.currentTarget as HTMLElement;
      const scrollable =
        el.scrollHeight > el.clientHeight || el.scrollWidth > el.clientWidth;

      if (scrollable) {
        e.stopPropagation();
      }
    };

    // Attach wheel event listeners to matching elements
    const addWheelListeners = () => {
      ignoreSelectors.forEach((selector) => {
        document.querySelectorAll(selector).forEach((el) => {
          el.addEventListener("wheel", stopPropagationIfScrollable as EventListener, {
            passive: false,
          });
        });
      });
    };

    addWheelListeners();

    // Observe DOM changes to re-attach listeners as needed
    const observer = new MutationObserver(() => addWheelListeners());
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Cleanup on unmount
    return () => {
      lenis.destroy();
      observer.disconnect();
      ignoreSelectors.forEach((selector) => {
        document.querySelectorAll(selector).forEach((el) => {
          el.removeEventListener("wheel", stopPropagationIfScrollable as EventListener);
        });
      });
    };
  }, []);

  return <>{children}</>;
}
