import { Grip, Pencil } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Chapter } from "@prisma/client";
import { cn } from "@/lib/utils";
interface ChapterItemProps {
  chapter: Chapter;
  onEdit: (id: string) => void;
}
const ChapterItem = ({ chapter, onEdit }: ChapterItemProps) => {
  return (
    <div
      className={cn(
        "flex items-center gap-x-2 bg-slate-200 border-slate-200 border text-slate-700 rounded-md mb-4 text-sm",
        chapter.isPublished && "bg-sky-100 border-sky-200 text-sky-700"
      )}
    >
      <div
        className={cn(
          "px-2 py-3 border-r border-r-slate-200 hover:bg-slate-300 rounded-l-md transition",
          chapter.isPublished && "border-r-sky-200 hover:bg-sky-200"
        )}
      >
        <Grip className="h-5 w-5" />
      </div>
      <div className="flex-1">{chapter.title}</div>
      <div className="ml-auto pr-2 flex items-center gap-x-2">
        {chapter.isFree && <Badge>Free</Badge>}
        <Badge
          className={cn("bg-slate-500", chapter.isPublished && "bg-sky-700")}
        >
          {chapter.isPublished ? "Published" : "Draft"}
        </Badge>
        <Pencil
          onClick={() => onEdit(chapter.id)}
          className="w-4 h-4 cursor-pointer hover:opacity-75 transition"
        />
      </div>
    </div>
  );
};

export default ChapterItem;
