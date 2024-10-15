"use client";

import { Chapter } from "@prisma/client";
import { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { cn } from "@/lib/utils";
import ChapterItem from "./chapter-item";

interface ChaptersListProps {
  items: Chapter[];
  onEdit: (id: string) => void;
  onReorder: (updateDate: { id: string; position: number }[]) => void;
}

const ChaptersList = ({ items, onEdit, onReorder }: ChaptersListProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [chapters, setChapters] = useState(items);

  useEffect(() => {
    setIsMounted(true);
    return () => {};
  }, []);

  useEffect(() => {
    setChapters(items);
    return () => {};
  }, [items]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(chapters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const startIndex = Math.min(result.source.index, result.destination.index);
    const endIndex = Math.max(result.source.index, result.destination.index);

    const updateChapters = items.slice(startIndex, endIndex + 1);

    setChapters(items);

    const bulkUpdateDate = updateChapters.map((chapter) => ({
      id: chapter.id,
      position: items.findIndex((item) => item.id === chapter.id),
    }));
    onReorder(bulkUpdateDate);
    // onReorder(items.map((item, index) => ({ id: item.id, position: index })));
  };

  if (!isMounted) return null;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="chapters">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            // className="gap-y-2"
          >
            {chapters.map((chapter, index) => (
              <Draggable
                key={chapter.id}
                draggableId={chapter.id}
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      userSelect: "none",
                      ...provided.draggableProps.style,
                    }}
                  >
                    <ChapterItem
                      key={chapter.id}
                      chapter={chapter}
                      onEdit={onEdit}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ChaptersList;
