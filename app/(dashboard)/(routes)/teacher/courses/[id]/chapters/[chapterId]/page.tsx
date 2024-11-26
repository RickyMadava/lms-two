import { IconBadge } from "@/components/icon-badge";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { ArrowLeft, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import ChapterTitleForm from "./_components/chapter-title-form";

const ChapterIdPage = async ({
  params,
}: {
  params: { id: string; chapterId: string };
}) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }
  const { id, chapterId } = params;

  const chapter = await db.chapter.findUnique({
    where: {
      id: chapterId,
      courseId: id,
    },
    include: {
      muxData: true,
    },
  });
  if (!chapter) {
    return redirect("/");
  }

  const requiredFields = [chapter.title, chapter.description, chapter.videoUrl];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="w-full">
          <Link
            href={`/teacher/courses/${id}`}
            className="flex items-center text-sm hover:opacity-75 transition mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span>Back to course setup</span>
          </Link>
          <div className="flex items-center jbetween w-full">
            <div className="flex flex-col gap-y-2">
              <h1 className="text-2xl font-semibold">Chapter Creation</h1>
              <span className="text-sm text-slate-700">
                Complete alls fields to create a chapter {completionText}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        <div className="space-y-4">
          <div className="">
            <div className="flex items-center gap-y-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl">Customize your chapter</h2>
            </div>
            <ChapterTitleForm
              initialData={chapter}
              courseId={id}
              chapterId={chapterId}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChapterIdPage;
