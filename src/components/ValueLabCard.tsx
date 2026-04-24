"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import type { ValueLabData } from "@/lib/contentful";

type ValueLabCardProps = {
  lab: ValueLabData;
};

export function ValueLabCard({ lab }: ValueLabCardProps) {
  const [closed, setClosed] = useState(false);

  if (closed || (!lab.title && !lab.dateLabel && !lab.link)) {
    return null;
  }

  return (
    <div className="fixed bottom-0 right-0 z-100 mx-auto mt-8 max-w-sm rounded-xl border border-neutral-200 bg-neutral-50/80 p-6 shadow-md backdrop-blur-lg md:p-8">
      <button
        type="button"
        onClick={() => setClosed(true)}
        className="absolute right-3 top-3 rounded-full p-1.5 text-neutral-600 transition-colors hover:bg-neutral-200/80 hover:text-neutral-900"
        aria-label="Cerrar"
      >
        <Icon icon="mdi:close" width={22} height={22} aria-hidden />
      </button>

      <div className="flex flex-col gap-1 pr-9">
        {lab.title ? (
          <div>
            <p
              className="text-base font-semibold leading-snug text-neutral-900 md:text-lg"
              style={{ color: "var(--dark)" }}
            >
              {lab.title}
            </p>
          </div>
        ) : null}
        {lab.dateLabel ? (
          <p className="text-sm text-neutral-500 md:text-base">{lab.dateLabel}</p>
        ) : null}
        {lab.link ? (
          <a
            href={lab.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex w-fit items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-95"
            style={{ backgroundColor: "var(--primary)" }}
          >
            Inscribirse al Value Lab
          </a>
        ) : null}
      </div>
    </div>
  );
}
