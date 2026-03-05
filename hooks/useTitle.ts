"use client"

import { useEffect } from "react";

export const useTitle = (title: string) => {
  useEffect(() => {
    document.title = title;

    const metas = [
      { name: "title", content: title },
      { name: "description", content: "Learn more about me, check out my projects and don't hesitate to contact me." },
      { name: "keywords", content: "portfolio, lois, alirol, loïs, loïs alirol, moi, projets, contact, experiences, multilingue" },
      { name: "robots", content: "index, follow" },
      { "http-equiv": "Content-Type", content: "text/html; charset=UTF-8" },
      { name: "language", content: "French" },
      { name: "revisit-after", content: "5 days" },
      { name: "author", content: "Loïs Alirol" },

      { property: "og:type", content: "website" },
      { property: "og:title", content: "Loïs Alirol | Portfolio" },
      { property: "og:description", content: "Learn more about me, check out my projects and don't hesitate to contact me." },
      { property: "og:url", content: "https://www.loisalirol.com" },
      { property: "og:image", content: "https://www.loisalirol.com/web-app-manifest-512x512.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },

      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Loïs Alirol | Portfolio" },
      { name: "twitter:description", content: "Learn more about me, check out my projects and don't hesitate to contact me." },
      { name: "twitter:image", content: "https://www.loisalirol.com/web-app-manifest-512x512.png" },
      { name: "twitter:image:width", content: "1200" },
      { name: "twitter:image:height", content: "630" },

      { name: "theme-color", content: "#0E1525" },
    ];

    metas.forEach(meta => {
      let element: HTMLMetaElement | null = null;

      if ("name" in meta) {
        element = document.querySelector(`meta[name="${meta.name}"]`);
        if (!element && meta.name) {
          element = document.createElement("meta");
          element.setAttribute("name", meta.name);
          document.head.appendChild(element);
        }
      } else if ("property" in meta) {
        element = document.querySelector(`meta[property="${meta.property}"]`);
        if (!element && meta.property) {
          element = document.createElement("meta");
          element.setAttribute("property", meta.property);
          document.head.appendChild(element);
        }
      }

      if (element) element.setAttribute("content", meta.content);
    });
  }, [title]);
};