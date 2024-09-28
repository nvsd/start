import { useEffect, useRef, useState } from "react";
import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";

import { cn } from "@/lib/utils";
import { useJobsByColumnId } from "@/api/jobs";
import { WorkCard } from "@/components/work-card";

type ColumnJobListProps = { columnId: string };

export const ColumnJobList = ({ columnId }: ColumnJobListProps) => {
  const jobs = useJobsByColumnId(columnId);
  const ref = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState<boolean>(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    return draggable({
      element: el,
      onDragStart: () => setDragging(true),
      onDrop: () => setDragging(false),
    });
  }, []);

  return (
    <ul className="gap-1">
      {jobs.data?.map((job) => (
        <li>
          <WorkCard
            ref={ref}
            className={cn(dragging && "opacity-5")}
            {...job}
          />
        </li>
      ))}
    </ul>
  );
};
