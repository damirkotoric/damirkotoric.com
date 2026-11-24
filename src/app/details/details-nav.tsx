"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type NavGroup = {
  name: string;
  items: { id: string; title: string }[];
};

export function DetailsNav({ groups }: { groups: NavGroup[] }) {
  const [activeId, setActiveId] = useState(groups[0]?.items[0]?.id);

  useEffect(() => {
    const ids = groups.flatMap((group) => group.items.map((item) => item.id));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );

    ids.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [groups]);

  return (
    <nav aria-label="Details" className="flex flex-col gap-8">
      {groups.map((group) => (
        <div key={group.name}>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            {group.name}
          </p>
          <ul className="flex flex-col gap-2">
            {group.items.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={activeId === item.id ? "true" : undefined}
                  className={cn(
                    "block border-l-2 pl-3 text-sm leading-snug transition-colors",
                    activeId === item.id
                      ? "border-foreground font-semibold text-foreground"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  )}
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}
