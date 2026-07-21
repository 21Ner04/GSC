"use client";

import { useEffect } from "react";

const USERWAY_ACCOUNT_ID = process.env.NEXT_PUBLIC_USERWAY_ACCOUNT_ID ?? "";

export default function UserWayWidget() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!USERWAY_ACCOUNT_ID) {
      console.warn("UserWay: NEXT_PUBLIC_USERWAY_ACCOUNT_ID is not set.");
      return;
    }
    if (document.getElementById("userway-widget-js")) return;

    const script = document.createElement("script");
    script.id = "userway-widget-js";
    script.src = "https://cdn.userway.org/widget.js";
    script.async = true;
    script.setAttribute("data-account", USERWAY_ACCOUNT_ID);

    script.onerror = () => {
      console.warn("UserWay: Failed to load accessibility widget.");
    };

    document.head.appendChild(script);

    return () => {
      const existing = document.getElementById("userway-widget-js");
      if (existing) existing.remove();
    };
  }, []);

  return null;
}